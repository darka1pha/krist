'use client'
import { LogoutCurve, Profile, Star1 } from 'iconsax-react'
import { User } from '@supabase/supabase-js'
import { MouseEvent, useState } from 'react'
import { Avatar, Box, Divider, IconButton, Menu, Tooltip } from '@mui/material'
import LogoutButton from './logoutButton'
import Link from 'next/link'

export default function AccountMenu({ user }: { user: User }) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title='Account'>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}>
						<Avatar sx={{ width: 32, height: 32 }}>
							{user.email?.charAt(0).toUpperCase()}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
				<Link href={'/profile'}>
					<div className='list-item' onClick={handleClose}>
						<Profile className='mr-2' />
						<p className='text-lg'>Profile</p>
					</div>
				</Link>
				<Link href={'/profile/favorites'}>
					<div className='list-item' onClick={handleClose}>
						<Star1 className='mr-2' /> <p className='text-lg'>Favorites</p>
					</div>
				</Link>
				<Divider />
				<div className='logout' onClick={handleClose}>
					<form
						className='w-full h-full flex p-0'
						action='/api/auth/sign-out'
						method='post'>
						<LogoutButton className='w-full h-full p-2'>
							<div className='flex items-center'>
								<LogoutCurve className='mr-2' fontSize='small' />
								<p className=''>Logout</p>
							</div>
						</LogoutButton>
					</form>
				</div>
			</Menu>
		</>
	)
}
