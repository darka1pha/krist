'use server'
import { headers } from 'next/headers'

const getCurrentPathname = async () => {
	const headersList = await headers()
	const domain = headersList.get('x-forwarded-host') || ''
	const protocol = headersList.get('x-forwarded-proto') || ''
	const fullUrl = headersList.get('referer') || ''

	const toRemove = `${protocol}://${domain}`

	return fullUrl.replace(toRemove, '')
}
export default getCurrentPathname
