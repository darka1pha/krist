'use client'
import { Heart } from 'iconsax-react'
import Quantity from './quantity'
import { useParams, useSearchParams } from 'next/navigation'
import { addToCartAction } from '@/actions/cart'
import { SubmitButton } from '@/components/elements'

type SaerchParamsType = {
	qty: number
}

const AddToCart = () => {
	const searchParams = useSearchParams()
	const params = useParams()
	return (
		<div className='grid grid-cols-4 sm:grid-cols-7 gap-2'>
			<Quantity />
			<button
				name='like button'
				className='p-4 border-primary-500 border-2 sm:col-span-1 rounded-xl flex justify-center items-center active:scale-95 transition-all'>
				<Heart className='text-primary-500' size={18} />
			</button>
			<form action={addToCartAction} className='col-span-4'>
				<input type='hidden' name='qty' value={searchParams.get('qty') ?? 1} />
				<input type='hidden' name='id' value={params.id} />
				<SubmitButton className='btn-primary w-full'>Add to Cart</SubmitButton>
			</form>
		</div>
	)
}

export default AddToCart
