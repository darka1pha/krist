import { getCategories, getProducts } from '@/actions/pdoducts'
import { Container, Filter } from '@/components/products'
import { CategoriesProps } from '@/types'
import { PostgrestError } from '@supabase/supabase-js'

const Products = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string }
}) => {
	const { data: products, error } = await getProducts({ searchParams })
	const { data: categories, error: categoryError } =
		(await getCategories()) as {
			data: CategoriesProps[]
			error: PostgrestError | null
		}

	if (error || categoryError) {
		throw new Error(error?.message ?? categoryError?.message, {
			cause: error?.details || categoryError?.message,
		})
	}

	return (
		<main className='grid grid-cols-12 gap-5 min-h-screen paddings'>
			<Filter categories={categories} />
			<Container products={products} />
		</main>
	)
}

export default Products
