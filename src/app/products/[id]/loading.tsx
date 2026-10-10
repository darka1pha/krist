const ProductLoading = () => {
	return (
		<main className='max-w-7xl mx-auto paddings animate-pulse'>
			{/* Breadcrumb Skeleton */}
			<div className='flex items-center gap-2 mb-8'>
				<div className='h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800' />
				<div className='h-4 w-3 rounded bg-zinc-200 dark:bg-zinc-800' />
				<div className='h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800' />
				<div className='h-4 w-3 rounded bg-zinc-200 dark:bg-zinc-800' />
				<div className='h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800' />
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14'>
				{/* Gallery Column Skeleton */}
				<div className='space-y-4'>
					<div className='w-full aspect-[4/5] rounded-3xl bg-zinc-200 dark:bg-zinc-800' />
					<div className='grid grid-cols-4 gap-3'>
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className='aspect-square rounded-2xl bg-zinc-200 dark:bg-zinc-800'
							/>
						))}
					</div>
				</div>

				{/* Product Info Column Skeleton */}
				<div className='space-y-6'>
					{/* Brand & Title */}
					<div className='space-y-3'>
						<div className='h-6 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800' />
						<div className='space-y-2'>
							<div className='h-10 w-4/5 rounded-2xl bg-zinc-300 dark:bg-zinc-700' />
							<div className='h-10 w-3/5 rounded-2xl bg-zinc-300 dark:bg-zinc-700' />
						</div>

						{/* Ratings & Stock */}
						<div className='flex items-center gap-4 pt-1'>
							<div className='flex items-center gap-1.5'>
								<div className='h-4 w-24 rounded bg-amber-200 dark:bg-amber-950/40' />
								<div className='h-4 w-8 rounded bg-zinc-200 dark:bg-zinc-800' />
							</div>
							<div className='h-6 w-24 rounded-full bg-emerald-100 dark:bg-emerald-950/40' />
						</div>

						{/* Price */}
						<div className='flex items-baseline gap-3 pt-3'>
							<div className='h-10 w-28 rounded-xl bg-zinc-300 dark:bg-zinc-700' />
							<div className='h-6 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-800' />
							<div className='h-6 w-20 rounded-md bg-emerald-100 dark:bg-emerald-950/40' />
						</div>
					</div>

					{/* Description */}
					<div className='space-y-2 py-4 border-y border-gray-100 dark:border-zinc-800'>
						<div className='h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800' />
						<div className='h-4 w-11/12 rounded bg-zinc-200 dark:bg-zinc-800' />
						<div className='h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800' />
					</div>

					{/* Color Picker Skeleton */}
					<div className='space-y-2'>
						<div className='h-4 w-14 rounded bg-zinc-200 dark:bg-zinc-800' />
						<div className='flex gap-2.5'>
							{[...Array(4)].map((_, i) => (
								<div
									key={i}
									className='w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800'
								/>
							))}
						</div>
					</div>

					{/* Size Picker Skeleton */}
					<div className='space-y-2'>
						<div className='h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800' />
						<div className='flex gap-2.5'>
							{[...Array(4)].map((_, i) => (
								<div
									key={i}
									className='w-12 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800'
								/>
							))}
						</div>
					</div>

					{/* Quantity & CTA Skeleton */}
					<div className='flex items-center gap-3 pt-4'>
						<div className='h-12 w-32 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0' />
						<div className='h-12 flex-1 rounded-xl bg-zinc-400 dark:bg-zinc-700' />
						<div className='h-12 w-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0' />
					</div>

					{/* Trust Badges */}
					<div className='grid grid-cols-3 gap-3 pt-6 border-t border-gray-100 dark:border-zinc-800'>
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className='p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center gap-2'>
								<div className='w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800' />
								<div className='h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800' />
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	)
}

export default ProductLoading
