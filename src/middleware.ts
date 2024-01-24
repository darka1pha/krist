import { chain } from './middleware/chain'
import { withAuth } from './middleware/auth'
import { withTranslation } from './middleware/translation'

export default chain([withAuth])

// only applies this middleware to files in the app directory
export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
