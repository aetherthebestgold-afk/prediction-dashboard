'use client'

import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Data Collection', desc: 'Every 5 minutes from Bitstamp + Polymarket API', color: 'bg-black/5 dark:bg-white/5' },
  { num: '02', title: 'Backtesting', desc: 'Every hour — 3 strategies tested against live data', color: 'bg-black/10 dark:bg-white/10' },
  { num: '03', title: 'Analysis', desc: 'Win rates, Sharpe ratios, drawdown calculations', color: 'bg-black/5 dark:bg-white/5' },
  { num: '04', title: 'Reporting', desc: 'Auto-pushed to GitHub → Vercel dashboard live', color: 'bg-black/10 dark:bg-white/10' },
]

export default function Pipeline() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-32">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold tracking-tight mb-2"
      >
        Data Pipeline
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-black/50 dark:text-white/50 mb-12 max-w-md"
      >
        Fully automated 24/7 infrastructure.
      </motion.p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className={`p-6 rounded-2xl ${step.color} border border-black/5 dark:border-white/5`}
          >
            <div className="font-mono text-xs text-black/30 dark:text-white/30 mb-3">{step.num}</div>
            <h3 className="font-semibold mb-1">{step.title}</h3>
            <p className="text-sm text-black/50 dark:text-white/50">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
