// import { chain } from './middleware/chain'
// import { withAuth } from './middleware/auth'
// import { withTranslation } from './middleware/translation'

// export default chain([withAuth, withTranslation])

// export const config = {
// 	matcher: '/((?!api|static|.*\\..*|_next).*)',
// }

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { Database } from './types/supabase'

export async function middleware(req: NextRequest) {
	const res = NextResponse.next()
	const supabase = createMiddlewareClient<Database>({ req, res })
	await supabase.auth.getSession()
	return res
}
