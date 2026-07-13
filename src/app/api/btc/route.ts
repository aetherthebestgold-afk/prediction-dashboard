import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qqzrrnosmjvzudrduaum.supabase.co"
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  const url = `${supabaseUrl}/rest/v1/btc_prices?order=ts.desc&limit=500`
  try {
    const res = await fetch(url, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      cache: 'no-store'
    })
    const data = await res.json()
    const sorted = Array.isArray(data) ? data.reverse() : []
    return NextResponse.json(sorted)
  } catch {
    return NextResponse.json([])
  }
}
