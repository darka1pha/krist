import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import i18nConfig from '@/i18nConfig'
import { dir } from 'i18next'
import Navbar from '@/components/navbar'

const jost = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Krist | Elevate Your Style, Accentuate Your Elegance',
	description:
		'Discover exquisite accessories at Krist - where style meets sophistication. Explore a curated collection of fashion-forward pieces designed to elevate your look. Find the perfect accents to express your unique taste and embrace a world of timeless elegance with Krist.',
	twitter: {
		card: 'summary_large_image',
	},
}

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }))
}

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: ReactNode
	params: { locale: string }
}) {
	return (
		<html data-theme='light' className='dark' lang={locale}>
			<body className={jost.className}>
				<Navbar locale={locale} />
				{children}
			</body>
		</html>
	)
}
