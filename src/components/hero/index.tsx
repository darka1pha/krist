import { ArrowRight } from 'iconsax-react'
import Image from 'next/image'

const Hero = () => {
	return (
		<div className='flex p-2 md:p-8 w-full h-[50vh] md:h-[85vh]'>
			<div className='h-full w-full rounded-xl overflow-hidden relative flex items-center justify-center sm:justify-start'>
				<Image
					className='object-cover h-full w-full absolute -z-10'
					src='/images/hero.webp'
					alt='hero image'
					width={1280}
					height={720}
				/>
				<div className='md:px-10 dark:text-primary-500 w-full md:w-auto px-4'>
					<p className='text-xl md:text-2xl'>Classic Exclusive</p>
					<p className='text-2xl md:text-4xl font-bold my-2'>Woman's Collecttion</p>
					<p className='text-lg md:text-xl'>UPTO 40% OFF</p>
					<button className='btn-primary flex items-center mt-4'>
						<p className='mr-2 text-sm'>Shop Now</p>
						<ArrowRight size={20} />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Hero
