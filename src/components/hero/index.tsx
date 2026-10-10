import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react'

const features = [
	{
		icon: <Truck size={20} className='text-zinc-900 dark:text-zinc-100' />,
		title: 'Complimentary Shipping',
		desc: 'On all orders over $150',
	},
	{
		icon: <ShieldCheck size={20} className='text-zinc-900 dark:text-zinc-100' />,
		title: 'Guaranteed Authentic',
		desc: '100% verified original items',
	},
	{
		icon: <RefreshCw size={20} className='text-zinc-900 dark:text-zinc-100' />,
		title: '30-Day Effortless Returns',
		desc: 'Complimentary exchange policy',
	},
	{
		icon: <Headphones size={20} className='text-zinc-900 dark:text-zinc-100' />,
		title: '24/7 Personal Concierge',
		desc: 'Dedicated styling advisory',
	},
]

const Hero = () => {
	return (
		<div className='flex flex-col gap-6 mb-16'>
			{/* Hero Banner */}
			<div className='relative w-full h-[55vh] md:h-[78vh] min-h-[480px] rounded-3xl overflow-hidden flex items-center shadow-xl'>
				{/* Background Image */}
				<Image
					className='object-cover object-center scale-100 hover:scale-105 transition-transform duration-1000 ease-out'
					src='/images/hero.webp'
					alt='Krist Fashion Hero'
					fill
					priority
					sizes='100vw'
				/>

				{/* Dark luxury gradient overlay for supreme legibility */}
				<div className='absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-[1]' />
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-[1]' />

				{/* Hero Content */}
				<div className='relative z-10 max-w-2xl px-6 sm:px-12 md:px-16 text-white'>
					{/* Tag pill */}
					<div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-zinc-100 mb-4'>
						<Sparkles size={14} className='text-amber-300' />
						<span>Spring / Summer 2026 Collection</span>
					</div>

					<h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white'>
						Elevate Your Look, Accentuate Your Elegance
					</h1>

					<p className='mt-4 text-base sm:text-lg text-zinc-200/90 max-w-lg leading-relaxed font-light'>
						Discover curated couture accessories and timeless luxury accents designed to redefine personal sophistication.
					</p>

					{/* CTAs */}
					<div className='mt-8 flex flex-wrap items-center gap-4'>
						<Link href='/products'>
							<button className='px-7 py-3.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 active:scale-95 font-semibold text-sm shadow-lg hover:shadow-white/20 flex items-center gap-2.5 transition-all cursor-pointer'>
								<span>Explore Collection</span>
								<ArrowRight size={16} />
							</button>
						</Link>

						<Link href='/products'>
							<button className='px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer'>
								Up to 40% Off Selected
							</button>
						</Link>
					</div>
				</div>
			</div>

			{/* Value Proposition Highlights */}
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2'>
				{features.map((feat, index) => (
					<div
						key={index}
						className='flex items-center gap-3.5 p-4 rounded-2xl bg-gray-50/70 dark:bg-zinc-900/60 border border-gray-100 dark:border-zinc-800/80 backdrop-blur-sm hover:border-gray-200 dark:hover:border-zinc-700 transition-colors'>
						<div className='w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center shrink-0'>
							{feat.icon}
						</div>
						<div className='min-w-0'>
							<h4 className='text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate'>
								{feat.title}
							</h4>
							<p className='text-[11px] sm:text-xs text-gray-500 truncate mt-0.5'>
								{feat.desc}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Hero
