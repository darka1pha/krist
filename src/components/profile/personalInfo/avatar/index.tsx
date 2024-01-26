import { Avatar as Profile } from '@mui/material'
import { Edit2 } from 'iconsax-react'
const Avatar = ({
	name,
	avatarUrl,
}: {
	name: string | undefined
	avatarUrl: string | undefined | null
}) => {
	return (
		<div className='mb-10 w-fit relative'>
			<Profile className='h-20 w-20' src={avatarUrl} alt={name} />
			<button className='h-8 w-8 rounded-xl flex justify-center items-center bg-primary-500 absolute -bottom-2 -right-2'>
				<Edit2 size={15} className='text-white' />
			</button>
		</div>
	)
}

export default Avatar
