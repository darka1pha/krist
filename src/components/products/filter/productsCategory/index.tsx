'use client'

import ListItem from './listItem'
import { CategoriesProps } from '@/types'
import { Filter as FilterIcon, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const ProductsCategory = ({
	categories,
}: {
	categories: CategoriesProps[]
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const hasFilter = searchParams.has('category') || searchParams.has('sub')

	const clearFilters = () => {
		router.push('/products')
	}

	return (
		<div className='p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm'>
			<div className='flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-zinc-800'>
				<div className='flex items-center gap-2'>
					<FilterIcon size={18} className='text-zinc-900 dark:text-zinc-100' />
					<h3 className='font-bold text-base text-zinc-900 dark:text-zinc-100'>
						Categories
					</h3>
				</div>
				{hasFilter && (
					<button
						type='button'
						onClick={clearFilters}
						className='text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors'>
						<X size={12} /> Clear
					</button>
				)}
			</div>

			<nav aria-label='Categories filter' className='space-y-1'>
				{categories.map((category) => (
					<ListItem key={category.name} category={category} />
				))}
			</nav>
		</div>
	)
}

export default ProductsCategory
