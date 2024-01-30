'use client'
import { useSearchParams } from 'next/navigation'
import ColorItem from './colorItem'

const ColorPicker = ({ colors }: { colors: string[] | undefined }) => {
	const searchParams = useSearchParams()
	return (
		<div className='my-5'>
			<h3 className='text-xl font-bold mb-4'>Color</h3>
			<div className='flex flex-wrap'>
				{colors?.map((color, key) => (
					<ColorItem
						key={key}
						color={color}
						selected={
							searchParams.get('color')
								? color === searchParams.get('color')
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

export default ColorPicker
