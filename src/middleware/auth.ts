import { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { CustomMiddleware } from './chain'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export function withAuth(middleware: CustomMiddleware) {
	return async (req: NextRequest, event: NextFetchEvent) => {
		const res = NextResponse.next()
		const supabase = createMiddlewareClient({ req, res })
		await supabase.auth.getSession()
		return middleware(req, event, res)
	}
}
