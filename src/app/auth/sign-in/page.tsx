import Image from 'next/image'
import Link from 'next/link'
import initTranslations from '@/app/i18n'
import SignInForm from '@/components/auth/signInForm'
import { ArrowLeft } from 'lucide-react'

const i18nNamespaces = ['auth']

const SignIn = async ({
	params,
	searchParams,
}: {
	params?: Promise<{ locale?: string }>
	searchParams?: Promise<{ redirect?: string }>
}) => {
	const resolvedParams = params ? await params : undefined
	const resolvedSearch = searchParams ? await searchParams : undefined
	const locale = resolvedParams?.locale || 'en'
	const redirect = resolvedSearch?.redirect
	const { t } = await initTranslations(locale, i18nNamespaces)

	return (
		<div className='min-h-[calc(100vh-80px)] w-full flex flex-col lg:flex-row'>
			{/* Left Column: Pure High-Fashion Editorial */}
			<div className='relative hidden lg:block lg:w-1/2 min-h-full bg-zinc-900 overflow-hidden'>
				<Image
					src='/images/signin.webp'
					alt='Krist Editorial'
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

				{/* Bottom Clean Atelier Typography */}
				<div className='absolute bottom-10 left-10 right-10 z-10 text-white'>
					<p className='text-xs uppercase tracking-widest text-zinc-300 font-mono'>
						Krist Atelier
					</p>
					<p className='text-xl font-serif font-light mt-1.5 text-zinc-100 max-w-md'>
						Contemporary essentials tailored with architectural precision.
					</p>
				</div>
			</div>

			{/* Right Column: Clean, Spacious Login Interface */}
			<div className='w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 lg:py-0 bg-white dark:bg-zinc-950 transition-colors'>
				<div className='w-full max-w-sm mb-6 lg:hidden flex justify-between items-center'>
					<Link
						href='/'
						className='inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors'>
						<ArrowLeft size={14} />
						<span>Back to store</span>
					</Link>
				</div>

				<SignInForm
					redirect={redirect}
					labels={{
						title: t('signin.title') || 'Welcome Back',
						subtitle:
							t('signin.subtitle') ||
							'Please enter your email and password to sign in.',
						email: t('email') || 'Email',
						emailPlaceholder: t('email_placeholder') || 'you@example.com',
						password: t('password') || 'Password',
						submit: t('signin.submit') || 'Sign In',
						dontHaveAccount:
							t('signin.dont_have_account') || "Don't have an account?",
						signUp: t('signin.signup') || 'Sign up',
					}}
				/>
			</div>
		</div>
	)
}

export default SignIn
