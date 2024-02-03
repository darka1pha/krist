'use client'

import Image from 'next/image'

const NotFound = () => {
	return (
		<div className='h-[calc(100vh-80px)] w-full flex flex-col justify-center items-center'>
			<Image
				src='/images/404.webp'
				alt='error image'
				height={256}
				width={512}
				style={{
					maxWidth: '100%',
					height: 'auto',
				}}
			/>
		</div>
	)
}

export default NotFound
