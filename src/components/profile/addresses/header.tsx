import initTranslations from '@/app/i18n'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const AddressesHeader = async ({ locale }: { locale: string }) => {
	const { t } = await initTranslations(locale, ['profile'])
	return (
		<div className='flex w-full justify-between items-center mb-6'>
			<h1 className='text-2xl font-bold text-zinc-950 dark:text-white'>
				{t('addresses.title') || 'My Addresses'}
			</h1>
			<Link href={'/profile/addresses?modal=true'}>
				<button
					type='button'
					name='new address'
					aria-label='Add new address'
					className='btn-primary flex items-center gap-1.5 text-xs py-2.5 px-4'>
					<Plus size={16} />
					<span>Add Address</span>
				</button>
			</Link>
		</div>
	)
}

export default AddressesHeader
