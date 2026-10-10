const CartLoading = () => {
	return (
		<main className='max-w-7xl mx-auto paddings animate-pulse space-y-8'>
			{/* Header */}
			<div className='space-y-2 border-b border-gray-100 dark:border-zinc-800 pb-5'>
				<div className='h-9 w-48 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
				<div className='h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800' />
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
				{/* Cart Items Column */}
				<div className='lg:col-span-8 space-y-4'>
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className='p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 flex gap-4 sm:gap-6 items-center'>
							{/* Item image */}
							<div className='w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0' />
							{/* Item details */}
							<div className='flex-1 space-y-2.5'>
								<div className='h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800' />
								<div className='h-5 w-48 rounded-lg bg-zinc-300 dark:bg-zinc-700' />
								<div className='h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800' />
								<div className='flex items-center gap-3 pt-2'>
									<div className='h-9 w-28 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
									<div className='h-9 w-9 rounded-xl bg-zinc-200 dark:bg-zinc-800' />
								</div>
							</div>
							{/* Price */}
							<div className='h-6 w-20 rounded bg-zinc-300 dark:bg-zinc-700 shrink-0 self-start sm:self-center' />
						</div>
					))}
				</div>

				{/* Order Summary Column */}
				<div className='lg:col-span-4'>
					<div className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 space-y-6 shadow-sm sticky top-28'>
						<div className='h-6 w-36 rounded-lg bg-zinc-300 dark:bg-zinc-700' />
						<div className='space-y-3 pb-4 border-b border-gray-100 dark:border-zinc-800'>
							{[...Array(3)].map((_, i) => (
								<div key={i} className='flex justify-between'>
									<div className='h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800' />
									<div className='h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800' />
								</div>
							))}
						</div>
						<div className='flex justify-between items-center'>
							<div className='h-5 w-24 rounded bg-zinc-300 dark:bg-zinc-700' />
							<div className='h-6 w-28 rounded-lg bg-zinc-300 dark:bg-zinc-700' />
						</div>
						<div className='h-12 w-full rounded-xl bg-zinc-400 dark:bg-zinc-700' />
					</div>
				</div>
			</div>
		</main>
	)
}

export default CartLoading
