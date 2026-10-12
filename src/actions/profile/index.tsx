'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { getCurrentPathname } from '@/utils'

export const updateProfileAction = async (formData: FormData) => {
	'use server'
	const name = String(formData.get('name'))
	const address = String(formData.get('address'))
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) redirect('/auth/sign-in')

	const { error: infoError } = await supabase
		.from('profiles')
		.update({ address, name })
		.eq('id', user.id)

	if (infoError) {
		redirect(`/profile?error=${infoError?.message}`)
	} else {
		revalidatePath('/profile')
		redirect('/profile')
	}
}

export const addNewAddressAction = async (formData: FormData) => {
	'use server'
	const supabase = await createClient()

	const name = String(formData.get('name'))
	const details = String(formData.get('details'))
	const phone = String(formData.get('phone'))
	const state = String(formData.get('state'))
	const city = String(formData.get('city'))

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) redirect('/auth/sign-in')

	const { error } = await supabase.from('addresses').insert({
		city,
		name,
		phone,
		details,
		state,
		user_id: user.id,
		created_at: new Date(Date.now()).toISOString(),
	})

	if (error) {
		redirect(`/profile?error=${error?.message}`)
	} else {
		revalidatePath('/profile/addresses')
		redirect('/profile/addresses')
	}
}

export const saveAddressAction = async (addressData: {
	name: string
	phone: string
	state: string
	city: string
	details: string
}) => {
	'use server'
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) throw new Error('You must be signed in to add an address.')

	const { data, error } = await supabase
		.from('addresses')
		.insert({
			name: addressData.name.trim(),
			phone: addressData.phone.trim(),
			state: addressData.state.trim(),
			city: addressData.city.trim(),
			details: addressData.details.trim(),
			user_id: user.id,
			created_at: new Date().toISOString(),
		})
		.select('*')
		.single()

	if (error) {
		throw new Error(error.message || 'Failed to save address')
	}

	// Keep profile address synced if empty
	const { data: profile } = await supabase
		.from('profiles')
		.select('address')
		.eq('id', user.id)
		.maybeSingle()

	if (!profile?.address || !profile.address.trim()) {
		await supabase
			.from('profiles')
			.update({
				address: `${addressData.details}, ${addressData.city}, ${addressData.state}`,
			})
			.eq('id', user.id)
	}

	revalidatePath('/cart')
	revalidatePath('/profile/addresses')
	revalidatePath('/profile')

	return data
}

export const deleteAddressAction = async (id: number) => {
	'use server'
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) throw new Error('Unauthorized')

	const { error } = await supabase
		.from('addresses')
		.delete()
		.eq('id', id)
		.eq('user_id', user.id)

	if (error) throw new Error(error.message)

	revalidatePath('/profile/addresses')
	revalidatePath('/cart')
}

export const favoriteAction = async (formData: FormData) => {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) return

	const id = Number(formData.get('id'))
	const liked = String(formData.get('liked'))

	const { error } =
		liked === 'false'
			? await supabase
					.from('favorites')
					.insert({ id, user_id: user.id, liked: true })
			: await supabase.from('favorites').delete().eq('id', id)

	if (error) {
		throw new Error(error.message, { cause: error.details })
	} else {
		const path = await getCurrentPathname()
		if (path) revalidatePath(path)
	}
}
