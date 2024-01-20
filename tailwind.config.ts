import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#a29fa9',
					200: '#8d8a94',
					300: '#77757c',
					400: '#575360',
					500: '#131118',
					600: '#14111c',
					700: '#14111c',
					800: '#14111c',
					900: '#14111c',
				},
				secondary: {
					100: '#e1f1bc',
					200: '#cee993',
					300: '#bcde6b',
					400: '#afd751',
					500: '#a3d139',
					600: '#97bd33',
					700: '#88a52a',
					800: '#798d21',
					900: '#626615',
				},
				tertiacry: {
					100: '#f0b0d9',
					200: '#e67bc2',
					300: '#d846ab',
					400: '#cd0d9b',
					500: '#b21589',
					600: '#af0a87',
					700: '#9b0982',
					800: '#8a087c',
					900: '#6c0772',
				},
				meadowGreen: '#30be82',
				blueGreen: '#30beb6',
				oceanBlue: '#5d30be',
				ceruleanBlue: '#304fbe',
				darkBg: '#1d232a',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark'],
	},
}
export default config
