'use client'
import { User as UserIcon, Heart, Package, LogOut } from 'lucide-react'
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
				<Tooltip title='Account Menu'>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ ml: 1 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}>
						<Avatar
							sx={{
								width: 36,
								height: 36,
								bgcolor: '#18181b',
								color: '#ffffff',
								fontSize: '14px',
								fontWeight: 700,
							}}>
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
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				slotProps={{
					paper: {
						elevation: 4,
						sx: {
							borderRadius: '16px',
							minWidth: 220,
							p: 1,
							boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
						},
					},
				}}>
				<div className='px-3 py-2 border-b border-gray-100 dark:border-zinc-800 mb-1'>
					<p className='text-xs text-gray-400'>Signed in as</p>
					<p className='text-xs font-bold text-gray-900 dark:text-zinc-100 truncate max-w-[180px]'>
						{user.email}
					</p>
				</div>
				<Link href={'/profile'}>
					<div className='list-item' onClick={handleClose}>
						<UserIcon size={18} className='mr-2.5 text-zinc-600 dark:text-zinc-300' />
						<p className='text-sm font-medium'>My Profile</p>
					</div>
				</Link>
				<Link href={'/profile/favorites'}>
					<div className='list-item' onClick={handleClose}>
						<Heart size={18} className='mr-2.5 text-zinc-600 dark:text-zinc-300' />
						<p className='text-sm font-medium'>Wishlist</p>
					</div>
				</Link>
				<Link href={'/profile/orders'}>
					<div className='list-item' onClick={handleClose}>
						<Package size={18} className='mr-2.5 text-zinc-600 dark:text-zinc-300' />
						<p className='text-sm font-medium'>Orders</p>
					</div>
				</Link>
				<Divider sx={{ my: 0.5 }} />
				<div className='logout' onClick={handleClose}>
					<form
						className='w-full h-full flex p-0'
						action='/api/auth/sign-out'
						method='post'>
						<LogoutButton className='w-full h-full p-1'>
							<div className='flex items-center text-red-600'>
								<LogOut size={18} className='mr-2.5' />
								<p className='text-sm font-medium'>Logout</p>
							</div>
						</LogoutButton>
					</form>
				</div>
			</Menu>
		</>
	)
}
