import { createClient } from '@/utils/supabase/server'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const CartIcon = async () => {
	const supabase = await createClient()
	const { data } = await supabase
		.from('shopping_cart')
		.select('item_count')
		.maybeSingle()

	const itemCount = data?.item_count || 0

	return (
		<Link
			href='/cart'
			aria-label='View cart'
			className='relative p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center'>
			<ShoppingBag size={20} />
			{itemCount > 0 && (
				<span className='absolute top-1.5 right-1.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold ring-2 ring-white dark:ring-zinc-950'>
					{itemCount > 99 ? '99+' : itemCount}
				</span>
			)}
		</Link>
	)
}

export default CartIcon
