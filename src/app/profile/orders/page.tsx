import Link from 'next/link'
import { Package, Truck, ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react'

// Mock order data representation for orders screen
const sampleOrders = [
	{
		id: 'KRT-2026-8819',
		date: 'October 4, 2026',
		status: 'Delivered',
		total: 285.0,
		itemsCount: 2,
		trackingNumber: '1Z9999999999999999',
		items: [
			{
				name: 'Cashmere Minimalist Scarf',
				brand: 'Krist Atelier',
				price: 165.0,
				qty: 1,
				image: '/images/hero.webp',
			},
			{
				name: 'Gilded Leather Cuff',
				brand: 'Aura',
				price: 120.0,
				qty: 1,
				image: '/images/hero.webp',
			},
		],
	},
	{
		id: 'KRT-2026-7542',
		date: 'September 18, 2026',
		status: 'Delivered',
		total: 95.0,
		itemsCount: 1,
		trackingNumber: '1Z8888888888888888',
		items: [
			{
				name: 'Silver Geometric Ring Set',
				brand: 'Krist Atelier',
				price: 95.0,
				qty: 1,
				image: '/images/hero.webp',
			},
		],
	},
]

const Orders = () => {
	return (
		<div className='w-full'>
			{/* Header */}
			<div className='flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6'>
				<div>
					<h1 className='text-3xl font-extrabold tracking-tight'>Order History</h1>
					<p className='text-sm text-gray-500 mt-1'>
						Review recent orders, download invoices, and track live deliveries.
					</p>
				</div>
				<Link
					href='/products'
					className='text-sm font-medium text-primary-500 hover:underline flex items-center gap-1'>
					Continue shopping <ArrowRight size={16} />
				</Link>
			</div>

			{/* Orders list */}
			{sampleOrders.length === 0 ? (
				<div className='flex flex-col items-center justify-center py-16 text-center bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-800'>
					<div className='w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3 text-zinc-700 dark:text-zinc-300'>
						<Package size={28} />
					</div>
					<h2 className='text-lg font-bold mb-1'>No orders found</h2>
					<p className='text-gray-500 text-sm max-w-sm mb-5'>
						When you complete a purchase, your order history and tracking info will be visible here.
					</p>
					<Link href='/products'>
						<button className='btn-primary px-6 py-2.5 text-sm font-semibold'>
							Start Shopping
						</button>
					</Link>
				</div>
			) : (
				<div className='space-y-6'>
					{sampleOrders.map((order) => (
						<div
							key={order.id}
							className='rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden'>
							{/* Order Card Header */}
							<div className='flex flex-wrap items-center justify-between gap-4 p-5 bg-gray-50/70 dark:bg-zinc-800/40 border-b border-gray-100 dark:border-zinc-800 text-sm'>
								<div className='flex flex-wrap items-center gap-6'>
									<div>
										<span className='text-xs text-gray-400 uppercase tracking-wider block'>
											Order Placed
										</span>
										<span className='font-semibold text-zinc-900 dark:text-zinc-100'>
											{order.date}
										</span>
									</div>
									<div>
										<span className='text-xs text-gray-400 uppercase tracking-wider block'>
											Total Amount
										</span>
										<span className='font-semibold text-zinc-900 dark:text-zinc-100'>
											${order.total.toFixed(2)}
										</span>
									</div>
									<div>
										<span className='text-xs text-gray-400 uppercase tracking-wider block'>
											Order Number
										</span>
										<span className='font-mono font-medium text-zinc-700 dark:text-zinc-300'>
											{order.id}
										</span>
									</div>
								</div>

								<div className='flex items-center gap-2'>
									<span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'>
										<CheckCircle2 size={13} /> {order.status}
									</span>
								</div>
							</div>

							{/* Order Items */}
							<div className='divide-y divide-gray-100 dark:divide-zinc-800 p-5'>
								{order.items.map((item, idx) => (
									<div
										key={idx}
										className='flex items-center justify-between py-4 first:pt-0 last:pb-0 gap-4'>
										<div className='flex items-center gap-4'>
											<div className='w-14 h-14 rounded-xl bg-gray-100 dark:bg-zinc-800 overflow-hidden shrink-0 relative'>
												<img
													src={item.image}
													alt={item.name}
													className='object-cover w-full h-full'
												/>
											</div>
											<div>
												<h4 className='font-bold text-sm text-zinc-900 dark:text-zinc-100'>
													{item.name}
												</h4>
												<p className='text-xs text-gray-500 mt-0.5'>
													Brand: {item.brand} &bull; Qty: {item.qty}
												</p>
											</div>
										</div>
										<div className='text-right'>
											<span className='font-bold text-sm text-zinc-900 dark:text-zinc-100'>
												${(item.price * item.qty).toFixed(2)}
											</span>
										</div>
									</div>
								))}
							</div>

							{/* Order Card Footer */}
							<div className='flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-gray-50/40 dark:bg-zinc-800/20 border-t border-gray-100 dark:border-zinc-800 text-xs text-gray-500'>
								<div className='flex items-center gap-2'>
									<Truck size={15} />
									<span>Tracking ID: <span className='font-mono text-zinc-700 dark:text-zinc-300'>{order.trackingNumber}</span></span>
								</div>
								<div className='flex items-center gap-3'>
									<button className='hover:underline font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-1'>
										Download Invoice <ExternalLink size={12} />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Orders
