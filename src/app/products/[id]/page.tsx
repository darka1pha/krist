import { Details, Gallery } from '@/components/products'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const generateMetadata = async ({
	params: { id },
}: {
	params: { id: number }
}) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data: product } = await supabase
		.from('products')
		.select('*')
		.eq('id', id)
		.single()

	const metadata: Metadata = {
		title: product?.name,
		description: product?.description,
		openGraph: {
			title: product?.name,
			description: product?.description,
			images: [{ url: product?.images[0] || '', alt: product?.name }],
		},
	}

	return metadata
}

const Product = async ({ params: { id } }: { params: { id: number } }) => {
	await new Promise((resolve) => setTimeout(resolve, 100000))
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data: product } = await supabase
		.from('products')
		.select('*')
		.eq('id', id)
		.single()

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
