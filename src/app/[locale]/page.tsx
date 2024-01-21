import TranslationsProvider from '@/components/translation/translationsProvider'
import initTranslations from '../i18n'
import Hero from '@/components/hero'
import CardsSlider from '@/components/cardsSlider'

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
			</main>
		</TranslationsProvider>
	)
}
