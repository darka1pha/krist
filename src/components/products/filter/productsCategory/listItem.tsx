'use client'
import { cn } from '@/utils'
import { CategoriesProps } from '@/types'
import { ChevronDown, ChevronUp, Check, ExternalLink } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const ListItem = ({ category }: { category: CategoriesProps }) => {
	const params = useSearchParams()
	const router = useRouter()

	const currentCategory = params.get('category')?.toLowerCase()
	const currentSub = params.get('sub')?.toLowerCase()
	const isSelected = currentCategory === category.name.toLowerCase()

	const [open, setOpen] = useState(isSelected)

	useEffect(() => {
		if (isSelected) {
			setOpen(true)
		}
	}, [isSelected])

	function capitalizeFirstLetter(string: string) {
		if (!string) return ''
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	const toggleCategoryFilter = (categoryName: string) => {
		const newSearchParams = new URLSearchParams(window.location.search)

		if (isSelected) {
			// Toggle off: remove category and sub
			newSearchParams.delete('category')
			newSearchParams.delete('sub')
		} else {
			// Select this category
			newSearchParams.set('category', categoryName.toLowerCase())
			newSearchParams.delete('sub')
		}

		const query = newSearchParams.toString()
		router.push(query ? `${window.location.pathname}?${query}` : window.location.pathname)
	}

	const toggleSubcategoryFilter = (
		categoryName: string,
		subcategory: string
	) => {
		const newSearchParams = new URLSearchParams(window.location.search)
		const subLower = subcategory.toLowerCase()

		if (isSelected && currentSub === subLower) {
			// Toggle off subcategory
			newSearchParams.delete('sub')
		} else {
			newSearchParams.set('category', categoryName.toLowerCase())
			newSearchParams.set('sub', subLower)
		}

		const query = newSearchParams.toString()
		router.push(query ? `${window.location.pathname}?${query}` : window.location.pathname)
	}

	return (
		<div className='border-b border-gray-100 dark:border-zinc-800/60 last:border-b-0 py-1'>
			<div
				className={cn(
					'w-full flex justify-between items-center py-2 px-2.5 rounded-xl transition-all duration-200',
					isSelected
						? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-xs'
						: 'hover:bg-gray-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400'
				)}>
				<button
					type='button'
					name='category'
					className='text-left flex-1 flex items-center gap-2 cursor-pointer'
					onClick={() => toggleCategoryFilter(category.name)}>
					<span className='text-sm capitalize'>
						{capitalizeFirstLetter(category?.name)}
					</span>
					{isSelected && (
						<span className='w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white animate-pulse' />
					)}
				</button>

				<div className='flex items-center gap-1'>
					{/* Link to category landing page */}
					<Link
						href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
						title={`Explore ${category.name} collection`}
						className='p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors opacity-60 hover:opacity-100'>
						<ExternalLink size={13} />
					</Link>

					{/* Accordion toggle */}
					{category.subcategories && category.subcategories.length > 0 && (
						<button
							type='button'
							onClick={() => setOpen(!open)}
							aria-label='Toggle subcategories'
							className='p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer'>
							{open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
						</button>
					)}
				</div>
			</div>

			{/* Subcategories list */}
			{open && category.subcategories && category.subcategories.length > 0 && (
				<ul className='pl-3 pr-1 py-1.5 space-y-1 border-l-2 border-gray-100 dark:border-zinc-800 ml-3.5 my-1'>
					{category.subcategories.map(({ name }, key) => {
						const isSubSelected =
							isSelected && currentSub === (name || '').toLowerCase()
						return (
							<li key={key}>
								<button
									type='button'
									name='subcategory'
									className={cn(
										'text-xs py-1.5 px-2.5 rounded-lg w-full text-left transition-colors flex items-center justify-between cursor-pointer',
										isSubSelected
											? 'font-bold text-zinc-950 dark:text-white bg-gray-200/70 dark:bg-zinc-700/60'
											: 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-800/40'
									)}
									onClick={() =>
										toggleSubcategoryFilter(category.name, name || '')
									}>
									<span className='capitalize'>{capitalizeFirstLetter(name || '')}</span>
									{isSubSelected && <Check size={12} className='text-zinc-900 dark:text-white' />}
								</button>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default ListItem
