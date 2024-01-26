import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

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
		.eq('id', user?.id || '')
	const { data: emailUpdateData, error: emailError } =
		await supabase.auth.updateUser({ email })
	console.log(infoError)
	console.log(emailUpdateData)
	if (emailError || infoError) {
		redirect(`/profile?error=${infoError?.message}`)
	} else {
		redirect('/profile?message=Update Succcessfully. :)')
	}
}
