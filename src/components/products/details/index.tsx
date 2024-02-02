import { Database, Tables } from '@/types/supabase'
import { AddToCart, ColorPicker } from '..'
import SizePicker from '../sizePicker'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const Details = async ({ product }: { product: Tables<'products'> | null }) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data: likeStatus } = await supabase
		.from('favorites')
		.select('liked')
		.eq('id', product?.id!)
		.single()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<div className='px-8 md:px-0'>
			<div>
				<p className='text-3xl font-bold'>{product?.brand}</p>
				<p className='text-xl my-2'>{product?.name}</p>
				<p className='text-xl my-2'>${product?.price?.toFixed(2)}</p>
				<p className='text-lg my-2'>{product?.description}</p>
			</div>
			<ColorPicker colors={product?.colors} />
			<SizePicker sizes={product?.size} />
			<AddToCart user={user} liked={likeStatus?.liked} />
		</div>
	)
}

export default Details
