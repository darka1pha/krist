import { cn } from '@/app/utils'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

const IconButton = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
) => {
	return (
		<button
			{...{
				...props,
				className: cn(
					'p-2 rounded-full bg-white active:scale-95',
					props.className
				),
			}}>
			{props.children}
		</button>
	)
}

export default IconButton
