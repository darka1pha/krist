import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import Avatar from './avatar'
import InfoForm from './infoForm'
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'
import { cache } from 'react'

const getProfile = cache(async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	return await supabase.from('profiles').select('*').single()
})

const PersonalInfo = async ({ locale }: { locale: string }) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data } = await getProfile()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return (
		<div className='col-span-9'>
			<Avatar name={data?.name} avatarUrl={data?.avatar_url} />
			<InfoForm
				name={data?.name}
				address={data?.address}
				email={user?.email}
				locale={locale}
			/>
		</div>
	)
}

export default PersonalInfo
