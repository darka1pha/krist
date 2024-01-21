import Image from 'next/image'
import Link from 'next/link'

const CategoryCard = ({
	name,
	id,
	image,
}: {
	name: string | null
	id: number
	image: string | null
}) => {
	return (
		<div className='relative'>
			<div className='aspect-w-10 aspect-h-14 w-full overflow-hidden rounded-lg bg-gray-200 '>
				<Image alt='image' src={image} objectFit='cover' layout='fill' />
			</div>
			<Link href={`/${name.toLocaleLowerCase()}`}>
				<button className='btn-secondary absolute z-10 bottom-2 mx-auto left-1/2 transform -translate-x-1/2 w-[90%]'>
					{name}
				</button>
			</Link>
		</div>
	)
}

export default CategoryCard
