import { signUpAction } from '@/app/actions/auth/sign-up'
import SubmitButton from '@/components/submitButton'
import Image from 'next/image'
import Link from 'next/link'

const SignUp = () => {
	return (
		<div className='w-full md:h-[100vh] flex flex-col  md:flex-row'>
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
						<h1 className='font-bold text-3xl'>Create New Account</h1>
						<h3 className='text-primary-200 text-sm mt-2'>Please enter your details</h3>
					</div>
					<label className='form_label mt-5' htmlFor='email'>
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
						<p>already have an account?</p>&nbsp;
						<Link href={'/auth/sign-in'} className='text-fuelYellow underline'>
							Sign in
						</Link>
					</div>
					<SubmitButton className='btn-primary hover:rotate-1'>
						Sign Up
					</SubmitButton>
				</form>
			</div>
		</div>
	)
}

export default SignUp
