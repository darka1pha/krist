import { Tables } from './supabase'

// npx supabase gen types typescript --project-id swavffutisgneenuzdoh --schema public > src/types/supabase.ts

export type CategoriesProps = {
	id: number
	name: string
	poster_url?: string | null
	description?: string | null
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
