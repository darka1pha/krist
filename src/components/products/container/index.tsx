import CardsGrid from '@/components/cardsGrid'
import ProductCard from '@/components/elements/productCard'
import { Tables } from '@/types/supabase'

const Container = ({ products }: { products: Tables<'products'>[] | null }) => {
	return (
		<div className='col-span-12 md:col-span-9'>
			<h1 className='text-3xl font-bold '>Shop</h1>
			<CardsGrid>
				{products?.map((product, key) => (
					<ProductCard key={key} product={product} />
				))}
			</CardsGrid>
		</div>
	)
}

export default Container
