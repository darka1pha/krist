import CartItem from '@/components/elements/cartItem'
import Header from '@/components/elements/cartItem/header'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const CartPage = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data } = await supabase
		.from('cart_items')
		.select(
			`
  *,
  products (name,price,brand,images)
  `
		)
		.order('created_at')

	return (
		<main className='paddings'>
			<h1 className='text-3xl font-bold'>Cart Details</h1>
			<span className='grid grid-cols-12'>
				<div className='col-span-8 mt-4'>
					<Header />
					{data?.map(({ id, qty, products }) => (
						<CartItem
							brand={products?.brand!}
							id={id}
							name={products?.name!}
							price={products?.price!}
							image={products?.images[0]!}
							qty={qty}
						/>
					))}
				</div>
				<div className='col-span-4'></div>
			</span>
		</main>
	)
}

export default CartPage
