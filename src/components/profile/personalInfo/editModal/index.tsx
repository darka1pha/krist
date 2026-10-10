import { updateProfileAction } from '@/actions/profile'
import initTranslations from '@/app/i18n'
import { SubmitButton } from '@/components/elements'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { X } from 'lucide-react'

const EditModal = async ({ locale }: { locale: string }) => {
	const supabase = await createClient()
	const { data } = await supabase.from('profiles').select('*').maybeSingle()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { t } = await initTranslations(locale || 'en', ['profile'])

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
			<Link href='/profile' className='fixed inset-0' aria-label='Close modal' />
			<div className='relative z-10 w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 p-6'>
				<div className='flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6'>
					<h2 className='text-xl font-bold'>Edit Personal Info</h2>
					<Link
						href='/profile'
						className='p-1 rounded-lg text-gray-400 hover:text-black dark:hover:text-white transition-colors'>
						<X size={20} />
					</Link>
				</div>
				<form
					action={updateProfileAction}
					className='grid grid-cols-2 w-full gap-4'>
					<div className='col-span-2 md:col-span-1 flex flex-col'>
						<label className='form_label mb-1.5 text-xs font-semibold uppercase text-gray-500' htmlFor='name'>
							{t('form.name')}
						</label>
						<input
							className='input bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'
							name='name'
							placeholder={t('form.name_placeholder')}
							required
							defaultValue={data?.name}
						/>
					</div>
					<div className='col-span-2 md:col-span-1 flex flex-col'>
						<label className='form_label mb-1.5 text-xs font-semibold uppercase text-gray-500' htmlFor='email'>
							{t('form.email')}
						</label>
						<input
							value={user?.email || ''}
							disabled
							readOnly
							className='input bg-gray-100 dark:bg-zinc-800/50 border-gray-200 dark:border-zinc-700 opacity-70 cursor-not-allowed'
							name='email'
							placeholder={t('form.email_placeholder')}
							required
						/>
					</div>
					<div className='col-span-2 flex flex-col'>
						<label className='form_label mb-1.5 text-xs font-semibold uppercase text-gray-500' htmlFor='address'>
							{t('form.address')}
						</label>
						<input
							defaultValue={data?.address}
							className='input bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700'
							name='address'
							placeholder={t('form.address_placeholder')}
							required
						/>
					</div>
					<SubmitButton className='btn-primary w-full col-span-2 py-3 font-semibold mt-2'>
						Confirm Changes
					</SubmitButton>
				</form>
			</div>
		</div>
	)
}

export default EditModal
