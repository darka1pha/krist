import { Tables } from '@/types/supabase'
import { AddToCart, ColorPicker } from '..'
import SizePicker from '../sizePicker'

const Details = ({ product }: { product: Tables<'products'> | null }) => {
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
			<AddToCart />
		</div>
	)
}

export default Details
