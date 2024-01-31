import Image from "next/image"

const GallerySlide = ({ url }: { url: string }) => {
	return (
        <div className='overflow-hidden rounded-xl aspect-w-8 aspect-h-5 max-h-80'>
			<Image
                alt='thumbnail'
                src={url}
                fill
                sizes="100vw"
                style={{
                    objectFit: "cover"
                }} />
		</div>
    );
}

export default GallerySlide
