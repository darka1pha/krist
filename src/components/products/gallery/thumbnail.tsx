import Image from 'next/image'

const Thumbnail = ({ url }: { url: string }) => {
	return (
		<div className='relative h-20 w-20 overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900 cursor-pointer hover:border-black dark:hover:border-white transition-colors'>
			<Image
				alt='Product thumbnail'
				src={url}
				fill
				sizes='80px'
				className='object-cover object-center'
			/>
		</div>
	)
}

export default Thumbnail
