'use client'

import React from 'react'
import Image from 'next/image'
import { Sparkles, ShieldCheck } from 'lucide-react'

interface HeaderProps {
	name?: string
	email?: string
	avatarUrl?: string | null
}

const Header = ({ name, email, avatarUrl }: HeaderProps) => {
	const displayName = name?.trim() || 'VIP Client'
	const initial = displayName.charAt(0).toUpperCase()
	const isValidAvatar = avatarUrl && avatarUrl !== './' && !avatarUrl.startsWith('./')

	return (
		<div className='relative overflow-hidden p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-sm dark:shadow-xl transition-all duration-200'>
			{/* Decorative ambient glow */}
			<div className='absolute -right-6 -top-6 w-24 h-24 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-2xl pointer-events-none' />

			<div className='relative z-10 flex items-center gap-4'>
				{/* Avatar */}
				<div className='relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-zinc-200/90 dark:border-zinc-700/80 shadow-xs'>
					{isValidAvatar ? (
						<Image
							src={avatarUrl}
							alt={displayName}
							fill
							sizes='56px'
							className='object-cover'
						/>
					) : (
						<div className='w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 text-white dark:text-zinc-950 flex items-center justify-center font-bold text-lg font-serif'>
							{initial}
						</div>
					)}
					{/* Online status indicator */}
					<span className='absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900' />
				</div>

				{/* User Details */}
				<div className='flex-1 min-w-0'>
					<div className='inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1 border border-amber-400/20'>
						<Sparkles size={10} className='text-amber-600 dark:text-amber-400' />
						<span>Atelier VIP</span>
					</div>

					<h2 className='text-base font-extrabold tracking-tight text-zinc-950 dark:text-white truncate'>
						{displayName}
					</h2>

					{email && (
						<p className='text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5 font-medium'>
							{email}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
