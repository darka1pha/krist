'use server'
import { Database } from '@/types/supabase'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { MetadataRoute } from 'next'
import { cookies } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const supabase = createServerActionClient<Database>({ cookies })
	const { data } = await supabase.from('products').select('id,created_at')

	return (
		data?.map(({ id, created_at }) => ({
			url: `https://krist.vercel.aoo/product/${id}`,
			lastModified: created_at,
		})) || []
	)
}
