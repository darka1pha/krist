import CardsGrid from '@/components/cardsGrid'
import ProductCard from '@/components/elements/productCard'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { cache } from 'react'

const getFavorites = cache(async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	return await supabase.from('favorites').select(
		`
  *,
  products (*)
  `
	)
})

const Favorites = async () => {
	const { data: favorites } = await getFavorites()

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
