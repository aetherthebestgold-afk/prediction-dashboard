import { NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

export async function GET() {
  const dataDir = join(process.cwd(), 'data')
  const files = ['btc_prices.jsonl', 'backtest_results.jsonl']
  const data: any = {}

  for (const f of files) {
    const p = join(dataDir, f)
    if (existsSync(p)) {
      const lines = readFileSync(p, 'utf-8').trim().split('\n').filter(Boolean)
      data[f.replace('.jsonl', '')] = lines.map(l => JSON.parse(l))
    }
  }

  return NextResponse.json(data)
}
