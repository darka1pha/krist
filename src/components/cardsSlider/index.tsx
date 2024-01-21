'use client'
import { Swiper as SwiperContainer, SwiperRef, SwiperSlide } from 'swiper/react'
import { CategoryCard } from '../elements'
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react'
import { useState } from 'react'
import Swiper from 'swiper'

// Import Swiper styles
import 'swiper/css'
import { Database } from '@/types/supabase'

const CardsSlider = ({
	data,
}: {
	data: Database['public']['Tables']['categories']['Row'][] | null
}) => {
	const [swiperRef, setSwiperRef] = useState<Swiper | null>(null)
	const [allowLeft, setAllowLeft] = useState(false)
	const [allowRight, setAllowRight] = useState(true)

	const onNextSlide = () => {
		swiperRef?.slideNext()
		if (swiperRef) {
			setAllowLeft(!swiperRef.isBeginning)
			setAllowRight(!swiperRef.isEnd)
		}
	}
	const onPrevSlide = () => {
		swiperRef?.slidePrev()
		if (swiperRef) {
			setAllowLeft(!swiperRef.isBeginning)
			setAllowRight(!swiperRef.isEnd)
		}
	}

	return (
		<div className='overflow-hidden px-8 mb-16'>
			<div className='flex my-10 justify-between items-center'>
				<h2 className='text-3xl font-bold'>Shop By Category</h2>
				<div>
					<button
						disabled={!allowLeft}
						onClick={onPrevSlide}
						className='btn-primary mx-2'>
						<ArrowLeft2 size={18} />
					</button>
					<button
						disabled={!allowRight}
						onClick={onNextSlide}
						className='btn-primary mx-2'>
						<ArrowRight2 size={18} />
					</button>
				</div>
			</div>
			<div className='md:px-5 xl:px-20'>
				<SwiperContainer
					onSwiper={(swiper) => setSwiperRef(swiper)}
					spaceBetween={50}
					slidesPerView={3}
					breakpoints={{
						0: {
							slidesPerView: 2,
							spaceBetween: 10,
						},
						640: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						920: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
					}}>
					{data?.map(({ id, name, poster_url }) => (
						<SwiperSlide key={id}>
							<CategoryCard id={id} name={name} image={poster_url} />
						</SwiperSlide>
					))}
				</SwiperContainer>
			</div>
		</div>
	)
}

export default CardsSlider
