'use client'

import { addSearchParams, cn } from '@/app/utils'
import { useRouter } from 'next/navigation'
import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

interface FormOptionProps
	extends DetailedHTMLProps<
		SelectHTMLAttributes<HTMLSelectElement>,
		HTMLSelectElement
	> {
	for: string
}

const FormSelect = (props: FormOptionProps) => {
	const router = useRouter()

	return (
		<select
			{...{
				...props,
				className: cn('select', props.className),
				onChange: (e) => {
					router.push(addSearchParams(props.for, e.target.value))
				},
			}}>
			{props.children}
		</select>
	)
}

export default FormSelect
