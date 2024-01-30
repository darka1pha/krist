'use client'
import { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary'
}

const SubmitButton = (props: SubmitButtonProps) => {
	const { pending } = useFormStatus()

	return (
		<button
			className='flex justify-center items-center'
			disabled={pending}
			aria-disabled={pending}
			type='submit'
			{...props}>
			{pending ? (
				<span
					className={`loading h-full loading-dots loading-sm ${
						props.variant
							? props.variant === 'secondary'
								? 'bg-primary-500'
								: 'bg-red-50'
							: 'bg-red-50'
					}`}
				/>
			) : (
				props.children
			)}
		</button>
	)
}

export default SubmitButton
