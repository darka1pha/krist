import Link from 'next/link'
import Image from 'next/image'
import initTranslations from '@/app/i18n'
import AuthButton from './authButton'
import CartIcon from '../elements/cartIcon'
import { createClient } from '@/lib/supabase/server'
import DarkModeSwitch from '../theme/darkModeSwitch'
import { Heart, Search } from 'lucide-react'
import CategoriesMenu from './categoriesMenu'
import MobileNav from './mobileNav'

const i18nNamespaces = ['navbar']

const Navbar = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale || 'en', i18nNamespaces)
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<header className='sticky top-0 z-50 w-full bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800/80 transition-colors'>
			<nav className='max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8'>
				{/* Logo & Main Nav */}
				<div className='flex items-center gap-8'>
					<Link href='/' className='flex items-center gap-2 group'>
						<div className='relative h-9 w-24 transition-transform group-hover:scale-105'>
							<Image
								src='/images/logo.svg'
								alt='Krist Logo'
								fill
								priority
								className='object-contain dark:invert'
							/>
						</div>
					</Link>

					{/* Navigation Links */}
					<ul className='hidden md:flex items-center gap-8 text-sm font-medium'>
						<li>
							<Link
								href='/'
								className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors'>
								{t('home') || 'Home'}
							</Link>
						</li>
						<li>
							<CategoriesMenu label={t('categories') || 'Categories'} />
						</li>
						<li>
							<Link
								href='/products'
								className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors'>
								{t('shop') || 'Shop'}
							</Link>
						</li>
						<li>
							<Link
								href='/contact-us'
								className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors'>
								{t('contactus') || 'Contact Us'}
							</Link>
						</li>
					</ul>
				</div>

				{/* Right Actions */}
				<div className='flex items-center gap-2 sm:gap-3'>
					{/* Quick Search */}
					<Link
						href='/products'
						aria-label='Search products'
						className='p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center'>
						<Search size={20} />
					</Link>

					{/* Wishlist Link - Always shown */}
					<Link
						href={user ? '/profile/favorites' : '/auth/sign-in?redirect=/profile/favorites'}
						aria-label='Wishlist'
						className='p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center'>
						<Heart size={20} />
					</Link>

					{/* Cart Icon - Always shown */}
					<CartIcon />

					{/* Theme Switcher */}
					<DarkModeSwitch />

					{/* Auth Button */}
					<AuthButton user={user} locale={locale || 'en'} />

					{/* Mobile Menu */}
					<MobileNav />
				</div>
			</nav>
		</header>
	)
}

export default Navbar
