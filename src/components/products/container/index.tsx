import CardsGrid from '@/components/cardsGrid'
import ProductCard from '@/components/elements/productCard'
import { Tables } from '@/types/supabase'
import Link from 'next/link'
import { Sparkles, ShoppingBag, X, ArrowRight, Layers } from 'lucide-react'

const Container = ({
	products,
	activeFilters,
}: {
	products: Tables<'products'>[] | null
	activeFilters?: {
		category?: string
		sub?: string
	}
}) => {
	const count = products?.length || 0
	const category = activeFilters?.category
	const subcategory = activeFilters?.sub

	const capitalize = (str?: string) => {
		if (!str) return ''
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	const title = category
		? `${capitalize(category)} Collection`
		: 'Shop All Collections'

	const subtitle = subcategory
		? `Curated ${capitalize(subcategory)} pieces`
		: category
			? `Discover timeless ${capitalize(category)} designs`
			: 'Explore our complete catalog of luxury accessories, jewelry, and leather goods.'

	return (
		<div className='col-span-12 md:col-span-9'>
			{/* Breadcrumbs for active routing */}
			<nav aria-label='Breadcrumb' className='flex items-center gap-2 text-xs text-gray-400 mb-3'>
				<Link href='/' className='hover:underline text-gray-500'>
					Home
				</Link>
				<span>/</span>
				<Link href='/products' className={!category ? 'font-semibold text-zinc-900 dark:text-zinc-100' : 'hover:underline text-gray-500'}>
					Shop
				</Link>
				{category && (
					<>
						<span>/</span>
						<Link
							href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
							className={!subcategory ? 'font-semibold text-zinc-900 dark:text-zinc-100 hover:underline' : 'hover:underline text-gray-500'}>
							{capitalize(category)}
						</Link>
					</>
				)}
				{subcategory && (
					<>
						<span>/</span>
						<span className='font-semibold text-zinc-900 dark:text-zinc-100'>
							{capitalize(subcategory)}
						</span>
					</>
				)}
			</nav>

			{/* Heading Bar */}
			<div className='flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-zinc-800 gap-4'>
				<div>
					<h1 className='text-3xl font-extrabold tracking-tight capitalize text-zinc-950 dark:text-white'>
						{title}
					</h1>
					<p className='text-sm text-gray-500 mt-1'>{subtitle}</p>
				</div>
				<div className='flex items-center gap-3'>
					{category && (
						<Link
							href={`/categories/${encodeURIComponent(category.toLowerCase())}`}
							className='hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors'>
							<Layers size={13} />
							<span>Showcase Page</span>
							<ArrowRight size={12} />
						</Link>
					)}
					<div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-gray-600 dark:text-gray-300'>
						<Sparkles size={13} className='text-amber-500' />
						<span>{count} {count === 1 ? 'piece' : 'pieces'}</span>
					</div>
				</div>
			</div>

			{/* Active Filter Chips */}
			{(category || subcategory) && (
				<div className='flex flex-wrap items-center gap-2 mb-6 p-3 rounded-xl bg-gray-50 dark:bg-zinc-900/60 border border-gray-100 dark:border-zinc-800'>
					<span className='text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-1'>
						Active Filters:
					</span>

					{category && (
						<Link
							href={
								subcategory
									? `/products?sub=${encodeURIComponent(subcategory)}`
									: '/products'
							}
							className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-red-300 hover:text-red-500 transition-colors shadow-xs'>
							<span>Category: <strong className='capitalize'>{category}</strong></span>
							<X size={12} />
						</Link>
					)}

					{subcategory && (
						<Link
							href={
								category
									? `/products?category=${encodeURIComponent(category)}`
									: '/products'
							}
							className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-red-300 hover:text-red-500 transition-colors shadow-xs'>
							<span>Subcategory: <strong className='capitalize'>{subcategory}</strong></span>
							<X size={12} />
						</Link>
					)}

					<Link
						href='/products'
						className='text-xs font-semibold text-red-500 hover:text-red-700 dark:hover:text-red-400 ml-auto transition-colors'>
						Clear All
					</Link>
				</div>
			)}

			{/* Products Grid or Empty State */}
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
