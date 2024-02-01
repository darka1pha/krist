'use client'
import { cn, addSearchParams } from '@/utils'
import { useRouter } from 'next/navigation'

const ColorItem = ({
	color,
	selected,
}: {
	color: string
	selected: boolean
}) => {
	const router = useRouter()
	return (
		<div
			onClick={() => router.push(addSearchParams('color', color))}
			style={{
				backgroundColor: color,
			}}
			className={cn(
				`h-10 w-10 rounded-lg cursor-pointer mx-2 transition-all ease-in-out`,
				selected ? 'scale-110 shadow-lg' : ''
			)}
		/>
	)
}

export default ColorItem
