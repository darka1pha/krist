'use client'
import { ButtonHTMLAttributes } from "react"
import { useFormStatus } from "react-dom"

const LogoutButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	const { pending } = useFormStatus()

	return (
		<button
			className='flex justify-center items-center'
			disabled={pending}
			aria-disabled={pending}
			type='submit'
			{...props}>
			{pending ? (
				<span className='loading loading-dots loading-sm logout' />
			) : (
				props.children
			)}
		</button>
	)
}

export default LogoutButton