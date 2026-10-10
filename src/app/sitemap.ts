import { createClient } from '@/utils/supabase/server'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const supabase = await createClient()
	const { data } = await supabase.from('products').select('id,created_at')

	const products: MetadataRoute.Sitemap =
		data?.map((item: { id: number; created_at: string }) => ({
			url: `https://krist.vercel.app/products/${item.id}`,
			lastModified: new Date(item.created_at),
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
