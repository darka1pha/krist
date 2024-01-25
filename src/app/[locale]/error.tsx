'use client'

import Image from 'next/image'

const ErrorBoundary = ({ error }: { error: Error }) => {
	return (
		<div className='h-[calc(100vh-80px)] w-full flex flex-col justify-center items-center'>
			<Image
				src='/images/error.gif'
				alt='error image'
				height={256}
				width={512}
			/>
      <p className='text-3xl'>{error.message}</p>
		</div>
	)
}

export default ErrorBoundary
