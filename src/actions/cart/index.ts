'use server'
import { getCurrentPathname } from '@/utils'
import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const addToCartAction = async (formData: FormData) => {
	const productId = Number(formData.get('id'))
	const qty = Number(formData.get('qty') ?? 1)

	const supabase = createServerActionClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()

	// Check if this user have a shopping cart or not
	const { data } = await supabase.from('shopping_cart').select('*').single()

	if (!data) {
		// Create and Select new Shopping cart for this user
		const { data, error } = await supabase
			.from('shopping_cart')
			.insert({
				user_id: user?.id!,
				created_at: new Date(Date.now()).toLocaleString(),
			})
			.select('*')
			.single()

		// Add new item to Shopping cart
		const { error: insertItemError } = await supabase
			.from('cart_items')
			.insert({
				product_id: productId,
				cart_id: data?.id!,
				user_id: user?.id!,
				qty: qty ?? 1,
				created_at: new Date(Date.now()).toLocaleDateString(),
			})

		if (insertItemError)
			throw new Error(insertItemError.message, {
				cause: insertItemError.details,
			})
		if (error)
			throw new Error('Failed to create new shopping cart', {
				cause: error.details,
			})
	} else {
		const { error: insertItemError } = await supabase
			.from('cart_items')
			.insert({
				product_id: productId,
				cart_id: data?.id!,
				user_id: user?.id!,
				qty: qty ?? 1,
				created_at: new Date(Date.now()).toLocaleDateString(),
			})
		if (insertItemError)
			throw new Error(insertItemError.message, {
				cause: insertItemError.details,
			})
	}

	revalidatePath(getCurrentPathname())
}

export const updateQtyAction = async (formData: FormData) => {
	const cartItemId = Number(formData.get('id'))
	const qty = Number(formData.get('qty'))

	console.log({ cartItemId, qty })

	const supabase = createServerActionClient<Database>({ cookies })

	const { error: updateItemError } = await supabase
		.from('cart_items')
		.update({
			qty: qty,
		})
		.eq('id', cartItemId)

	if (updateItemError)
		throw new Error(updateItemError.message, {
			cause: updateItemError.details,
		})

	revalidatePath(getCurrentPathname())
}

export const deleteCartItemAction = async (formData: FormData) => {
	const cartItemId = Number(formData.get('id'))

	const supabase = createServerActionClient<Database>({ cookies })

	const { error: deleteItemError } = await supabase
		.from('cart_items')
		.delete()
		.eq('id', cartItemId)

	if (deleteItemError)
		throw new Error(deleteItemError.message, {
			cause: deleteItemError.details,
		})

	revalidatePath(getCurrentPathname())
}
