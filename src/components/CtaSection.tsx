'use client'

import { motion } from 'framer-motion'

export default function CtaSection() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-32 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold tracking-tight mb-4"
      >
        Ready to see the <span className="italic">data</span>?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-black/50 dark:text-white/50 mb-10"
      >
        Live dashboard with real-time backtest results and strategy performance.
      </motion.p>
      <motion.a
        href="https://prediction-dashboard-one.vercel.app"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block px-10 py-4 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium"
      >
        Open Dashboard →
      </motion.a>
    </section>
  )
}
