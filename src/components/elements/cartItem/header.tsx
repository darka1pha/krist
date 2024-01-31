const Header = () => {
	return (
		<div className='p-4 border-b border-gray-[#f6f6f6] grid grid-cols-12 grid-flow-row'>
			<span className='col-span-1'>
				<h2 className='text-lg font-bold mb-2'>Products</h2>
			</span>
			<span className='px-2 col-span-5'></span>
			<span className='col-span-1'>
				<h3 className='grid text-md justify-items-center'>Price</h3>
			</span>
			<span className='grid col-span-3 justify-items-center'>
				<h3 className='text-md'>Quantity</h3>
			</span>
			<span className='grid col-span-1 justify-items-center'>
				<h3 className='text-md'>Subtotal</h3>
			</span>
			<span className='grid col-span-1'></span>
		</div>
	)
}

export default Header
