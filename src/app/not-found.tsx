'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

const NotFound = () => {
	return (
		<div className='min-h-[calc(100vh-120px)] w-full flex flex-col justify-center items-center px-4 py-12 text-center'>
			<div className='relative w-full max-w-md h-64 mb-6'>
				<Image
					src='/images/404.webp'
					alt='404 Not Found'
					fill
					sizes='(max-width: 768px) 100vw, 400px'
					className='object-contain'
				/>
			</div>
			<h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight mb-2'>
				Piece Not Found
			</h1>
			<p className='text-gray-500 max-w-md text-sm sm:text-base mb-8'>
				The item or destination you are looking for has either been moved or is no longer available in our boutique.
			</p>
			<div className='flex items-center gap-4'>
				<Link href='/'>
					<button className='btn-primary px-6 py-3 text-sm font-semibold flex items-center gap-2'>
						<Home size={16} /> Return to Boutique
					</button>
				</Link>
				<Link href='/products'>
					<button className='btn-secondary px-6 py-3 text-sm font-semibold flex items-center gap-2'>
						<ArrowLeft size={16} /> Browse Collection
					</button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
