'use client'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import AccountMenu from '../accountMenu'
import { usePathname } from 'next/navigation'

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
					<button
						name='sign in'
						className='btn-primary ml-2 px-5 py-2.5 text-sm font-semibold rounded-xl'>
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
