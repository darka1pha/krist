import { getCategories, getProducts } from '@/actions/pdoducts'
import { Container, Filter } from '@/components/products'
import { CategoriesProps } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Products Collection | Krist',
	description:
		"Explore the diverse world of accessories at Krist - statement jewelry to chic handbags, discover curated fashion-forward choices that cater to every taste.",
}

const Products = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
	const resolvedSearchParams = (await searchParams) || {}
	const normalizedSearchParams: { [key: string]: string } = {}
	for (const [key, value] of Object.entries(resolvedSearchParams)) {
		if (typeof value === 'string') {
			normalizedSearchParams[key] = value
		} else if (Array.isArray(value)) {
			normalizedSearchParams[key] = value.join(',')
		}
	}

	const productsData = await getProducts({
		searchParams: normalizedSearchParams,
	})
	const products = Array.isArray(productsData)
		? productsData
		: (productsData as any)?.data || []

	const categoriesData = await getCategories()
	const categories = Array.isArray(categoriesData)
		? (categoriesData as unknown as CategoriesProps[])
		: (categoriesData as any)?.data || []

	return (
		<main className='max-w-7xl mx-auto grid grid-cols-12 gap-6 min-h-screen paddings'>
			<Filter categories={categories || []} />
			<Container products={products || []} />
		</main>
	)
}

export default Products
