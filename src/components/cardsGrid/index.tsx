const CardsGrid = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 w-full'>
			<div className='grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
				{children}
			</div>
		</div>
	)
}

export default CardsGrid
