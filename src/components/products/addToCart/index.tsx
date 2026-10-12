'use client'
import { useParams, useSearchParams } from 'next/navigation'
import { addToCartAction } from '@/actions/cart'
import { SubmitButton } from '@/components/elements'
import { User } from '@supabase/supabase-js'
import { favoriteAction } from '@/actions/profile'
import Link from 'next/link'
import Quantity from './quantity'
import { Heart, ShoppingBag, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/components/toast'
import { useState, useTransition } from 'react'

type AddToCartParams = {
	liked: boolean | undefined
	user: User | null
	productName?: string
}

const AddToCart = ({ liked, user, productName }: AddToCartParams) => {
	const searchParams = useSearchParams()
	const params = useParams()
	const productId = String(params.id || '')
	const toast = useToast()
	const [isPending, startTransition] = useTransition()
	const [justAdded, setJustAdded] = useState(false)

	const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const qty = Number(searchParams.get('qty') ?? 1)

		startTransition(async () => {
			try {
				await addToCartAction(formData)
				setJustAdded(true)
				toast.cart(
					'Added to Shopping Bag',
					`${qty}x ${productName || 'Item'} added to your cart.`,
					{ label: 'View Bag', href: '/cart' }
				)
				setTimeout(() => setJustAdded(false), 2200)
			} catch (err: any) {
				toast.error('Could not add to cart', err?.message || 'Please try again.')
			}
		})
	}

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
				<form onSubmit={handleAddToCart} className='flex-1'>
					<input
						type='hidden'
						name='qty'
						value={searchParams.get('qty') ?? 1}
					/>
					<input type='hidden' name='id' value={productId} />
					<button
						type='submit'
						disabled={isPending}
						className={`btn-primary w-full h-12 text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all ${
							justAdded ? '!bg-emerald-600 hover:!bg-emerald-700 !text-white' : ''
						}`}>
						{isPending ? (
							<>
								<div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
								<span>Adding to Bag...</span>
							</>
						) : justAdded ? (
							<>
								<CheckCircle2 size={18} className='text-white' />
								<span>Added to Bag!</span>
							</>
						) : (
							<>
								<ShoppingBag size={18} />
								<span>Add to Cart</span>
							</>
						)}
					</button>
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
