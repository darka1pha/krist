import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signUpAction = async (formData: FormData) => {
	'use server'
	const supabase = createServerActionClient<Database>({ cookies })
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
