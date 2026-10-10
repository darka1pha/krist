import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

const CartLayout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) redirect('/auth/sign-in')
	return <>{children}</>
}

export default CartLayout
