import { Call, Edit, Trash } from 'iconsax-react'

const AddressCard = ({
	name,
	details,
	id,
	phone,
}: {
	name: string
	details: string | null
	id: number
	phone: string
}) => {
	return (
		<div className='border-b border-gray-300 py-4 flex'>
			<div className='flex-1'>
				<h1 className='text-2xl font-bold'>{name}</h1>
				<p className='mt-2'>{details}</p>
				<div className='flex items-center mt-2'>
					<Call size={18} />
					<p className='ml-2 text-sm'>{phone}</p>
				</div>
			</div>
			<div className='flex-1 flex flex-col items-end'>
				<button className='p-3 rounded-2xl mb-2 bg-[#f6f6f6] flex items-center text-sm active:scale-95 transition-all min-w-[90px] justify-center'>
					<Edit size={18} />
					<p className='ml-2'>Edit</p>
				</button>
				<button className='p-3 rounded-2xl bg-[#f6f6f6] text-red-500 flex items-center text-sm active:scale-95 transition-all min-w-[90px] justify-center'>
					<Trash size={18} />
					<p className='ml-2'>Delete</p>
				</button>
			</div>
		</div>
	)
}

export default AddressCard
