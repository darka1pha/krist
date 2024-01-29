'use server'

import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export const updateProfileAction = async (formData: FormData) => {
	'use server'
	const name = String(formData.get('name'))
	const address = String(formData.get('address'))
	const supabase = createServerActionClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()
	const { data: infoUpdateData, error: infoError } = await supabase
		.from('profiles')
		.update({ address, name })
		.eq('id', user?.id!)

	if (infoError) {
		redirect(`/profile?error=${infoError?.message}`)
	} else {
		revalidatePath('/profile')
		redirect('/profile')
	}
}

export const addNewAddressAction = async (formData: FormData) => {
	'use server'
	const supabase = createServerActionClient<Database>({ cookies })

	const name = String(formData.get('name'))
	const details = String(formData.get('details'))
	const phone = String(formData.get('phone'))
	const state = String(formData.get('state'))
	const city = String(formData.get('city'))

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data, error } = await supabase.from('addresses').insert({
		city,
		name,
		phone,
		details,
		state,
		user_id: user?.id!,
		created_at: new Date(Date.now()).toLocaleString(),
	})

	if (error) {
		redirect(`/profile?error=${error?.message}`)
	} else {
		revalidatePath('/profile/addresses')
		redirect('/profile/addresses')
	}
}

export const favoriteAction = async (formData: FormData) => {
	const supabase = createServerActionClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const id = Number(formData.get('id'))
	const liked = String(formData.get('liked'))

	const headersList = headers()
	const domain = headersList.get('x-forwarded-host') || ''
	const protocol = headersList.get('x-forwarded-proto') || ''
	const fullUrl = headersList.get('referer') || ''

	const toRemove = `${protocol}://${domain}`

	const pathname = fullUrl.replace(toRemove, '')

	const { error } =
		liked === 'false'
			? await supabase
					.from('favorites')
					.insert({ id, user_id: user?.id!, liked: true })
			: await supabase.from('favorites').delete().eq('id', id)

	if (error) {
		throw new Error(error.message, { cause: error.details })
	} else {
		revalidatePath(pathname)
	}
}
