import { getCategories } from '@/actions/pdoducts'
import Image from 'next/image'
import Link from 'next/link'
import {
	ArrowRight,
	Sparkles,
	Layers,
	ShieldCheck,
	Truck,
	Clock,
	Gem,
	CheckCircle2,
	Compass,
	ShoppingBag,
	ChevronRight,
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'All Categories & Collections | Krist',
	description:
		'Explore our curated luxury collections at Krist. From statement jewelry and fine gold to bespoke handcrafted handbags and modern couture accessories.',
	openGraph: {
		title: 'All Categories & Collections | Krist',
		description:
			'Explore our curated luxury collections at Krist. From statement jewelry to handcrafted handbags and accessories.',
	},
}

export const dynamic = 'force-dynamic'

const departmentDetails: Record<
	string,
	{ subtitle: string; materials: string[]; tag: string }
> = {
	jewelry: {
		subtitle: 'Bespoke Haute Joaillerie',
		materials: ['18k Gold Vermeil', 'Lab-Grown Diamonds', 'Baroque Pearls'],
		tag: 'Atelier Signature',
	},
	accessories: {
		subtitle: 'Curated Wardrobe Accents',
		materials: ['Grade-A Cashmere', 'Japanese Acetate', 'Carl Zeiss Optics'],
		tag: 'Capsule Edition',
	},
	handbags: {
		subtitle: 'Italian Leather Goods',
		materials: ['Tuscan Calfskin', 'Champagne Brass', 'Silk Satin Lining'],
		tag: 'Artisan Crafted',
	},
}

export default async function CategoriesPage() {
	const categoriesRes = await getCategories()
	const categories = categoriesRes?.data || []

	return (
		<main className='max-w-7xl mx-auto paddings min-h-screen'>
			{/* Breadcrumbs */}
			<nav
				aria-label='Breadcrumb'
				className='flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-8'>
				<Link
					href='/'
					className='hover:text-zinc-950 dark:hover:text-white transition-colors'>
					Home
				</Link>
				<ChevronRight size={13} className='text-zinc-400' />
				<span className='font-semibold text-zinc-950 dark:text-zinc-100'>
					Categories & Departments
				</span>
			</nav>

			{/* Page Hero Header */}
			<section className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-50 via-zinc-100/90 to-amber-50/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-black text-zinc-900 dark:text-white p-8 sm:p-12 md:p-16 mb-16 border border-zinc-200/90 dark:border-zinc-800 shadow-sm dark:shadow-2xl transition-colors'>
				{/* Background decorative glows */}
				<div className='absolute -right-16 -top-16 w-80 h-80 bg-amber-400/10 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none' />
				<div className='absolute -left-16 -bottom-16 w-80 h-80 bg-zinc-400/10 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none' />

				<div className='relative z-10 max-w-3xl'>
					<div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-5 border border-amber-400/20'>
						<Sparkles size={14} className='text-amber-600 dark:text-amber-400' />
						<span>Curated Luxury Departments</span>
					</div>

					<h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-zinc-950 dark:text-white'>
						The Krist Collections
					</h1>

					<p className='text-zinc-700 dark:text-zinc-300 text-sm sm:text-base md:text-lg mt-4 leading-relaxed max-w-2xl font-normal'>
						Explore our masterfully organized ateliers. Every department unites
						refined aesthetic discipline, ethical precious materials, and
						uncompromising craftsmanship.
					</p>

					{/* Quick Category Jump Bar */}
					<div className='flex flex-wrap items-center gap-2.5 mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800'>
						<span className='text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mr-1'>
							Quick Jump:
						</span>
						{categories.map((cat) => {
							const slug = encodeURIComponent((cat.name || '').toLowerCase())
							return (
								<Link
									key={cat.id || cat.name}
									href={`/categories/${slug}`}
									className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-zinc-950 text-xs font-semibold text-zinc-900 dark:text-zinc-100 transition-all shadow-xs border border-zinc-200/80 dark:border-zinc-700'>
									<span>{cat.name}</span>
									<ArrowRight size={12} />
								</Link>
							)
						})}
						<Link
							href='/products'
							className='inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-transparent hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 transition-colors'>
							<span>Complete Catalog</span>
							<ChevronRight size={13} />
						</Link>
					</div>

					{/* Key Specs Pills */}
					<div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-4 text-xs font-medium text-zinc-600 dark:text-zinc-300'>
						<div className='flex items-center gap-1.5'>
							<CheckCircle2 size={14} className='text-emerald-600 shrink-0' />
							<span>100% Verified Origin</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<CheckCircle2 size={14} className='text-emerald-600 shrink-0' />
							<span>Ethical Sourcing</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<CheckCircle2 size={14} className='text-emerald-600 shrink-0' />
							<span>Insured Express Courier</span>
						</div>
						<div className='flex items-center gap-1.5'>
							<CheckCircle2 size={14} className='text-emerald-600 shrink-0' />
							<span>Bespoke Consultation</span>
						</div>
					</div>
				</div>
			</section>

			{/* Categories Showcase Grid */}
			<section className='mb-24'>
				<div className='flex flex-col sm:flex-row items-start sm:items-end justify-between pb-4 mb-8 border-b border-zinc-200 dark:border-zinc-800 gap-3'>
					<div>
						<div className='inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1'>
							<Compass size={14} />
							<span>Signature Departments</span>
						</div>
						<h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-white'>
							Explore All Departments
						</h2>
						<p className='text-sm text-zinc-600 dark:text-zinc-400 mt-1'>
							Select a department to view curated capsule pieces, materials, and
							filtered collections.
						</p>
					</div>
					<div className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700'>
						<Layers size={13} />
						<span>{categories.length} Curated Departments</span>
					</div>
				</div>

				{categories.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{categories.map((cat, idx) => {
						const slug = encodeURIComponent((cat.name || '').toLowerCase())
						const imageSrc = cat.poster_url || '/images/hero.webp'
						const details =
							departmentDetails[cat.name?.toLowerCase() || ''] || {
								subtitle: 'Curated Atelier',
								materials: ['Precious Metals', 'Artisanal Craft'],
								tag: 'Exclusive',
							}

						return (
							<div
								key={cat.id || cat.name}
								className='group flex flex-col rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)] dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden'>
								{/* Visual Banner */}
								<div className='relative w-full aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden'>
									<Image
										src={imageSrc}
										alt={cat.name || 'Category'}
										fill
										sizes='(max-width: 768px) 100vw, 33vw'
										className='object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out'
									/>
									{/* Gradient overlay for guaranteed contrast */}
									<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10' />

									{/* Top Badges */}
									<div className='absolute top-4 left-4 right-4 z-10 flex items-center justify-between'>
										<span className='px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/95 text-zinc-950 backdrop-blur-md shadow-sm border border-white/40'>
											Dept. 0{idx + 1}
										</span>
										<span className='px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/60 text-amber-300 backdrop-blur-md border border-white/10'>
											{details.tag}
										</span>
									</div>

									{/* Bottom Title on Image */}
									<div className='absolute bottom-4 left-4 right-4 z-10 text-white'>
										<span className='text-[11px] font-semibold uppercase tracking-wider text-amber-300 block mb-0.5'>
											{details.subtitle}
										</span>
										<h3 className='text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md text-white capitalize'>
											{cat.name}
										</h3>
									</div>
								</div>

								{/* Details & Subcategories */}
								<div className='p-6 flex flex-col flex-1 justify-between gap-6'>
									<div>
										<p className='text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal'>
											{cat.description ||
												'Discover timeless elegance handcrafted for exceptional versatility and personal styling.'}
										</p>

										{/* Key Materials Bar */}
										<div className='mt-4 pt-3.5 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-1.5'>
											{details.materials.map((mat, i) => (
												<span
													key={i}
													className='text-[11px] px-2.5 py-1 rounded-md bg-stone-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium'>
													{mat}
												</span>
											))}
										</div>

										{/* Subcategories list */}
										{cat.subcategories && cat.subcategories.length > 0 && (
											<div className='mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800'>
												<span className='text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block mb-2.5'>
													Curated Subcategories:
												</span>
												<div className='flex flex-wrap gap-2'>
													{cat.subcategories.map((sub) => {
														const subSlug = encodeURIComponent(
															(sub.name || '').toLowerCase()
														)
														return (
															<Link
																key={sub.id}
																href={`/products?category=${slug}&sub=${subSlug}`}
																className='px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-950 hover:text-white dark:bg-zinc-800 dark:hover:bg-white dark:hover:text-zinc-950 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors border border-zinc-200/80 dark:border-zinc-700/60 flex items-center gap-1.5 shadow-2xs'>
																<span>{sub.name}</span>
																<ArrowRight size={11} className='opacity-60' />
															</Link>
														)
													})}
												</div>
											</div>
										)}
									</div>

									{/* CTA buttons */}
									<div className='flex items-center gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800'>
										<Link
											href={`/categories/${slug}`}
											className='flex-1 btn-primary py-3 px-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 group-hover:shadow-md transition-all'>
											<span>Explore {cat.name}</span>
											<ArrowRight size={14} />
										</Link>
										<Link
											href={`/products?category=${slug}`}
											title={`Browse all ${cat.name} in shop catalog`}
											className='p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors shrink-0 shadow-2xs'>
											<ShoppingBag size={16} />
										</Link>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				) : (
					<div className='py-20 text-center bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800'>
						<p className='text-zinc-600 dark:text-zinc-400 text-sm'>
							No categories found in the database.
						</p>
					</div>
				)}
			</section>

			{/* Curated Trust Guarantees */}
			<section className='border-t border-zinc-200 dark:border-zinc-800/80 pt-16 pb-12'>
				<div className='text-center max-w-xl mx-auto mb-10'>
					<span className='text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400'>
						The Krist Standard
					</span>
					<h3 className='text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white mt-1'>
						Artisan Provenance & Care
					</h3>
					<p className='text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2'>
						Every acquisition is accompanied by our verified authenticity deed
						and white-glove concierge service.
					</p>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center'>
					<div className='p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 shadow-xs'>
						<div className='w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto mb-3 border border-amber-500/20'>
							<Gem size={22} />
						</div>
						<h4 className='font-bold text-sm mb-1.5 text-zinc-950 dark:text-white'>
							Certified Craftsmanship
						</h4>
						<p className='text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal'>
							Hand-finished by master jewelers and leather ateliers in Europe
							and Japan.
						</p>
					</div>

					<div className='p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 shadow-xs'>
						<div className='w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/20'>
							<ShieldCheck size={22} />
						</div>
						<h4 className='font-bold text-sm mb-1.5 text-zinc-950 dark:text-white'>
							Authenticity Guaranteed
						</h4>
						<p className='text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal'>
							Individually serialized and inspected under strict gemological
							standards.
						</p>
					</div>

					<div className='p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 shadow-xs'>
						<div className='w-12 h-12 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 border border-blue-500/20'>
							<Truck size={22} />
						</div>
						<h4 className='font-bold text-sm mb-1.5 text-zinc-950 dark:text-white'>
							Complimentary Express
						</h4>
						<p className='text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal'>
							Insured priority courier delivery directly to your door in bespoke
							packaging.
						</p>
					</div>

					<div className='p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 shadow-xs'>
						<div className='w-12 h-12 rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-400 flex items-center justify-center mx-auto mb-3 border border-purple-500/20'>
							<Clock size={22} />
						</div>
						<h4 className='font-bold text-sm mb-1.5 text-zinc-950 dark:text-white'>
							Private Concierge
						</h4>
						<p className='text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal'>
							Dedicated private stylists available for bespoke sizing and
							curated advice.
						</p>
					</div>
				</div>
			</section>

			{/* Concierge Banner */}
			<section className='mb-16 p-8 sm:p-10 rounded-3xl bg-zinc-950 text-white dark:bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl'>
				<div className='space-y-2 text-center sm:text-left'>
					<div className='inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400'>
						<Sparkles size={13} />
						<span>Need Bespoke Guidance?</span>
					</div>
					<h3 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-white'>
						Book A Private Styling Consultation
					</h3>
					<p className='text-zinc-400 text-sm max-w-lg'>
						Our client advisors assist with size fitting, personalized styling,
						and capsule collection recommendations.
					</p>
				</div>
				<Link
					href='/contact-us'
					className='px-6 py-3.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-md shrink-0'>
					Connect With Concierge
				</Link>
			</section>
		</main>
	)
}
