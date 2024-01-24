import { chain } from './middleware/chain'
import { withAuth } from './middleware/auth'
import { withTranslation } from './middleware/translation'

export default chain([withAuth, withTranslation])

export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
}
