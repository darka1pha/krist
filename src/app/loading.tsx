const Loading = () => {
	return (
		<main className='paddings'>
			<div className='flex w-full h-[50vh] md:h-[85vh] animate-pulse bg-gray-200 rounded-xl'></div>
			<div className='mb-16'>
				<div className='flex my-10 h-fit w-full justify-between items-center'>
					<div className='max-w-40 rounded-xl w-full h-12 bg-gray-200 animate-pulse' />
					<div className='max-w-40 rounded-xl w-full h-12 bg-gray-200 animate-pulse' />
				</div>
				<div className='bg-gray-200 animate-pulse w-full h-72 rounded-xl max-w-2xl lg:max-w-7xl mx-auto' />
			</div>
			<div className='flex justify-center items-center flex-col mt-24'>
				<div className='max-w-60 rounded-xl w-full h-12 bg-gray-200 animate-pulse mb-5' />
				<div className='mx-auto max-w-2xl lg:max-w-7xl w-full bg-gray-200 rounded-xl animate-pulse h-[50vh]' />
			</div>
		</main>
	)
}

export default Loading
