import TranslationsProvider from '@/components/translation/translationsProvider'
import initTranslations from '../i18n'
import Hero from '@/components/hero'
import CardsSlider from '@/components/cardsSlider'
import CardsGrid from '@/components/cardsGrid'
import { ProductCard } from '@/components/elements'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import { Metadata } from 'next'

const i18nNamespaces = ['home']

export const metadata: Metadata = {
	title: 'Krist | Elevate Your Style, Accentuate Your Elegance',
	description:
		'Discover exquisite accessories at Krist - where style meets sophistication. Explore a curated collection of fashion-forward pieces designed to elevate your look. Find the perfect accents to express your unique taste and embrace a world of timeless elegance with Krist.',
}

export default async function Home({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces)
	const supabase = createServerComponentClient<Database>({ cookies })

	const categories = await supabase.from('categories').select('*')

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}>
			<main>
				<Hero />
				<CardsSlider data={categories.data} />
				<div className='flex justify-center items-center flex-col mt-24'>
					<h1 className='text-3xl md:text-5xl font-bold'>Our Best Sellers</h1>
					<CardsGrid>
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</CardsGrid>
				</div>
			</main>
		</TranslationsProvider>
	)
}
