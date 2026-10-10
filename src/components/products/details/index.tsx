import { Tables } from '@/types/supabase'
import { AddToCart, ColorPicker } from '..'
import SizePicker from '../sizePicker'
import { createClient } from '@/utils/supabase/server'
import { Star, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const Details = async ({
	product,
}: {
	product: Tables<'products'> | null
}) => {
	const supabase = await createClient()
	const { data: likeStatus } = await supabase
		.from('favorites')
		.select('liked')
		.eq('id', product?.id || 0)
		.maybeSingle()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	const rating = product?.rating || 4.8
	const price = product?.price || 0
	const originalPrice = (price * 1.25).toFixed(2)

	return (
		<div className='flex flex-col gap-6 px-4 md:px-0'>
			{/* Breadcrumbs */}
			<div className='flex items-center gap-2 text-xs text-gray-500'>
				<Link href='/' className='hover:underline'>
					Home
				</Link>
				<span>/</span>
				<Link href='/products' className='hover:underline'>
					Products
				</Link>
				<span>/</span>
				<span className='text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[200px]'>
					{product?.name}
				</span>
			</div>

			{/* Header info */}
			<div>
				<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 mb-2'>
					{product?.brand}
				</div>
				<h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white'>
					{product?.name}
				</h1>

				{/* Rating & In-stock badge */}
				<div className='flex items-center gap-4 mt-3'>
					<div className='flex items-center gap-1.5'>
						<div className='flex text-amber-400'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									size={16}
									className={
										i < Math.floor(rating)
											? 'fill-amber-400 text-amber-400'
											: 'text-gray-300 dark:text-zinc-700'
									}
								/>
							))}
						</div>
						<span className='text-sm font-bold text-zinc-800 dark:text-zinc-200'>
							{rating.toFixed(1)}
						</span>
						<span className='text-xs text-gray-500'>(128 reviews)</span>
					</div>

					<span className='inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full'>
						<CheckCircle2 size={12} /> In Stock
					</span>
				</div>

				{/* Pricing */}
				<div className='flex items-baseline gap-3 mt-4'>
					<span className='text-3xl font-extrabold text-zinc-950 dark:text-white'>
						${price.toFixed(2)}
					</span>
					<span className='text-lg text-gray-400 line-through'>
						${originalPrice}
					</span>
					<span className='text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md'>
						Save 20%
					</span>
				</div>

				{/* Description */}
				<p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-4 border-b border-gray-100 dark:border-zinc-800 pb-6'>
					{product?.description}
				</p>
			</div>

			{/* Pickers */}
			<div className='space-y-4'>
				<ColorPicker colors={product?.colors} />
				<SizePicker sizes={product?.size} />
			</div>

			{/* Actions */}
			<div className='pt-2'>
				<AddToCart user={user} liked={likeStatus?.liked} />
			</div>

			{/* Trust Badges */}
			<div className='grid grid-cols-3 gap-3 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center text-xs text-gray-600 dark:text-gray-400'>
				<div className='flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-zinc-900'>
					<Truck size={18} className='text-zinc-700 dark:text-zinc-300' />
					<span className='font-medium'>Free Shipping</span>
					<span className='text-[10px] text-gray-400'>On orders over $100</span>
				</div>
				<div className='flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-zinc-900'>
					<ShieldCheck size={18} className='text-zinc-700 dark:text-zinc-300' />
					<span className='font-medium'>Authentic</span>
					<span className='text-[10px] text-gray-400'>100% Guaranteed</span>
				</div>
				<div className='flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-zinc-900'>
					<RefreshCw size={18} className='text-zinc-700 dark:text-zinc-300' />
					<span className='font-medium'>Free Returns</span>
					<span className='text-[10px] text-gray-400'>Within 30 days</span>
				</div>
			</div>
		</div>
	)
}

export default Details
