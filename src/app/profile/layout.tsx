import { Menu } from '@/components/profile'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers'


const ProfileLayout = async ({
	params: { locale },
	children,
}: {
	children: React.ReactNode
	params: { locale: string }
}) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data } = await supabase.from('profiles').select('*').single()
	return (
		<main className='paddings'>
			{user ? (
				<div className='grid gap-5 grid-cols-12 w-full min-h-[calc(100vh-80px)]'>
					<Menu locale={locale} />
					{children}
				</div>
			) : (
				<h1 className='text-2xl md:text-5xl font-bold'>
					Please Sign in to your account
				</h1>
			)}{' '}
		</main>
	)
}

export default ProfileLayout
