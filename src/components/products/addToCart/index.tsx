'use client'
import { Heart } from 'iconsax-react'
import Quantity from './quantity'
import { useParams, useSearchParams } from 'next/navigation'
import { addToCartAction } from '@/actions/cart'
import { SubmitButton } from '@/components/elements'
import { User } from '@supabase/supabase-js'
import { favoriteAction } from '@/actions/profile'
import Link from 'next/link'

type AddToCartParams = {
	liked: boolean | undefined
	user: User | null
}

const AddToCart = ({ liked, user }: AddToCartParams) => {
	const searchParams = useSearchParams()
	const params = useParams()
	return (
		<div className='grid grid-cols-4 sm:grid-cols-7 gap-2'>
			<Quantity />
			{user && (
				<form className='col-span-1' action={favoriteAction}>
					<input
						type='hidden'
						name='liked'
						value={liked ? String(liked) : 'false'}
					/>
					<input type='hidden' name='id' value={params.id} />
					<SubmitButton
						variant='secondary'
						name='like button'
						className='p-4 w-full h-full border-primary-500 border-2 rounded-xl flex justify-center items-center active:scale-95 transition-all'>
						<p className='hidden'>Like Product</p>
						<Heart
							variant={liked ? 'Bold' : 'Outline'}
							className={liked ? 'text-red-600' : 'text-primary-500'}
							size={18}
						/>
					</SubmitButton>
				</form>
			)}
			{user ? (
				<form action={addToCartAction} className='col-span-4'>
					<input
						type='hidden'
						name='qty'
						value={searchParams.get('qty') ?? 1}
					/>
					<input type='hidden' name='id' value={params.id} />
					<SubmitButton className='btn-primary w-full h-full'>
						Add to Cart
					</SubmitButton>
				</form>
			) : (
				<Link
					className='col-span-4 w-full'
					href={`/auth/sign-in?redirect=/products/${params.id}`}>
					<SubmitButton className='btn-primary w-full h-full'>
						Add to Cart
					</SubmitButton>
				</Link>
			)}
		</div>
	)
}

export default AddToCart
