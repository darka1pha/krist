import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { MetadataRoute } from 'next'
import { cookies } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const supabase = createServerActionClient<Database>({ cookies })
	const { data } = await supabase.from('products').select('id,created_at')

	const products =
		data?.map(({ id, created_at }) => ({
			url: `https://krist.vercel.app/products/${id}`,
			lastModified: created_at,
			priority: 0.8,
		})) || []

	return [
		{
			url: 'https://krist.vercel.app',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: 'https://krist.vercel.app/products',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		...products,
	]
}
