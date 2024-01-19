import i18nConfig from '@/i18nConfig'
import { i18nRouter } from 'next-i18n-router'

import { NextFetchEvent, NextRequest } from 'next/server'
import { CustomMiddleware } from './chain'

export function withTranslation(middleware: CustomMiddleware) {
	return async (req: NextRequest, event: NextFetchEvent) => {
		const res = i18nRouter(req, i18nConfig)
		return middleware(req, event, res)
	}
}
