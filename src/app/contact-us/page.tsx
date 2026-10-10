import { Metadata } from 'next'
import { Mail, Phone, MapPin, Clock, MessageSquare, Sparkles } from 'lucide-react'
import ContactForm from '@/components/contact/contactForm'

export const metadata: Metadata = {
	title: 'Contact Us | Krist Concierge',
	description:
		'Connect with Krist client care and concierge stylists. Inquire about bespoke orders, sizing guidance, and worldwide delivery.',
}

const ContactUs = () => {
	return (
		<main className='max-w-7xl mx-auto paddings'>
			{/* Page Header */}
			<div className='text-center max-w-2xl mx-auto mb-16'>
				<div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-100/20 text-xs font-semibold uppercase tracking-wider mb-3'>
					<Sparkles size={14} /> Client Services
				</div>
				<h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight'>
					We are Here for You
				</h1>
				<p className='mt-3 text-sm sm:text-base text-gray-500 leading-relaxed'>
					Whether you seek styling recommendations, bespoke orders, or order updates, our luxury concierge team is at your disposal.
				</p>
			</div>

			{/* Contact Grid: Cards + Form */}
			<div className='grid grid-cols-12 gap-8 lg:gap-12 items-start'>
				{/* Contact Details Cards */}
				<div className='col-span-12 lg:col-span-5 space-y-4'>
					<div className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-start gap-4'>
						<div className='w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-900 dark:text-zinc-100'>
							<Mail size={22} />
						</div>
						<div>
							<h3 className='font-bold text-base text-zinc-900 dark:text-zinc-100'>
								Client Advisory Email
							</h3>
							<p className='text-xs text-gray-500 mt-1 mb-2'>
								Our response time is typically within 2-4 hours.
							</p>
							<a
								href='mailto:concierge@krist.app'
								className='text-sm font-semibold text-primary-500 hover:underline'>
								concierge@krist.app
							</a>
						</div>
					</div>

					<div className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-start gap-4'>
						<div className='w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-900 dark:text-zinc-100'>
							<Phone size={22} />
						</div>
						<div>
							<h3 className='font-bold text-base text-zinc-900 dark:text-zinc-100'>
								Toll-Free Concierge
							</h3>
							<p className='text-xs text-gray-500 mt-1 mb-2'>
								Monday through Friday, 8am – 8pm EST.
							</p>
							<a
								href='tel:+18005557478'
								className='text-sm font-semibold text-primary-500 hover:underline'>
								+1 (800) 555-KRIST
							</a>
						</div>
					</div>

					<div className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-start gap-4'>
						<div className='w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-900 dark:text-zinc-100'>
							<MapPin size={22} />
						</div>
						<div>
							<h3 className='font-bold text-base text-zinc-900 dark:text-zinc-100'>
								Global Flagship Atelier
							</h3>
							<p className='text-xs text-gray-500 mt-1'>
								742 Fifth Avenue, Suite 1200<br />New York, NY 10022
							</p>
						</div>
					</div>

					<div className='p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-start gap-4'>
						<div className='w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-900 dark:text-zinc-100'>
							<Clock size={22} />
						</div>
						<div>
							<h3 className='font-bold text-base text-zinc-900 dark:text-zinc-100'>
								Private Fitting Appointments
							</h3>
							<p className='text-xs text-gray-500 mt-1'>
								Complimentary 1-on-1 virtual styling sessions available upon request.
							</p>
						</div>
					</div>
				</div>

				{/* Contact Form */}
				<div className='col-span-12 lg:col-span-7'>
					<div className='p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-sm'>
						<div className='flex items-center gap-2 mb-6'>
							<MessageSquare size={20} className='text-zinc-900 dark:text-zinc-100' />
							<h2 className='text-xl font-bold'>Send an Inquiry</h2>
						</div>

						<ContactForm />
					</div>
				</div>
			</div>
		</main>
	)
}

export default ContactUs