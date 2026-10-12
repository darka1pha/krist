import { createClient } from '@/utils/supabase/server'
import Avatar from './avatar'
import InfoForm from './infoForm'
import { cache } from 'react'

const getProfile = cache(async () => {
	const supabase = await createClient()
	return await supabase.from('profiles').select('*').maybeSingle()
})

const PersonalInfo = async ({ locale }: { locale: string }) => {
	const supabase = await createClient()
	const { data } = await getProfile()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return (
		<div className='w-full space-y-6'>
			<Avatar name={data?.name || ''} avatarUrl={data?.avatar_url || ''} />
			<InfoForm
				name={data?.name}
				address={data?.address}
				email={user?.email}
				locale={locale || 'en'}
			/>
		</div>
	)
}

export default PersonalInfo
