'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
	User,
	Heart,
	Package,
	MapPin,
	LogOut,
	ChevronRight,
} from 'lucide-react'
import { signOutAction } from '@/actions/auth/sign-out'

interface NavItem {
	label: string
	url: string
	icon: React.ComponentType<{ size?: number; className?: string }>
	badge?: string
}

const navItems: NavItem[] = [
	{
		label: 'Personal Information',
		url: '/profile',
		icon: User,
	},
	{
		label: 'Wishlist & Favorites',
		url: '/profile/favorites',
		icon: Heart,
	},
	{
		label: 'Order History',
		url: '/profile/orders',
		icon: Package,
	},
	{
		label: 'Saved Addresses',
		url: '/profile/addresses',
		icon: MapPin,
	},
]

export default function ProfileNav() {
	const pathname = usePathname()

	return (
		<div className='flex flex-col gap-2 p-2 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm dark:shadow-xl transition-colors duration-200'>
			{/* Navigation Tabs */}
			<nav aria-label='Account navigation' className='flex flex-col gap-1'>
				{navItems.map((item) => {
					const Icon = item.icon
					const isActive = pathname === item.url

					return (
						<Link
							key={item.url}
							href={item.url}
							className='relative group flex items-center justify-between px-4 py-3 rounded-2xl transition-colors select-none'>
							{/* Sliding Active Pill Background Animation */}
							{isActive && (
								<motion.div
									layoutId='active-profile-pill'
									className='absolute inset-0 bg-zinc-950 dark:bg-white rounded-2xl shadow-sm z-0'
									transition={{
										type: 'spring',
										stiffness: 400,
										damping: 32,
									}}
								/>
							)}

							{/* Inactive Hover Indicator */}
							{!isActive && (
								<div className='absolute inset-0 rounded-2xl transition-colors group-hover:bg-zinc-100/70 dark:group-hover:bg-zinc-800/50 z-0' />
							)}

							{/* Item Label & Icon */}
							<div
								className={`relative z-10 flex items-center gap-3 transition-colors duration-150 ${
									isActive
										? 'text-white dark:text-zinc-950 font-bold'
										: 'text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white font-medium'
								}`}>
								<div
									className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
										isActive
											? 'bg-white/10 dark:bg-zinc-950/10 text-white dark:text-zinc-950'
											: 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700/80 group-hover:text-zinc-950 dark:group-hover:text-white'
									}`}>
									<Icon size={16} />
								</div>
								<span className='text-xs sm:text-sm tracking-tight'>
									{item.label}
								</span>
							</div>

							{/* Arrow indicator */}
							<ChevronRight
								size={14}
								className={`relative z-10 transition-transform duration-200 ${
									isActive
										? 'text-white/70 dark:text-zinc-950/70 translate-x-0.5'
										: 'text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
								}`}
							/>
						</Link>
					)
				})}
			</nav>

			{/* Divider */}
			<div className='my-1 border-t border-zinc-100 dark:border-zinc-800/80' />

			{/* Sign Out Button */}
			<form action={signOutAction} className='w-full'>
				<button
					type='submit'
					className='w-full group flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/30 transition-all cursor-pointer'>
					<div className='w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-900/40 text-zinc-500 dark:text-zinc-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors'>
						<LogOut size={15} />
					</div>
					<span>Sign Out of Account</span>
				</button>
			</form>
		</div>
	)
}
