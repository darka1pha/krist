'use client'
import { addSearchParams } from '@/utils'
import { Minus, Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const Quantity = () => {
	const params = useSearchParams()
	const router = useRouter()
	const currentQty = params.has('qty') ? Number(params.get('qty')) : 1

	const onAddQty = () => {
		const newUrl = addSearchParams('qty', String(currentQty + 1))
		router.push(newUrl)
	}
	const onMinusQty = () => {
		if (currentQty > 1) {
			const newUrl = addSearchParams('qty', String(currentQty - 1))
			router.push(newUrl)
		}
	}

	return (
		<div className='h-12 min-w-[120px] px-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between shadow-sm'>
			<button
				name='decrease quantity'
				aria-label='Decrease quantity'
				onClick={onMinusQty}
				disabled={currentQty <= 1}
				className='w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer'>
				<Minus size={14} />
			</button>
			<span className='font-mono font-bold text-sm px-2'>
				{currentQty}
			</span>
			<button
				name='increase quantity'
				aria-label='Increase quantity'
				onClick={onAddQty}
				className='w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer'>
				<Plus size={14} />
			</button>
		</div>
	)
}

export default Quantity
