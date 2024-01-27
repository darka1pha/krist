import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export const updateProfileAction = async (formData: FormData) => {
	'use server'
	const email = String(formData.get('email'))
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
