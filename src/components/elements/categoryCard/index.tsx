import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const CategoryCard = ({
	name,
	image,
}: {
	name: string | null
	id: number
	image: string | null
}) => {
	const categoryName = name || 'Collection'
	const imageSrc = image || '/images/hero.webp'

	return (
		<Link
			href={`/products?category=${encodeURIComponent(categoryName.toLowerCase())}`}
			className='group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 shadow-sm hover:shadow-lg transition-all duration-300'>
			<Image
				alt={categoryName}
				src={imageSrc}
				fill
				sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
				className='object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out'
			/>

			{/* Soft dark gradient for luxury readability */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent' />

			{/* Bottom Badge Card */}
			<div className='absolute inset-x-3 bottom-3 z-10'>
				<div className='flex items-center justify-between p-3.5 rounded-xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-zinc-900 dark:text-zinc-100 group-hover:bg-white dark:group-hover:bg-zinc-900 transition-colors shadow-sm'>
					<span className='font-bold text-sm tracking-wide capitalize'>
						{categoryName}
					</span>
					<div className='w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors'>
						<ArrowUpRight size={14} />
					</div>
				</div>
			</div>
		</Link>
	)
}

export default CategoryCard
