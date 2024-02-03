import {
	AddressCard,
	AddressModal,
	AddressesHeader,
} from '@/components/profile/addresses'
import { CitiesOfState, CityProps, StateProps } from '@/types'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

const getAddresses = cache(async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	return await supabase.from('addresses').select('*')
})

const AddressesPage = async ({
	params: { locale },
	searchParams: { modal, city, state },
}: {
	params: { locale: string }
	searchParams: {
		modal: string
		city: string
		state: string
	}
}) => {
	const states = (await (
		await fetch('https://iran-locations-api.vercel.app/api/v1/states')
	).json()) as StateProps

	const cities = (await (
		await fetch(
			`https://iran-locations-api.vercel.app/api/v1/cities?state=${state ?? ''}`
		)
	).json()) as CitiesOfState

	const { data } = await getAddresses()

	return (
		<div className='col-span-12 md:col-span-8 xl:col-span-9'>
			<AddressesHeader locale={locale} />
			<div className='mt-2'>
				{data?.map(({ details, id, name, phone }) => (
					<AddressCard
						details={details}
						id={id}
						name={name}
						phone={phone}
						key={id}
					/>
				))}
			</div>
			{modal === 'true' && (
				<AddressModal
					selectedCity={city}
					selectedState={state}
					cities={cities?.cities?.length ? cities.cities : []}
					states={states}
					locale={locale}
				/>
			)}
		</div>
	)
}

export default AddressesPage
