import { Minus, Plus } from 'lucide-react'
import { IconButton } from '..'
import { updateQtyAction } from '@/actions/cart'

const Quantity = ({ qty, id }: { qty: number; id: number }) => {
	return (
		<div className='inline-flex items-center rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-1'>
			<form action={updateQtyAction}>
				<input type='hidden' name='qty' value={qty - 1} />
				<input type='hidden' name='id' value={id} />
				<IconButton
					aria-label='Decrease quantity'
					disabled={qty <= 1}
					className='w-7 h-7 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed'>
					<Minus size={13} />
				</IconButton>
			</form>
			<span className='w-8 text-center text-xs font-bold font-mono'>
				{qty}
			</span>
			<form action={updateQtyAction}>
				<input type='hidden' name='qty' value={qty + 1} />
				<input type='hidden' name='id' value={id} />
				<IconButton
					aria-label='Increase quantity'
					className='w-7 h-7 rounded-lg bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'>
					<Plus size={13} />
				</IconButton>
			</form>
		</div>
	)
}

export default Quantity
