'use client'
import { useParams, useSearchParams } from 'next/navigation'
import { addToCartAction } from '@/actions/cart'
import { SubmitButton } from '@/components/elements'
import { User } from '@supabase/supabase-js'
import { favoriteAction } from '@/actions/profile'
import Link from 'next/link'
import Quantity from './quantity'
import { Heart, ShoppingBag } from 'lucide-react'

type AddToCartParams = {
	liked: boolean | undefined
	user: User | null
}

const AddToCart = ({ liked, user }: AddToCartParams) => {
	const searchParams = useSearchParams()
	const params = useParams()
	const productId = String(params.id || '')

	return (
		<div className='flex flex-col sm:flex-row items-stretch gap-3 w-full'>
			{/* Quantity Selector */}
			<div className='shrink-0'>
				<Quantity />
			</div>

			{/* Wishlist Button - Always visible */}
			{user ? (
				<form action={favoriteAction} className='shrink-0'>
					<input
						type='hidden'
						name='liked'
						value={liked ? String(liked) : 'false'}
					/>
					<input type='hidden' name='id' value={productId} />
					<SubmitButton
						variant='secondary'
						aria-label='Save to wishlist'
						className='w-12 h-12 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center justify-center transition-all'>
						<Heart
							size={20}
							className={liked ? 'fill-red-500 text-red-500' : 'text-zinc-700 dark:text-zinc-300'}
						/>
					</SubmitButton>
				</form>
			) : (
				<Link
					href={`/auth/sign-in?redirect=/products/${productId}`}
					aria-label='Save to wishlist'
					className='w-12 h-12 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center justify-center transition-all shrink-0'>
					<Heart
						size={20}
						className='text-zinc-700 dark:text-zinc-300 hover:text-red-500'
					/>
				</Link>
			)}

			{/* Add to Cart CTA */}
			{user ? (
				<form action={addToCartAction} className='flex-1'>
					<input
						type='hidden'
						name='qty'
						value={searchParams.get('qty') ?? 1}
					/>
					<input type='hidden' name='id' value={productId} />
					<SubmitButton className='btn-primary w-full h-12 text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg'>
						<ShoppingBag size={18} />
						<span>Add to Cart</span>
					</SubmitButton>
				</form>
			) : (
				<Link
					className='flex-1 block'
					href={`/auth/sign-in?redirect=/products/${productId}`}>
					<button
						type='button'
						className='btn-primary w-full h-12 text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg'>
						<ShoppingBag size={18} />
						<span>Sign In to Purchase</span>
					</button>
				</Link>
			)}
		</div>
	)
}

export default AddToCart
