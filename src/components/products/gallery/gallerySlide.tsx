import Image from "next/legacy/image"

const GallerySlide = ({ url }: { url: string }) => {
	return (
		<div className='overflow-hidden rounded-xl aspect-w-8 aspect-h-5 max-h-80'>
			<Image alt='thumbnail' src={url} objectFit='cover' layout='fill' />
		</div>
	)
}

export default GallerySlide
