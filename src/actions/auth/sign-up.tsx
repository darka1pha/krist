'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const signUpAction = async (formData: FormData) => {
	const supabase = await createClient()
	const email = String(formData.get('email'))
	const password = String(formData.get('password'))
	const name = String(formData.get('name'))
	const address = String(formData.get('address'))

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name,
				address,
			},
			emailRedirectTo: `https://krist.app/api/auth/callback`,
		},
	})

	if (error) {
		redirect('/auth/sign-up?error=Could not authenticate user')
	} else {
		redirect('/auth/sign-up?message=Check email to continue sign in process')
	}
}
