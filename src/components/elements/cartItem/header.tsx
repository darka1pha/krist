const Header = () => {
	return (
		<div className='p-4 border-b border-gray-[#f6f6f6] grid grid-cols-12 grid-flow-row'>
			<span className='col-span-8 md:col-span-1'>
				<h2 className='text-lg font-bold mb-2'>Products</h2>
			</span>
			<span className='px-2 col-span-4'></span>
			<span className='grid col-span-3 md:col-span-1 place-items-center'>
				<h3 className='grid text-md justify-items-center'>Price</h3>
			</span>
			<span className='grid col-span-4 md:col-span-3 place-items-center'>
				<h3 className='text-md'>Quantity</h3>
			</span>
			<span className='grid col-span-3  md:col-span-1 place-items-center'>
				<h3 className='text-md'>Subtotal</h3>
			</span>
			<span className='col-span-2'></span>
		</div>
	)
}

export default Header
