import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'
import { MetadataRoute } from 'next'

const supabaseUrl =
	process.env.NEXT_PUBLIC_SUPABASE_URL ||
	'https://eqzhxlsoptcmlohjlbpc.supabase.co'
const supabaseKey =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	'sb_publishable_xlGFqGc5wXP58OCJIKYxvw_T5gS3NFX'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	let products: MetadataRoute.Sitemap = []
	let categories: MetadataRoute.Sitemap = []

	try {
		const supabase = createClient<Database>(supabaseUrl, supabaseKey)
		const { data: productsData } = await supabase
			.from('products')
			.select('id,created_at')

		if (productsData && productsData.length > 0) {
			products = productsData.map(
				(item: { id: number; created_at: string }) => ({
					url: `https://krist.vercel.app/products/${item.id}`,
					lastModified: new Date(item.created_at),
					priority: 0.8,
				})
			)
		}

		const { data: categoriesData } = await supabase
			.from('categories')
			.select('name')

		if (categoriesData && categoriesData.length > 0) {
			categories = categoriesData.map((item: { name: string | null }) => ({
				url: `https://krist.vercel.app/categories/${encodeURIComponent((item.name || '').toLowerCase())}`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 0.9,
			}))
		}
	} catch (e) {
		console.error('Sitemap error:', e)
	}

	return [
		{
			url: 'https://krist.vercel.app',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: 'https://krist.vercel.app/categories',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.95,
		},
		{
			url: 'https://krist.vercel.app/products',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		...categories,
		...products,
	]
}
