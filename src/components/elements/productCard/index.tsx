import Image from 'next/image'
import { IconButton } from '..'
import { Eye, Star1 } from 'iconsax-react'
import { Tables } from '@/types/supabase'
import Link from 'next/link'

const ProductCard = ({ product }: { product: Tables<'products'> }) => {
	return (
		<div className='group transition-all ease-in-out'>
			<div className='aspect-w-10 relative aspect-h-14 w-full overflow-hidden rounded-lg bg-gray-200 '>
				<Image
					alt='image'
					src={product.images[0]}
					objectFit='cover'
					layout='fill'
				/>
				<div className='z-10 w-full h-full absolute top-0 flex flex-col opacity-0 group-hover:opacity-100 transition-all ease-in-out items-end'>
					<div className='flex-1 flex flex-col p-2'>
						<IconButton className='mb-2 w-fit'>
							<Star1 size={18} className='text-primary-500' />
						</IconButton>
						<Link href={`/product/${product.id}`}>
							<IconButton className='w-fit'>
								<Eye size={18} className='text-primary-500' />
							</IconButton>
						</Link>
					</div>
					<div className='flex-1 w-full justify-center items-end flex p-2 md:p-4'>
						<button className='btn-secondary w-full'>Add To Cart</button>
					</div>
				</div>
			</div>
			<div className='pl-2 mt-1'>
				<p className='text-lg font-bold mb-1'>{product.brand}</p>
				<p className='mb-1'>{product.name}</p>
				<p>${product.price?.toFixed(2)}</p>
			</div>
		</div>
	)
}

export default ProductCard
