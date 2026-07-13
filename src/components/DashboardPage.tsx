'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface BacktestData {
  ts: string
  data_points: number
  btc_current: number
  strategies: Record<string, { wins: number; total: number; winrate: number }>
}

interface PricePoint {
  ts: string
  price: number
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-black/5 dark:bg-white/5 rounded-xl ${className}`} />
}

function StatCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-black/10 dark:border-white/10">
      <Skeleton className="h-3 w-16 mb-2" />
      <Skeleton className="h-8 w-24 mb-1" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}

export default function DashboardPage() {
  const [backtest, setBacktest] = useState<BacktestData | null>(null)
  const [prices, setPrices] = useState<PricePoint[]>([])
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('1h')

  useEffect(() => {
    const fetchData = () => {
      Promise.all([
        fetch('/api/backtest').then(r => r.json().catch(() => null)),
        fetch('/api/btc').then(r => r.json().catch(() => [])),
      ])
        .then(([bt, btc]) => {
          setBacktest(bt)
          setPrices(Array.isArray(btc) ? btc : [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map(i => <StatCardSkeleton key={i} />)}
        </div>
        <Skeleton className="h-80 w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
      </div>
    )
  }

  const currentBtc = backtest?.btc_current || prices[prices.length - 1]?.price || 0
  const bestStrategy = backtest
    ? Object.entries(backtest.strategies).sort((a, b) => b[1].winrate - a[1].winrate)[0]
    : null

  const formatTime = (ts: string) => {
    try { return new Date(ts).toLocaleString('tr-TR') } catch { return ts }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold">▲ aether</span>
            <span className="text-xs text-black/30 dark:text-white/30 font-mono">/ dashboard</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-black/50 dark:text-white/50">Live</span>
            </div>
            <a
              href="https://github.com/aetherthebestgold-afk/prediction-dashboard"
              className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Top row */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-semibold tracking-tight"
            >
              Prediction Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-black/40 dark:text-white/40 mt-0.5"
            >
              {backtest ? `Last updated ${formatTime(backtest.ts)}` : 'Loading...'}
            </motion.p>
          </div>
          <div className="flex gap-2">
            {['1h', '6h', '24h', '7d'].map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  timeframe === t
                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                    : 'border-black/20 dark:border-white/20 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'BTC Price', value: `$${currentBtc.toLocaleString()}`, sub: 'Bitstamp' },
            { label: 'Data Points', value: backtest?.data_points.toLocaleString() || '0', sub: '5-min intervals' },
            { label: 'Best Strategy', value: bestStrategy ? `${bestStrategy[1].winrate}%` : '--', sub: bestStrategy ? bestStrategy[0].replace('_', ' ') : 'N/A' },
            { label: 'Total Trades', value: bestStrategy ? bestStrategy[1].total.toLocaleString() : '0', sub: 'across all strategies' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="p-5 rounded-2xl border border-black/10 dark:border-white/10"
            >
              <div className="text-xs text-black/40 dark:text-white/40 mb-1 font-medium">{stat.label}</div>
              <div className="text-2xl font-bold tabular-nums tracking-tight">{stat.value}</div>
              <div className="text-xs text-black/30 dark:text-white/30 mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl border border-black/10 dark:border-white/10 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold">BTC/USD</h2>
            <span className="text-xs text-black/30 dark:text-white/30 font-mono">Price feed</span>
          </div>
          <div className="h-72">
            {prices.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={prices.slice(-100)}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#000" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="ts"
                    tick={{ fontSize: 10, fill: '#888' }}
                    tickFormatter={(v) => {
                      try { return new Date(v).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) }
                      catch { return v }
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 10, fill: '#888' }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #eee',
                      borderRadius: '12px',
                      fontSize: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                    labelFormatter={(v) => {
                      try { return new Date(v).toLocaleString('tr-TR') }
                      catch { return v }
                    }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#000" strokeWidth={1.5} fill="url(#priceGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-black/30 dark:text-white/30">
                No price data available yet. Data collection every 5 min.
              </div>
            )}
          </div>
        </motion.div>

        {/* Strategy cards */}
        {backtest && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {Object.entries(backtest.strategies).map(([name, data], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + 0.05 * i }}
                className="p-6 rounded-2xl border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${data.winrate >= 50 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <h3 className="text-sm font-medium capitalize">{name.replace('_', ' ')}</h3>
                </div>
                <div className="text-3xl font-bold tabular-nums tracking-tight mb-1">{data.winrate}%</div>
                <div className="text-xs text-black/40 dark:text-white/40">
                  {data.wins}/{data.total} trades
                </div>
                <div className="mt-4 h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.winrate}%` }}
                    transition={{ duration: 1, delay: 0.5 + 0.1 * i }}
                    className={`h-full rounded-full ${data.winrate >= 50 ? 'bg-black dark:bg-white' : 'bg-red-500'}`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ASCII status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 rounded-2xl border border-black/10 dark:border-white/10"
        >
          <div className="text-xs font-mono text-black/30 dark:text-white/30 mb-4">// system status</div>
          <pre className="font-mono text-xs leading-relaxed text-black/60 dark:text-white/60">{`
  ┌──────────────────────────────────────────────┐
  │  ▲ aether  prediction protocol               │
  │  ───────────────────────────────────────────  │
  │  ● COLLECT   → Bitstamp · Polymarket         │
  │  ● BACKTEST  → 3 strategies · every 60 min   │
  │  ● REPORT    → GitHub → Vercel               │
  │  ───────────────────────────────────────────  │
  │  BTC $${currentBtc.toLocaleString()}  |  STATUS: OPERATIONAL  │
  └──────────────────────────────────────────────┘`}</pre>
        </motion.div>
      </main>
    </div>
  )
}
// auto-refresh
