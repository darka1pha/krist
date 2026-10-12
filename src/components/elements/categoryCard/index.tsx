import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'

interface CategoryCardProps {
	id?: number
	name: string | null
	image: string | null
	description?: string | null
	subcategories?: { id: number; name: string | null }[]
}

const CategoryCard = ({
	name,
	image,
	subcategories,
}: CategoryCardProps) => {
	const categoryName = name || 'Collection'
	const imageSrc = image || '/images/hero.webp'
	const categorySlug = encodeURIComponent(categoryName.toLowerCase())

	const subcategoriesText =
		subcategories && subcategories.length > 0
			? subcategories
					.slice(0, 3)
					.map((s) => s.name)
					.filter(Boolean)
					.join(' • ')
			: null

	return (
		<Link
			href={`/categories/${categorySlug}`}
			className='group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] border border-gray-100/80 dark:border-zinc-800 transition-all duration-500'>
			<Image
				alt={categoryName}
				src={imageSrc}
				fill
				sizes='(max-width: 640px) 75vw, (max-width: 1024px) 40vw, 25vw'
				className='object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out'
			/>

			{/* Soft dark gradient for luxury contrast */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent' />

			{/* Floating Top Tag */}
			<div className='absolute top-3 left-3 z-10 opacity-90 group-hover:opacity-100 transition-opacity'>
				<div className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-zinc-900 dark:text-zinc-100 shadow-sm'>
					<Sparkles size={11} className='text-amber-500' />
					<span>Collection</span>
				</div>
			</div>

			{/* Bottom Card Area */}
			<div className='absolute inset-x-3 bottom-3 z-10'>
				<div className='p-3.5 rounded-xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-white/40 dark:border-zinc-800/80 text-zinc-900 dark:text-zinc-100 group-hover:bg-white dark:group-hover:bg-zinc-900 transition-all duration-300 shadow-sm'>
					<div className='flex items-center justify-between gap-2'>
						<div>
							<h3 className='font-bold text-base tracking-tight capitalize leading-tight'>
								{categoryName}
							</h3>
							{subcategoriesText && (
								<p className='text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 truncate max-w-[160px] sm:max-w-[200px]'>
									{subcategoriesText}
								</p>
							)}
						</div>
						<div className='w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors shrink-0 shadow-sm'>
							<ArrowUpRight
								size={15}
								className='group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
							/>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default CategoryCard
