const OrdersLoading = () => {
	return (
		<div className='col-span-12 md:col-span-8 lg:col-span-9 w-full space-y-6 animate-pulse'>
			{/* Header with Title and Filter Tabs */}
			<div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-zinc-800'>
				<div className='space-y-1.5'>
					<div className='h-8 w-40 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
					<div className='h-4 w-48 rounded bg-zinc-200 dark:bg-zinc-800' />
				</div>
				<div className='flex gap-2'>
					{[...Array(3)].map((_, i) => (
						<div key={i} className='h-9 w-20 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
					))}
				</div>
			</div>

			{/* Order Cards */}
			<div className='space-y-4'>
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className='rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-5 shadow-sm'>
						{/* Order header row */}
						<div className='flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-zinc-800/80'>
							<div className='flex items-center gap-4'>
								<div className='w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
								<div className='space-y-1.5'>
									<div className='h-5 w-32 rounded bg-zinc-300 dark:bg-zinc-700' />
									<div className='h-3 w-44 rounded bg-zinc-200 dark:bg-zinc-800' />
								</div>
							</div>
							<div className='h-7 w-24 rounded-full bg-emerald-100 dark:bg-emerald-950/40' />
						</div>

						{/* Order items thumbnails */}
						<div className='flex items-center gap-3'>
							{[...Array(3)].map((_, j) => (
								<div
									key={j}
									className='w-16 h-16 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0'
								/>
							))}
							<div className='space-y-1.5 pl-2'>
								<div className='h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-800' />
								<div className='h-3 w-20 rounded bg-zinc-100 dark:bg-zinc-800/60' />
							</div>
						</div>

						{/* Order footer actions */}
						<div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800/80'>
							<div className='h-6 w-24 rounded bg-zinc-300 dark:bg-zinc-700' />
							<div className='flex gap-3'>
								<div className='h-9 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
								<div className='h-9 w-24 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default OrdersLoading
