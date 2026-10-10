import Image from 'next/image'
import Quantity from './quantity'
import { Trash2 } from 'lucide-react'
import { IconButton } from '..'
import { deleteCartItemAction } from '@/actions/cart'
import Link from 'next/link'

type CartItemProps = {
	name: string
	brand: string
	price: number
	qty: number
	id: number
	image: string
}

const CartItem = ({ brand, id, name, price, qty, image }: CartItemProps) => {
	const itemTotal = price * qty

	return (
		<div className='p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors hover:bg-gray-50/50 dark:hover:bg-zinc-800/30'>
			{/* Product Thumbnail & Details */}
			<div className='flex items-center gap-4 min-w-0 flex-1'>
				<div className='relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0 border border-gray-100 dark:border-zinc-800'>
					<Image
						src={image || '/images/hero.webp'}
						alt={name}
						fill
						sizes='80px'
						className='object-cover'
					/>
				</div>
				<div className='min-w-0 flex-1'>
					<span className='text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5'>
						{brand}
					</span>
					<h3 className='text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate'>
						{name}
					</h3>
					<span className='text-xs font-medium text-gray-500 mt-1 block'>
						${price.toFixed(2)} each
					</span>
				</div>
			</div>

			{/* Controls & Price */}
			<div className='flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-gray-100 dark:border-zinc-800'>
				<Quantity id={id} qty={qty} />

				<div className='text-right min-w-[70px]'>
					<span className='text-base font-extrabold text-zinc-900 dark:text-zinc-100'>
						${itemTotal.toFixed(2)}
					</span>
				</div>

				<form action={deleteCartItemAction}>
					<input type='hidden' name='id' value={id} />
					<IconButton
						aria-label='Remove item'
						className='w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors'>
						<Trash2 size={16} />
					</IconButton>
				</form>
			</div>
		</div>
	)
}

export default CartItem
