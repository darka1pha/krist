import initTranslations from '@/app/i18n'
import { SubmitButton } from '@/components/elements'
import { CityProps, StateProps } from '@/types'
import Link from 'next/link'
import FormSelect from './formSelect'
import { addNewAddressAction } from '@/app/actions/profile'

const AddressModal = async ({
	locale,
	states,
	cities,
	selectedCity,
	selectedState,
}: {
	locale: string
	states: StateProps
	cities: CityProps
	selectedCity: string
	selectedState: string
}) => {
	const { t } = await initTranslations(locale, ['profile'])
	return (
		<div className='absolute top-0 right-0 h-full w-full'>
			<Link href={'/profile/addresses'}>
				<div className='absolute top-0 right-0 h-full w-full bg-primary-500/50 -z-[0]' />
			</Link>
			<div className='absolute right-[50%] top-[50%] transform translate-x-[50%] translate-y-[-50%] z-20 bg-white shadow-md rounded-xl p-5'>
				<form className='grid grid-cols-2 w-full gap-4'>
					<div className='col-span-1 flex flex-col'>
						<label className='form_label mb-2' htmlFor='name'>
							{t('addresses.form.name')}
						</label>
						<input
							className='input min-w-72'
							name='name'
							placeholder={t('form.name_placeholder')}
							required
						/>
					</div>
					<div className='col-span-1 flex flex-col'>
						<label className='form_label mb-2' htmlFor='phone'>
							{t('addresses.form.phone')}
						</label>
						<input
							className='input min-w-72'
							pattern='^(\+98|0|0098)?9\d{9}$|^\+98[1-8]\d{10}$|^(\+98|0|0098)?21[0-9]\d{7}$'
							title='Please enter a valid Iranian phone number'
							name='phone'
							placeholder={t('addresses.form.phone_placeholder')}
							required
						/>
					</div>
					<div className='col-span-1 flex flex-col'>
						<label className='form_label mb-2' htmlFor='state'>
							{t('addresses.form.state')}
						</label>
						<FormSelect
						defaultValue={selectedState ?? null}
							for='state'
							baseUrl='/profile/addresses?modal=true&state='
							className='select'
							name='state'>
							{states.map(({ id, name }) => (
								<option key={id} value={name}>
									{name}
								</option>
							))}
						</FormSelect>
					</div>
					<div className='col-span-1 flex flex-col'>
						<label className='form_label mb-2' htmlFor='city'>
							{t('addresses.form.city')}
						</label>
						<FormSelect
							defaultValue={selectedCity ?? null}
							for='city'
							baseUrl='/profile/addresses?modal=true&state='
							className='select'
							name='city'>
							{cities.map(({ id, name }) => (
								<option key={id} value={name}>
									{name}
								</option>
							))}
						</FormSelect>
					</div>
					<div className='col-span-2 flex flex-col'>
						<label className='form_label mb-2' htmlFor='details'>
							{t('addresses.form.details')}
						</label>
						<input
							className='input min-w-72'
							name='details'
							placeholder={t('addresses.form.details_placeholder')}
							required
						/>
					</div>
					<SubmitButton formAction={addNewAddressAction} className='btn-primary w-full col-span-2'>
						Confirm
					</SubmitButton>
				</form>
			</div>
		</div>
	)
}

export default AddressModal
