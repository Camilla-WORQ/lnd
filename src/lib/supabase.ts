import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on the schema
export interface InterestSubmission {
  id: string
  created_at: string
  full_name: string
  company_name?: string
  contact_number?: string
  email: string
  subscribed_to_newsletter: boolean
}

export interface CreateSubmissionData {
  full_name: string
  company_name?: string
  contact_number?: string
  email: string
  subscribed_to_newsletter: boolean
} 