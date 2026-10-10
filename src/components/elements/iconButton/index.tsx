'use client'
import { cn } from '@/utils'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

const IconButton = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
) => {
	const { pending } = useFormStatus()
	return (
		<button
			{...{
				...props,
				disabled: pending || props.disabled,
				className: cn(
					'p-2 rounded-full active:scale-95 flex justify-center items-center cursor-pointer transition-all disabled:opacity-50',
					props.className
				),
			}}>
			{pending ? (
				<Loader2 size={16} className='animate-spin' />
			) : (
				props.children
			)}
		</button>
	)
}

export default IconButton
