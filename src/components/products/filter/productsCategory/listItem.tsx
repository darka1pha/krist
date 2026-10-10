'use client'
import { addSearchParams, cn } from '@/utils'
import { CategoriesProps } from '@/types'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const ListItem = ({ category }: { category: CategoriesProps }) => {
	const params = useSearchParams()
	const isSelected = params.get('category') === category.name
	const [open, setOpen] = useState(isSelected)

	const router = useRouter()
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	const handleClick = () => {
		setOpen(!open)
	}

	const updateCategoryFilterParam = (categoryName: string) => {
		if (params.has('sub')) {
			const newSearchParams = new URLSearchParams(window.location.search)
			newSearchParams.delete('sub')
			newSearchParams.set('category', categoryName)
			router.push(`${window.location.pathname}?${newSearchParams.toString()}`)
		} else {
			router.push(addSearchParams('category', categoryName))
		}
	}

	const updateSubcategoryFilterParam = (
		categoryName: string,
		subcategory: string
	) => {
		if (params.get('category') !== categoryName) {
			const newSearchParams = new URLSearchParams(window.location.search)
			newSearchParams.delete('category')
			newSearchParams.set('sub', subcategory)
			newSearchParams.set('category', categoryName)
			router.push(`${window.location.pathname}?${newSearchParams.toString()}`)
		} else {
			router.push(addSearchParams('sub', subcategory))
		}
	}

	return (
		<div className='border-b border-gray-100 dark:border-zinc-800/60 last:border-b-0 py-1'>
			<div className='w-full flex justify-between items-center py-1.5 px-2 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors'>
				<button
					type='button'
					name='category'
					className='text-left flex-1'
					onClick={() => updateCategoryFilterParam(category.name)}>
					<span
						className={cn(
							'text-sm transition-colors',
							isSelected
								? 'font-bold text-zinc-950 dark:text-white'
								: 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
						)}>
						{capitalizeFirstLetter(category?.name)}
					</span>
				</button>
				{category.subcategories && category.subcategories.length > 0 && (
					<button
						type='button'
						onClick={handleClick}
						aria-label='Toggle subcategories'
						className='p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors'>
						{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
					</button>
				)}
			</div>

			{open && category.subcategories && category.subcategories.length > 0 && (
				<ul className='pl-4 pr-2 py-1 space-y-1 border-l-2 border-gray-100 dark:border-zinc-800 ml-3 my-1'>
					{category.subcategories.map(({ name }, key) => {
						const isSubSelected = params.get('sub') === name
						return (
							<li key={key}>
								<button
									type='button'
									name='subcategory'
									className={cn(
										'text-xs py-1 px-2 rounded-md w-full text-left transition-colors',
										isSubSelected
											? 'font-bold text-zinc-950 dark:text-white bg-gray-100 dark:bg-zinc-800'
											: 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
									)}
									onClick={() =>
										updateSubcategoryFilterParam(category.name, name || '')
									}>
									{capitalizeFirstLetter(name || '')}
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
