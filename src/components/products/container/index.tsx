import CardsGrid from '@/components/cardsGrid'
import ProductCard from '@/components/elements/productCard'
import { Tables } from '@/types/supabase'
import Link from 'next/link'
import { Sparkles, ShoppingBag } from 'lucide-react'

const Container = ({ products }: { products: Tables<'products'>[] | null }) => {
	const count = products?.length || 0

	return (
		<div className='col-span-12 md:col-span-9'>
			<div className='flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-gray-100 dark:border-zinc-800 gap-4'>
				<div>
					<h1 className='text-3xl font-extrabold tracking-tight'>
						Shop Collection
					</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Showing {count} {count === 1 ? 'piece' : 'exquisite pieces'}
					</p>
				</div>
				<div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-gray-600 dark:text-gray-300'>
					<Sparkles size={13} className='text-amber-500' />
					<span>Verified Authentic</span>
				</div>
			</div>

			{count === 0 ? (
				<div className='flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800'>
					<div className='w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3 text-zinc-500'>
						<ShoppingBag size={28} />
					</div>
					<h2 className='text-lg font-bold mb-1'>No products match your filter</h2>
					<p className='text-gray-500 text-sm max-w-sm mb-5'>
						Try adjusting or clearing your category filters to view our full collection.
					</p>
					<Link href='/products'>
						<button className='btn-primary px-6 py-2.5 text-sm font-semibold'>
							Clear All Filters
						</button>
					</Link>
				</div>
			) : (
				<CardsGrid>
					{products?.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</CardsGrid>
			)}
		</div>
	)
}

export default Container
