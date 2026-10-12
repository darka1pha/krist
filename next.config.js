/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
		remotePatterns: [
			{ hostname: 'eqzhxlsoptcmlohjlbpc.supabase.co', protocol: 'https' },
			{ hostname: 'swavffutisgneenuzdoh.supabase.co', protocol: 'https' },
		],
	},
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
}

module.exports = nextConfig
