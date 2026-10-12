'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Sparkles, ArrowRight, Gem, Glasses, Briefcase } from 'lucide-react'

const categories = [
	{
		name: 'Jewelry',
		slug: 'jewelry',
		description: 'Sculptural gold, fine necklaces & signet rings',
		icon: Gem,
	},
	{
		name: 'Accessories',
		slug: 'accessories',
		description: 'Mongolian cashmere stoles & polarized acetate eyewear',
		icon: Glasses,
	},
	{
		name: 'Handbags',
		slug: 'handbags',
		description: 'Full-grain Tuscan calfskin totes & silk satin clutches',
		icon: Briefcase,
	},
]

export default function CategoriesMenu({ label }: { label?: string }) {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div
			ref={menuRef}
			className='relative'
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}>
			<div className='flex items-center gap-1'>
				<Link
					href='/categories'
					className='text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors py-2 flex items-center gap-1'>
					<span>{label || 'Categories'}</span>
					<ChevronDown
						size={14}
						className={`transition-transform duration-200 ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</Link>
			</div>

			{/* Dropdown panel */}
			{isOpen && (
				<div className='absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150'>
					<div className='p-3 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-gray-100 dark:border-zinc-800 shadow-2xl'>
						<div className='flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider'>
							<span className='flex items-center gap-1 text-zinc-800 dark:text-zinc-200 font-bold'>
								<Sparkles size={13} className='text-amber-500' /> Departments
							</span>
							<Link
								href='/categories'
								onClick={() => setIsOpen(false)}
								className='text-[11px] text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors lowercase'>
								view all
							</Link>
						</div>

						<div className='py-1 space-y-1'>
							{categories.map((cat) => {
								const Icon = cat.icon
								return (
									<Link
										key={cat.slug}
										href={`/categories/${cat.slug}`}
										onClick={() => setIsOpen(false)}
										className='group flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/60 transition-colors'>
										<div className='w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors shrink-0'>
											<Icon size={16} />
										</div>
										<div className='flex-1 min-w-0'>
											<h4 className='text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white'>
												{cat.name}
											</h4>
											<p className='text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5'>
												{cat.description}
											</p>
										</div>
									</Link>
								)
							})}
						</div>

						<div className='mt-1 pt-2 border-t border-gray-100 dark:border-zinc-800 px-1'>
							<Link
								href='/categories'
								onClick={() => setIsOpen(false)}
								className='w-full py-2 px-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center justify-between transition-colors'>
								<span>All Collections Showcase</span>
								<ArrowRight size={13} />
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
