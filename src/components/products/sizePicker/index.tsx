'use client'
import { useSearchParams } from 'next/navigation'
import SizeItem from './sizeItem'

type SizesType = ('S' | 'M' | 'L' | 'XL' | 'XXL')[]

const SizePicker = ({ sizes }: { sizes: SizesType | undefined }) => {
	const searchParams = useSearchParams()
	return (
		<div className='my-5'>
			<h3 className='text-xl font-bold mb-4'>Size</h3>
			<div className='flex flex-wrap'>
				{sizes?.map((size, key) => (
					<SizeItem
						key={key}
						size={size}
						selected={
							searchParams.get('size')
								? size === searchParams.get('size')
								: key === 0
								? true
								: false
						}
					/>
				))}
			</div>
		</div>
	)
}

export default SizePicker
