import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

const IconButton = (
	props: DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
) => {
	return (
		<button className='p-2 rounded-full bg-zinc-700' {...props}>
			{props.children}
		</button>
	)
}

export default IconButton
