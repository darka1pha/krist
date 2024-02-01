import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
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
export default async function og({
	params: { id },
}: {
	params: { id: number }
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
					fontSize: 32,
					background: 'white',
					width: '100%',
					height: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '20px',
					overflow: 'hidden',
					backgroundImage: `url(${product?.images[0]})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
				}}>
				<p
					style={{
						backgroundColor: '#ffffff50',
						padding: 20,
						borderRadius: 20,
						fontWeight: 'bold',
					}}>
					{product?.name}
				</p>
			</div>
		),
		{
			...size,
		}
	)
}
