import Image from 'next/image'
import { IconButton } from '..'
import { Eye, Star1 } from 'iconsax-react'

const ProductCard = () => {
	return (
		<div className='group transition-all ease-in-out'>
			<div className='aspect-w-10 relative aspect-h-14 w-full overflow-hidden rounded-lg bg-gray-200 '>
				<Image
					alt='image'
					src={'/images/signin.webp'}
					objectFit='cover'
					layout='fill'
				/>
				<div className='z-10 w-fit absolute top-0 left-[75%] p-4 flex flex-col opacity-0 group-hover:opacity-100 transition-all ease-in-out'>
					<IconButton className='mb-2'>
						<Star1 size={18} className='text-primary-500' />
					</IconButton>
					<IconButton>
						<Eye size={18} className='text-primary-500' />
					</IconButton>
				</div>
				<button className='btn-secondary absolute h-fit z-10 top-[80%] mx-auto left-1/2 transform -translate-x-1/2 w-[90%] opacity-0 group-hover:opacity-100 transition-all ease-in-out'>
					Add To Cart
				</button>
			</div>
			<div className='pl-2 mt-1'>
				<p className='text-lg font-bold mb-1'>Product Brand</p>
				<p className='mb-1'>Product Name</p>
				<p>$20.00</p>
			</div>
		</div>
	)
}

export default ProductCard
