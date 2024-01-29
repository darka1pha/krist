import { Tables } from './supabase'

// npx supabase gen types typescript --project-id swavffutisgneenuzdoh --schema public > src/types/supabase.ts

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
