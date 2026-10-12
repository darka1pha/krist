'use client'

import React, { useState } from 'react'
import { Phone, Trash2 } from 'lucide-react'
import { deleteAddressAction } from '@/actions/profile'
import { useToast } from '@/components/toast'

const AddressCard = ({
	name,
	details,
	id,
	phone,
}: {
	name: string
	details: string | null
	id: number
	phone: string
}) => {
	const [isDeleting, setIsDeleting] = useState(false)
	const toast = useToast()

	const handleDelete = async () => {
		if (isDeleting) return
		setIsDeleting(true)
		try {
			await deleteAddressAction(id)
			toast.success('Address Removed', 'The address was successfully deleted.')
		} catch (err: any) {
			toast.error('Error', err?.message || 'Could not delete address.')
			setIsDeleting(false)
		}
	}

	return (
		<div className='border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl p-5 mb-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all'>
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
					onClick={handleDelete}
					disabled={isDeleting}
					className='px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-rose-400 hover:bg-red-100 dark:hover:bg-red-900/40 flex items-center gap-1.5 text-xs font-medium active:scale-95 transition-all cursor-pointer disabled:opacity-50'>
					<Trash2 size={14} />
					<span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
				</button>
			</div>
		</div>
	)
}

export default AddressCard
