'use client'
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react'
import { CategoryCard } from '../elements'
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react'
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
		<div className='overflow-hidden my-12'>
			<div className='flex mb-8 justify-between items-end flex-row'>
				<div>
					<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100/20 text-xs font-semibold uppercase tracking-wider mb-2 text-zinc-900 dark:text-zinc-100'>
						<Layers size={14} /> Curated Departments
					</div>
					<h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight'>
						Shop By Category
					</h2>
				</div>
				<div className='flex items-center gap-2'>
					<button
						name='prev slide'
						aria-label='Previous slide'
						disabled={!allowLeft}
						onClick={onPrevSlide}
						className='w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all'>
						<ChevronLeft size={18} />
					</button>
					<button
						name='next slide'
						aria-label='Next slide'
						disabled={!allowRight}
						onClick={onNextSlide}
						className='w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all'>
						<ChevronRight size={18} />
					</button>
				</div>
			</div>
			<div>
				<SwiperContainer
					onSwiper={(swiper) => setSwiperRef(swiper)}
					spaceBetween={20}
					slidesPerView={2}
					breakpoints={{
						640: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 24,
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
