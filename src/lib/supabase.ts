// Supabase config
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""

// For now, data comes from local JSON files via API routes
// When Supabase is ready, switch to: createClient(supabaseUrl, supabaseAnonKey)
