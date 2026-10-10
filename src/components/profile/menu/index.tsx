import initTranslations from '@/app/i18n'
import Header from './header'
import { createClient } from '@/lib/supabase/server'
import MenuButton from './menuButton'
import { User, Heart, Package, MapPin } from 'lucide-react'

const menuButtons = [
	{
		name: 'Personal Info',
		icon: <User size={18} />,
		url: '/profile',
	},
	{
		name: 'favorites',
		icon: <Heart size={18} />,
		url: '/profile/favorites',
	},
	{
		name: 'Orders',
		icon: <Package size={18} />,
		url: '/profile/orders',
	},
	{
		name: 'Addresses',
		icon: <MapPin size={18} />,
		url: '/profile/addresses',
	},
]

const i18NameSpace = ['profile']

const Menu = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale || 'en', i18NameSpace)
	const supabase = await createClient()
	const { data } = await supabase.from('profiles').select('*').maybeSingle()

	return (
		<div className='col-span-12 md:col-span-4 lg:col-span-3'>
			<h1 className='text-3xl font-extrabold tracking-tight mb-4 text-zinc-950 dark:text-white'>
				{t('title') || 'My Account'}
			</h1>
			<Header name={data?.name || 'Valued Customer'} />
			<div className='mt-4 flex md:flex-col justify-between border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-sm'>
				{menuButtons.map(({ icon, name, url }, key) => (
					<MenuButton key={key} name={name} icon={icon} url={url} />
				))}
			</div>
		</div>
	)
}

export default Menu
