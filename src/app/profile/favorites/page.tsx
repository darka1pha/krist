import CardsGrid from '@/components/cardsGrid'
import ProductCard from '@/components/elements/productCard'
import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
import { cache } from 'react'
import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'

interface FavoriteItem {
	id: number
	liked: boolean
	user_id: string
	products: Tables<'products'> | null
}

const getFavorites = cache(async () => {
	const supabase = await createClient()
	const { data } = await supabase.from('favorites').select(
		`
  *,
  products (*)
  `
	)
	return (data as unknown as FavoriteItem[]) || []
})

const Favorites = async () => {
	const favorites = await getFavorites()

	return (
		<div className='w-full'>
			<div className='flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6'>
				<div>
					<h1 className='text-3xl font-extrabold tracking-tight'>Wishlist</h1>
					<p className='text-sm text-gray-500 mt-1'>
						{favorites.length} saved {favorites.length === 1 ? 'item' : 'items'}
					</p>
				</div>
				<Link
					href='/products'
					className='text-sm font-medium text-primary-500 hover:underline flex items-center gap-1'>
					Discover more <ArrowRight size={16} />
				</Link>
			</div>

			{favorites.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-16 text-center bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800'>
					<div className='w-14 h-14 rounded-full bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-3 text-red-500'>
						<Heart size={28} />
					</div>
					<h2 className='text-lg font-bold mb-1'>Your wishlist is empty</h2>
					<p className='text-gray-500 text-sm max-w-sm mb-5'>
						Save your favorite pieces by clicking the heart icon on any product card.
					</p>
					<Link href='/products'>
						<button className='btn-primary px-6 py-2.5 text-sm font-semibold'>
							Explore Products
						</button>
					</Link>
				</div>
			) : (
				<CardsGrid>
					{favorites.map((fav, index) =>
						fav.products ? (
							<ProductCard key={fav.id || index} product={fav.products} />
						) : null
					)}
				</CardsGrid>
			)}
		</div>
	)
}

export default Favorites
