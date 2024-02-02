const ProdileLoading = () => {
	return (
		<div className='col-span-9 w-full'>
			<div className='mb-10 flex justify-between items-center w-full' about='header'>
				<div
					className='h-16 w-16 rounded-full bg-gray-300 animate-pulse'
					about='avatar'
				/>

				<div className='h-16 w-32 bg-gray-300 animate-pulse rounded-xl' />
			</div>
			<div className='grid grid-cols-2 w-full gap-4' about='form'>
				<div
					className='col-span-1 h-14 w-full bg-gray-300 animate-pulse rounded-xl'
					about='input'
				/>
				<div
					className='col-span-1 h-14 w-full bg-gray-300 animate-pulse rounded-xl'
					about='input'
				/>
				<div
					className='col-span-2 h-14 w-full bg-gray-300 animate-pulse rounded-xl'
					about='input'
				/>
			</div>
		</div>
	)
}

export default ProdileLoading
