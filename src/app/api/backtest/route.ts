import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  const btcUrl = `${supabaseUrl}/rest/v1/btc_prices?order=ts.desc&limit=100`
  const btRes = await fetch(btcUrl, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    cache: 'no-store'
  })
  const btcData = await btRes.json()
  const prices = Array.isArray(btcData) ? btcData : []

  const currentBtc = prices.length > 0 ? prices[prices.length - 1].price : 0
  const ts = prices.length > 0 ? prices[prices.length - 1].ts : new Date().toISOString()
  const n = prices.length

  return NextResponse.json({
    ts,
    data_points: n,
    btc_current: currentBtc,
    strategies: {
      trend_following: { wins: 0, total: 0, winrate: 0 },
      mean_reversion: { wins: 0, total: 0, winrate: 0 },
      volatility_breakout: { wins: 0, total: 0, winrate: 0 },
    }
  })
}
