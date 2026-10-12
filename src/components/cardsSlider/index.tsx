'use client'
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react'
import { CategoryCard } from '../elements'
import { ChevronLeft, ChevronRight, Layers, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Swiper from 'swiper'
import Link from 'next/link'

// Import Swiper styles
import 'swiper/css'

interface CategoryItem {
	id?: number
	name: string | null
	poster_url?: string | null
	description?: string | null
	subcategories?: { id: number; name: string | null }[]
}

const CardsSlider = ({
	data,
}: {
	data: CategoryItem[] | null
}) => {
	const [swiperRef, setSwiperRef] = useState<Swiper | null>(null)
	const [allowLeft, setAllowLeft] = useState(false)
	const [allowRight, setAllowRight] = useState(true)
	const [activeIndex, setActiveIndex] = useState(0)

	const categories = data || []

	const onNextSlide = () => {
		swiperRef?.slideNext()
		if (swiperRef) {
			setAllowLeft(!swiperRef.isBeginning)
			setAllowRight(!swiperRef.isEnd)
			setActiveIndex(swiperRef.activeIndex)
		}
	}

	const onPrevSlide = () => {
		swiperRef?.slidePrev()
		if (swiperRef) {
			setAllowLeft(!swiperRef.isBeginning)
			setAllowRight(!swiperRef.isEnd)
			setActiveIndex(swiperRef.activeIndex)
		}
	}

	const slideToCategory = (index: number) => {
		swiperRef?.slideTo(index)
		setActiveIndex(index)
		if (swiperRef) {
			setAllowLeft(!swiperRef.isBeginning)
			setAllowRight(!swiperRef.isEnd)
		}
	}

	return (
		<section className='overflow-hidden my-16'>
			{/* Header */}
			<div className='flex flex-col md:flex-row mb-8 justify-between items-start md:items-end gap-4'>
				<div>
					<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100/20 text-xs font-semibold uppercase tracking-wider mb-2 text-zinc-900 dark:text-zinc-100'>
						<Layers size={14} className='text-zinc-800 dark:text-zinc-200' />
						<span>Curated Departments</span>
					</div>
					<h2 className='text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white'>
						Shop By Category
					</h2>
					<p className='text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-lg'>
						Explore our masterfully crafted collections, from statement 18k gold pieces to bespoke Tuscan leather totes.
					</p>
				</div>

				<div className='flex items-center gap-4 w-full md:w-auto justify-between md:justify-end'>
					<Link
						href='/categories'
						className='group inline-flex items-center gap-1.5 text-sm font-semibold hover:text-primary-400 transition-colors'>
						<span>All Categories</span>
						<ArrowRight
							size={16}
							className='group-hover:translate-x-1 transition-transform'
						/>
					</Link>

					<div className='flex items-center gap-2'>
						<button
							name='prev slide'
							aria-label='Previous slide'
							disabled={!allowLeft}
							onClick={onPrevSlide}
							className='w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm'>
							<ChevronLeft size={18} />
						</button>
						<button
							name='next slide'
							aria-label='Next slide'
							disabled={!allowRight}
							onClick={onNextSlide}
							className='w-10 h-10 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm'>
							<ChevronRight size={18} />
						</button>
					</div>
				</div>
			</div>

			{/* Quick Category Chips */}
			{categories.length > 0 && (
				<div className='flex items-center gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar'>
					{categories.map((cat, idx) => (
						<button
							key={cat.id || idx}
							onClick={() => slideToCategory(idx)}
							className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 cursor-pointer ${
								activeIndex === idx
									? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
									: 'bg-gray-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
							}`}>
							{cat.name}
						</button>
					))}
					<Link
						href='/categories'
						className='text-xs px-3 py-1.5 rounded-full font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0'>
						+ Browse All
					</Link>
				</div>
			)}

			{/* Slider */}
			<div>
				<SwiperContainer
					onSwiper={(swiper) => {
						setSwiperRef(swiper)
						setAllowLeft(!swiper.isBeginning)
						setAllowRight(!swiper.isEnd)
					}}
					onSlideChange={(swiper) => {
						setAllowLeft(!swiper.isBeginning)
						setAllowRight(!swiper.isEnd)
						setActiveIndex(swiper.activeIndex)
					}}
					spaceBetween={20}
					slidesPerView={1.3}
					breakpoints={{
						480: {
							slidesPerView: 2,
							spaceBetween: 16,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 3.5,
							spaceBetween: 24,
						},
						1280: {
							slidesPerView: 4,
							spaceBetween: 24,
						},
					}}>
					{categories.map(({ id, name, poster_url, description, subcategories }, index) => (
						<SwiperSlide key={id || index}>
							<CategoryCard
								id={id}
								name={name}
								image={poster_url || null}
								description={description}
								subcategories={subcategories}
							/>
						</SwiperSlide>
					))}
				</SwiperContainer>
			</div>
		</section>
	)
}

export default CardsSlider
