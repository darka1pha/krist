'use client'
import { cn } from '@/utils'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { useFormStatus } from 'react-dom'

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
				className: cn(
					'p-2 rounded-full bg-white active:scale-95 flex justify-center items-center',
					props.className
				),
			}}>
			{pending ? (
				<span className='loading loading-spinner loading-xs bg-primary-500' />
			) : (
				props.children
			)}
		</button>
	)
}

export default IconButton
