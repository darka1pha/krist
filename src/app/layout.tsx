import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'
import i18nConfig from '@/i18nConfig'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const jost = Jost({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
})

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://krist.app'),
	title: {
		default: 'Krist | Elevate Your Style, Accentuate Your Elegance',
		template: '%s | Krist',
	},
	description:
		'Discover exquisite accessories at Krist - where style meets sophistication. Explore a curated collection of fashion-forward pieces designed to elevate your look.',
	twitter: {
		card: 'summary_large_image',
	},
}

export function generateStaticParams() {
	return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
	children,
	params,
}: {
	children: ReactNode
	params?: Promise<{ locale?: string }>
}) {
	const resolvedParams = params ? await params : undefined
	const locale = resolvedParams?.locale || 'en'

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								try {
									var t = localStorage.getItem('theme');
									var root = document.documentElement;
									if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
										root.classList.add('dark');
										root.setAttribute('data-theme', 'dark');
									} else {
										root.classList.remove('dark');
										root.setAttribute('data-theme', 'light');
									}
								} catch (e) {}
							})();
						`,
					}}
				/>
			</head>
			<body
				className={`${jost.className} min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white dark:bg-zinc-950 dark:text-zinc-100 dark:selection:bg-white dark:selection:text-zinc-950 transition-colors duration-200`}>
				<Navbar locale={locale} />
				<div className='flex-1'>{children}</div>
				<Footer />
			</body>
		</html>
	)
}
