const Loading = () => {
	return (
		<main className='max-w-7xl mx-auto paddings animate-pulse'>
			{/* Breadcrumb skeleton */}
			<div className='flex items-center gap-2 mb-6'>
				<div className='h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800' />
				<div className='h-4 w-3 rounded bg-zinc-200 dark:bg-zinc-800' />
				<div className='h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800' />
			</div>

			<div className='grid grid-cols-12 gap-8'>
				{/* Sidebar Filter Skeleton */}
				<aside className='col-span-12 md:col-span-4 lg:col-span-3 space-y-6'>
					<div className='p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm space-y-4'>
						<div className='flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800'>
							<div className='h-5 w-24 rounded bg-zinc-300 dark:bg-zinc-700' />
							<div className='h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800' />
						</div>
						<div className='space-y-3'>
							{[...Array(6)].map((_, i) => (
								<div key={i} className='flex items-center justify-between py-1'>
									<div className='h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800' />
									<div className='h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-800' />
								</div>
							))}
						</div>
					</div>
				</aside>

				{/* Products Section Skeleton */}
				<section className='col-span-12 md:col-span-8 lg:col-span-9 space-y-6'>
					{/* Shop Toolbar Header */}
					<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-zinc-800'>
						<div className='space-y-1.5'>
							<div className='h-8 w-44 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
							<div className='h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800' />
						</div>
						<div className='flex items-center gap-3'>
							<div className='h-10 w-36 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
						</div>
					</div>

					{/* Product Cards Grid */}
					<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'>
						{[...Array(9)].map((_, i) => (
							<div
								key={i}
								className='rounded-2xl border border-gray-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col'>
								{/* Image placeholder with action button placeholders */}
								<div className='aspect-[4/5] w-full bg-zinc-200 dark:bg-zinc-800 relative p-3 flex justify-between items-start'>
									<div className='h-5 w-16 rounded-full bg-zinc-300 dark:bg-zinc-700' />
									<div className='w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700' />
								</div>
								{/* Info */}
								<div className='p-4 space-y-3 flex-1 flex flex-col justify-between'>
									<div className='space-y-2'>
										<div className='h-3 w-16 rounded bg-amber-200 dark:bg-amber-950/40' />
										<div className='h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800' />
									</div>
									<div className='flex items-center justify-between pt-2 border-t border-gray-50 dark:border-zinc-800/50'>
										<div className='h-5 w-16 rounded bg-zinc-300 dark:bg-zinc-700' />
										<div className='h-4 w-12 rounded bg-emerald-100 dark:bg-emerald-950/40' />
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</main>
	)
}

export default Loading
