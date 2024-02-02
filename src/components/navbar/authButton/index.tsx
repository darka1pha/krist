'use client'
import initTranslations from '@/app/i18n'
import { User } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import AccountMenu from '../accountMenu'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'

const i18nNamespaces = ['navbar']

const AuthButton = ({
	locale,
	user,
}: {
	locale: string
	user: User | null
}) => {
	const pathname = usePathname()

	return (
		<div className='flex justify-end items-center'>
			{!user ? (
				<Link
					href={{
						pathname: '/auth/sign-in',
						search:
							pathname !== '/' && !pathname.includes('/auth')
								? `redirect=${pathname}`
								: '',
					}}>
					<button name='sign in' className='btn-primary ml-2 w-24'>
						Sign In
					</button>
				</Link>
			) : (
				<AccountMenu user={user} />
			)}
		</div>
	)
}

export default AuthButton
