import DarkModeSwitch from '../theme/darkModeSwitch'
import Link from 'next/link'
import Image from 'next/image'
import LanguageChanger from '../translation/languageChanger'
import initTranslations from '@/app/i18n'
import { IconButton } from '../elements'
import { Heart, ShoppingCart } from 'iconsax-react'

const i18nNamespaces = ['navbar']

const Navbar = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale, i18nNamespaces)
	return (
		<nav className='flex w-full h-20 justify-between items-center px-4'>
			<div>
				<Link href={'/'}>
					<Image
						src='/images/logo.svg'
						height={48}
						width={100}
						alt='krist logo'
					/>
				</Link>
			</div>
			<div className='flex justify-center items-center'>
				<Link href={'/favorites'}>
					<Heart
						className='mx-2 text-black dark:text-white'
						size={28}
					/>
				</Link>
				<Link href={'/cart'}>
					<ShoppingCart className='mx-2 text-black dark:text-white' size={28} />
				</Link>
				<DarkModeSwitch />
				<LanguageChanger />
				<Link href={'/auth/sign-in'}>
					<button className='btn-primary ml-2 w-24'>{t('signin')}</button>
				</Link>
			</div>
		</nav>
	)
}

export default Navbar
