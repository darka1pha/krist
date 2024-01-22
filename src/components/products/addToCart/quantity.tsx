'use client'
import { updateSearchParams } from '@/app/utils'
import { Add, Minus } from 'iconsax-react'
import { useRouter, useSearchParams } from 'next/navigation'

const Quantity = () => {
	const params = useSearchParams()
	const router = useRouter()
	const onAddQty = () => {
		const currentQyt = params.has('qty') ? Number(params.get('qty')) : 1
		const newUrl = updateSearchParams('qty', String(currentQyt + 1))
		router.push(newUrl)
	}
	const onMinusQty = () => {
		const currentQty = params.has('qty') ? Number(params.get('qty')) : 1
		if (currentQty !== 1) {
			const newUrl = updateSearchParams('qty', String(currentQty - 1))
			router.push(newUrl)
		}
	}
	return (
		<div className='p-4 border-primary-500 border-2 col-span-3  sm:col-span-2 flex rounded-xl justify-between items-center'>
			<button
				onClick={onMinusQty}
				disabled={
					params.has('qty')
						? Number(params.get('qty')) === 1
							? true
							: false
						: true
				}
				className='disabled:cursor-not-allowed'>
				<Minus className='text-primary-500' size={18} />
			</button>
			<p className='mx-2'>{!params.has('qty') ? 1 : params.get('qty')}</p>
			<button onClick={onAddQty}>
				<Add className='text-primary-500' size={18} />
			</button>
		</div>
	)
}

export default Quantity
