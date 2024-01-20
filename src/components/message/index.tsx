'use client'

import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export default function Message() {
	const searchParams = useSearchParams()
	const error = searchParams.get('error')
	const message = searchParams.get('message')
	return (
		<AnimatePresence mode='wait' initial>
			{error && (
				<motion.p
					key='error'
					initial={{ x: 1050, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{
						duration: 0.3,
						type: 'spring',
					}}
					exit={{ x: 1050, opacity: 0 }}
					className='mt-4 p-4 bg-red-500 text-neutral-300 text-center rounded-xl '>
					{error}
				</motion.p>
			)}
			{message && (
				<motion.p
					key='message'
					initial={{ x: 1050, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{
						duration: 0.3,
						type: 'spring',
					}}
					exit={{ x: 1050, opacity: 0 }}
					className='mt-4 p-4 bg-red-500 text-neutral-300 text-center rounded-xl '>
					{message}
				</motion.p>
			)}
		</AnimatePresence>
	)
}
