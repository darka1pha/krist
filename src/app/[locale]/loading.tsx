const Loading = () => {
	return (
		<main className='paddings'>
			<div className='flex w-full h-[50vh] md:h-[85vh] animate-pulse bg-primary-100 rounded-xl'></div>
			<div className='mb-16'>
				<div className='flex my-10 h-fit w-full justify-between items-center'>
					<div className='max-w-40 rounded-xl w-full h-12 bg-primary-100 animate-pulse' />
					<div className='max-w-40 rounded-xl w-full h-12 bg-primary-100 animate-pulse' />
				</div>
				<div className='bg-primary-100 animate-pulse w-full h-72 rounded-xl max-w-2xl lg:max-w-7xl mx-auto' />
			</div>
			<div className='flex justify-center items-center flex-col mt-24'>
				<div className='max-w-60 rounded-xl w-full h-12 bg-primary-100 animate-pulse mb-5' />
				<div className='mx-auto max-w-2xl lg:max-w-7xl w-full bg-primary-100 rounded-xl animate-pulse h-[50vh]' />
			</div>
		</main>
	)
}

export default Loading
