'use client'
import { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary'
}

const SubmitButton = ({
	children,
	variant,
	className,
	disabled,
	...props
}: SubmitButtonProps) => {
	const { pending } = useFormStatus()
	const isDisabled = pending || disabled

	return (
		<button
			disabled={isDisabled}
			aria-disabled={isDisabled}
			type='submit'
			className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${className || ''}`}
			{...props}>
			{pending ? (
				<>
					<Loader2 size={16} className='animate-spin' />
					<span>Please wait...</span>
				</>
			) : (
				children
			)}
		</button>
	)
}

export default SubmitButton
