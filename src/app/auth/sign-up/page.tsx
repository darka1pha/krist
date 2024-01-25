import { signUpAction } from '@/app/actions/auth/sign-up'
import initTranslations from '@/app/i18n'
import Message from '@/components/message'
import { SubmitButton } from '@/components/elements'
import TranslationsProvider from '@/components/translation/translationsProvider'
import Image from 'next/image'
import Link from 'next/link'

const i18nNamespaces = ['auth']

const SignUp = async ({
	params: { locale },
}: {
	params: { locale: string }
}) => {
	const { t, resources } = await initTranslations(locale, i18nNamespaces)
	return (
		<TranslationsProvider
			namespaces={i18nNamespaces}
			locale={locale}
			resources={resources}>
			<div className='w-full md:h-[100vh] flex flex-col md:flex-row overflow-hidden'>
				<div className='bg-[url("/images/signup.webp")] bg-fixed bg-top bg-cover md:bg-none h-[360px] md:h-full w-full md:w-[50%] overflow-hidden bg-red-50'>
					<Image
						src='/images/signup.webp'
						className='h-full w-full object-cover object-top hidden md:block'
						alt='signup image'
						objectFit='cover'
						quality={100}
						height={640}
						width={640}
					/>
				</div>
				<div className='  py-10 md:py-0 h-full w-full md:w-[50%] flex flex-col justify-center items-center px-4'>
					<form
						className='flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2'
						action={signUpAction}>
						<div className='mb-4'>
							<h1 className='font-bold text-3xl'>{t('signup.title')}</h1>
							<h3 className='text-primary-200 text-sm mt-2'>
								{t('signup.subtitle')}
							</h3>
						</div>
						<label className='form_label' htmlFor='name'>
							{t('name')}
						</label>
						<input
							className='input'
							name='name'
							placeholder={t('name_placeholder')}
							required
						/>
						<label className='form_label mt-5' htmlFor='address'>
							{t('address')}
						</label>
						<input
							className='input'
							name='address'
							placeholder={t('address_placeholder')}
							required
						/>
						<label className='form_label mt-5' htmlFor='email'>
							{t('email')}
						</label>
						<input
							className='input'
							name='email'
							placeholder={t('email_placeholder')}
							required
						/>
						<label className='form_label mt-5' htmlFor='password'>
							{t('password')}
						</label>
						<input
							className='input'
							type='password'
							name='password'
							placeholder='••••••••'
							required
						/>
						<div className='flex mb-6'>
							<p>{t('signup.have_account')}</p>&nbsp;
							<Link
								href={'/auth/sign-in'}
								className='text-fuelYellow underline'>
								{t('signup.signin')}
							</Link>
						</div>
						<SubmitButton className='btn-primary'>
							{t('signup.submit')}
						</SubmitButton>
						<Message />
					</form>
				</div>
			</div>
		</TranslationsProvider>
	)
}

export default SignUp
