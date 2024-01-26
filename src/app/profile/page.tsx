import { PersonalInfo } from '@/components/profile'
import EditModal from '@/components/profile/personalInfo/editModal'

const Profile = async ({
	params: { locale },
	searchParams: { edit },
}: {
	params: { locale: string }
	searchParams: { edit: string }
}) => {
	return (
		<div className='col-span-9'>
			<PersonalInfo locale={locale} />
			{edit === 'true' && <EditModal locale={locale} />}
		</div>
	)
}

export default Profile
