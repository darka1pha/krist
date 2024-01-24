import { getCategories, getProducts } from '@/app/actions/pdoducts'
import { Container, Filter } from '@/components/products'
import { CategoriesProps } from '@/types'

const Products = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string }
}) => {
	const { data: products } = await getProducts({ searchParams })
	const categories = (await getCategories()) as CategoriesProps[]

	return (
		<main className='grid grid-cols-12 gap-5 min-h-screen paddings'>
			<Filter categories={categories} />
			<Container products={products} />
		</main>
	)
}

export default Products
