import { supabase, type InterestSubmission, type CreateSubmissionData } from './supabase'

export class DatabaseService {
  /**
   * Submit a new interest form
   */
  static async submitInterest(data: CreateSubmissionData): Promise<{
    success: boolean
    error?: string
    data?: InterestSubmission
  }> {
    try {
      const { data: submission, error } = await supabase
        .from('interest_submissions')
        .insert([data])
        .select()
        .single()

      if (error) {
        // Handle specific error cases
        if (error.code === '23505') {
          return {
            success: false,
            error: 'An interest submission with this email already exists.'
          }
        }
        
        return {
          success: false,
          error: error.message || 'Failed to submit interest form'
        }
      }

      return {
        success: true,
        data: submission
      }
    } catch (error) {
      console.error('Error submitting interest:', error)
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.'
      }
    }
  }

  /**
   * Get the total number of submissions
   */
  static async getSubmissionCount(): Promise<{
    success: boolean
    count?: number
    error?: string
  }> {
    try {
      const { data, error } = await supabase
        .rpc('get_submission_count')

      if (error) {
        console.error('Error getting submission count:', error)
        return {
          success: false,
          error: 'Failed to get submission count'
        }
      }

      return {
        success: true,
        count: data
      }
    } catch (error) {
      console.error('Error getting submission count:', error)
      return {
        success: false,
        error: 'An unexpected error occurred'
      }
    }
  }

  /**
   * Get recent submissions (for admin purposes)
   * Note: This would require proper authentication in a real app
   */
  static async getRecentSubmissions(limit: number = 10): Promise<{
    success: boolean
    data?: InterestSubmission[]
    error?: string
  }> {
    try {
      const { data, error } = await supabase
        .from('interest_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        return {
          success: false,
          error: error.message || 'Failed to fetch recent submissions'
        }
      }

      return {
        success: true,
        data: data || []
      }
    } catch (error) {
      console.error('Error fetching recent submissions:', error)
      return {
        success: false,
        error: 'An unexpected error occurred'
      }
    }
  }

  /**
   * Check if an email already exists
   */
  static async checkEmailExists(email: string): Promise<{
    exists: boolean
    error?: string
  }> {
    try {
      const { data, error } = await supabase
        .from('interest_submissions')
        .select('email')
        .eq('email', email)
        .single()

      if (error && error.code !== 'PGRST116') {
        return {
          exists: false,
          error: error.message
        }
      }

      return {
        exists: !!data
      }
    } catch (error) {
      console.error('Error checking email existence:', error)
      return {
        exists: false,
        error: 'An unexpected error occurred'
      }
    }
  }
} 