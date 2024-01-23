import { Database } from '@/types/supabase'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
	const supabase = createRouteHandlerClient<Database>({ cookies })

	const { data: categories } = await supabase.from('categories').select('*')
	const { data: subcategories } = await supabase
		.from('subcategories')
		.select('*')

	let tempCategories = [{}]

	categories?.forEach((category) => {
		let tempCategory: { name: string | null; subcategories: [] | {}[] } = {
			name: category.name,
			subcategories: [],
		}
		subcategories?.forEach((sub) => {
			if (sub.category === category.id) {
				tempCategory = {
					...tempCategory,
					subcategories: [...tempCategory.subcategories, sub],
				}
			}
		})
		tempCategories = [...tempCategories, tempCategory]
	})

	return NextResponse.json(tempCategories.slice(1, tempCategories.length))
}
