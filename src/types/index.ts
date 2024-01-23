import { Tables } from './supabase'

export type CategoriesProps = {
	name: string
	subcategories: Tables<'subcategories'>[]
}
