import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eqzhxlsoptcmlohjlbpc.supabase.co'
const supabaseKey = 'sb_publishable_xlGFqGc5wXP58OCJIKYxvw_T5gS3NFX'

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
	try {
		console.log('Querying categories...')
		const { data: cat, error: ce } = await supabase.from('categories').select('*')
		console.log('Categories result:', { data: cat, error: ce })

		console.log('Querying subcategories...')
		const { data: sub, error: se } = await supabase.from('subcategories').select('*')
		console.log('Subcategories result:', { data: sub, error: se })

		console.log('Querying products...')
		const { data: prod, error: pe } = await supabase.from('products').select('*')
		console.log('Products result:', { data: prod, error: pe })

		console.log('Querying profiles...')
		const { data: prof, error: pre } = await supabase.from('profiles').select('*')
		console.log('Profiles result:', { data: prof, error: pre })
	} catch (err) {
		console.error('Exception:', err)
	}
}

run()
