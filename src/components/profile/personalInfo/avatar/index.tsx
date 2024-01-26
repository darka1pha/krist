import { Avatar as Profile } from '@mui/material'
import { Edit2 } from 'iconsax-react'
import Link from 'next/link'
const Avatar = ({
	name,
	avatarUrl,
}: {
	name: string | undefined
	avatarUrl: string | undefined | null
}) => {
	return (
		<div className='mb-10 flex justify-between items-center'>
			<div className='relative w-fit'>
				<Profile className='h-20 w-20' src={avatarUrl || ''} alt={name} />
				<button className='h-8 w-8 rounded-xl flex justify-center items-center bg-primary-500 absolute -bottom-2 -right-2'>
					<Edit2 size={15} className='text-white' />
				</button>
			</div>
			<div>
				<Link href={'/profile?edit=true'}>
					<button className='flex btn-primary items-center'>
						<Edit2 size={18} className='text-white mr-2' />
						Edit Profile
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Avatar
