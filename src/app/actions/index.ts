import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getProducts = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string }
}) => {
	'use server'
	const supabase = createServerActionClient<Database>({ cookies })
	const filterCategories = searchParams.category.split(',')

	if (!!searchParams.category && !searchParams.sub) {
		const { data: categories } = await supabase
			.from('categories')
			.select('id')
			.in('name', filterCategories)
		const categoriesId = categories?.map(({ id }) => id) ?? []

		const { data: subcategories } = await supabase
			.from('subcategories')
			.select('id')
			.in('category', categoriesId)

		const subcategoriesId = subcategories?.map(({ id }) => id) ?? []

		const data = await supabase
			.from('products')
			.select('*')
			.in('category', subcategoriesId)
		return data
	} else if (!!searchParams.category && !!searchParams.sub) {
		const { data: category } = await supabase
			.from('categories')
			.select('id')
			.eq('name', searchParams.category)
			.single()

		const { data: subcategory } = await supabase
			.from('subcategories')
			.select('id')
			.eq('category', category?.id || '')
			.eq('name', searchParams.sub)
			.single()

		const data = await supabase
			.from('products')
			.select('*')
			.eq('category', subcategory?.id || '')

		return data
	} else {
		const data = await supabase.from('products').select('*')

		return data
	}
}

export const getCategories = async () => {
	const supabase = createServerActionClient<Database>({ cookies })

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

	return tempCategories.slice(1, tempCategories.length)
}
