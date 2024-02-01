import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
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
	]
}
