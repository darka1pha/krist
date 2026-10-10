import { signUpAction } from '@/actions/auth/sign-up'
import initTranslations from '@/app/i18n'
import Message from '@/components/message'
import { SubmitButton } from '@/components/elements'
import TranslationsProvider from '@/components/translation/translationsProvider'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const i18nNamespaces = ['auth']

const SignUp = async ({
	params,
}: {
	params?: Promise<{ locale?: string }>
}) => {
	const resolvedParams = params ? await params : undefined
	const locale = resolvedParams?.locale || 'en'
	const { t, resources } = await initTranslations(locale, i18nNamespaces)

	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}>
			<div className='min-h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row'>
				{/* Left Column - High-Fashion Editorial */}
				<div className='relative hidden lg:block lg:w-1/2 min-h-full bg-zinc-900 overflow-hidden'>
					<Image
						src='/images/signup.webp'
						alt='Krist Membership'
						fill
						sizes='50vw'
						priority
						className='object-cover object-top filter brightness-95'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20' />

					{/* Top Link */}
					<div className='absolute top-8 left-8 z-10'>
						<Link
							href='/'
							className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 text-white text-xs font-medium backdrop-blur-md transition-colors'>
							<ArrowLeft size={14} />
							<span>Back to store</span>
						</Link>
					</div>

					{/* Bottom Caption */}
					<div className='absolute bottom-10 left-10 right-10 z-10 text-white'>
						<p className='text-xs uppercase tracking-widest text-zinc-300 font-mono'>
							Krist Membership
						</p>
						<p className='text-xl font-serif font-light mt-1.5 text-zinc-100 max-w-md'>
							Join our client list for private releases, bespoke care, and curated collections.
						</p>
					</div>
				</div>

				{/* Right Column - Clean Form */}
				<div className='w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 lg:py-0 bg-white dark:bg-zinc-950 transition-colors'>
					<div className='w-full max-w-sm mb-6 lg:hidden flex justify-between items-center'>
						<Link
							href='/'
							className='inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors'>
							<ArrowLeft size={14} />
							<span>Back to store</span>
						</Link>
					</div>

					<form
						className='w-full max-w-sm space-y-5'
						action={signUpAction}>
						<div className='space-y-1.5'>
							<h1 className='text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-white'>
								{t('signup.title') || 'Create Account'}
							</h1>
							<p className='text-sm text-zinc-500 dark:text-zinc-400'>
								{t('signup.subtitle') || 'Enter your details below to create your profile.'}
							</p>
						</div>

						<div className='space-y-3.5'>
							<div className='space-y-1'>
								<label className='block text-xs font-medium text-zinc-700 dark:text-zinc-300' htmlFor='name'>
									{t('name') || 'Full Name'}
								</label>
								<input
									id='name'
									name='name'
									required
									placeholder={t('name_placeholder') || 'John Doe'}
									className='w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all text-sm'
								/>
							</div>

							<div className='space-y-1'>
								<label className='block text-xs font-medium text-zinc-700 dark:text-zinc-300' htmlFor='address'>
									{t('address') || 'Shipping Address'}
								</label>
								<input
									id='address'
									name='address'
									required
									placeholder={t('address_placeholder') || '123 Fashion Blvd, Suite 4B'}
									className='w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all text-sm'
								/>
							</div>

							<div className='space-y-1'>
								<label className='block text-xs font-medium text-zinc-700 dark:text-zinc-300' htmlFor='email'>
									{t('email') || 'Email'}
								</label>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									placeholder={t('email_placeholder') || 'you@example.com'}
									className='w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all text-sm'
								/>
							</div>

							<div className='space-y-1'>
								<label className='block text-xs font-medium text-zinc-700 dark:text-zinc-300' htmlFor='password'>
									{t('password') || 'Password'}
								</label>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='new-password'
									required
									placeholder='••••••••••••'
									className='w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-white transition-all text-sm'
								/>
							</div>
						</div>

						<SubmitButton className='btn-primary w-full py-3 text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all'>
							{t('signup.submit') || 'Create Account'}
						</SubmitButton>

						<Message />

						<div className='text-center pt-2'>
							<p className='text-xs text-zinc-500 dark:text-zinc-400'>
								{t('signup.have_account') || 'Already have an account?'}{' '}
								<Link
									href='/auth/sign-in'
									className='font-semibold text-zinc-950 dark:text-white hover:underline transition-all'>
									{t('signup.signin') || 'Sign in'}
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</TranslationsProvider>
	)
}

export default SignUp
