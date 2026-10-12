'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'

const Footer = () => {
	return (
		<footer className='w-full border-t border-gray-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950 mt-24 text-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='grid grid-cols-12 gap-10 lg:gap-12'>
					{/* Brand Column */}
					<div className='col-span-12 md:col-span-4 space-y-4'>
						<Link href='/' className='inline-block'>
							<div className='relative h-8 w-24'>
								<Image
									src='/images/logo.svg'
									alt='Krist Logo'
									fill
									className='object-contain dark:invert'
								/>
							</div>
						</Link>
						<p className='text-gray-500 text-sm leading-relaxed max-w-sm'>
							Elevate your everyday style with Krist. Curated couture accessories, timeless jewelry, and signature designer accents.
						</p>
						<div className='flex items-center gap-3 pt-2 text-zinc-600 dark:text-zinc-400'>
							{/* Instagram */}
							<a
								href='https://instagram.com'
								target='_blank'
								rel='noreferrer'
								aria-label='Instagram'
								className='w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'>
								<svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
									<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
								</svg>
							</a>
							{/* Twitter / X */}
							<a
								href='https://twitter.com'
								target='_blank'
								rel='noreferrer'
								aria-label='Twitter'
								className='w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'>
								<svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
									<path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
								</svg>
							</a>
							{/* Facebook */}
							<a
								href='https://facebook.com'
								target='_blank'
								rel='noreferrer'
								aria-label='Facebook'
								className='w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'>
								<svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
									<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
								</svg>
							</a>
						</div>
					</div>

					{/* Navigation Links */}
					<div className='col-span-6 md:col-span-2 space-y-3'>
						<h4 className='text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100'>
							Collections
						</h4>
						<ul className='space-y-2.5 text-gray-500'>
							<li>
								<Link href='/categories' className='hover:text-black dark:hover:text-white transition-colors'>
									All Categories
								</Link>
							</li>
							<li>
								<Link href='/categories/jewelry' className='hover:text-black dark:hover:text-white transition-colors'>
									Fine Jewelry
								</Link>
							</li>
							<li>
								<Link href='/categories/handbags' className='hover:text-black dark:hover:text-white transition-colors'>
									Designer Handbags
								</Link>
							</li>
							<li>
								<Link href='/categories/accessories' className='hover:text-black dark:hover:text-white transition-colors'>
									Modern Accessories
								</Link>
							</li>
							<li>
								<Link href='/products' className='hover:text-black dark:hover:text-white transition-colors'>
									Complete Catalog
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Care */}
					<div className='col-span-6 md:col-span-2 space-y-3'>
						<h4 className='text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100'>
							Customer Care
						</h4>
						<ul className='space-y-2.5 text-gray-500'>
							<li>
								<Link href='/contact-us' className='hover:text-black dark:hover:text-white transition-colors'>
									Contact Concierge
								</Link>
							</li>
							<li>
								<Link href='/profile/orders' className='hover:text-black dark:hover:text-white transition-colors'>
									Order Status
								</Link>
							</li>
							<li>
								<Link href='/contact-us' className='hover:text-black dark:hover:text-white transition-colors'>
									Shipping & Returns
								</Link>
							</li>
							<li>
								<Link href='/contact-us' className='hover:text-black dark:hover:text-white transition-colors'>
									Private Appointments
								</Link>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div className='col-span-12 md:col-span-4 space-y-3'>
						<div className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100'>
							<Sparkles size={14} className='text-amber-500' />
							<span>The Krist Salon</span>
						</div>
						<p className='text-gray-500 text-sm'>
							Subscribe to receive invitations to private sales and preview new capsule collections.
						</p>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								alert('Thank you for joining our private salon.')
							}}
							className='flex items-center gap-2 pt-1'>
							<input
								type='email'
								required
								placeholder='Enter your email address'
								className='input bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-sm py-2.5 flex-1'
							/>
							<button
								type='submit'
								aria-label='Subscribe'
								className='btn-primary px-4 py-2.5 shrink-0 flex items-center justify-center'>
								<ArrowRight size={16} />
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t border-gray-200/60 dark:border-zinc-800/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400'>
					<p>&copy; {new Date().getFullYear()} Krist Inc. All rights reserved.</p>
					<div className='flex items-center gap-6'>
						<span className='hover:underline cursor-pointer'>Privacy Policy</span>
						<span className='hover:underline cursor-pointer'>Terms of Service</span>
						<span className='hover:underline cursor-pointer'>Cookie Settings</span>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
