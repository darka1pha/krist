import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

const supabaseUrl =
	process.env.NEXT_PUBLIC_SUPABASE_URL ||
	'https://eqzhxlsoptcmlohjlbpc.supabase.co'
const supabaseKey =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	'sb_publishable_xlGFqGc5wXP58OCJIKYxvw_T5gS3NFX'

export const createClient = () =>
	createBrowserClient<Database>(supabaseUrl!, supabaseKey!)
