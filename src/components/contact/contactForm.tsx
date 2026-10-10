'use client'
import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function ContactForm() {
	const [submitted, setSubmitted] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setSubmitted(true)
	}

	if (submitted) {
		return (
			<div className='p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-center flex flex-col items-center justify-center space-y-3'>
				<div className='w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400'>
					<CheckCircle2 size={24} />
				</div>
				<h3 className='text-lg font-bold text-zinc-900 dark:text-zinc-100'>
					Inquiry Received
				</h3>
				<p className='text-sm text-gray-600 dark:text-gray-300 max-w-sm'>
					Thank you for contacting Krist. Our concierge team has received your message and will respond within 2-4 business hours.
				</p>
				<button
					type='button'
					onClick={() => setSubmitted(false)}
					className='btn-secondary text-xs px-4 py-2 mt-2'>
					Send Another Message
				</button>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					<label className='form_label' htmlFor='first_name'>
						First Name
					</label>
					<input
						id='first_name'
						type='text'
						required
						placeholder='Eleanor'
						className='input bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'
					/>
				</div>
				<div>
					<label className='form_label' htmlFor='last_name'>
						Last Name
					</label>
					<input
						id='last_name'
						type='text'
						required
						placeholder='Vance'
						className='input bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'
					/>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
				<div>
					<label className='form_label' htmlFor='email'>
						Email Address
					</label>
					<input
						id='email'
						type='email'
						required
						placeholder='eleanor@vance.com'
						className='input bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'
					/>
				</div>
				<div>
					<label className='form_label' htmlFor='subject'>
						Topic of Inquiry
					</label>
					<select
						id='subject'
						defaultValue='styling'
						className='select w-full bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'>
						<option value='styling'>Private Styling Advisory</option>
						<option value='orders'>Order & Shipping Status</option>
						<option value='custom'>Bespoke Custom Orders</option>
						<option value='press'>Press & Partnerships</option>
					</select>
				</div>
			</div>

			<div>
				<label className='form_label' htmlFor='message'>
					Your Message
				</label>
				<textarea
					id='message'
					rows={5}
					required
					placeholder='How may our team assist you today?'
					className='w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all text-sm resize-none'
				/>
			</div>

			<button
				type='submit'
				className='btn-primary w-full py-3.5 flex items-center justify-center gap-2 font-semibold shadow-md'>
				<Send size={16} /> Send Message
			</button>

			<p className='text-xs text-center text-gray-400 mt-2'>
				We respect your privacy. Inquiries are handled with utmost discretion.
			</p>
		</form>
	)
}
