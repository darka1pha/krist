import initTranslations from '@/app/i18n'

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
	const { t } = await initTranslations(locale || 'en', ['profile'])

	return (
		<div className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm'>
			<h2 className='text-lg font-bold pb-4 mb-6 border-b border-gray-100 dark:border-zinc-800'>
				Account Details
			</h2>
			<div className='grid grid-cols-2 w-full gap-5'>
				<div className='col-span-2 md:col-span-1 flex flex-col'>
					<label className='form_label' htmlFor='name'>
						{t('form.name')}
					</label>
					<input
						readOnly
						className='input bg-gray-50/70 dark:bg-zinc-800/70 border-gray-200 dark:border-zinc-700'
						name='name'
						placeholder={t('fullname_placeholder')}
						required
						defaultValue={name}
					/>
				</div>
				<div className='col-span-2 md:col-span-1 flex flex-col'>
					<label className='form_label' htmlFor='email'>
						{t('form.email')}
					</label>
					<input
						readOnly
						defaultValue={email}
						className='input bg-gray-50/70 dark:bg-zinc-800/70 border-gray-200 dark:border-zinc-700'
						name='email'
						placeholder={t('email_placeholder')}
						required
					/>
				</div>
				<div className='col-span-2 flex flex-col'>
					<label className='form_label' htmlFor='address'>
						{t('form.address')}
					</label>
					<input
						readOnly
						defaultValue={address}
						className='input bg-gray-50/70 dark:bg-zinc-800/70 border-gray-200 dark:border-zinc-700'
						name='address'
						placeholder={t('address_placeholder')}
						required
					/>
				</div>
			</div>
		</div>
	)
}

export default InfoForm
