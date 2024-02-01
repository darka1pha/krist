'use client'
import { cn } from '@/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuButton = ({
	icon,
	name,
	url,
}: {
	icon: React.ReactNode
	name: string
	url: string
}) => {
	const pathname = usePathname()
	return (
		<Link href={url}>
			<button
				name='menu button'
				className={cn(
					'p-4 w-full text-left flex relative rounded-xl overflow-hidden',
					url === pathname ? 'text-white' : ''
				)}>
				{url === pathname && (
					<motion.span
						layoutId='bubble'
						transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
						className='bg-primary-500 rounded-xl h-full w-full absolute top-0 left-0 z-[-1]'
					/>
				)}
				<div className='flex items-center w-full h-full'>
					{icon}
					<p className='ml-2'>{name}</p>
				</div>
			</button>
		</Link>
	)
}

export default MenuButton
