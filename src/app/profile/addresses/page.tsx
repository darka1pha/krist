import {
	AddressCard,
	AddressModal,
	AddressesHeader,
} from '@/components/profile/addresses'
import { CitiesOfState, StateProps } from '@/types'
import { createClient } from '@/utils/supabase/server'
import { cache } from 'react'

const getAddresses = cache(async () => {
	const supabase = await createClient()
	return await supabase.from('addresses').select('*')
})

const AddressesPage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>
	searchParams: Promise<{
		modal?: string
		city?: string
		state?: string
	}>
}) => {
	const { locale } = await params
	const { modal, city, state } = await searchParams

	let states: StateProps = []
	let cities: CitiesOfState = { name: '', cities: [] }

	try {
		const statesRes = await fetch(
			'https://iran-locations-api.vercel.app/api/v1/states',
			{ next: { revalidate: 3600 } }
		)
		if (statesRes.ok) states = (await statesRes.json()) as StateProps

		if (state) {
			const citiesRes = await fetch(
				`https://iran-locations-api.vercel.app/api/v1/cities?state=${state}`,
				{ next: { revalidate: 3600 } }
			)
			if (citiesRes.ok) cities = (await citiesRes.json()) as CitiesOfState
		}
	} catch (e) {
		console.warn('Locations API fetch skipped:', e)
	}

	const { data } = await getAddresses()

	return (
		<div className='w-full'>
			<AddressesHeader locale={locale || 'en'} />
			<div className='mt-2'>
				{data?.map((address: { details: string; id: number; name: string; phone: string }) => (
					<AddressCard
						details={address.details}
						id={address.id}
						name={address.name}
						phone={address.phone}
						key={address.id}
					/>
				))}
			</div>
			{modal === 'true' && (
				<AddressModal
					selectedCity={city || ''}
					selectedState={state || ''}
					cities={cities?.cities?.length ? cities.cities : []}
					states={states}
					locale={locale || 'en'}
				/>
			)}
		</div>
	)
}

export default AddressesPage
