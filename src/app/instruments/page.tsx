import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'

async function InstrumentsData() {
	const supabase = await createClient()
	const { data: instruments, error } = await supabase.from('instruments').select()

	if (error) {
		return (
			<div className='p-6 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300'>
				<p className='font-mono text-sm font-semibold text-rose-200'>
					Error loading instruments: {error.message}
				</p>
				<p className='mt-2 text-xs text-rose-300/70'>
					Run the instruments table SQL in your Supabase SQL Editor and ensure
					your environment variables are set in <code className='text-white bg-black/40 px-1 py-0.5 rounded'>.env.local</code>.
				</p>
			</div>
		)
	}

	return (
		<div className='rounded-2xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-md'>
			<div className='flex items-center justify-between pb-4 mb-4 border-b border-white/10'>
				<span className='text-xs font-mono uppercase tracking-wider text-zinc-400'>
					Result ({instruments?.length ?? 0} records)
				</span>
				<span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'>
					<span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
					Connected
				</span>
			</div>
			<pre className='overflow-x-auto font-mono text-sm text-emerald-400 whitespace-pre-wrap leading-relaxed'>
				{JSON.stringify(instruments, null, 2)}
			</pre>
		</div>
	)
}

export default function Instruments() {
	return (
		<main className='min-h-[70vh] paddings max-w-4xl mx-auto py-12'>
			<div className='mb-8 space-y-2'>
				<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
					Supabase Quickstart
				</div>
				<h1 className='text-3xl font-serif font-bold text-white tracking-tight'>
					Instruments Table
				</h1>
				<p className='text-zinc-400 text-sm max-w-xl'>
					Querying <code className='text-amber-300 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded'>public.instruments</code>{' '}
					using <code className='text-amber-300 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded'>createClient()</code> from{' '}
					<code className='text-amber-300 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded'>@/lib/supabase/server</code>.
				</p>
			</div>

			<Suspense
				fallback={
					<div className='rounded-2xl border border-white/10 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-md animate-pulse space-y-3'>
						<div className='flex items-center justify-between pb-4 border-b border-white/10'>
							<div className='h-4 w-28 rounded bg-zinc-800' />
							<div className='h-5 w-20 rounded-full bg-zinc-800' />
						</div>
						<div className='space-y-2 py-4'>
							<div className='h-4 w-3/4 rounded bg-zinc-800/80' />
							<div className='h-4 w-1/2 rounded bg-zinc-800/60' />
							<div className='h-4 w-2/3 rounded bg-zinc-800/70' />
						</div>
					</div>
				}
			>
				<InstrumentsData />
			</Suspense>
		</main>
	)
}
