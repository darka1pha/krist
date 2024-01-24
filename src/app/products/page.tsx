import { Container, Filter } from '@/components/products'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getProducts = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string }
}) => {
	'use server'
	const supabase = createServerComponentClient<Database>({ cookies })
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

const Products = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string }
}) => {
	const { data: products } = await getProducts({ searchParams })

	return (
		<main className='grid grid-cols-12 gap-5 min-h-screen paddings'>
			<Filter />
			<Container products={products} />
		</main>
	)
}

export default Products
