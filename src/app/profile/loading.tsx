const ProfileLoading = () => {
	return (
		<div className='col-span-12 md:col-span-8 lg:col-span-9 w-full space-y-8 animate-pulse'>
			{/* Avatar & Header Skeleton */}
			<div className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex items-center justify-between'>
				<div className='flex items-center gap-5'>
					<div className='w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800' />
					<div className='space-y-2'>
						<div className='h-6 w-36 rounded-lg bg-zinc-300 dark:bg-zinc-700' />
						<div className='h-4 w-48 rounded bg-zinc-200 dark:bg-zinc-800' />
					</div>
				</div>
				<div className='h-10 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
			</div>

			{/* Info Form Skeleton */}
			<div className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 space-y-6'>
				<div className='h-6 w-44 rounded-lg bg-zinc-300 dark:bg-zinc-700 pb-2' />
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					{[...Array(4)].map((_, i) => (
						<div key={i} className='space-y-2'>
							<div className='h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800' />
							<div className='h-12 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800/60' />
						</div>
					))}
				</div>
				<div className='flex justify-end pt-4 border-t border-gray-100 dark:border-zinc-800'>
					<div className='h-11 w-36 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
				</div>
			</div>
		</div>
	)
}

export default ProfileLoading
