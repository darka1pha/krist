import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { ShoppingCart } from 'iconsax-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

const CartIcon = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data } = await supabase
		.from('shopping_cart')
		.select('item_count')
		.single()
	return (
		<div className='relative'>
			<Link href={'/cart'}>
				<div className='absolute rounded-full bg-oceanBlue text-white h-5 w-5 text-xs flex items-center justify-center -right-2 -top-2'>
					{data?.item_count}
				</div>
				<ShoppingCart size={32} />
			</Link>
		</div>
	)
}

export default CartIcon
