'use client'

import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import Thumbnail from './thumbnail'
import GallerySlide from './gallerySlide'

const Gallery = ({ images }: { images: string[] }) => {
	const [swiper, setSwiper] = useState<SwiperType | null>(null)
	const slideTo = (index: number) => {
		swiper?.slideTo(index)
	}
	return (
		<div className='px-8 md:px-0'>
			<Swiper
				onSwiper={setSwiper}
				spaceBetween={10}
				navigation={true}
				modules={[FreeMode, Navigation, Thumbs]}>
				{images.map((image, key) => (
					<SwiperSlide key={key}>
						<GallerySlide url={image} />
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				slidesPerView={'auto'}
				spaceBetween={30}
				freeMode={true}
				centeredSlides={true}
				slideToClickedSlide={true}
				onActiveIndexChange={(swiper) => {
					slideTo(swiper.activeIndex)
				}}
				initialSlide={0}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className='mt-5 h-20'>
				{images.map((image, key) => (
					<SwiperSlide className='max-w-20' key={key}>
						<Thumbnail url={image} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default Gallery
