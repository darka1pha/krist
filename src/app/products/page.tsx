import { getCategories, getProducts } from '@/actions/pdoducts'
import { Container, Filter } from '@/components/products'
import { CategoriesProps } from '@/types'
import { PostgrestError } from '@supabase/supabase-js'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Products',
	description:
		"Explore the diverse world of accessories at Krist's Categories page, where every category is a curated journey into style and sophistication. From statement jewelry to chic handbags, discover a spectrum of fashion-forward choices that cater to every taste. Dive into the latest trends or find timeless classics – our Categories page is your gateway to a meticulously crafted collection, ensuring you'll always find the perfect accessory to complement your unique style. Uncover the essence of elegance as you navigate through a spectrum of options that redefine fashion at Krist.",
		
}

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
