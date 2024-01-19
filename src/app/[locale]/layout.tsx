import type { Metadata } from 'next'
import {Jost } from 'next/font/google'
import { ReactNode } from 'react';
import './globals.css'
import i18nConfig from '@/i18nConfig'
import { dir } from 'i18next';

const jost = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={jost.className}>{children}</body>
    </html>
  )
}
