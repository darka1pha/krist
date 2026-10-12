import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { Database } from '@/types/supabase'

const supabaseUrl =
	process.env.NEXT_PUBLIC_SUPABASE_URL ||
	'https://eqzhxlsoptcmlohjlbpc.supabase.co'
const supabaseKey =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	'sb_publishable_xlGFqGc5wXP58OCJIKYxvw_T5gS3NFX'

export const createClient = (request: NextRequest) => {
	// Create an unmodified response
	let supabaseResponse = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClient<Database>(supabaseUrl!, supabaseKey!, {
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

	return { supabase, response: supabaseResponse }
}

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClient<Database>(supabaseUrl!, supabaseKey!, {
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

	// Refresh session if expired - IMPORTANT: getUser() validates token against Supabase Auth
	const {
		data: { user },
	} = await supabase.auth.getUser()

	// Route protection for user profile
	if (
		request.nextUrl.pathname.startsWith('/profile') &&
		!user
	) {
		const url = request.nextUrl.clone()
		url.pathname = '/auth/sign-in'
		return NextResponse.redirect(url)
	}

	return supabaseResponse
}
