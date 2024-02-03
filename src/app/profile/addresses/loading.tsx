const AddressesLoading = () => {
	return (
		<div className='col-span-12 md:col-span-8 xl:col-span-9 w-full'>
			<div className='flex w-full justify-between items-center'>
				<div
					about='name'
					className='h-16 w-40 bg-gray-200 animate-pulse rounded-xl'
				/>
				<div
					about='new address'
					className='h-16 w-16 bg-gray-200 animate-pulse rounded-xl'
				/>
			</div>
			<div className='mt-2 w-full'>
				{Array.from(new Array(4)).map((key) => (
					<div key={key} className='my-4 bg-gray-200 animate-pulse rounded-xl w-full h-36' />
				))}
			</div>
		</div>
	)
}

export default AddressesLoading
