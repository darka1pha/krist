import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
import { cache } from 'react'

export const fallbackProducts: Tables<'products'>[] = [
	{
		id: 1,
		name: 'Aura Silk Satin Clutch',
		brand: 'Krist Atelier',
		price: 185.0,
		description: 'Crafted from lustrous silk satin with champagne gold hardware and an optional delicate chain strap.',
		rating: 4.9,
		category: 1,
		colors: ['#000000', '#d4af37', '#e2e8f0'],
		size: ['M'],
		images: ['/images/hero.webp', '/images/signin.webp'],
		created_at: new Date().toISOString(),
	},
	{
		id: 2,
		name: 'Sculptural Gold Pendant Necklace',
		brand: 'Élégance',
		price: 240.0,
		description: 'Hand-finished 18k gold vermeil pendant on an adjustable Venetian link chain.',
		rating: 4.8,
		category: 1,
		colors: ['#d4af37', '#silver'],
		size: ['L'],
		images: ['/images/signin.webp', '/images/hero.webp'],
		created_at: new Date().toISOString(),
	},
	{
		id: 3,
		name: 'Monochrome Cashmere Stole',
		brand: 'Krist Atelier',
		price: 195.0,
		description: 'Ultra-fine Grade-A Mongolian cashmere with delicate eyelash fringe edges.',
		rating: 5.0,
		category: 2,
		colors: ['#18181b', '#71717a'],
		size: ['XL'],
		images: ['/images/signup.webp', '/images/hero.webp'],
		created_at: new Date().toISOString(),
	},
	{
		id: 4,
		name: 'Minimalist Italian Leather Tote',
		brand: 'Sartorial',
		price: 360.0,
		description: 'Full-grain Tuscan calfskin leather with suede lining and detachable organizer pouch.',
		rating: 4.9,
		category: 3,
		colors: ['#3f2e21', '#18181b'],
		size: ['L'],
		images: ['/images/hero.webp', '/images/signup.webp'],
		created_at: new Date().toISOString(),
	},
	{
		id: 5,
		name: 'Diamond Pavé Signet Ring',
		brand: 'Élégance',
		price: 290.0,
		description: 'Modern silhouette pavé set with ethically sourced lab diamonds in 14k solid white gold.',
		rating: 4.7,
		category: 1,
		colors: ['#e2e8f0', '#d4af37'],
		size: ['S', 'M'],
		images: ['/images/signin.webp', '/images/hero.webp'],
		created_at: new Date().toISOString(),
	},
	{
		id: 6,
		name: 'Architectural Acetate Sunglasses',
		brand: 'Krist Eyewear',
		price: 175.0,
		description: 'Handcrafted Japanese acetate frames with 100% UVA/UVB Carl Zeiss polarized lenses.',
		rating: 4.8,
		category: 2,
		colors: ['#18181b', '#854d0e'],
		size: ['M'],
		images: ['/images/signup.webp', '/images/signin.webp'],
		created_at: new Date().toISOString(),
	},
]

export const fallbackCategories = [
	{
		id: 1,
		name: 'Jewelry',
		poster_url: '/images/signin.webp',
		created_at: new Date().toISOString(),
		subcategories: [
			{ id: 101, name: 'Necklaces', category: 1, poster_url: '/images/signin.webp', created_at: '' },
			{ id: 102, name: 'Rings', category: 1, poster_url: '/images/signin.webp', created_at: '' },
		],
	},
	{
		id: 2,
		name: 'Accessories',
		poster_url: '/images/hero.webp',
		created_at: new Date().toISOString(),
		subcategories: [
			{ id: 201, name: 'Scarves', category: 2, poster_url: '/images/hero.webp', created_at: '' },
			{ id: 202, name: 'Eyewear', category: 2, poster_url: '/images/hero.webp', created_at: '' },
		],
	},
	{
		id: 3,
		name: 'Handbags',
		poster_url: '/images/signup.webp',
		created_at: new Date().toISOString(),
		subcategories: [
			{ id: 301, name: 'Totes', category: 3, poster_url: '/images/signup.webp', created_at: '' },
			{ id: 302, name: 'Clutches', category: 3, poster_url: '/images/signup.webp', created_at: '' },
		],
	},
]

export const getProducts = cache(
	async ({
		searchParams,
	}: {
		searchParams: { [key: string]: string | string[] | undefined }
	}) => {
		'use server'
		try {
			const supabase = await createClient()

			const categoryParam =
				typeof searchParams.category === 'string'
					? searchParams.category
					: undefined
			const subParam =
				typeof searchParams.sub === 'string' ? searchParams.sub : undefined

			if (categoryParam && !subParam) {
				const filterCategories = categoryParam.split(',')
				const { data: categories } = await supabase
					.from('categories')
					.select('id')
					.in('name', filterCategories)
				const categoriesId = categories?.map((c) => c.id) ?? []

				const { data: subcategories } = await supabase
					.from('subcategories')
					.select('id')
					.in('category', categoriesId)

				const subcategoriesId = subcategories?.map((s) => s.id) ?? []

				const { data } = await supabase
					.from('products')
					.select('*')
					.in('category', subcategoriesId)

				if (data && data.length > 0) return data
			} else if (categoryParam && subParam) {
				const { data: category } = await supabase
					.from('categories')
					.select('id')
					.eq('name', categoryParam)
					.maybeSingle()

				if (category) {
					const { data: subcategory } = await supabase
						.from('subcategories')
						.select('id')
						.eq('category', category.id)
						.eq('name', subParam)
						.maybeSingle()

					if (subcategory) {
						const { data } = await supabase
							.from('products')
							.select('*')
							.eq('category', subcategory.id)

						if (data && data.length > 0) return data
					}
				}
			} else {
				const { data } = await supabase.from('products').select('*')
				if (data && data.length > 0) return data
			}
		} catch (e) {
			console.warn('Supabase products fetch fallback:', e)
		}

		// Fallback for seamless UX
		const categoryParam =
			typeof searchParams.category === 'string'
				? searchParams.category.toLowerCase()
				: undefined
		if (categoryParam) {
			const matched = fallbackCategories.find((c) => c.name.toLowerCase() === categoryParam)
			if (matched) {
				return fallbackProducts.filter((p) => p.category === matched.id)
			}
		}

		return fallbackProducts
	}
)

export const getCategories = cache(async () => {
	try {
		const supabase = await createClient()

		const { data: categories, error: categoryError } = await supabase
			.from('categories')
			.select('*')
		const { data: subcategories, error: subError } = await supabase
			.from('subcategories')
			.select('*')

		if (categories && categories.length > 0) {
			type SubcategoryRow = Tables<'subcategories'>
			interface CategoryWithSubs {
				name: string | null
				id: number
				subcategories: SubcategoryRow[]
			}

			const result: CategoryWithSubs[] = categories.map((cat) => ({
				id: cat.id,
				name: cat.name,
				subcategories: (subcategories ?? []).filter(
					(sub) => sub.category === cat.id
				),
			}))

			return {
				data: result,
				error: categoryError ? categoryError : subError ? subError : null,
			}
		}
	} catch (e) {
		console.warn('Supabase categories fetch fallback:', e)
	}

	return {
		data: fallbackCategories,
		error: null,
	}
})
