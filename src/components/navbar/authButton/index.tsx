import initTranslations from '@/app/i18n'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import AccountMenu from '../accountMenu'

const i18nNamespaces = ['navbar']

const AuthButton = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale, i18nNamespaces)
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return (
		<div className='flex justify-end items-center flex-1'>
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
