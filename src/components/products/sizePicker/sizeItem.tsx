'use client'
import { cn, addSearchParams } from '@/app/utils'
import { useRouter } from 'next/navigation'

const SizeItem = ({ size, selected }: { size: string; selected: boolean }) => {
	const router = useRouter()
	return (
		<div
			onClick={() => router.push(addSearchParams('size', size))}
			className={cn(
				`h-10 w-10 rounded-lg cursor-pointer mx-2 transition-all ease-in-out flex justify-center items-center`,
				selected ? 'scale-110 shadow-md' : ''
			)}>
			{size}
		</div>
	)
}

export default SizeItem
