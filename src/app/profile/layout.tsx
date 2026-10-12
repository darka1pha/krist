import { Menu } from '@/components/profile'
import ProfileTabTransition from '@/components/profile/tabTransition'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const ProfileLayout = async ({
	params,
	children,
}: {
	children: React.ReactNode
	params?: Promise<{ locale?: string }>
}) => {
	const resolvedParams = params ? await params : undefined
	const locale = resolvedParams?.locale || 'en'
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) redirect('/auth/sign-in')

	return (
		<main className='paddings max-w-7xl mx-auto'>
			<div className='grid gap-8 grid-cols-12 w-full items-start'>
				<Menu locale={locale} />
				<ProfileTabTransition>{children}</ProfileTabTransition>
			</div>
		</main>
	)
}

export default ProfileLayout
