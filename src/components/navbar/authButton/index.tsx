import initTranslations from '@/app/i18n'
import { Database } from '@/types/supabase'
import {
	User,
	createServerComponentClient,
} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import AccountMenu from '../accountMenu'

const i18nNamespaces = ['navbar']

const AuthButton = async ({
	locale,
	user,
}: {
	locale: string
	user: User | null
}) => {
	const { t } = await initTranslations(locale, i18nNamespaces)

	return (
		<div className='flex justify-end items-center'>
			{!user ? (
				<Link href={'/auth/sign-in'}>
					<button className='btn-primary ml-2 w-24'>{t('signin')}</button>
				</Link>
			) : (
				<AccountMenu user={user} />
			)}
		</div>
	)
}

export default AuthButton
