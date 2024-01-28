import { Tables } from './supabase'

export type CategoriesProps = {
	name: string
	subcategories: Tables<'subcategories'>[]
}

export type StateProps = {
	name: string
	id: number
}[]

export type CityProps = {
	name: string
	id: number
}[]

export type CitiesOfState = {
	name: string
	cities: CityProps
}
