'use client'

import { motion } from 'framer-motion'

const ascii = `
┌──────────────────────────────────────────────┐
│  ▲ ▲ ▲  PREDICTION TRADER v0.1               │
│  ───────────────────────────────────────────  │
│  ● COLLECT   → Bitstamp · Polymarket         │
│  ● BACKTEST  → 3 strategies · 60 min         │
│  ● REPORT    → Dashboard · GitHub · Vercel    │
│  ───────────────────────────────────────────  │
│  BTC $62,879  |  STATUS: OPERATIONAL          │
└──────────────────────────────────────────────┘
`

export default function AsciiSection() {
  return (
    <section className="max-w-2xl mx-auto px-6 py-32">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono text-black/30 dark:text-white/30 uppercase tracking-widest mb-6"
      >
        // System Status
      </motion.h2>

      <motion.pre
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="font-mono text-xs leading-relaxed text-black/80 dark:text-white/80 p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] overflow-x-auto"
      >
        {ascii}
      </motion.pre>
    </section>
  )
}
