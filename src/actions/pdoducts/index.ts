import { Tables } from '@/types/supabase'
import { createClient } from '@/utils/supabase/server'
import { cache } from 'react'

export interface ExtendedProduct extends Tables<'products'> {
	subcategory?: number
	subcategory_name?: string
}

export interface CategoryWithSubs {
	id: number
	name: string
	poster_url: string | null
	description?: string | null
	subcategories: Tables<'subcategories'>[]
}

// Fallback arrays kept empty as per requirement: data should be read from DB only
export const fallbackProducts: ExtendedProduct[] = []
export const fallbackCategories: CategoryWithSubs[] = []

/**
 * Fetch products strictly from Supabase DB.
 * Handles optional category and subcategory filtering.
 */
export const getProducts = cache(
	async ({
		searchParams,
	}: {
		searchParams: { [key: string]: string | string[] | undefined }
	}): Promise<Tables<'products'>[]> => {
		'use server'
		const categoryParam =
			typeof searchParams.category === 'string'
				? searchParams.category.trim()
				: undefined
		const subParam =
			typeof searchParams.sub === 'string'
				? searchParams.sub.trim()
				: undefined

		try {
			const supabase = await createClient()

			if (categoryParam) {
				const filterCategoryNames = categoryParam
					.split(',')
					.map((c) => c.trim().toLowerCase())

				// Query categories from database
				const { data: allCategories, error: catError } = await supabase
					.from('categories')
					.select('id, name')

				if (catError) {
					console.error('Error fetching categories from database:', catError)
					return []
				}

				const matchedCategories = (allCategories || []).filter(
					(c) => c.name && filterCategoryNames.includes(c.name.toLowerCase())
				)
				const matchedCategoryIds = matchedCategories.map((c) => c.id)

				if (matchedCategoryIds.length > 0) {
					const { data: subcategories, error: subError } = await supabase
						.from('subcategories')
						.select('id, name, category')
						.in('category', matchedCategoryIds)

					if (subError) {
						console.error('Error fetching subcategories from database:', subError)
						return []
					}

					let targetSubcategoryIds: number[] = []

					if (subParam) {
						const subLower = subParam.toLowerCase()
						targetSubcategoryIds = (subcategories || [])
							.filter((s) => s.name && s.name.toLowerCase() === subLower)
							.map((s) => s.id)
					} else {
						targetSubcategoryIds = (subcategories || []).map((s) => s.id)
					}

					if (targetSubcategoryIds.length > 0) {
						const { data: products, error: prodError } = await supabase
							.from('products')
							.select('*')
							.in('category', targetSubcategoryIds)
							.order('id', { ascending: true })

						if (prodError) {
							console.error('Error fetching filtered products from database:', prodError)
							return []
						}

						return products || []
					}

					return []
				}

				return []
			}

			// Return all products directly from database
			const { data, error } = await supabase
				.from('products')
				.select('*')
				.order('id', { ascending: true })

			if (error) {
				console.error('Error fetching products from database:', error)
				return []
			}

			return data || []
		} catch (e) {
			console.error('Supabase getProducts exception:', e)
			return []
		}
	}
)

/**
 * Fetch categories and their nested subcategories strictly from Supabase DB.
 */
export const getCategories = cache(async (): Promise<{
	data: CategoryWithSubs[]
	error: any
}> => {
	try {
		const supabase = await createClient()

		const { data: categories, error: categoryError } = await supabase
			.from('categories')
			.select('*')
			.order('id', { ascending: true })

		const { data: subcategories, error: subError } = await supabase
			.from('subcategories')
			.select('*')
			.order('id', { ascending: true })

		if (categoryError) {
			console.error('Error fetching categories from database:', categoryError)
		}

		if (categories && categories.length > 0) {
			const result: CategoryWithSubs[] = categories.map((cat) => ({
				id: cat.id,
				name: cat.name || '',
				poster_url: cat.poster_url || null,
				description:
					cat.name?.toLowerCase() === 'jewelry'
						? 'Bespoke 18k gold vermeil, sculptural silhouettes, and brilliant lab-grown diamond accents.'
						: cat.name?.toLowerCase() === 'accessories'
						? 'Grade-A Mongolian cashmere stoles, Japanese acetate eyewear, and timeless personal styling accents.'
						: cat.name?.toLowerCase() === 'handbags'
						? 'Tuscan full-grain leather totes, lustrous satin evening clutches, and structured modern silhouettes.'
						: 'Curated luxury collection.',
				subcategories: (subcategories ?? []).filter(
					(sub) => sub.category === cat.id
				),
			}))

			return {
				data: result,
				error: categoryError || subError || null,
			}
		}

		return {
			data: [],
			error: categoryError || subError || null,
		}
	} catch (e) {
		console.error('Supabase getCategories exception:', e)
		return {
			data: [],
			error: e,
		}
	}
})

/**
 * Get category by its slug name strictly from Supabase DB.
 */
export const getCategoryBySlug = cache(async (slug: string) => {
	const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase()
	const categoriesRes = await getCategories()
	const categories = categoriesRes.data || []

	return (
		categories.find(
			(cat) => cat.name?.toLowerCase() === normalizedSlug
		) || null
	)
})

/**
 * Resolve the parent category and subcategory for a product from the database.
 */
export const getCategoryForProduct = cache(
	async (product: Tables<'products'> | null) => {
		if (!product) return null
		const categoriesRes = await getCategories()
		const categories = categoriesRes.data || []

		// Product.category references subcategories.id
		for (const cat of categories) {
			const sub = cat.subcategories?.find((s) => s.id === product.category)
			if (sub) {
				return {
					category: cat,
					subcategory: sub,
				}
			}
		}

		// Direct category ID match fallback
		const directCat = categories.find((c) => c.id === product.category)
		if (directCat) {
			return {
				category: directCat,
				subcategory: null,
			}
		}

		return {
			category: categories[0] || null,
			subcategory: null,
		}
	}
)
