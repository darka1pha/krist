'use client'

import { List } from '@mui/material'
import ListItem from './listItem'

import { CategoriesProps } from '@/types'

const ProductsCategory = ({
	categories,
}: {
	categories: CategoriesProps[]
}) => {
	return (
		<List
			component='nav'
			aria-labelledby='nested-list-subheader'
			subheader={
				<p className='text-xl text-primary-500 font-bold font mb-4'>
					Products Gategory
				</p>
			}>
			{categories.map((category,key) => (
				<ListItem key={key} category={category} />
			))}
		</List>
	)
}

export default ProductsCategory
