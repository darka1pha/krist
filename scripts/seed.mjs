import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Read .env.local if present
const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...values] = trimmed.split('=')
      process.env[key.trim()] = values.join('=').trim()
    }
  }
}

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://eqzhxlsoptcmlohjlbpc.supabase.co'
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_xlGFqGc5wXP58OCJIKYxvw_T5gS3NFX'

const isServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
console.log(`Connecting to Supabase at: ${supabaseUrl}`)
console.log(`Using key mode: ${isServiceRole ? 'Service Role (Full Admin)' : 'Publishable / Anon'}`)

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  console.log('\n--- 1. Testing Database Connection ---')
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('id, name, poster_url')

  if (catError) {
    if (catError.code === 'PGRST205') {
      console.log('⚠️  Notice: The database tables have not been created yet in Supabase.')
      console.log('\n👉 To create the tables and seed data:')
      console.log('   1. Open the Supabase SQL Editor:')
      console.log(`      https://supabase.com/dashboard/project/eqzhxlsoptcmlohjlbpc/sql/new`)
      console.log('   2. Paste the contents of "supabase/setup_and_seed.sql" and click "Run".')
      console.log('\nAlternatively, provide your project SUPABASE_SERVICE_ROLE_KEY or database connection string.')
      return
    }
    console.error('Error connecting to categories:', catError)
    return
  }

  console.log(`✅ Categories found in database: ${categories?.length || 0}`)
  categories?.forEach((c) => console.log(`   - [ID: ${c.id}] ${c.name} (${c.poster_url})`))

  const { data: subcategories, error: subError } = await supabase
    .from('subcategories')
    .select('id, name, category, poster_url')
  if (subError) {
    console.error('Error fetching subcategories:', subError)
  } else {
    console.log(`✅ Subcategories found in database: ${subcategories?.length || 0}`)
    subcategories?.forEach((s) => console.log(`   - [ID: ${s.id}] ${s.name} (Category: ${s.category})`))
  }

  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('id, name, brand, price, category, images')
  if (prodError) {
    console.error('Error fetching products:', prodError)
  } else {
    console.log(`✅ Products found in database: ${products?.length || 0}`)
    products?.forEach((p) =>
      console.log(`   - [ID: ${p.id}] ${p.name} ($${p.price}) [Image: ${p.images?.[0]}]`)
    )
  }

  console.log('\n🎉 Supabase connection is healthy and verified!')
}

main().catch((err) => {
  console.error('Seed verification script error:', err)
  process.exit(1)
})
