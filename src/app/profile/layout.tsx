import { Menu } from '@/components/profile'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

	if (!user) redirect('/auth/sign-in')

	return (
		<main className='paddings'>
			<div className='grid gap-5 grid-cols-12 w-full'>
				<Menu locale={locale} />
				{children}
			</div>
		</main>
	)
}

export default ProfileLayout
