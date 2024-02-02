import { Details, Gallery } from '@/components/products'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { cache } from 'react'

const getProduct = cache(async (productId: number) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	return await supabase
		.from('products')
		.select('*')
		.eq('id', productId)
		.single()
})

export const generateMetadata = async ({
	params: { id },
}: {
	params: { id: number }
	searchParams: { qty: number }
}) => {
	const { data: product } = await getProduct(id)

	const metadata: Metadata = {
		title: product?.name,
		description: product?.description,
		openGraph: {
			title: product?.name,
			description: product?.description,
			images: [
				{
					url: product?.images[0]!,
				},
			],
		},
		twitter: {
			title: product?.name,
			description: product?.description,
			images: [
				{
					url: product?.images[0]!,
				},
			],
			card: 'summary_large_image',
		},
	}

	return metadata
}

const Product = async ({ params: { id } }: { params: { id: number } }) => {
	const { data: product } = await getProduct(id)
	return (
		<main className='paddings'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
				<Gallery images={product?.images || []} />
				<Details product={product} />
			</div>
		</main>
	)
}

export default Product
