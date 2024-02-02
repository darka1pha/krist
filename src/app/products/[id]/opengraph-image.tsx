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
	width: 920,
	height: 1280,
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
			<div
				style={{
					fontSize: 32,
					background: 'white',
					width: '920px',
					height: '1280px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					borderRadius: '20px',
					backgroundColor: 'beige',
					backgroundImage: `url(${product?.images[0]!})`,
					backgroundPosition: 'top',
					backgroundSize: '100% 100%',
					backgroundRepeat: 'no-repeat',
				}}>
				<p
					style={{
						backgroundColor: '#ffffff70',
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
