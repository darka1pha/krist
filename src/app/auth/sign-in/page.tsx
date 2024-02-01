
import Image from "next/image"
import Link from 'next/link'
import initTranslations from '@/app/i18n'
import { SubmitButton } from '@/components/elements'
import { signInAction } from "@/actions/auth/sign-in"
const i18nNamespaces = ['auth']

const SignIn = async ({
	params: { locale },
}: {
	params: { locale: string }
}) => {
	const { t } = await initTranslations(locale, i18nNamespaces)

	return (
        <div className='w-full md:h-[100vh] flex flex-col  md:flex-row'>
			<div className='bg-[url("/images/signin.webp")] bg-fixed bg-top bg-cover md:bg-none h-[360px] md:h-full w-full md:w-[50%] overflow-hidden bg-red-50'>
				<Image
                    src='/images/signin.webp'
                    className='h-full w-full object-cover object-top hidden md:block'
                    alt='signin image'
                    quality={100}
                    height={640}
                    width={640}
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "cover"
                    }} />
			</div>
			<div className='  py-10 md:py-0 h-full w-full md:w-[50%] flex flex-col justify-center items-center px-4'>
				<form
					className='flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2'
					action={signInAction}>
					<div className='mb-4'>
						<h1 className='font-bold text-3xl'>{t('signin.title')} &#128075;</h1>
						<h3 className='text-primary-200 text-sm mt-2'>
							{t('signin.subtitle')}
						</h3>
					</div>
					<label className='form_label' htmlFor='email'>
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
						<p>{t('signin.dont_have_account')}</p>&nbsp;
						<Link href={'/auth/sign-up'} className='text-fuelYellow underline'>
							{t('signin.signup')}
						</Link>
					</div>
					<SubmitButton className='btn-primary'>
						{t('signin.submit')}
					</SubmitButton>
				</form>
			</div>
		</div>
    );
}

export default SignIn
