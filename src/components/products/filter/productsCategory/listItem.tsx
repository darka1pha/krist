'use client'
import { addSearchParams, cn } from '@/utils'
import { CategoriesProps } from '@/types'
import { Collapse, List, ListItemButton } from '@mui/material'
import { ArrowDown2, ArrowUp2 } from 'iconsax-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const ListItem = ({ category }: { category: CategoriesProps }) => {
	const params = useSearchParams()
	const [open, setOpen] = useState(
		params.get('category') === category.name ? true : false
	)

	const router = useRouter()
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	const handleClick = () => {
		setOpen(!open)
	}

	const updateCategoryFilterParam = (category: string) => {
		if (params.has('sub')) {
			const newSearchParams = new URLSearchParams(window.location.search)
			newSearchParams.delete('sub')
			newSearchParams.set('category', category)
			router.push(`${window.location.pathname}?${newSearchParams.toString()}`)
		} else router.push(addSearchParams('category', category))
	}

	const updateSubcategoryFilterParam = (
		category: string,
		subcategory: string
	) => {
		if (params.get('category') !== category) {
			const newSearchParams = new URLSearchParams(window.location.search)
			newSearchParams.delete('category')
			newSearchParams.set('sub', subcategory)
			newSearchParams.set('category', category)
			router.push(`${window.location.pathname}?${newSearchParams.toString()}`)
		} else router.push(addSearchParams('sub', subcategory))
	}

	return (
		<>
			<ListItemButton onClick={handleClick}>
				<div className='w-full flex justify-between items-center'>
					<button
						name='category'
						className='p-2 hover:bg-primary-500 hover:text-white transition-all ease-in-out rounded-xl'
						onClick={(e) => {
							e.stopPropagation()
							updateCategoryFilterParam(category.name)
						}}>
						<p
							className={cn(
								'text-lg',
								params.get('category') === category.name ? 'font-bold' : ''
							)}>
							{capitalizeFirstLetter(category?.name)}
						</p>
					</button>
				</div>
				{open ? <ArrowUp2 /> : <ArrowDown2 />}
			</ListItemButton>
			<Collapse in={open} timeout='auto' unmountOnExit>
				{category.subcategories.map(({ name }, key) => (
					<List key={key} component='div' disablePadding>
						<ListItemButton sx={{ pl: 4 }}>
							<div className='w-full flex justify-between items-center'>
								<button
									name='subcategory'
									className='p-2 h-full w-full text-left'
									onClick={() => {
										updateSubcategoryFilterParam(category.name, name || '')
									}}>
									<p
										className={`${
											params.get('sub') === name ? 'font-bold' : ''
										}`}>
										{capitalizeFirstLetter(name || '')}
									</p>
								</button>
							</div>
						</ListItemButton>
					</List>
				))}
			</Collapse>
		</>
	)
}

export default ListItem
