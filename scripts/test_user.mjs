import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eqzhxlsoptcmlohjlbpc.supabase.co'
const supabaseKey = 'sb_publishable_xlGFqGc5wXP58OCJIKYxvw_T5gS3NFX'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkUser() {
  console.log('Testing sign-in with customer@krist.com / Password123! ...')
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'customer@krist.com',
    password: 'Password123!'
  })

  console.log('Auth result:', authData?.user ? `User found: ${authData.user.id} (${authData.user.email})` : 'No user')
  if (authError) {
    console.log('Auth Error:', authError.message)
  }

  const { data: usersView, error: viewError } = await supabase.from('users').select('*')
  console.log('Users in public.users view:', usersView, 'View Error:', viewError?.message)
}

checkUser()
