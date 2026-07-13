'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const stats = [
  { label: 'Active Strategies', value: 3, suffix: '' },
  { label: 'Data Points', value: 12847, suffix: '' },
  { label: 'BTC Markets Scanned', value: 96493, suffix: '' },
  { label: 'Uptime', value: 99.8, suffix: '%' },
]

function StatSkeleton() {
  return (
    <div className="animate-pulse p-6 rounded-2xl border border-black/10 dark:border-white/10">
      <div className="h-8 w-20 bg-black/10 dark:bg-white/10 rounded mb-2" />
      <div className="h-4 w-24 bg-black/5 dark:bg-white/5 rounded" />
    </div>
  )
}

function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = to / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [to])

  return <>{count.toLocaleString()}{suffix}</>
}

export default function Stats() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!loaded) {
    return (
      <section className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 -mt-16 relative z-20">
        {[1, 2, 3, 4].map(i => <StatSkeleton key={i} />)}
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 -mt-16 relative z-20">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.5 }}
          className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm"
        >
          <div className="text-3xl font-bold tabular-nums">
            <AnimatedCounter to={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-black/50 dark:text-white/50 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </section>
  )
}
