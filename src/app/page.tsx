import TranslationsProvider from '@/components/translation/translationsProvider'
import initTranslations from './i18n'
import Hero from '@/components/hero'
import CardsSlider from '@/components/cardsSlider'
import CardsGrid from '@/components/cardsGrid'
import ProductCard from '@/components/elements/productCard'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import {
	getCategories,
	getProducts,
} from '@/actions/pdoducts'

export const dynamic = 'force-dynamic'

const i18nNamespaces = ['home']

export default async function Home({
	params,
}: {
	params?: Promise<{ locale?: string }>
}) {
	const resolvedParams = params ? await params : undefined
	const locale = resolvedParams?.locale || 'en'
	const { t, resources } = await initTranslations(locale, i18nNamespaces)
	const categoriesRes = await getCategories()
	const categories = categoriesRes?.data || []
	const productsData = await getProducts({ searchParams: {} })
	const products = Array.isArray(productsData) ? productsData : []

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}>
			<main className='paddings max-w-7xl mx-auto'>
				<Hero />
				<CardsSlider data={categories || []} />

				{/* Featured Products Section */}
				<section className='mt-20'>
					<div className='flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4'>
						<div>
							<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100/20 text-xs font-semibold uppercase tracking-wider mb-3'>
								<Sparkles size={14} /> Curated Picks
							</div>
							<h2 className='text-3xl md:text-4xl font-extrabold tracking-tight'>
								{t('products_title') || 'Featured Products'}
							</h2>
							<p className='text-gray-500 text-sm mt-1 max-w-md'>
								Handcrafted accessories designed with premium materials to elevate your everyday elegance.
							</p>
						</div>
						<Link
							href='/products'
							className='group inline-flex items-center gap-2 text-sm font-semibold hover:text-primary-400 transition-colors'>
							<span>View All Products</span>
							<ArrowRight
								size={16}
								className='group-hover:translate-x-1 transition-transform'
							/>
						</Link>
					</div>

					<CardsGrid>
						{products.length > 0 ? (
							products.map((product) => (
								<ProductCard key={product.id} product={product} />
							))
						) : (
							<div className='col-span-full py-16 text-center text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800'>
								<p className='text-sm font-medium'>No products found in the database catalog.</p>
							</div>
						)}
					</CardsGrid>
				</section>
			</main>
		</TranslationsProvider>
	)
}
