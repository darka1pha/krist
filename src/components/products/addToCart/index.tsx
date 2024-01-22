import { Heart } from 'iconsax-react'
import Quantity from './quantity'

const AddToCart = () => {
	return (
		<div className='grid grid-cols-4 sm:grid-cols-7 gap-2'>
			<Quantity />
			<button className='p-4 border-primary-500 border-2 sm:col-span-1 rounded-xl flex justify-center items-center active:scale-95 transition-all'>
				<Heart className='text-primary-500' size={18} />
			</button>
			<button className='btn-primary col-span-4'>Add to Cart</button>
		</div>
	)
}

export default AddToCart
