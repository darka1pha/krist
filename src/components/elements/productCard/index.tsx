import Image from 'next/image'
import { IconButton, SubmitButton } from '..'
import { Tables } from '@/types/supabase'
import Link from 'next/link'
import { favoriteAction } from '@/actions/profile'
import { createClient } from '@/lib/supabase/server'
import { addToCartAction } from '@/actions/cart'
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react'

const ProductCard = async ({ product }: { product: Tables<'products'> }) => {
	const supabase = await createClient()
	const { data } = await supabase
		.from('favorites')
		.select('liked')
		.eq('id', product.id)
		.maybeSingle()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const isLiked = data?.liked ?? false
	const imageSrc = product.images?.[0] || '/images/hero.webp'
	const rating = product.rating || 4.5

	return (
		<div className='group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden'>
			{/* Product Image Area */}
			<div className='relative w-full aspect-[4/5] bg-gray-50 dark:bg-zinc-800/50 overflow-hidden'>
				<Link href={`/products/${product.id}`} className='block w-full h-full'>
					<Image
						alt={product.name}
						src={imageSrc}
						fill
						sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
						className='object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out'
					/>
				</Link>

				{/* Floating Brand Badge */}
				<div className='absolute top-3 left-3 z-10'>
					<span className='px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-zinc-900 dark:text-zinc-100 shadow-sm'>
						{product.brand}
					</span>
				</div>

				{/* Action Buttons Top Right */}
				<div className='absolute top-3 right-3 z-10 flex flex-col gap-2'>
					{user ? (
						<form action={favoriteAction}>
							<input type='hidden' name='id' value={product.id} />
							<input
								type='hidden'
								name='liked'
								value={String(isLiked)}
							/>
							<IconButton
								aria-label='Save to favorites'
								className='w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-700 dark:text-zinc-300 hover:text-red-500 hover:scale-110 shadow-sm transition-all'>
								<Heart
									size={16}
									className={isLiked ? 'fill-red-500 text-red-500' : ''}
								/>
							</IconButton>
						</form>
					) : (
						<Link
							href={`/auth/sign-in?redirect=/products/${product.id}`}
							aria-label='Sign in to save favorite'
							className='w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-700 dark:text-zinc-300 hover:text-red-500 hover:scale-110 shadow-sm flex items-center justify-center transition-all'>
							<Heart size={16} />
						</Link>
					)}

					<Link href={`/products/${product.id}`}>
						<div
							aria-label='Quick view'
							className='w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:scale-110 shadow-sm flex items-center justify-center transition-all cursor-pointer'>
							<Eye size={16} />
						</div>
					</Link>
				</div>

				{/* Quick Add To Cart Overlay on Hover */}
				<div className='absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
					{user ? (
						<form action={addToCartAction} className='w-full'>
							<input type='hidden' name='id' value={product.id} />
							<input type='hidden' name='qty' value='1' />
							<SubmitButton
								variant='secondary'
								className='w-full py-2.5 px-4 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-zinc-100 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all'>
								<ShoppingBag size={14} /> Add to Cart
							</SubmitButton>
						</form>
					) : (
						<Link
							href={`/auth/sign-in?redirect=/products/${product.id}`}
							className='w-full block'>
							<button
								type='button'
								className='w-full py-2.5 px-4 rounded-xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md text-zinc-900 dark:text-zinc-100 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all'>
								<ShoppingBag size={14} /> Add to Cart
							</button>
						</Link>
					)}
				</div>
			</div>

			{/* Details Info */}
			<div className='p-4 flex flex-col flex-1 justify-between gap-2'>
				<div>
					<div className='flex items-center gap-1 text-amber-500 text-xs mb-1'>
						<Star size={13} className='fill-amber-400 text-amber-400' />
						<span className='font-semibold text-zinc-700 dark:text-zinc-300'>
							{rating.toFixed(1)}
						</span>
						<span className='text-gray-400 text-[11px]'>(24)</span>
					</div>

					<Link href={`/products/${product.id}`}>
						<h3 className='font-medium text-sm text-zinc-900 dark:text-zinc-100 line-clamp-1 hover:underline'>
							{product.name}
						</h3>
					</Link>
				</div>

				<div className='flex items-baseline justify-between pt-1 border-t border-gray-50 dark:border-zinc-800/50'>
					<div className='flex items-baseline gap-2'>
						<span className='text-base font-bold text-zinc-950 dark:text-white'>
							${product.price?.toFixed(2)}
						</span>
						<span className='text-xs text-gray-400 line-through'>
							${((product.price || 0) * 1.25).toFixed(2)}
						</span>
					</div>
					<span className='text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded'>
						20% OFF
					</span>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
