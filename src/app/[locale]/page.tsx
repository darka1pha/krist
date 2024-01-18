import TranslationsProvider from '@/components/translation/translationsProvider'
import initTranslations from '../i18n'
import LanguageChanger from '@/components/translation/languageChanger'

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
			<main className='flex min-h-screen flex-col items-center justify-between p-24'>
				<LanguageChanger />
				<p className='text-white text-lg'>{t('hello')}</p>
			</main>
		</TranslationsProvider>
	)
}
