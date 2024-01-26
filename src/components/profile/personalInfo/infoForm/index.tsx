import initTranslations from '@/app/i18n'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const InfoForm = async ({
	locale,
	name,
	address,
	email,
}: {
	locale: string
	name: string | undefined
	address: string | undefined
	email: string | undefined
}) => {
	const { t } = await initTranslations(locale, ['profile'])

	return (
		<div className='grid grid-cols-2 w-full gap-4'>
			<div className='col-span-1 flex flex-col'>
				<label className='form_label mb-2' htmlFor='fullname'>
					{t('form.fullname')}
				</label>
				<input
					className='input'
					name='name'
					placeholder={t('fullname_placeholder')}
					required
					value={name}
				/>
			</div>
			<div className='col-span-1 flex flex-col'>
				<label className='form_label mb-2' htmlFor='email'>
					{t('form.email')}
				</label>
				<input
					value={email}
					className='input'
					name='email'
					placeholder={t('email_placeholder')}
					required
				/>
			</div>
			<div className='col-span-2 flex flex-col'>
				<label className='form_label mb-2' htmlFor='address'>
					{t('form.address')}
				</label>
				<input
					value={address}
					className='input'
					name='address'
					placeholder={t('address_placeholder')}
					required
				/>
			</div>
		</div>
	)
}

export default InfoForm
