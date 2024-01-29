import CardsGrid from '@/components/cardsGrid'
import ProductCard from '@/components/elements/productCard'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const Favorites = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data: favorites } = await supabase.from('favorites').select(
		`
  *,
  products (*)
  `
	)

	return (
		<div className='col-span-9'>
			<h1 className='text-3xl font-bold '>Favorites</h1>
			<CardsGrid>
				{favorites?.map(({ products: product }, key) => (
					<ProductCard key={key} product={product!} />
				))}
			</CardsGrid>
		</div>
	)
}

export default Favorites
