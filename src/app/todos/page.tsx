import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function Page() {
	const cookieStore = await cookies()
	const supabase = createClient(cookieStore)

	const { data: todos } = await (supabase as any).from('todos').select()

	return (
		<main className='max-w-4xl mx-auto p-8 min-h-screen'>
			<h1 className='text-3xl font-extrabold tracking-tight mb-6'>Todos</h1>
			{todos && todos.length > 0 ? (
				<ul className='space-y-3'>
					{todos.map((todo: any) => (
						<li
							key={todo.id}
							className='p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm'>
							{todo.name || todo.title || JSON.stringify(todo)}
						</li>
					))}
				</ul>
			) : (
				<div className='p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400'>
					No todos returned from Supabase. You can create a{' '}
					<code className='px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-xs'>
						todos
					</code>{' '}
					table in your Supabase dashboard to populate this list.
				</div>
			)}
		</main>
	)
}
