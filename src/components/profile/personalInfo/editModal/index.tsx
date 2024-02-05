import { updateProfileAction } from '@/actions/profile'
import initTranslations from '@/app/i18n'
import { SubmitButton } from '@/components/elements'
import { Database } from '@/types/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

const EditModal = async ({ locale }: { locale: string }) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data } = await supabase.from('profiles').select('*').single()
	const {
		data: { user },
	} = await supabase.auth.getUser()

	const { t } = await initTranslations(locale, ['profile'])

	return (
		<div className='absolute top-0 right-0 h-full w-full'>
			<Link href={'/profile'}>
				<div className='absolute top-0 right-0 h-full w-full bg-primary-500/50 -z-[0]' />
			</Link>
			<div className='absolute right-[50%] w-[80%] sm:w-[70%] lg:w-auto top-[50%] transform translate-x-[50%] translate-y-[-50%] z-20 bg-white shadow-md rounded-xl p-5'>
				<form
					action={updateProfileAction}
					className='grid grid-cols-2 w-full gap-4'>
					<div className='col-span-2 md:col-span-1 flex flex-col'>
						<label className='form_label mb-2' htmlFor='name'>
							{t('form.name')}
						</label>
						<input
							className='input'
							name='name'
							placeholder={t('form.name_placeholder')}
							required
							defaultValue={data?.name}
						/>
					</div>
					<div className='col-span-2 md:col-span-1 flex flex-col'>
						<label className='form_label mb-2' htmlFor='email'>
							{t('form.email')}
						</label>
						<input
							value={user?.email}
							disabled
							readOnly
							className='input'
							name='email'
							placeholder={t('form.email_placeholder')}
							required
						/>
					</div>
					<div className='col-span-2 flex flex-col'>
						<label className='form_label mb-2' htmlFor='address'>
							{t('form.address')}
						</label>
						<input
							defaultValue={data?.address}
							className='input'
							name='address'
							placeholder={t('form.address_placeholder')}
							required
						/>
					</div>
					<SubmitButton className='btn-primary w-full col-span-2'>
						Confirm
					</SubmitButton>
				</form>
			</div>
		</div>
	)
}

export default EditModal
