import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qqzrrnosmjvzudrduaum.supabase.co"
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}` }

export async function GET() {
  const [acct, trades] = await Promise.all([
    fetch(`${URL}/rest/v1/account?limit=1`, { headers, cache: 'no-store' }).then(r => r.json()),
    fetch(`${URL}/rest/v1/trades?order=opened_at.desc&limit=20`, { headers, cache: 'no-store' }).then(r => r.json()),
  ])

  const account = Array.isArray(acct) && acct.length > 0 ? acct[0] : { balance: 50, equity: 50 }
  const tradeList = Array.isArray(trades) ? trades : []

  const initialBalance = 50
  const pnl = Number(account.equity || 50) - initialBalance
  const openTrades = tradeList.filter((t: any) => t.status === 'open')
  const closedTrades = tradeList.filter((t: any) => t.status === 'closed')
  const wonTrades = closedTrades.filter((t: any) => Number(t.pnl) > 0)
  const winRate = closedTrades.length > 0 ? (wonTrades.length / closedTrades.length * 100).toFixed(1) : '0'

  return NextResponse.json({
    account: { equity: Number(account.equity), balance: Number(account.balance), pnl },
    open_trades: openTrades,
    closed_trades: closedTrades.slice(0, 10),
    stats: {
      total_trades: tradeList.length,
      open_count: openTrades.length,
      closed_count: closedTrades.length,
      win_rate: Number(winRate),
      won: wonTrades.length,
      lost: closedTrades.length - wonTrades.length,
    }
  })
}
