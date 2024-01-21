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
				<div className='z-10 w-full h-full absolute top-0 flex flex-col opacity-0 group-hover:opacity-100 transition-all ease-in-out items-end'>
					<div className='flex-1 flex flex-col p-2'>
						<IconButton className='mb-2 w-fit'>
							<Star1 size={18} className='text-primary-500' />
						</IconButton>
						<IconButton className='w-fit'>
							<Eye size={18} className='text-primary-500' />
						</IconButton>
					</div>
					<div className='flex-1 w-full justify-center items-end flex p-2 md:p-4'>
						<button className='btn-secondary w-full'>
							Add To Cart
						</button>
					</div>
				</div>
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
