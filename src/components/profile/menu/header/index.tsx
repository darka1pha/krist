import { Avatar } from '@mui/material'

const Header = ({ name }: { name: string | undefined }) => {
	return (
		<div className='p-4 border-2 border-gray-300 w-full mt-10 flex items-center rounded-xl'>
			<div>
				<Avatar alt='Abolfazl Omrani' src='./' className='h-16 w-16' />
			</div>
			<div className='ml-4'>
				<p className=''>Hello &#128075;</p>
				<p className='text-2xl font-bold'>{name}</p>
			</div>
		</div>
	)
}

export default Header
