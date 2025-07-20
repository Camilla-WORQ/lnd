/**
 * Client-side API service for making HTTP requests
 */

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  details?: string[]
}

export class ApiService {
  private static baseUrl = '/api'

  /**
   * Submit interest form
   */
  static async submitInterest(data: {
    full_name: string
    company_name?: string
    contact_number?: string
    email: string
    subscribed_to_newsletter: boolean
  }): Promise<ApiResponse> {
    try {
      console.log('this.baseUrl',this.baseUrl)
      const response = await fetch(`${this.baseUrl}/submit-interest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Failed to submit interest form',
          details: result.details
        }
      }

      return {
        success: true,
        data: result.data
      }
    } catch (error) {
      console.error('Error submitting interest:', error)
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      }
    }
  }

  /**
   * Get submission count
   */
  static async getSubmissionCount(): Promise<ApiResponse<{ count: number }>> {
    try {
      const response = await fetch(`${this.baseUrl}/submission-count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Failed to get submission count'
        }
      }

      return {
        success: true,
        data: { count: result.count }
      }
    } catch (error) {
      console.error('Error getting submission count:', error)
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      }
    }
  }

  /**
   * Check if email exists (for real-time validation)
   */
  static async checkEmailExists(email: string): Promise<ApiResponse<{ exists: boolean }>> {
    try {
      const response = await fetch(`${this.baseUrl}/check-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Failed to check email'
        }
      }

      return {
        success: true,
        data: { exists: result.exists }
      }
    } catch (error) {
      console.error('Error checking email:', error)
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      }
    }
  }
} 