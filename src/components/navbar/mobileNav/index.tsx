'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Layers, Gem, Glasses, Briefcase, ArrowRight } from 'lucide-react'

export default function MobileNav() {
	const [isOpen, setIsOpen] = useState(false)

	const close = () => setIsOpen(false)

	return (
		<div className='md:hidden'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Toggle navigation menu'
				className='p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors'>
				{isOpen ? <X size={20} /> : <Menu size={20} />}
			</button>

			{isOpen && (
				<div className='fixed inset-x-0 top-20 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-zinc-800/80 p-6 z-50 shadow-2xl animate-in slide-in-from-top-2 duration-200'>
					<nav className='space-y-4'>
						<div className='space-y-2'>
							<Link
								href='/'
								onClick={close}
								className='block text-base font-semibold text-zinc-900 dark:text-zinc-100 py-1.5'>
								Home
							</Link>
							<Link
								href='/products'
								onClick={close}
								className='block text-base font-semibold text-zinc-900 dark:text-zinc-100 py-1.5'>
								Shop All Products
							</Link>
							<Link
								href='/contact-us'
								onClick={close}
								className='block text-base font-semibold text-zinc-900 dark:text-zinc-100 py-1.5'>
								Contact Concierge
							</Link>
						</div>

						{/* Categories Section */}
						<div className='pt-4 border-t border-gray-100 dark:border-zinc-800 space-y-3'>
							<div className='flex items-center justify-between'>
								<span className='text-xs font-bold uppercase tracking-wider text-zinc-400'>
									Departments
								</span>
								<Link
									href='/categories'
									onClick={close}
									className='text-xs font-semibold text-primary-500 hover:underline flex items-center gap-1'>
									<span>View All</span>
									<ArrowRight size={12} />
								</Link>
							</div>

							<div className='grid grid-cols-1 gap-2'>
								<Link
									href='/categories/jewelry'
									onClick={close}
									className='flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200'>
									<Gem size={16} className='text-amber-500' />
									<span>Jewelry</span>
								</Link>
								<Link
									href='/categories/accessories'
									onClick={close}
									className='flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200'>
									<Glasses size={16} className='text-amber-500' />
									<span>Accessories</span>
								</Link>
								<Link
									href='/categories/handbags'
									onClick={close}
									className='flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-zinc-900 text-sm font-medium text-zinc-800 dark:text-zinc-200'>
									<Briefcase size={16} className='text-amber-500' />
									<span>Handbags</span>
								</Link>
							</div>
						</div>
					</nav>
				</div>
			)}
		</div>
	)
}
