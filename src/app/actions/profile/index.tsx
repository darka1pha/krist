import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
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
