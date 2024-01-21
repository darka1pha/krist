import { ArrowRight } from 'iconsax-react'
import Image from 'next/image'

const Hero = () => {
	return (
		<div className='flex p-8 w-full hero_height'>
			<div className='h-full w-full rounded-xl overflow-hidden relative flex items-center justify-center sm:justify-start'>
				<Image
					className='object-cover h-full w-full absolute -z-10'
					src='/images/hero.webp'
					alt='hero image'
					width={1280}
					height={720}
				/>
				<div className='sm:px-10 dark:text-primary-500'>
					<p className='text-2xl'>Classic Exclusive</p>
					<p className='text-4xl font-bold my-2'>Woman's Collecttion</p>
					<p className='text-xl'>UPTO 40% OFF</p>
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
