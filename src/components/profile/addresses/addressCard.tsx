import { Phone, Pencil, Trash2 } from 'lucide-react'

const AddressCard = ({
	name,
	details,
	phone,
}: {
	name: string
	details: string | null
	id: number
	phone: string
}) => {
	return (
		<div className='border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-5 mb-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
			<div className='flex-1'>
				<h3 className='text-lg font-bold text-zinc-900 dark:text-zinc-100'>{name}</h3>
				<p className='mt-1 text-sm text-zinc-600 dark:text-zinc-400'>{details}</p>
				<div className='flex items-center gap-2 mt-2 text-xs text-zinc-500 dark:text-zinc-400'>
					<Phone size={14} className='text-zinc-400' />
					<span>{phone}</span>
				</div>
			</div>
			<div className='flex items-center gap-2 self-end sm:self-center'>
				<button
					type='button'
					className='px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center gap-1.5 text-xs font-medium active:scale-95 transition-all'>
					<Pencil size={14} />
					<span>Edit</span>
				</button>
				<button
					type='button'
					className='px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/40 flex items-center gap-1.5 text-xs font-medium active:scale-95 transition-all'>
					<Trash2 size={14} />
					<span>Delete</span>
				</button>
			</div>
		</div>
	)
}

export default AddressCard
