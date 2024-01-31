import Image from 'next/image'
import Quantity from './quantity'
import { Trash } from 'iconsax-react'
import { IconButton } from '..'
import { deleteCartItemAction } from '@/app/actions/cart'

type CartItemProps = {
	name: string
	brand: string
	price: number
	qty: number
	id: number
	image: string
}
const CartItem = ({ brand, id, name, price, qty, image }: CartItemProps) => {
	return (
		<div className='p-4 border-b border-gray-[#f6f6f6] grid grid-cols-12 grid-flow-row gap-4'>
			<span className='h-20 overflow-hidden relative rounded-lg col-span-3 sm:col-span-2  md:col-span-1'>
				<Image
					src={image}
					alt='product image'
					layout='fill'
					className='object-cover h-full w-full'
				/>
			</span>
			<span className='px-2 col-span-9 sm:col-span-10 md:col-span-4 ml-2'>
				<h2 className='text-lg font-bold mb-2'>{name}</h2>
				<h2 className='text-md'>{brand}</h2>
			</span>
			<span className='grid col-span-3 md:col-span-1 place-items-center'>
				<h3 className='text-md'>${price.toFixed(2)}</h3>
			</span>
			<span className='grid col-span-4 md:col-span-3 place-items-center'>
				<Quantity id={id} qty={qty} />
			</span>
			<span className='grid col-span-3  md:col-span-1 place-items-center'>
				<h3 className='text-md'>${(price * qty).toFixed(2)}</h3>
			</span>
			<span className='grid col-span-2 items-center justify-items-end'>
				<form action={deleteCartItemAction}>
					<input type='hidden' name='id' value={id} />
					<IconButton>
						<Trash size={26} className='text-red-600' />
					</IconButton>
				</form>
			</span>
		</div>
	)
}

export default CartItem
