const CardsGrid = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='mx-auto max-w-2xl lg:max-w-7xl w-full pt-14'>
			<div className='grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
				{children}
			</div>
		</div>
	)
}

export default CardsGrid
