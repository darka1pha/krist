import Link from 'next/link'
import Image from 'next/image'
import initTranslations from '@/app/i18n'
import AuthButton from './authButton'
import CartIcon from '../elements/cartIcon'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

const i18nNamespaces = ['navbar']

const Navbar = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale, i18nNamespaces)
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return (
		<nav className='flex w-full h-20 justify-between items-center px-4'>
			<div className='flex-1'>
				<Link href={'/'}>
					<Image
						src='/images/logo.svg'
						height={48}
						width={100}
						alt='krist logo'
						style={{
							maxWidth: '100%',
							height: 'auto',
						}}
					/>
				</Link>
			</div>
			<ul className='flex justify-center items-center flex-2'>
				<li className='mx-4'>
					<Link href={'/products'}>
						<p>{t('shop')}</p>
					</Link>
				</li>
				<li className='mx-4'>
					<Link href={'/contact-us'}>
						<p>{t('contactus')}</p>
					</Link>
				</li>
			</ul>
			<div className='flex items-center flex-1 justify-end'>
				{user && <CartIcon />}
				<AuthButton user={user} locale={locale} />
			</div>
		</nav>
	)
}

export default Navbar
