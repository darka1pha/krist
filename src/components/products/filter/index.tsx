import { CategoriesProps } from '@/types'
import ProductsCategory from './productsCategory'

const Filter = ({ categories }: { categories: CategoriesProps[] }) => {
	return (
		<div className='col-span-3'>
			<ProductsCategory categories={categories} />
		</div>
	)
}

export default Filter
