import Image from 'next/image'

const Thumbnail = ({ url }: { url: string }) => {
	return (
		<div className='h-20 w-20 overflow-hidden rounded-xl cursor-pointer'>
			<Image
				alt='thumbnail'
				className='w-full h-full'
				src={url}
				width={256}
				height={256}
				objectFit='cover'
			/>
		</div>
	)
}

export default Thumbnail
