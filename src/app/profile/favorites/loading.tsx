const FavoritesLoading = () => {
	return (
		<div className='col-span-12 md:col-span-8 lg:col-span-9 w-full space-y-6 animate-pulse'>
			{/* Header */}
			<div className='flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800'>
				<div className='space-y-1.5'>
					<div className='h-8 w-40 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
					<div className='h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800' />
				</div>
			</div>

			{/* Wishlist Cards Grid */}
			<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className='rounded-2xl border border-gray-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col'>
						<div className='aspect-[4/5] w-full bg-zinc-200 dark:bg-zinc-800 relative p-3 flex justify-between items-start'>
							<div className='h-5 w-16 rounded-full bg-zinc-300 dark:bg-zinc-700' />
							<div className='w-8 h-8 rounded-full bg-red-100 dark:bg-red-950/40' />
						</div>
						<div className='p-4 space-y-3 flex-1 flex flex-col justify-between'>
							<div className='space-y-2'>
								<div className='h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800' />
								<div className='h-3 w-16 rounded bg-amber-200 dark:bg-amber-950/40' />
							</div>
							<div className='flex items-center justify-between pt-2 border-t border-gray-50 dark:border-zinc-800/50'>
								<div className='h-5 w-16 rounded bg-zinc-300 dark:bg-zinc-700' />
								<div className='h-8 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800' />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FavoritesLoading
