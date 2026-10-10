import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/types/supabase'

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	})

	const supabaseUrl =
		process.env.NEXT_PUBLIC_SUPABASE_URL ||
		'https://swavffutisgneenuzdoh.supabase.co'
	const supabaseKey =
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder'

	const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll()
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value)
				)
				supabaseResponse = NextResponse.next({
					request,
				})
				cookiesToSet.forEach(({ name, value, options }) =>
					supabaseResponse.cookies.set(name, value, options)
				)
			},
		},
	})

	// Refresh the session if expired - DO NOT REMOVE getUser()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	// Redirect unauthenticated visitors away from protected routes
	// Public routes (such as /instruments, /, /auth, /login) are allowed
	if (
		request.nextUrl.pathname !== '/' &&
		!user &&
		!request.nextUrl.pathname.startsWith('/login') &&
		!request.nextUrl.pathname.startsWith('/auth') &&
		request.nextUrl.pathname !== '/instruments' &&
		!request.nextUrl.pathname.startsWith('/instruments/')
	) {
		// If visiting user-specific protected routes such as /profile
		if (request.nextUrl.pathname.startsWith('/profile')) {
			const url = request.nextUrl.clone()
			url.pathname = '/auth/sign-in'
			return NextResponse.redirect(url)
		}
	}

	return supabaseResponse
}
