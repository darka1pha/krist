import { signInAction } from '@/app/actions/auth/sign-in'
import SubmitButton from '@/components/submitButton'
import Image from 'next/image'
import Link from 'next/link'

const SignIn = () => {
	return (
		<div className='w-full md:h-[100vh] flex flex-col  md:flex-row'>
			<div className='bg-[url("/images/signin.webp")] bg-fixed bg-top bg-cover md:bg-none h-[360px] md:h-full w-full md:w-[50%] overflow-hidden bg-red-50'>
				<Image
					src='/images/signin.webp'
					className='h-full w-full object-cover object-top hidden md:block'
					alt='signin image'
					objectFit='cover'
					quality={100}
					height={640}
					width={640}
				/>
			</div>
			<div className='  py-10 md:py-0 h-full w-full md:w-[50%] flex flex-col justify-center items-center px-4'>
				<form
					className='flex-1 flex flex-col w-full sm:max-w-md justify-center gap-2'
					action={signInAction}>
					<div className='mb-4'>
						<h1 className='font-bold text-3xl'>Welcome &#128075;</h1>
						<h3 className='text-primary-200 text-sm mt-2'>Please login here</h3>
					</div>
					<label className='form_label' htmlFor='email'>
						Email
					</label>
					<input
						className='input'
						name='email'
						placeholder='you@example.com'
						required
					/>
					<label className='form_label mt-5' htmlFor='password'>
						Password
					</label>
					<input
						className='input'
						type='password'
						name='password'
						placeholder='••••••••'
						required
					/>
					<div className='flex mb-6'>
						<p>dont have an account?</p>&nbsp;
						<Link href={'/auth/sign-up'} className='text-fuelYellow underline'>
							Sign up
						</Link>
					</div>
					<SubmitButton className='btn-primary hover:rotate-1'>
						Sign In
					</SubmitButton>
				</form>
			</div>
		</div>
	)
}

export default SignIn
