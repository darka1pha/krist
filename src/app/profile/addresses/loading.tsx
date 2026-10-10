const AddressesLoading = () => {
	return (
		<div className='col-span-12 md:col-span-8 lg:col-span-9 w-full space-y-6 animate-pulse'>
			{/* Header */}
			<div className='flex w-full justify-between items-center pb-4 border-b border-gray-100 dark:border-zinc-800'>
				<div className='space-y-1.5'>
					<div className='h-8 w-44 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
					<div className='h-4 w-56 rounded bg-zinc-200 dark:bg-zinc-800' />
				</div>
				<div className='h-10 w-32 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
			</div>

			{/* Address Cards */}
			<div className='space-y-4'>
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
						<div className='space-y-2.5 flex-1'>
							<div className='flex items-center gap-2'>
								<div className='h-5 w-28 rounded bg-zinc-300 dark:bg-zinc-700' />
								<div className='h-4 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800' />
							</div>
							<div className='h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800' />
							<div className='h-3 w-28 rounded bg-zinc-100 dark:bg-zinc-800/60' />
						</div>
						<div className='flex items-center gap-2'>
							<div className='h-9 w-16 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
							<div className='h-9 w-16 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default AddressesLoading
