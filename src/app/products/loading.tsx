const Loading = () => {
	return (
		<main className='grid grid-cols-12 gap-5 min-h-screen paddings'>
			<div className='col-span-12 md:col-span-3'>
				<div className='bg-gray-200 animate-pulse min-h-[30vh] md:min-h-[60vh] w-full rounded-xl' />
			</div>
			<div className='col-span-12 md:col-span-9'>
				<h1 className='text-3xl font-bold '>Shop</h1>
				<div className='mx-auto max-w-2xl lg:max-w-7xl w-full pt-14'>
					<div className='grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
						{Array.from(new Array(10)).map(() => (
							<div className='aspect-w-10 relative aspect-h-14 w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse' />
						))}
					</div>
				</div>
			</div>
		</main>
	)
}

export default Loading
