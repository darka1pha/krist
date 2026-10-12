import { Details, Gallery } from '@/components/products'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
const getProduct = cache(async (productId: number) => {
	try {
		const supabase = await createClient()
		const { data, error } = await supabase
			.from('products')
			.select('*')
			.eq('id', productId)
			.maybeSingle()

		if (error) {
			console.error('Supabase product fetch error:', error)
			return null
		}

		return data
	} catch (e) {
		console.error('Supabase product fetch exception:', e)
		return null
	}
})

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>
}): Promise<Metadata> => {
	const { id } = await params
	const product = await getProduct(Number(id))

	if (!product) return { title: 'Product Not Found | Krist' }

	return {
		title: `${product.name} | Krist`,
		description: product.description,
		openGraph: {
			title: product.name,
			description: product.description,
			images: product.images?.[0] ? [{ url: product.images[0] }] : [],
		},
		twitter: {
			title: product.name,
			description: product.description,
			images: product.images?.[0] ? [{ url: product.images[0] }] : [],
			card: 'summary_large_image',
		},
	}
}

const Product = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params
	const product = await getProduct(Number(id))

	if (!product) {
		notFound()
	}

	return (
		<main className='max-w-7xl mx-auto paddings'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-start'>
				<Gallery images={product.images || []} />
				<Details product={product} />
			</div>
		</main>
	)
}

export default Product
