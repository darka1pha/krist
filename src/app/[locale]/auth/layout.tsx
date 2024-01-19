import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<main>
			<div className='absolute left-6 top-6'>
				<Link href={'/'}>
					<Image
						src='/images/logo.svg'
						height={48}
						width={120}
						alt='krist logo'
					/>
				</Link>
			</div>
			{children}
		</main>
	)
}
