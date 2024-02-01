import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({
	props: { id },
}: {
	props: { id: number }
}) {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data: product } = await supabase
		.from('products')
		.select('*')
		.eq('id', id)
		.single()

	return new ImageResponse(
		(
			// ImageResponse JSX element
			<div
				style={{
					fontSize: 128,
					background: 'white',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<img
					src={product?.images[0]}
					alt='image poster'
					className='w-full h-full object-cover'
				/>
			</div>
		),
		{
			...size,
		}
	)
}
