import TranslationsProvider from '@/components/translation/translationsProvider'
import initTranslations from './i18n'
import Hero from '@/components/hero'
import CardsSlider from '@/components/cardsSlider'
import CardsGrid from '@/components/cardsGrid'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import ProductCard from '@/components/elements/productCard'
import { cache } from 'react'

const i18nNamespaces = ['home']

const getProducts = cache(async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	return await supabase.from('products').select('*').limit(10)
})

const getCategories = cache(async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	return await supabase.from('categories').select('*')
})

export default async function Home({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces)
	const { data: categories, error: categoriesError } = await getCategories()
	const { data: products, error: productsError } = await getProducts()

	if (productsError || categoriesError) {
		throw new Error(productsError?.message ?? categoriesError?.message, {
			cause: productsError?.details || categoriesError?.message,
		})
	}

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}>
			<main className='paddings'>
				<Hero />
				<CardsSlider data={categories} />
				<div className='flex justify-center items-center flex-col mt-24'>
					<h1 className='text-3xl md:text-5xl font-bold'>
						{t('products_title')}
					</h1>
					<CardsGrid>
						{products?.map((product, key) => (
							<ProductCard key={key} product={product} />
						))}
					</CardsGrid>
				</div>
			</main>
		</TranslationsProvider>
	)
}
