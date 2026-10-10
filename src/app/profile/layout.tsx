import { Menu } from '@/components/profile'
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
			<div className='grid gap-6 grid-cols-12 w-full'>
				<Menu locale={locale} />
				{children}
			</div>
		</main>
	)
}

export default ProfileLayout
