'use client'
import { addSearchParams } from '@/utils'
import { Add, Minus } from 'iconsax-react'
import { useRouter, useSearchParams } from 'next/navigation'

const Quantity = () => {
	const params = useSearchParams()
	const router = useRouter()
	const onAddQty = () => {
		const currentQyt = params.has('qty') ? Number(params.get('qty')) : 1
		const newUrl = addSearchParams('qty', String(currentQyt + 1))
		router.push(newUrl)
	}
	const onMinusQty = () => {
		const currentQty = params.has('qty') ? Number(params.get('qty')) : 1
		if (currentQty !== 1) {
			const newUrl = addSearchParams('qty', String(currentQty - 1))
			router.push(newUrl)
		}
	}
	return (
		<div className='p-4 border-primary-500 border-2 col-span-3  sm:col-span-2 flex rounded-xl justify-between items-center'>
			<button
				name='decreace qty'
				onClick={onMinusQty}
				disabled={
					params.has('qty')
						? Number(params.get('qty')) === 1
							? true
							: false
						: true
				}
				className='disabled:cursor-not-allowed'>
				<p className='hidden'>decreace qty</p>
				<Minus className='text-primary-500' size={18} />
			</button>
			<p className='mx-2'>{!params.has('qty') ? 1 : params.get('qty')}</p>
			<button name='increace qty' onClick={onAddQty}>
				<p className='hidden'>increace qty</p>
				<Add className='text-primary-500' size={18} />
			</button>
		</div>
	)
}

export default Quantity
