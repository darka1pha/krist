'use client'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function DarkModeSwitch() {
	const [theme, setTheme] = useState('light')
	const [mounted, setMounted] = useState(false)

	const applyTheme = (t: string) => {
		const root = document.documentElement
		if (t === 'dark') {
			root.classList.add('dark')
		} else {
			root.classList.remove('dark')
		}
		root.setAttribute('data-theme', t)
	}

	const toggleSwitch = () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark'
		setTheme(nextTheme)
		localStorage.setItem('theme', nextTheme)
		applyTheme(nextTheme)
	}

	const spring = {
		type: 'spring' as const,
		stiffness: 700,
		damping: 30,
	}

	useEffect(() => {
		setMounted(true)
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			setTheme(savedTheme)
			applyTheme(savedTheme)
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme('dark')
			applyTheme('dark')
		}
	}, [])

	return (
		<button
			type='button'
			onClick={toggleSwitch}
			aria-label='Toggle color theme'
			className='flex items-center justify-center p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer'>
			<motion.div
				layout
				transition={spring}
				key={mounted ? theme : 'initial'}
				initial={{ scale: 0.8, rotate: -20, opacity: 0 }}
				animate={{ scale: 1, rotate: 0, opacity: 1 }}>
				{theme === 'light' ? (
					<Sun className='h-5 w-5 text-amber-500 fill-amber-500/20' />
				) : (
					<Moon className='h-5 w-5 text-indigo-400 fill-indigo-400/20' />
				)}
			</motion.div>
		</button>
	)
}
