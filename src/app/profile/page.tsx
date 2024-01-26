import { PersonalInfo } from '@/components/profile'

const Profile = async ({
	params: { locale },
}: {
	params: { locale: string }
}) => {
	return (
		<div className='col-span-9'>
			<PersonalInfo locale={locale} />
		</div>
	)
}

export default Profile
