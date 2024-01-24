import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Profile = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data } = await supabase.from('profiles').select('*').single()

	console.log(data?.name)

	return (
		<main className='flex justify-center items-center min-h-screen w-full'>
			{user ? (
				<h1 className='text-2xl md:text-5xl font-bold'>
					Welcome Dear {data?.name}
				</h1>
			) : (
				<h1 className='text-2xl md:text-5xl font-bold'>
					Please Sign in to your account
				</h1>
			)}{' '}
		</main>
	)
}

export default Profile
