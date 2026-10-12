'use client'

import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
	CheckCircle2,
	AlertCircle,
	ShoppingBag,
	X,
	ArrowRight,
	Sparkles,
} from 'lucide-react'
import Link from 'next/link'

export type ToastType = 'success' | 'error' | 'info' | 'cart'

export interface ToastAction {
	label: string
	href?: string
	onClick?: () => void
}

export interface ToastItem {
	id: string
	type?: ToastType
	title: string
	description?: string
	action?: ToastAction
	duration?: number
}

interface ToastContextType {
	showToast: (toast: Omit<ToastItem, 'id'>) => void
	success: (title: string, description?: string, action?: ToastAction) => void
	error: (title: string, description?: string) => void
	info: (title: string, description?: string) => void
	cart: (title: string, description?: string, action?: ToastAction) => void
	dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([])

	const dismiss = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}, [])

	const showToast = useCallback(
		({
			type = 'success',
			title,
			description,
			action,
			duration = 4500,
		}: Omit<ToastItem, 'id'>) => {
			const id = Math.random().toString(36).substring(2, 9)
			const newToast: ToastItem = {
				id,
				type,
				title,
				description,
				action,
				duration,
			}

			setToasts((prev) => [newToast, ...prev].slice(0, 4)) // Keep max 4 toasts

			if (duration > 0) {
				setTimeout(() => {
					dismiss(id)
				}, duration)
			}
		},
		[dismiss]
	)

	const success = useCallback(
		(title: string, description?: string, action?: ToastAction) => {
			showToast({ type: 'success', title, description, action })
		},
		[showToast]
	)

	const error = useCallback(
		(title: string, description?: string) => {
			showToast({ type: 'error', title, description })
		},
		[showToast]
	)

	const info = useCallback(
		(title: string, description?: string) => {
			showToast({ type: 'info', title, description })
		},
		[showToast]
	)

	const cart = useCallback(
		(title: string, description?: string, action?: ToastAction) => {
			showToast({
				type: 'cart',
				title,
				description,
				action: action || { label: 'View Bag', href: '/cart' },
			})
		},
		[showToast]
	)

	return (
		<ToastContext.Provider value={{ showToast, success, error, info, cart, dismiss }}>
			{children}

			{/* Floating Toast Notification Container */}
			<div
				aria-live='polite'
				className='fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0'>
				<AnimatePresence mode='popLayout'>
					{toasts.map((toast) => {
						const isCart = toast.type === 'cart'
						const isError = toast.type === 'error'
						const isSuccess = toast.type === 'success'

						return (
							<motion.div
								key={toast.id}
								layout
								initial={{ opacity: 0, y: 30, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 15, scale: 0.95 }}
								transition={{ type: 'spring', damping: 25, stiffness: 350 }}
								className='pointer-events-auto rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.14)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col gap-3 relative'>
								{/* Subtle Accent Glow */}
								<div
									className={`absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-40 ${
										isError
											? 'bg-rose-500'
											: isCart
											? 'bg-amber-500'
											: 'bg-emerald-500'
									}`}
								/>

								<div className='flex items-start gap-3.5 relative z-10'>
									{/* Status Icon */}
									<div
										className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
											isError
												? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
												: isCart
												? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
												: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
										}`}>
										{isError ? (
											<AlertCircle size={18} />
										) : isCart ? (
											<ShoppingBag size={18} />
										) : (
											<CheckCircle2 size={18} />
										)}
									</div>

									{/* Text Body */}
									<div className='flex-1 min-w-0 pr-2 pt-0.5'>
										<div className='flex items-center gap-1.5'>
											<h4 className='text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100'>
												{toast.title}
											</h4>
											{isCart && (
												<Sparkles size={11} className='text-amber-500' />
											)}
										</div>
										{toast.description && (
											<p className='text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed'>
												{toast.description}
											</p>
										)}
									</div>

									{/* Close Button */}
									<button
										onClick={() => dismiss(toast.id)}
										aria-label='Dismiss notification'
										className='text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1 rounded-lg transition-colors cursor-pointer shrink-0'>
										<X size={15} />
									</button>
								</div>

								{/* Action Button (e.g. "View Bag") */}
								{toast.action && (
									<div className='pt-1 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-end'>
										{toast.action.href ? (
											<Link
												href={toast.action.href}
												onClick={() => dismiss(toast.id)}
												className='inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 py-1 px-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all'>
												<span>{toast.action.label}</span>
												<ArrowRight size={12} />
											</Link>
										) : (
											<button
												onClick={() => {
													toast.action?.onClick?.()
													dismiss(toast.id)
												}}
												className='inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 py-1 px-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all'>
												<span>{toast.action.label}</span>
											</button>
										)}
									</div>
								)}
							</motion.div>
						)
					})}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	)
}

export function useToast() {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}
	return context
}
