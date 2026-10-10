'use client'

import Image from 'next/image'
import Link from 'next/link'
import { RotateCcw, Home } from 'lucide-react'

const ErrorBoundary = ({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) => {
	return (
		<div className='min-h-[calc(100vh-120px)] w-full flex flex-col justify-center items-center px-4 py-12 text-center'>
			<div className='relative w-full max-w-xs h-48 mb-6 opacity-90'>
				<Image
					src='/images/error.gif'
					alt='Something went wrong'
					fill
					sizes='300px'
					className='object-contain'
				/>
			</div>
			<h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight mb-2'>
				Something Went Unexpectedly
			</h1>
			<p className='text-gray-500 max-w-md text-sm mb-6'>
				{error.message || 'An unexpected error occurred while loading this boutique experience.'}
			</p>
			<div className='flex items-center gap-4'>
				<button
					onClick={() => reset()}
					className='btn-primary px-6 py-3 text-sm font-semibold flex items-center gap-2'>
					<RotateCcw size={16} /> Try Again
				</button>
				<Link href='/'>
					<button className='btn-secondary px-6 py-3 text-sm font-semibold flex items-center gap-2'>
						<Home size={16} /> Home
					</button>
				</Link>
			</div>
		</div>
	)
}

export default ErrorBoundary
