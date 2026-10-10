import { Avatar as Profile } from '@mui/material'
import { Pencil } from 'lucide-react'
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
				<Profile
					sx={{ height: 64, width: 64 }}
					src={avatarUrl || ''}
					alt={name}
				/>
				<Link href={'/profile?edit=true'}>
					<button
						type='button'
						name='edit profile'
						aria-label='Edit avatar'
						className='h-8 w-8 rounded-full flex justify-center items-center bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 absolute -bottom-1 -right-1 shadow-md hover:scale-105 transition-transform'>
						<Pencil size={14} />
					</button>
				</Link>
			</div>
			<div>
				<Link href={'/profile?edit=true'}>
					<button
						type='button'
						name='edit information'
						className='flex btn-primary items-center gap-2 text-sm'>
						<Pencil size={16} />
						<span>Edit Profile</span>
					</button>
				</Link>
			</div>
		</div>
	)
}

export default Avatar
