'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signInAction } from '@/actions/auth/sign-in'
import { SubmitButton } from '@/components/elements'
import { Eye, EyeOff, AlertCircle, Mail, Lock } from 'lucide-react'
import Link from 'next/link'

interface SignInFormProps {
	redirect?: string
	labels: {
		title: string
		subtitle: string
		email: string
		emailPlaceholder: string
		password: string
		submit: string
		dontHaveAccount: string
		signUp: string
	}
}

export default function SignInForm({ redirect, labels }: SignInFormProps) {
	const searchParams = useSearchParams()
	const errorParam = searchParams.get('error')
	const [showPassword, setShowPassword] = useState(false)

	return (
		<form
			action={signInAction}
			className='w-full max-w-sm space-y-6'>
			{/* Form Header */}
			<div className='space-y-1.5'>
				<h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white'>
					{labels.title}
				</h1>
				<p className='text-sm text-zinc-500 dark:text-zinc-400'>
					{labels.subtitle}
				</p>
			</div>

			{/* Error Alert */}
			{errorParam && (
				<div
					role='alert'
					className='p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-rose-700 dark:text-rose-300 text-xs'>
					<AlertCircle size={16} className='shrink-0 text-rose-500' />
					<span>{errorParam}</span>
				</div>
			)}

			<div className='space-y-4'>
				{/* Email */}
				<div className='space-y-1.5'>
					<label
						htmlFor='email'
						className='block text-xs font-medium text-zinc-700 dark:text-zinc-300'>
						{labels.email}
					</label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400'>
							<Mail size={16} />
						</div>
						<input
							id='email'
							name='email'
							type='email'
							autoComplete='email'
							required
							placeholder={labels.emailPlaceholder}
							className='w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all text-sm'
						/>
					</div>
				</div>

				{/* Password */}
				<div className='space-y-1.5'>
					<div className='flex items-center justify-between'>
						<label
							htmlFor='password'
							className='block text-xs font-medium text-zinc-700 dark:text-zinc-300'>
							{labels.password}
						</label>
						<Link
							href='/contact-us'
							className='text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors'>
							Forgot password?
						</Link>
					</div>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400'>
							<Lock size={16} />
						</div>
						<input
							id='password'
							name='password'
							type={showPassword ? 'text' : 'password'}
							autoComplete='current-password'
							required
							placeholder='••••••••••••'
							className='w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all text-sm'
						/>
						<button
							type='button'
							aria-label={showPassword ? 'Hide password' : 'Show password'}
							onClick={() => setShowPassword(!showPassword)}
							className='absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer'>
							{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
						</button>
					</div>
				</div>

				<input type='hidden' name='redirect' value={redirect || ''} />

				{/* Remember Device */}
				<div className='flex items-center gap-2 pt-1'>
					<input
						id='remember'
						type='checkbox'
						defaultChecked
						className='w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-950 focus:ring-zinc-950 dark:focus:ring-white accent-zinc-950 dark:accent-white cursor-pointer'
					/>
					<label
						htmlFor='remember'
						className='text-xs text-zinc-600 dark:text-zinc-400 select-none cursor-pointer'>
						Remember this device
					</label>
				</div>
			</div>

			{/* Submit Button */}
			<SubmitButton className='btn-primary w-full py-3 text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all'>
				{labels.submit}
			</SubmitButton>

			{/* Sign Up Link */}
			<div className='text-center pt-2'>
				<p className='text-xs text-zinc-500 dark:text-zinc-400'>
					{labels.dontHaveAccount}{' '}
					<Link
						href='/auth/sign-up'
						className='font-semibold text-zinc-950 dark:text-white hover:underline transition-all'>
						{labels.signUp}
					</Link>
				</p>
			</div>
		</form>
	)
}
