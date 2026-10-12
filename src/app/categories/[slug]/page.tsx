import {
	getCategoryBySlug,
	getProducts,
} from '@/actions/pdoducts'
import CardsGrid from '@/components/cardsGrid'
import ProductCard from '@/components/elements/productCard'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
	Sparkles,
	SlidersHorizontal,
	ArrowLeft,
	ShoppingBag,
	ChevronRight,
	Layers,
} from 'lucide-react'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const category = await getCategoryBySlug(slug)

	if (!category) {
		return {
			title: 'Category Not Found | Krist',
		}
	}

	return {
		title: `${category.name} Collection | Krist`,
		description:
			category.description ||
			`Explore handcrafted luxury ${category.name} from Krist Atelier.`,
		openGraph: {
			title: `${category.name} Collection | Krist`,
			description:
				category.description ||
				`Explore handcrafted luxury ${category.name} from Krist Atelier.`,
			images: category.poster_url ? [{ url: category.poster_url }] : [],
		},
	}
}

export const dynamic = 'force-dynamic'

export default async function CategoryDetailPage({
	params,
	searchParams,
}: {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const { slug } = await params
	const resolvedSearchParams = (await searchParams) || {}
	const subParam =
		typeof resolvedSearchParams.sub === 'string'
			? resolvedSearchParams.sub
			: undefined

	const category = await getCategoryBySlug(slug)

	if (!category) {
		notFound()
	}

	const normalizedCategoryName = category.name || slug
	const products = await getProducts({
		searchParams: {
			category: normalizedCategoryName,
			sub: subParam,
		},
	})

	const productList = Array.isArray(products) ? products : []
	const subcategories = category.subcategories || []

	return (
		<main className='max-w-7xl mx-auto paddings min-h-screen'>
			{/* Breadcrumbs */}
			<nav
				aria-label='Breadcrumb'
				className='flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-6'>
				<Link
					href='/'
					className='hover:text-zinc-950 dark:hover:text-white transition-colors'>
					Home
				</Link>
				<ChevronRight size={13} className='text-zinc-400' />
				<Link
					href='/categories'
					className='hover:text-zinc-950 dark:hover:text-white transition-colors'>
					Categories
				</Link>
				<ChevronRight size={13} className='text-zinc-400' />
				<span className='font-semibold text-zinc-950 dark:text-zinc-100 capitalize'>
					{category.name}
				</span>
				{subParam && (
					<>
						<ChevronRight size={13} className='text-zinc-400' />
						<span className='text-zinc-600 dark:text-zinc-300 font-medium capitalize'>
							{subParam}
						</span>
					</>
				)}
			</nav>

			{/* Category Hero Banner with Light/Dark contrast */}
			<div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-50 via-zinc-100/90 to-amber-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black text-zinc-900 dark:text-white p-8 sm:p-12 mb-10 border border-zinc-200/90 dark:border-zinc-800 shadow-sm dark:shadow-xl transition-colors'>
				<div className='absolute -right-16 -top-16 w-72 h-72 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none' />

				<div className='relative z-10 max-w-3xl'>
					<div className='flex flex-wrap items-center gap-2 mb-4'>
						<Link
							href='/categories'
							className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors shadow-2xs mr-1'>
							<ArrowLeft size={13} />
							<span>All Departments</span>
						</Link>
						<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/20'>
							<Sparkles size={12} className='text-amber-600 dark:text-amber-400' />
							<span>Curated Department</span>
						</span>
					</div>

					<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight capitalize text-zinc-950 dark:text-white'>
						{category.name} Collection
					</h1>

					<p className='text-zinc-700 dark:text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl font-normal'>
						{category.description ||
							'Discover tailored luxury and artisanal excellence. Designed to elevate your everyday presence.'}
					</p>

					{/* Category Meta & Links */}
					<div className='flex flex-wrap items-center gap-4 mt-6 pt-5 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400'>
						<span>
							Showing{' '}
							<strong className='text-zinc-950 dark:text-white font-bold'>
								{productList.length}
							</strong>{' '}
							{productList.length === 1 ? 'piece' : 'pieces'}
						</span>
						<span>•</span>
						<Link
							href={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
							className='inline-flex items-center gap-1.5 text-zinc-900 dark:text-amber-300 hover:underline font-semibold transition-colors'>
							<SlidersHorizontal size={13} />
							<span>Open in Advanced Catalog Filter</span>
						</Link>
					</div>
				</div>
			</div>

			{/* Subcategories Filter Tabs */}
			{subcategories.length > 0 && (
				<div className='flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-zinc-200 dark:border-zinc-800'>
					<Link
						href={`/categories/${encodeURIComponent(slug.toLowerCase())}`}
						className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-2xs ${
							!subParam
								? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
								: 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700'
						}`}>
						All {category.name}
					</Link>

					{subcategories.map((sub) => {
						const subName = sub.name || ''
						const isSubActive =
							subParam?.toLowerCase() === subName.toLowerCase()
						return (
							<Link
								key={sub.id}
								href={`/categories/${encodeURIComponent(slug.toLowerCase())}?sub=${encodeURIComponent(subName.toLowerCase())}`}
								className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-2xs ${
									isSubActive
										? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
										: 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700'
								}`}>
								{subName}
							</Link>
						)
					})}
				</div>
			)}

			{/* Products Section */}
			<section>
				{productList.length === 0 ? (
					<div className='flex flex-col items-center justify-center py-20 text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800'>
						<div className='w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3 text-zinc-500'>
							<ShoppingBag size={28} />
						</div>
						<h2 className='text-lg font-bold mb-1 text-zinc-950 dark:text-white'>
							No pieces in this subcategory
						</h2>
						<p className='text-zinc-600 dark:text-zinc-400 text-sm max-w-sm mb-5'>
							We couldn’t find any products in {subParam || 'this filter'}. Browse
							all pieces in {category.name}.
						</p>
						<Link
							href={`/categories/${encodeURIComponent(slug.toLowerCase())}`}>
							<button className='btn-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider'>
								View All {category.name}
							</button>
						</Link>
					</div>
				) : (
					<CardsGrid>
						{productList.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</CardsGrid>
				)}
			</section>
		</main>
	)
}
