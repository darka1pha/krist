import initTranslations from '@/app/i18n'
import Header from './header'
import { createClient } from '@/lib/supabase/server'
import ProfileNav from './profileNav'

const i18NameSpace = ['profile']

const Menu = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale || 'en', i18NameSpace)
	const supabase = await createClient()
	const { data: profile } = await supabase.from('profiles').select('*').maybeSingle()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<aside className='col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-5'>
			<div>
				<h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white'>
					{t('title') || 'My Account'}
				</h1>
				<p className='text-xs text-zinc-500 dark:text-zinc-400 mt-1'>
					Manage your profile, preferences, and orders
				</p>
			</div>

			<Header
				name={profile?.name || (user?.user_metadata as any)?.name}
				email={user?.email}
				avatarUrl={profile?.avatar_url}
			/>

			<ProfileNav />
		</aside>
	)
}

export default Menu
