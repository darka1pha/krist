import { CategoriesProps } from '@/types'
import ProductsCategory from './productsCategory'

const getCategories = async () => {
	const categories = await fetch('https://krist.vercel.app/api/categories')

	return await categories.json()
}

const Filter = async () => {
	const categories = (await getCategories()) as CategoriesProps[]

	return (
		<div className='col-span-3'>
			<ProductsCategory categories={categories} />
		</div>
	)
}

export default Filter
