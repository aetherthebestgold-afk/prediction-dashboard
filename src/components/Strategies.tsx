'use client'

import { motion } from 'framer-motion'

const strategies = [
  {
    icon: '📈',
    title: 'Trend Following',
    desc: 'Analyzes last 3 candles to predict direction. Best for trending markets with clear momentum.',
    tag: 'Active',
    tagClass: 'bg-black text-white dark:bg-white dark:text-black',
  },
  {
    icon: '🔄',
    title: 'Mean Reversion',
    desc: 'Detects overbought/oversold conditions. Profits when price snaps back to the mean.',
    tag: 'Active',
    tagClass: 'bg-black/10 dark:bg-white/10',
  },
  {
    icon: '⚡',
    title: 'Volatility Breakout',
    desc: 'Trades breakouts from high-volatility regimes. Catches explosive moves early.',
    tag: 'Active',
    tagClass: 'bg-black/10 dark:bg-white/10',
  },
]

export default function Strategies() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-32">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold tracking-tight mb-2"
      >
        Active Strategies
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-black/50 dark:text-white/50 mb-12 max-w-md"
      >
        Three distinct approaches tested against live market data every hour.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-4">
        {strategies.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            whileHover={{ y: -4 }}
            className="group p-8 rounded-2xl border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-300"
          >
            <div className="text-2xl mb-4">{s.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed mb-4">{s.desc}</p>
            <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${s.tagClass}`}>{s.tag}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
