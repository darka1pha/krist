'use server'
import { getCurrentPathname } from '@/utils'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export const addToCartAction = async (formData: FormData) => {
	const productId = Number(formData.get('id'))
	const qty = Number(formData.get('qty') ?? 1)

	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) return

	// Check if this user have a shopping cart or not
	const { data: existingCart } = await supabase
		.from('shopping_cart')
		.select('*')
		.eq('user_id', user.id)
		.maybeSingle()

	let cartId = existingCart?.id

	if (!existingCart) {
		// Create new Shopping cart for this user
		const { data: newCart, error } = await supabase
			.from('shopping_cart')
			.insert({
				user_id: user.id,
				created_at: new Date(Date.now()).toISOString(),
			})
			.select('*')
			.single()

		if (error) {
			throw new Error('Failed to create new shopping cart', {
				cause: error.details,
			})
		}
		cartId = newCart?.id
	}

	// Add new item to Shopping cart
	const { error: insertItemError } = await supabase
		.from('cart_items')
		.insert({
			product_id: productId,
			cart_id: cartId!,
			user_id: user.id,
			qty: qty ?? 1,
			created_at: new Date(Date.now()).toISOString(),
		})

	if (insertItemError) {
		throw new Error(insertItemError.message, {
			cause: insertItemError.details,
		})
	}

	const path = await getCurrentPathname()
	if (path) revalidatePath(path)
}

export const updateQtyAction = async (formData: FormData) => {
	const cartItemId = Number(formData.get('id'))
	const qty = Number(formData.get('qty'))

	const supabase = await createClient()

	const { error: updateItemError } = await supabase
		.from('cart_items')
		.update({
			qty: qty,
		})
		.eq('id', cartItemId)

	if (updateItemError) {
		throw new Error(updateItemError.message, {
			cause: updateItemError.details,
		})
	}

	const path = await getCurrentPathname()
	if (path) revalidatePath(path)
}

export const deleteCartItemAction = async (formData: FormData) => {
	const cartItemId = Number(formData.get('id'))

	const supabase = await createClient()

	const { error: deleteItemError } = await supabase
		.from('cart_items')
		.delete()
		.eq('id', cartItemId)

	if (deleteItemError) {
		throw new Error(deleteItemError.message, {
			cause: deleteItemError.details,
		})
	}

	const path = await getCurrentPathname()
	if (path) revalidatePath(path)
}

export const fakeCheckoutAction = async (selectedAddressId?: number) => {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		throw new Error('You must be signed in to complete checkout.')
	}

	// 1. Mandatory Address Validation: User MUST have a delivery address to place an order
	let confirmedAddress: {
		name?: string
		phone?: string
		details?: string
		city?: string
		state?: string
		formatted: string
	} | null = null

	if (selectedAddressId) {
		const { data: addr } = await supabase
			.from('addresses')
			.select('*')
			.eq('id', selectedAddressId)
			.eq('user_id', user.id)
			.maybeSingle()

		if (addr) {
			confirmedAddress = {
				name: addr.name,
				phone: addr.phone,
				details: addr.details,
				city: addr.city,
				state: addr.state,
				formatted: [addr.details, addr.city, addr.state].filter(Boolean).join(', '),
			}
		}
	}

	if (!confirmedAddress) {
		// Look up any address registered in addresses table
		const { data: userAddresses } = await supabase
			.from('addresses')
			.select('*')
			.eq('user_id', user.id)
			.order('created_at', { ascending: false })
			.limit(1)

		if (userAddresses && userAddresses.length > 0) {
			const addr = userAddresses[0]
			confirmedAddress = {
				name: addr.name,
				phone: addr.phone,
				details: addr.details,
				city: addr.city,
				state: addr.state,
				formatted: [addr.details, addr.city, addr.state].filter(Boolean).join(', '),
			}
		}
	}

	if (!confirmedAddress) {
		// Check profile address
		const { data: profile } = await supabase
			.from('profiles')
			.select('name, address')
			.eq('id', user.id)
			.maybeSingle()

		if (profile?.address && profile.address.trim()) {
			confirmedAddress = {
				name: profile.name || (user.user_metadata as any)?.name || 'VIP Client',
				phone: (user.user_metadata as any)?.phone || '',
				details: profile.address,
				formatted: profile.address,
			}
		}
	}

	// STRICT ENFORCEMENT: Reject if no address is found!
	if (!confirmedAddress) {
		throw new Error('A delivery address is required to place an order. Please add your shipping address.')
	}

	// 2. Clear cart items for this user
	const { error: deleteError } = await supabase
		.from('cart_items')
		.delete()
		.eq('user_id', user.id)

	if (deleteError) {
		console.error('Error clearing cart items:', deleteError)
	}

	// 3. Reset shopping cart totals
	await supabase
		.from('shopping_cart')
		.update({ item_count: 0, total_price: 0 })
		.eq('user_id', user.id)

	const path = await getCurrentPathname()
	if (path) revalidatePath(path)
	revalidatePath('/cart')
	revalidatePath('/profile/orders')

	return {
		success: true,
		orderId: `KRT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
		shippingAddress: confirmedAddress,
	}
}
