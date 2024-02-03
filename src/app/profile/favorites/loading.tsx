const FavoritesLoading = () => {
	return (
		<div className='col-span-12 md:col-span-8 xl:col-span-9'>
			<h1 className='h-16 w-32 bg-gray-200 animate-pulse rounded-xl' />
			<div className='mx-auto max-w-2xl lg:max-w-7xl w-full pt-14'>
				<div className='grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
					{Array.from(new Array(10)).map((i) => (
						<div
							key={i}
							className='aspect-w-10 relative aspect-h-14 w-full overflow-hidden rounded-lg bg-gray-200 animate-pulse'
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default FavoritesLoading
