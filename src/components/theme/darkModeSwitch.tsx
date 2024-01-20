'use client'
import { motion } from 'framer-motion'
import { Moon, Sun1 } from 'iconsax-react'
import React, { useEffect, useState } from 'react'

export default function DarkModeSwitch() {
	const [theme, setTheme] = useState('light')

	const toggleSwitch = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark')
		localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
	}

	const spring = {
		type: 'spring',
		stiffness: 700,
		damping: 30,
	}

	useEffect(() => {
		const html = document.querySelector('html')
		if (html) {
			html.setAttribute('data-theme', theme)
			html.className = theme
		}
	}, [theme])

	useEffect(() => {
		const currentTheme = localStorage.getItem("theme")
		if (currentTheme) {
			setTheme(currentTheme)
		}
	}, [])

	return (
		<div
			onClick={toggleSwitch}
			className={`flex w-fit h-fit rounded-[48px] justify-center items-center shadow-inner hover:cursor-pointer  dark:bg-zinc-700`}>
			<motion.div
				className='flex h-9 w-9 items-center justify-center rounded-full'
				layout
				transition={spring}>
				<motion.button
					data-toggle-theme='dark,light'
					data-choose-theme
					whileTap={{ rotate: 360 }}>
					{theme === 'light' ? (
						<Sun1 className='h-6 w-6 text-yellow-500' />
					) : (
						<Moon className='h-6 w-6 text-white' />
					)}
				</motion.button>
			</motion.div>
		</div>
	)
}
