import Image from 'next/image'
import { IconButton, SubmitButton } from '..'
import { Eye, Heart, Star1 } from 'iconsax-react'
import { Database, Tables } from '@/types/supabase'
import Link from 'next/link'
import { favoriteAction } from '@/actions/profile'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { addToCartAction } from '@/actions/cart'

const ProductCard = async ({ product }: { product: Tables<'products'> }) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data } = await supabase
		.from('favorites')
		.select('liked')
		.eq('id', product.id)
		.single()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	return (
		<div className='group transition-all ease-in-out'>
			<div className='aspect-w-10 relative aspect-h-14 w-full overflow-hidden rounded-lg bg-gray-200 '>
				<Image
					alt='image'
					src={product.images[0]}
					fill
					sizes='100vw'
					style={{
						objectFit: 'cover',
					}}
				/>
				<div className='z-10 w-full h-full absolute top-0 flex flex-col opacity-0 group-hover:opacity-100 transition-all ease-in-out items-end'>
					<div className='flex-1 flex flex-col p-2'>
						<form action={favoriteAction}>
							<input type='hidden' name='id' value={product.id} />
							<input
								type='hidden'
								name='liked'
								value={data ? String(data.liked) : 'false'}
							/>
							{user && (
								<IconButton className='mb-2 w-[40px] h-[40px]'>
									<Heart
										variant={data?.liked ? 'Bold' : 'Outline'}
										size={18}
										className={
											data?.liked ? 'text-red-600' : 'text-primary-500'
										}
									/>
								</IconButton>
							)}
						</form>
						<Link href={`/products/${product.id}`}>
							<IconButton className='w-[40px] h-[40px]'>
								<Eye size={18} className='text-primary-500' />
							</IconButton>
						</Link>
					</div>
					{user && (
						<div className='flex-1 w-full justify-center items-end flex p-2 md:p-4'>
							<form className='w-full' action={addToCartAction}>
								<input type='hidden' name='id' value={product.id} />
								<SubmitButton
									variant='secondary'
									className='btn-secondary w-full'>
									Add To Cart
								</SubmitButton>
							</form>
						</div>
					)}
				</div>
			</div>
			<div className='pl-2 mt-1'>
				<p className='text-lg font-bold mb-1'>{product.brand}</p>
				<p className='mb-1'>{product.name}</p>
				<p>${product.price?.toFixed(2)}</p>
			</div>
		</div>
	)
}

export default ProductCard
