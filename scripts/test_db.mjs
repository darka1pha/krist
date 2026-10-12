import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eqzhxlsoptcmlohjlbpc.supabase.co'
const supabaseKey = 'sb_publishable_xlGFqGc5wXP58OCJIKYxvw_T5gS3NFX'

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  console.log('Testing connection...')
  const { data: catData, error: catError } = await supabase.from('categories').select('*')
  console.log('Categories:', catData, 'Error:', catError)

  const { data: prodData, error: prodError } = await supabase.from('products').select('*')
  console.log('Products:', prodData, 'Error:', prodError)

  const { data: subData, error: subError } = await supabase.from('subcategories').select('*')
  console.log('Subcategories:', subData, 'Error:', subError)
}

test()
