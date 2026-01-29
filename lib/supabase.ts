import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Expense = {
  id: string
  created_at: string
  amount: number
  category: string
  description: string
  date: string
  receipt_url?: string
  user_id?: string
}

export type Budget = {
  id: string
  created_at: string
  category: string
  limit: number
  month: string
  user_id?: string
}
