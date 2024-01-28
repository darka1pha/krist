import initTranslations from '@/app/i18n'
import Header from './header'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import MenuButton from './menuButton'

import { Bag, Profile, Routing, Star1 } from 'iconsax-react'

const menuButtons = [
	{
		name: 'Personal Info',
		icon: <Profile size={18} />,
		url: '/profile',
	},
	{
		name: 'favorites',
		icon: <Star1 size={18} />,
		url: '/profile/favorites',
	},
	{
		name: 'Orders',
		icon: <Bag size={18} />,
		url: '/profile/orders',
	},
	{
		name: 'Addresses',
		icon: <Routing size={18} />,
		url: '/profile/addresses',
	},
]

const i18NameSpace = ['profile']
const Menu = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale, i18NameSpace)
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data } = await supabase.from('profiles').select('*').single()
	return (
		<div className='col-span-3'>
			<h1 className='text-3xl font-bold'>{t('title')}</h1>
			<Header name={data?.name} />
			<div className='mt-4'>
				{menuButtons.map(({ icon, name, url }, key) => (
					<MenuButton key={key} name={name} icon={icon} url={url} />
				))}
			</div>
		</div>
	)
}

export default Menu
