import initTranslations from '@/app/i18n'
import { Tooltip } from '@mui/material'
import { Add } from 'iconsax-react'
import Link from 'next/link'

const AddressesHeader = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale, ['profile'])
	return (
		<div className='flex w-full justify-between items-center'>
			<h1 className='text-2xl font-bold'>{t('addresses.title')}</h1>
			<Link href={'/profile/addresses?modal=true'}>
				<button name='new address' className='btn-primary'>
					<Add size={18} />
				</button>
			</Link>
		</div>
	)
}

export default AddressesHeader
