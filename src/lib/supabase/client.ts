import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

export function createClient() {
	const supabaseUrl =
		process.env.NEXT_PUBLIC_SUPABASE_URL ||
		'https://swavffutisgneenuzdoh.supabase.co'
	const supabaseKey =
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder'

	return createBrowserClient<Database>(supabaseUrl, supabaseKey)
}
