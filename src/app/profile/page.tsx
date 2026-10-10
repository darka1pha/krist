import { PersonalInfo } from '@/components/profile'
import EditModal from '@/components/profile/personalInfo/editModal'

const Profile = async ({
	params,
	searchParams,
}: {
	params?: Promise<{ locale?: string }>
	searchParams?: Promise<{ edit?: string }>
}) => {
	const resolvedParams = params ? await params : undefined
	const resolvedSearch = searchParams ? await searchParams : undefined
	const locale = resolvedParams?.locale || 'en'
	const edit = resolvedSearch?.edit

	return (
		<div className='col-span-12 md:col-span-8 xl:col-span-9'>
			<PersonalInfo locale={locale} />
			{edit === 'true' && <EditModal locale={locale} />}
		</div>
	)
}

export default Profile
