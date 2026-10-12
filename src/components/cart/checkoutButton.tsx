'use client'

import React, { useState } from 'react'
import CheckoutModal, { AddressItem } from './checkoutModal'
import { ArrowRight, Lock, MapPin, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/toast'

interface CheckoutButtonProps {
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

export default function CheckoutButton({
	grandTotal,
	subtotal,
	deliveryCharge,
	itemsCount,
	initialAddresses = [],
	profileAddress = null,
	userName = '',
	userEmail = '',
	isLoggedIn = true,
}: CheckoutButtonProps) {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const toast = useToast()

	const hasAddress =
		initialAddresses.length > 0 || (profileAddress && profileAddress.trim().length > 0)

	const handleOpen = () => {
		if (!isLoggedIn) {
			toast.info('Sign In Required', 'Please sign in to your account to complete checkout.')
			router.push('/auth/sign-in?redirect=/cart')
			return
		}
		setIsOpen(true)
	}

	return (
		<div className='space-y-3 w-full'>
			{/* Address notice if missing */}
			{!hasAddress && isLoggedIn && (
				<div className='p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2'>
					<AlertCircle size={14} className='text-amber-600 dark:text-amber-400 shrink-0' />
					<span>Shipping address required before placing order</span>
				</div>
			)}

			<button
				type='button'
				onClick={handleOpen}
				className='btn-primary w-full py-4 text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer'>
				<Lock size={14} />
				<span>Proceed To Checkout</span>
				<ArrowRight size={14} />
			</button>

			<CheckoutModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				grandTotal={grandTotal}
				subtotal={subtotal}
				deliveryCharge={deliveryCharge}
				itemsCount={itemsCount}
				initialAddresses={initialAddresses}
				profileAddress={profileAddress}
				userName={userName}
				userEmail={userEmail}
				isLoggedIn={isLoggedIn}
			/>
		</div>
	)
}
