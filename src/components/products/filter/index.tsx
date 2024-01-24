import { CategoriesProps } from '@/types'
import ProductsCategory from './productsCategory'

const Filter = async ({ categories }: { categories: CategoriesProps[] }) => {
	return (
		<div className='col-span-12 md:col-span-3'>
			<ProductsCategory categories={categories} />
		</div>
	)
}

export default Filter
