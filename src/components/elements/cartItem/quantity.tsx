import { updateQtyAction } from '@/app/actions/cart'
import { Add, Minus } from 'iconsax-react'
import { IconButton, SubmitButton } from '..'

const Quantity = ({ qty, id }: { qty: number; id: number }) => {
	return (
		<div className='p-2 border-primary-500 border-2 col-span-3  sm:col-span-2 flex rounded-xl justify-between items-center'>
			<form action={updateQtyAction}>
				<input type='hidden' name='qty' value={qty - 1} />
				<input type='hidden' name='id' value={id} />
				<IconButton
					disabled={qty === 1}
					className='disabled:cursor-not-allowed'>
					<Minus className='text-primary-500' size={18} />
				</IconButton>
			</form>
			<p className='mx-2'>{qty}</p>
			<form action={updateQtyAction}>
				<input type='hidden' name='qty' value={qty + 1} />
				<input type='hidden' name='id' value={id} />
				<IconButton>
					<Add className='text-primary-500' size={18} />
				</IconButton>
			</form>
		</div>
	)
}

export default Quantity
