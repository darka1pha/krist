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
