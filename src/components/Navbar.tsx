'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const navItems = ['Strategies', 'Backtest', 'Pipeline', 'Status']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.span
          className="text-lg font-bold tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          ▲ aether
        </motion.span>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="https://prediction-dashboard-one.vercel.app"
            whileHover={{ scale: 1.02 }}
            className="text-sm font-medium px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            Dashboard →
          </motion.a>
        </nav>
      </div>
    </motion.header>
  )
}
