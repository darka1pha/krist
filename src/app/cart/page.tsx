import { SubmitButton } from '@/components/elements'
import CartItem from '@/components/elements/cartItem'
import Header from '@/components/elements/cartItem/header'
import { createClient } from '@/utils/supabase/server'
import { cache } from 'react'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'

interface CartProduct {
	name: string
	price: number
	brand: string
	images: string[]
}

interface CartItemData {
	id: number
	qty: number
	product_id: number
	products: CartProduct | null
}

const getCartItems = cache(async () => {
	const supabase = await createClient()
	const { data } = await supabase
		.from('cart_items')
		.select(
			`
id,
qty,
product_id,
products (name, price, brand, images)
`
		)
		.order('created_at')
	return (data as unknown as CartItemData[]) || []
})

const getShoppingCart = cache(async () => {
	const supabase = await createClient()
	const { data } = await supabase
		.from('shopping_cart')
		.select('*')
		.maybeSingle()
	return data
})

const CartPage = async () => {
	const data = await getCartItems()
	const cart = await getShoppingCart()

	const calculatedSubtotal = data.reduce(
		(sum, item) => sum + (item.products?.price || 0) * item.qty,
		0
	)
	const subtotal = calculatedSubtotal > 0 ? calculatedSubtotal : (cart?.total_price || 0)
	const deliveryCharge = data.length > 0 ? 20 : 0
	const grandTotal = data.length > 0 ? subtotal + deliveryCharge : 0

	return (
		<main className='paddings max-w-7xl mx-auto'>
			<div className='flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-zinc-800'>
				<div>
					<h1 className='text-3xl font-extrabold tracking-tight'>Shopping Cart</h1>
					<p className='text-sm text-gray-500 mt-1'>
						{data.length} {data.length === 1 ? 'item' : 'items'} in your bag
					</p>
				</div>
				<Link
					href='/products'
					className='text-sm font-medium text-primary-500 hover:underline flex items-center gap-1'>
					Continue shopping <ArrowRight size={16} />
				</Link>
			</div>

			{data.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-20 text-center bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800'>
					<div className='w-16 h-16 rounded-full bg-primary-100/20 flex items-center justify-center mb-4'>
						<ShoppingBag size={32} className='text-primary-500' />
					</div>
					<h2 className='text-xl font-bold mb-2'>Your bag is empty</h2>
					<p className='text-gray-500 max-w-md mb-6 text-sm'>
						Explore our latest fashion collections and discover exceptional styles curated for you.
					</p>
					<Link href='/products'>
						<button className='btn-primary px-8 py-3 text-sm font-semibold'>
							Start Shopping
						</button>
					</Link>
				</div>
			) : (
				<div className='grid grid-cols-12 gap-8'>
					<div className='col-span-12 lg:col-span-8'>
						<div className='bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden'>
							<Header />
							<div className='divide-y divide-gray-100 dark:divide-zinc-800'>
								{data.map(({ id, qty, products }) => (
									<CartItem
										key={id}
										brand={products?.brand || ''}
										id={id}
										name={products?.name || ''}
										price={products?.price || 0}
										image={products?.images?.[0] || '/images/hero.webp'}
										qty={qty}
									/>
								))}
							</div>
						</div>
					</div>

					<div className='col-span-12 lg:col-span-4'>
						<div className='p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm sticky top-24'>
							<h2 className='text-lg font-bold pb-4 border-b border-gray-100 dark:border-zinc-800'>
								Order Summary
							</h2>
							<div className='space-y-4 py-4 border-b border-gray-100 dark:border-zinc-800 text-sm'>
								<div className='flex items-center justify-between text-gray-600 dark:text-gray-400'>
									<span>Subtotal</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										${subtotal.toFixed(2)}
									</span>
								</div>
								<div className='flex items-center justify-between text-gray-600 dark:text-gray-400'>
									<span>Estimated Delivery</span>
									<span className='font-semibold text-gray-900 dark:text-white'>
										${deliveryCharge.toFixed(2)}
									</span>
								</div>
								<div className='flex items-center justify-between text-gray-600 dark:text-gray-400'>
									<span>Taxes</span>
									<span className='text-emerald-600 font-medium'>Calculated at checkout</span>
								</div>
							</div>
							<div className='flex items-center justify-between py-4 text-base font-bold'>
								<span>Total Amount</span>
								<span className='text-xl font-extrabold'>
									${grandTotal.toFixed(2)}
								</span>
							</div>

							<form className='w-full mt-4'>
								<input
									name='total_price'
									type='hidden'
									value={grandTotal.toFixed(2)}
								/>
								<SubmitButton className='btn-primary w-full py-3.5 font-semibold text-center'>
									Proceed To Checkout
								</SubmitButton>
							</form>

							<p className='text-xs text-center text-gray-400 mt-4'>
								🔒 Secure 256-bit SSL encrypted checkout
							</p>
						</div>
					</div>
				</div>
			)}
		</main>
	)
}

export default CartPage
