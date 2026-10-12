'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
	X,
	CreditCard,
	ShieldCheck,
	Lock,
	CheckCircle2,
	Truck,
	Sparkles,
	ArrowRight,
	Smartphone,
	Package,
	RotateCcw,
	MapPin,
	Plus,
	AlertCircle,
	Phone,
	Check,
} from 'lucide-react'
import { fakeCheckoutAction } from '@/actions/cart'
import { saveAddressAction } from '@/actions/profile'
import { useToast } from '@/components/toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export interface AddressItem {
	id: number
	name: string
	phone: string
	state: string
	city: string
	details: string
}

interface CheckoutModalProps {
	isOpen: boolean
	onClose: () => void
	grandTotal: number
	subtotal: number
	deliveryCharge: number
	itemsCount: number
	initialAddresses?: AddressItem[]
	profileAddress?: string | null
	userName?: string
	userEmail?: string
	isLoggedIn?: boolean
}

type PaymentMethod = 'card' | 'applepay' | 'cod'

export default function CheckoutModal({
	isOpen,
	onClose,
	grandTotal,
	subtotal,
	deliveryCharge,
	itemsCount,
	initialAddresses = [],
	profileAddress,
	userName = '',
	userEmail = '',
	isLoggedIn = true,
}: CheckoutModalProps) {
	const toast = useToast()
	const router = useRouter()

	// Address state
	const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses)
	const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
		initialAddresses.length > 0 ? initialAddresses[0].id : null
	)
	const [showAddAddress, setShowAddAddress] = useState(false)
	const [isSavingAddress, setIsSavingAddress] = useState(false)

	// New address form fields
	const [newName, setNewName] = useState(userName || '')
	const [newPhone, setNewPhone] = useState('+1 (555) 234-5678')
	const [newState, setNewState] = useState('New York')
	const [newCity, setNewCity] = useState('New York')
	const [newDetails, setNewDetails] = useState('740 Park Avenue, Apt 14B')

	// Payment fields
	const [method, setMethod] = useState<PaymentMethod>('card')
	const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242')
	const [cardName, setCardName] = useState(userName || 'Krist VIP Client')
	const [cardExp, setCardExp] = useState('12/28')
	const [cardCvv, setCardCvv] = useState('888')

	// Process status
	const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle')
	const [statusStep, setStatusStep] = useState('')
	const [confirmedOrder, setConfirmedOrder] = useState<{
		orderId: string
		shippingAddress?: {
			name?: string
			phone?: string
			formatted: string
		}
	} | null>(null)

	// Keep addresses in sync if props change
	useEffect(() => {
		if (initialAddresses.length > 0) {
			setAddresses(initialAddresses)
			if (selectedAddressId === null) {
				setSelectedAddressId(initialAddresses[0].id)
			}
		}
	}, [initialAddresses, selectedAddressId])

	// If no addresses exist, show the add address form by default
	useEffect(() => {
		if (addresses.length === 0 && !profileAddress) {
			setShowAddAddress(true)
		}
	}, [addresses.length, profileAddress])

	const selectedAddress =
		addresses.find((a) => a.id === selectedAddressId) ||
		(addresses.length > 0 ? addresses[0] : null)

	const hasValidAddress = Boolean(
		selectedAddress || (profileAddress && profileAddress.trim().length > 0)
	)

	const handleFillDemoCard = () => {
		setCardNumber('4242 •••• •••• 4242')
		setCardName(userName || 'Krist VIP Client')
		setCardExp('12/28')
		setCardCvv('888')
		toast.success('Test Card Filled', 'Sample test credit card applied.')
	}

	const handleSaveNewAddress = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!newName.trim() || !newPhone.trim() || !newDetails.trim()) {
			toast.error('Missing Information', 'Please fill in all address fields.')
			return
		}

		setIsSavingAddress(true)
		try {
			const saved = await saveAddressAction({
				name: newName,
				phone: newPhone,
				state: newState,
				city: newCity,
				details: newDetails,
			})

			const createdAddressItem: AddressItem = {
				id: saved.id,
				name: saved.name,
				phone: saved.phone,
				state: saved.state,
				city: saved.city,
				details: saved.details,
			}

			setAddresses((prev) => [createdAddressItem, ...prev])
			setSelectedAddressId(saved.id)
			setShowAddAddress(false)
			toast.success(
				'Address Saved',
				'Delivery address saved and selected for your order.'
			)
		} catch (err: any) {
			toast.error('Error', err?.message || 'Could not save address.')
		} finally {
			setIsSavingAddress(false)
		}
	}

	const handlePay = async (e: React.FormEvent) => {
		e.preventDefault()

		// STRICT VALIDATION: User MUST have an address to place an order
		if (!hasValidAddress) {
			toast.error(
				'Delivery Address Required',
				'You must have a delivery address to place an order. Please add your address above.'
			)
			setShowAddAddress(true)
			return
		}

		setStatus('processing')
		setStatusStep('Verifying delivery destination and 256-Bit encryption...')

		setTimeout(() => {
			setStatusStep('Authorizing funds with Test Payment Gateway...')
		}, 700)

		setTimeout(async () => {
			setStatusStep('Securing purchase deed and reserving atelier inventory...')
			try {
				const result = await fakeCheckoutAction(selectedAddressId ?? undefined)
				const orderId =
					result?.orderId || `KRT-${Math.floor(1000 + Math.random() * 9000)}`

				setConfirmedOrder({
					orderId,
					shippingAddress: result?.shippingAddress || {
						name: selectedAddress?.name || userName || 'Valued Client',
						phone: selectedAddress?.phone || '',
						formatted:
							selectedAddress
								? `${selectedAddress.details}, ${selectedAddress.city}, ${selectedAddress.state}`
								: profileAddress || 'Designated Address',
					},
				})
				setStatus('success')
				toast.success(
					'Payment Approved!',
					`Order ${orderId} placed successfully ($${grandTotal.toFixed(2)}).`
				)
			} catch (err: any) {
				setStatus('idle')
				toast.error('Checkout Error', err?.message || 'Transaction could not be completed.')
			}
		}, 1500)
	}

	if (!isOpen) return null

	return (
		<AnimatePresence>
			<div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto'>
				{/* Backdrop */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={status === 'processing' ? undefined : onClose}
					className='fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity'
				/>

				{/* Modal Card */}
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: 20 }}
					transition={{ type: 'spring', damping: 25, stiffness: 300 }}
					className='relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col'>
					{/* Modal Header */}
					<div className='flex items-center justify-between p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 shrink-0'>
						<div className='flex items-center gap-2.5'>
							<div className='w-9 h-9 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center font-bold text-sm shadow-xs'>
								<Lock size={16} />
							</div>
							<div>
								<h2 className='text-base font-extrabold tracking-tight text-zinc-950 dark:text-white'>
									{status === 'success' ? 'Order Confirmed' : 'Krist Secure Checkout'}
								</h2>
								<span className='text-xs text-zinc-500 dark:text-zinc-400'>
									{status === 'success'
										? 'Thank you for your acquisition'
										: 'Delivery Address & Payment Verification'}
								</span>
							</div>
						</div>

						{status !== 'processing' && (
							<button
								onClick={onClose}
								aria-label='Close checkout'
								className='text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer'>
								<X size={18} />
							</button>
						)}
					</div>

					{/* Modal Body (Scrollable) */}
					<div className='p-5 sm:p-6 overflow-y-auto space-y-6 flex-1'>
						{status === 'success' ? (
							/* ORDER CONFIRMED SUCCESS STATE */
							<div className='flex flex-col items-center text-center py-4 space-y-5'>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', damping: 15, stiffness: 250 }}
									className='w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border-4 border-emerald-50 dark:border-emerald-900/40 shadow-lg'>
									<CheckCircle2 size={42} />
								</motion.div>

								<div className='space-y-1.5'>
									<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/20'>
										<Sparkles size={12} />
										<span>Payment Authorized</span>
									</span>
									<h3 className='text-2xl font-black text-zinc-950 dark:text-white'>
										Order Placed Successfully!
									</h3>
									<p className='text-xs text-zinc-500 dark:text-zinc-400 max-w-sm'>
										Your luxury selection has been reserved and routed to our European atelier for express dispatch.
									</p>
								</div>

								{/* Order Deed Card */}
								<div className='w-full p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/80 text-left space-y-2.5 text-xs'>
									<div className='flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-700/60'>
										<span className='text-zinc-500'>Order Reference</span>
										<span className='font-mono font-bold text-zinc-900 dark:text-white'>
											#{confirmedOrder?.orderId}
										</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='text-zinc-500'>Amount Paid</span>
										<span className='font-bold text-emerald-600 dark:text-emerald-400 text-sm'>
											${grandTotal.toFixed(2)}
										</span>
									</div>
									{confirmedOrder?.shippingAddress && (
										<div className='pt-1 pb-1 border-t border-zinc-200/60 dark:border-zinc-700/60'>
											<span className='text-zinc-500 block mb-1'>Delivering To:</span>
											<span className='font-semibold text-zinc-900 dark:text-white block'>
												{confirmedOrder.shippingAddress.name}
											</span>
											<span className='text-zinc-600 dark:text-zinc-300 block'>
												{confirmedOrder.shippingAddress.formatted}
											</span>
											{confirmedOrder.shippingAddress.phone && (
												<span className='text-zinc-500 text-[11px] block mt-0.5'>
													Phone: {confirmedOrder.shippingAddress.phone}
												</span>
											)}
										</div>
									)}
									<div className='flex items-center justify-between pt-1 border-t border-zinc-200/60 dark:border-zinc-700/60'>
										<span className='text-zinc-500'>Fulfillment</span>
										<span className='font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1'>
											<Truck size={13} /> Insured Priority Air
										</span>
									</div>
									<div className='flex items-center justify-between'>
										<span className='text-zinc-500'>Est. Delivery</span>
										<span className='font-semibold text-zinc-800 dark:text-zinc-200'>
											2 - 3 Business Days
										</span>
									</div>
								</div>

								{/* Actions */}
								<div className='flex flex-col sm:flex-row items-center gap-3 w-full pt-2'>
									<Link
										href='/profile/orders'
										onClick={onClose}
										className='btn-primary w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2'>
										<Package size={15} />
										<span>View Order History</span>
									</Link>
									<Link
										href='/products'
										onClick={onClose}
										className='w-full py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-bold uppercase tracking-wider text-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'>
										Continue Shopping
									</Link>
								</div>
							</div>
						) : status === 'processing' ? (
							/* PROCESSING STATE */
							<div className='flex flex-col items-center justify-center py-16 text-center space-y-4'>
								<div className='relative w-16 h-16 flex items-center justify-center'>
									<div className='w-16 h-16 rounded-full border-4 border-zinc-200 dark:border-zinc-800 border-t-zinc-950 dark:border-t-white animate-spin' />
									<Lock size={20} className='absolute text-zinc-500' />
								</div>
								<h3 className='text-lg font-bold text-zinc-950 dark:text-white'>
									Authorizing Payment...
								</h3>
								<p className='text-xs font-mono text-zinc-500 dark:text-zinc-400 animate-pulse'>
									{statusStep}
								</p>
							</div>
						) : (
							/* CHECKOUT FORM */
							<form onSubmit={handlePay} className='space-y-6'>
								{/* SECTION 1: MANDATORY DELIVERY ADDRESS */}
								<div className='space-y-3'>
									<div className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<MapPin size={16} className='text-amber-600 dark:text-amber-400' />
											<label className='text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white'>
												1. Delivery Address <span className='text-rose-500'>*</span>
											</label>
										</div>
										{!showAddAddress && (
											<button
												type='button'
												onClick={() => setShowAddAddress(true)}
												className='text-xs font-bold text-zinc-950 dark:text-white hover:underline flex items-center gap-1 cursor-pointer'>
												<Plus size={13} /> Add New Address
											</button>
										)}
									</div>

									{/* If user has NO address at all, display mandatory warning */}
									{!hasValidAddress && !showAddAddress && (
										<div className='p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3'>
											<AlertCircle size={18} className='text-amber-600 dark:text-amber-400 shrink-0 mt-0.5' />
											<div className='text-xs space-y-1'>
												<p className='font-bold text-amber-900 dark:text-amber-200'>
													Address Required to Place Order
												</p>
												<p className='text-amber-700 dark:text-amber-300/80'>
													You must specify a shipping address before completing your purchase.
												</p>
												<button
													type='button'
													onClick={() => setShowAddAddress(true)}
													className='mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold text-xs shadow-xs hover:bg-amber-700 transition-colors'>
													<Plus size={13} /> Add Delivery Address Now
												</button>
											</div>
										</div>
									)}

									{/* List of saved addresses */}
									{addresses.length > 0 && !showAddAddress && (
										<div className='space-y-2'>
											{addresses.map((addr) => {
												const isSelected = selectedAddressId === addr.id
												return (
													<div
														key={addr.id}
														onClick={() => setSelectedAddressId(addr.id)}
														className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
															isSelected
																? 'border-zinc-950 dark:border-white bg-zinc-50 dark:bg-zinc-800/80 ring-1 ring-zinc-950 dark:ring-white shadow-xs'
																: 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
														}`}>
														<div className='space-y-0.5 text-xs flex-1'>
															<div className='flex items-center gap-2'>
																<span className='font-bold text-zinc-950 dark:text-white text-sm'>
																	{addr.name}
																</span>
																{isSelected && (
																	<span className='inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold'>
																		<Check size={10} /> Active
																	</span>
																)}
															</div>
															<p className='text-zinc-600 dark:text-zinc-300'>
																{addr.details}, {addr.city}, {addr.state}
															</p>
															<div className='flex items-center gap-1 text-zinc-400 text-[11px] pt-0.5'>
																<Phone size={11} /> {addr.phone}
															</div>
														</div>
														<div
															className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
																isSelected
																	? 'border-zinc-950 dark:border-white bg-zinc-950 dark:bg-white text-white dark:text-zinc-950'
																	: 'border-zinc-300 dark:border-zinc-700'
															}`}>
															{isSelected && <div className='w-1.5 h-1.5 rounded-full bg-white dark:bg-zinc-950' />}
														</div>
													</div>
												)
											})}
										</div>
									)}

									{/* Fallback to Profile address if no address table entries */}
									{addresses.length === 0 && profileAddress && !showAddAddress && (
										<div className='p-3.5 rounded-2xl border border-zinc-950 dark:border-white bg-zinc-50 dark:bg-zinc-800/80 ring-1 ring-zinc-950 dark:ring-white text-xs space-y-1'>
											<div className='flex items-center justify-between'>
												<span className='font-bold text-zinc-950 dark:text-white'>
													{userName || 'Account Primary Address'}
												</span>
												<span className='inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold'>
													<Check size={10} /> Profile Default
												</span>
											</div>
											<p className='text-zinc-600 dark:text-zinc-300'>{profileAddress}</p>
										</div>
									)}

									{/* Inline Add Address Form */}
									{showAddAddress && (
										<div className='p-4 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/80 dark:bg-zinc-800/40 space-y-3 text-xs'>
											<div className='flex items-center justify-between pb-1'>
												<span className='font-extrabold text-zinc-950 dark:text-white uppercase tracking-wider text-[11px]'>
													Add New Shipping Address
												</span>
												{addresses.length > 0 && (
													<button
														type='button'
														onClick={() => setShowAddAddress(false)}
														className='text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'>
														Cancel
													</button>
												)}
											</div>

											<div className='grid grid-cols-2 gap-3'>
												<div className='col-span-2 sm:col-span-1 space-y-1'>
													<label className='text-[10px] font-bold uppercase text-zinc-500'>
														Recipient Full Name
													</label>
													<input
														type='text'
														required
														value={newName}
														onChange={(e) => setNewName(e.target.value)}
														placeholder='Full Name'
														className='w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white'
													/>
												</div>

												<div className='col-span-2 sm:col-span-1 space-y-1'>
													<label className='text-[10px] font-bold uppercase text-zinc-500'>
														Phone Number
													</label>
													<input
														type='tel'
														required
														value={newPhone}
														onChange={(e) => setNewPhone(e.target.value)}
														placeholder='+1 (555) 000-0000'
														className='w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white'
													/>
												</div>

												<div className='col-span-2 space-y-1'>
													<label className='text-[10px] font-bold uppercase text-zinc-500'>
														Street Address & Apt / Suite
													</label>
													<input
														type='text'
														required
														value={newDetails}
														onChange={(e) => setNewDetails(e.target.value)}
														placeholder='e.g. 740 Park Avenue, Apt 14B'
														className='w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white'
													/>
												</div>

												<div className='col-span-2 sm:col-span-1 space-y-1'>
													<label className='text-[10px] font-bold uppercase text-zinc-500'>
														City
													</label>
													<input
														type='text'
														required
														value={newCity}
														onChange={(e) => setNewCity(e.target.value)}
														placeholder='City'
														className='w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white'
													/>
												</div>

												<div className='col-span-2 sm:col-span-1 space-y-1'>
													<label className='text-[10px] font-bold uppercase text-zinc-500'>
														State / Province
													</label>
													<input
														type='text'
														required
														value={newState}
														onChange={(e) => setNewState(e.target.value)}
														placeholder='State'
														className='w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white'
													/>
												</div>
											</div>

											<div className='flex items-center justify-end gap-2 pt-2'>
												{addresses.length > 0 && (
													<button
														type='button'
														onClick={() => setShowAddAddress(false)}
														className='px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors'>
														Cancel
													</button>
												)}
												<button
													type='button'
													onClick={handleSaveNewAddress}
													disabled={isSavingAddress}
													className='btn-primary px-4 py-2 rounded-xl font-bold flex items-center gap-1.5 shadow-sm'>
													{isSavingAddress ? (
														<span>Saving...</span>
													) : (
														<>
															<Check size={14} />
															<span>Save & Use Address</span>
														</>
													)}
												</button>
											</div>
										</div>
									)}
								</div>

								{/* SECTION 2: PAYMENT METHOD */}
								<div className='space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800'>
									<div className='flex items-center gap-2'>
										<CreditCard size={16} className='text-amber-600 dark:text-amber-400' />
										<label className='text-xs font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white'>
											2. Payment Method
										</label>
									</div>

									<div className='grid grid-cols-3 gap-2'>
										<button
											type='button'
											onClick={() => setMethod('card')}
											className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
												method === 'card'
													? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 shadow-sm'
													: 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
											}`}>
											<CreditCard size={18} />
											<span>Credit Card</span>
										</button>

										<button
											type='button'
											onClick={() => setMethod('applepay')}
											className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
												method === 'applepay'
													? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 shadow-sm'
													: 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
											}`}>
											<Smartphone size={18} />
											<span>Apple Pay</span>
										</button>

										<button
											type='button'
											onClick={() => setMethod('cod')}
											className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
												method === 'cod'
													? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 shadow-sm'
													: 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
											}`}>
											<Truck size={18} />
											<span>Concierge COD</span>
										</button>
									</div>

									{/* Card inputs */}
									{method === 'card' && (
										<div className='space-y-3.5 pt-2'>
											<div className='flex items-center justify-between'>
												<span className='text-[11px] font-semibold text-zinc-500'>
													Card Information
												</span>
												<button
													type='button'
													onClick={handleFillDemoCard}
													className='text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer'>
													<RotateCcw size={11} /> Fill Test Card
												</button>
											</div>

											<div className='relative'>
												<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400'>
													<CreditCard size={16} />
												</div>
												<input
													type='text'
													required
													value={cardNumber}
													onChange={(e) => setCardNumber(e.target.value)}
													placeholder='4242 4242 4242 4242'
													className='w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all'
												/>
											</div>

											<input
												type='text'
												required
												value={cardName}
												onChange={(e) => setCardName(e.target.value)}
												placeholder='Cardholder Name'
												className='w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all'
											/>

											<div className='grid grid-cols-2 gap-3'>
												<input
													type='text'
													required
													value={cardExp}
													onChange={(e) => setCardExp(e.target.value)}
													placeholder='MM/YY'
													className='w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all'
												/>
												<input
													type='text'
													required
													value={cardCvv}
													onChange={(e) => setCardCvv(e.target.value)}
													placeholder='CVV / CVC'
													className='w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all'
												/>
											</div>
										</div>
									)}

									{method === 'applepay' && (
										<div className='p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-center space-y-2 text-xs'>
											<Smartphone size={28} className='mx-auto text-zinc-800 dark:text-zinc-200' />
											<p className='font-bold text-zinc-900 dark:text-white'>
												1-Click Apple Pay / Google Pay
											</p>
											<p className='text-zinc-500 text-[11px]'>
												Biometric authentication will be simulated upon clicking Authorize.
											</p>
										</div>
									)}

									{method === 'cod' && (
										<div className='p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-center space-y-2 text-xs'>
											<Truck size={28} className='mx-auto text-zinc-800 dark:text-zinc-200' />
											<p className='font-bold text-zinc-900 dark:text-white'>
												White-Glove Courier On Delivery
											</p>
											<p className='text-zinc-500 text-[11px]'>
												Pay upon inspection at your verified shipping address.
											</p>
										</div>
									)}
								</div>

								{/* ORDER TOTAL SUMMARY BANNER */}
								<div className='p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between'>
									<div>
										<span className='text-[11px] text-zinc-500 uppercase tracking-wider block font-semibold'>
											Total to Pay
										</span>
										<span className='text-2xl font-black tracking-tight text-zinc-950 dark:text-white'>
											${grandTotal.toFixed(2)}
										</span>
									</div>
									<span className='text-xs text-zinc-600 dark:text-zinc-400 font-medium bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-700'>
										{itemsCount} {itemsCount === 1 ? 'item' : 'items'}
									</span>
								</div>

								{/* SUBMIT BUTTON WITH ADDRESS GATEKEEPER */}
								{hasValidAddress ? (
									<button
										type='submit'
										className='btn-primary w-full py-4 text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer'>
										<Lock size={14} />
										<span>Authorize Test Payment • ${grandTotal.toFixed(2)}</span>
										<ArrowRight size={14} />
									</button>
								) : (
									<button
										type='button'
										onClick={() => {
											setShowAddAddress(true)
											toast.error(
												'Address Required',
												'You must enter a delivery address to place an order.'
											)
										}}
										className='w-full py-4 text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-dashed border-zinc-300 dark:border-zinc-700 cursor-pointer hover:bg-zinc-300/80 dark:hover:bg-zinc-700/80 transition-colors'>
										<Lock size={14} />
										<span>Add Delivery Address to Place Order</span>
										<Plus size={14} />
									</button>
								)}

								{/* Trust badges */}
								<div className='flex items-center justify-center gap-4 text-[11px] text-zinc-400'>
									<span className='flex items-center gap-1'>
										<ShieldCheck size={13} className='text-emerald-500' /> Simulated Sandbox
									</span>
									<span>•</span>
									<span>Address Verification Required</span>
								</div>
							</form>
						)}
					</div>
				</motion.div>
			</div>
		</AnimatePresence>
	)
}
