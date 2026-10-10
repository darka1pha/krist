const Loading = () => {
	return (
		<main className='max-w-7xl mx-auto paddings space-y-16 animate-pulse'>
			{/* Luxury Hero Banner Skeleton */}
			<div className='relative w-full h-[55vh] md:h-[72vh] min-h-[460px] rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800/80 dark:to-zinc-900 p-8 sm:p-12 md:p-16 flex flex-col justify-center'>
				<div className='max-w-xl space-y-5'>
					{/* Season Pill */}
					<div className='h-7 w-36 rounded-full bg-zinc-300 dark:bg-zinc-700/60' />
					{/* Main Headline */}
					<div className='space-y-3'>
						<div className='h-10 sm:h-14 w-full rounded-2xl bg-zinc-300 dark:bg-zinc-700/60' />
						<div className='h-10 sm:h-14 w-4/5 rounded-2xl bg-zinc-300 dark:bg-zinc-700/60' />
					</div>
					{/* Subtitle */}
					<div className='h-5 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800' />
					{/* Dual CTA Buttons */}
					<div className='flex gap-4 pt-4'>
						<div className='h-12 w-40 rounded-xl bg-zinc-400 dark:bg-zinc-700' />
						<div className='h-12 w-36 rounded-xl bg-zinc-200 dark:bg-zinc-800 border border-zinc-300/40 dark:border-zinc-700/40' />
					</div>
				</div>
			</div>

			{/* 4-Pillar Features Bar Skeleton */}
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className='p-5 rounded-2xl border border-gray-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 flex items-center gap-4'>
						<div className='w-12 h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0' />
						<div className='space-y-2 flex-1'>
							<div className='h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800' />
							<div className='h-3 w-32 rounded bg-zinc-100 dark:bg-zinc-800/60' />
						</div>
					</div>
				))}
			</div>

			{/* Categories Slider Skeleton */}
			<div className='space-y-6'>
				<div className='flex items-end justify-between'>
					<div className='space-y-2'>
						<div className='h-5 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800' />
						<div className='h-8 w-56 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
					</div>
					<div className='flex gap-2'>
						<div className='w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800' />
						<div className='w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800' />
					</div>
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5'>
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className='aspect-[4/5] rounded-2xl bg-zinc-200 dark:bg-zinc-800/70 relative overflow-hidden p-4 flex flex-col justify-end'>
							<div className='h-6 w-28 rounded-lg bg-zinc-300 dark:bg-zinc-700' />
						</div>
					))}
				</div>
			</div>

			{/* Featured Products Grid Skeleton */}
			<div className='space-y-8 pt-4'>
				<div className='flex items-end justify-between border-b border-gray-100 dark:border-zinc-800 pb-5'>
					<div className='space-y-2'>
						<div className='h-5 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800' />
						<div className='h-8 w-64 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
					</div>
					<div className='hidden sm:flex gap-2'>
						{[...Array(3)].map((_, i) => (
							<div key={i} className='h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800' />
						))}
					</div>
				</div>

				<div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{[...Array(8)].map((_, i) => (
						<div
							key={i}
							className='rounded-2xl border border-gray-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col'>
							<div className='aspect-[4/5] w-full bg-zinc-200 dark:bg-zinc-800' />
							<div className='p-4 space-y-3 flex-1 flex flex-col justify-between'>
								<div className='space-y-2'>
									<div className='flex items-center gap-2'>
										<div className='h-3 w-12 rounded bg-amber-200 dark:bg-amber-950/40' />
										<div className='h-3 w-8 rounded bg-zinc-200 dark:bg-zinc-800' />
									</div>
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
			</div>
		</main>
	)
}

export default Loading
