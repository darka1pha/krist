import { SubmitButton } from '@/components/elements'
import CartItem from '@/components/elements/cartItem'
import Header from '@/components/elements/cartItem/header'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const CartPage = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data: cart } = await supabase
		.from('shopping_cart')
		.select('*')
		.single()
	const { data } = await supabase
		.from('cart_items')
		.select(
			`
  *,
  products (name,price,brand,images)
  `
		)
		.order('created_at')

	console.log(cart)

	return (
		<main className='paddings'>
			<h1 className='text-3xl font-bold'>Cart Details</h1>
			<span className='grid grid-cols-12 gap-5'>
				<div className='col-span-12 lg:col-span-8 mt-4'>
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
				<span className='col-span-12 lg:col-span-4 p-4 border border-[#f6f6f6] rounded-xl shadow-lg h-fit'>
					<div className='border-b border-gray-200 flex items-center justify-between py-4'>
						<h3 className='text-xl font-bold'>Subtotal</h3>
						<h3 className='text-xl font-bold'>
							${cart?.total_price?.toFixed(2)}
						</h3>
					</div>
					<div className='border-b border-gray-200 flex items-center justify-between py-4'>
						<h3 className='text-lg'>Delivery Charge</h3>
						<h3 className='text-lg'>${(20).toFixed(2)}</h3>
					</div>
					<div className='flex items-center justify-between py-4'>
						<h3 className='text-xl font-bold'>Grand Total</h3>
						<h3 className='text-xl font-bold'>
							$
							{cart && cart.total_price
								? (cart.total_price + 20).toFixed(2)
								: 0}
						</h3>
					</div>
					<form className='w-full mt-5'>
						<input
							name='total_price'
							type='hidden'
							value={
								cart && cart.total_price
									? (cart.total_price + 20).toFixed(2)
									: 0
							}
						/>
						<SubmitButton className='btn-primary w-full'>
							Process To Checkout
						</SubmitButton>
					</form>
				</span>
			</span>
		</main>
	)
}

export default CartPage
