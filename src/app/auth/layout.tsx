import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	if (user) redirect('/profile')
	return <>{children}</>
}

export default AuthLayout
