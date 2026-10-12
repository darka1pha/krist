/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'eqzhxlsoptcmlohjlbpc.supabase.co', protocol: 'https' },
			{ hostname: 'swavffutisgneenuzdoh.supabase.co', protocol: 'https' },
		],
	},
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
	images: {
		unoptimized: true
	}
}

module.exports = nextConfig
