import TranslationsProvider from '@/components/translation/translationsProvider'
import initTranslations from '../i18n'
import Hero from '@/components/hero'
import CardsSlider from '@/components/cardsSlider'
import CardsGrid from '@/components/cardsGrid'
import { ProductCard } from '@/components/elements'

const i18nNamespaces = ['home']

export default async function Home({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const { t, resources } = await initTranslations(locale, i18nNamespaces)
	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}>
			<main>
				<Hero />
				<CardsSlider />
				<div className='flex justify-center items-center flex-col mt-24'>
					<h1 className='text-5xl font-bold'>Our Best Sellers</h1>
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
