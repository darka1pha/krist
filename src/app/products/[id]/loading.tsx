const ProductLoading = () => {
	return (
		<main className='paddings h-[calc(100vh-80px)]'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-5 h-full'>
				<div
					className='px-8 md:px-0 bg-gray-300 animate-pulse h-[40vh] md:h-full rounded-xl'
					about='Gallery'
				/>
				<div className='px-8 md:px-0' about='Info'>
					<div>
						<div
							className='h-12 my-2 w-44 bg-gray-300 animate-pulse rounded-xl'
							about='brand'
						/>
						<div
							className='h-10 my-2 w-48 bg-gray-300 animate-pulse rounded-xl'
							about='name'
						/>
						<div
							className='h-10 my-2 w-40 bg-gray-300 animate-pulse rounded-xl'
							about='price'
						/>
						<div className='mt-6' about='description'>
							<div
								className='h-10 my-2 w-full bg-gray-300 animate-pulse rounded-xl'
								about='line1'
							/>
							<div
								className='h-10 my-2 w-[65%] bg-gray-300 animate-pulse rounded-xl'
								about='line2'
							/>
						</div>
					</div>
					<div className='my-5'>
						<h3 className='h-8 w-16 mb-4 bg-gray-300 animate-pulse rounded-xl' />
						<div className='flex flex-wrap'>
							{Array.from(new Array(4)).map((i) => (
								<div key={i} className='h-10 w-10 rounded-lg m-2 bg-gray-300 animate-pulse ' />
							))}
						</div>
					</div>
					<div className='my-5'>
						<h3 className='h-8 w-16 mb-4 bg-gray-300 animate-pulse rounded-xl' />
						<div className='flex flex-wrap'>
							{Array.from(new Array(2)).map((i) => (
								<div key={i} className='h-10 w-10 rounded-lg mx-2 bg-gray-300 animate-pulse ' />
							))}
						</div>
					</div>

					<div className='grid grid-cols-4 sm:grid-cols-7 gap-2 h-14'>
						<div className='col-span-3  sm:col-span-2  bg-gray-300 animate-pulse rounded-xl h-full' />
						<div className='sm:col-span-1  bg-gray-300 animate-pulse rounded-xl h-full' />
						<div className='col-span-4 bg-gray-300 animate-pulse rounded-xl h-full' />
					</div>
				</div>
			</div>
		</main>
	)
}

export default ProductLoading
