import Image from 'next/image'

const GallerySlide = ({ url }: { url: string }) => {
	return (
		<div className='relative w-full aspect-[4/5] sm:aspect-square overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm'>
			<Image
				alt='Product image'
				src={url}
				fill
				priority
				sizes='(max-width: 768px) 100vw, 50vw'
				className='object-cover object-center hover:scale-105 transition-transform duration-700 ease-out'
			/>
		</div>
	)
}

export default GallerySlide
