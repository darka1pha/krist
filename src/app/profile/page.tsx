import { Menu, PersonalInfo } from '@/components/profile'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Profile = async ({
	params: { locale },
}: {
	params: { locale: string }
}) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { data } = await supabase.from('profiles').select('*').single()

	return (
		<div>
			<PersonalInfo />
		</div>
	)
}

export default Profile
