'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function ProfileTabTransition({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()

	return (
		<div className='col-span-12 md:col-span-8 lg:col-span-9 w-full'>
			<AnimatePresence mode='wait' initial={false}>
				<motion.div
					key={pathname}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
					className='w-full'>
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
