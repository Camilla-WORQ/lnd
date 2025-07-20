/**
 * Centralized type definitions for the application
 */

// Database types
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

// API response types
export interface ApiResponse<T = Record<string, unknown>> {
  success: boolean
  data?: T
  error?: string
  details?: string[]
  message?: string
}

export interface SubmissionResponse {
  id: string
  submitted_at: string
}

export interface CountResponse {
  count: number
}

export interface EmailCheckResponse {
  exists: boolean
}

// Form types
export interface InterestFormData {
  full_name: string
  company_name: string
  contact_number: string
  email: string
  subscribed_to_newsletter: boolean
}

export interface FormValidationResult {
  isValid: boolean
  errors: string[]
  fieldErrors?: Record<string, string>
}

// Component prop types
export interface HeroSectionProps {
  submissionCount?: number
  isLoading?: boolean
}

export interface InterestFormProps {
  onSubmit: (data: InterestFormData) => Promise<void>
  isLoading?: boolean
  error?: string
  success?: string
}

// Error types
export interface AppError {
  message: string
  statusCode: number
  isOperational: boolean
  details?: string[]
}

// Configuration types
export interface AppConfig {
  name: string
  version: string
  environment: 'development' | 'production' | 'test'
  supabase: {
    url: string
    anonKey: string
  }
}

// Rate limiting types
export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

// Middleware types
export interface MiddlewareConfig {
  enableRateLimit: boolean
  enableCORS: boolean
  enableLogging: boolean
  enableSecurityHeaders: boolean
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// Event types (for future analytics)
export interface AnalyticsEvent {
  event: string
  properties?: Record<string, unknown>
  timestamp: string
  sessionId?: string
}

// Newsletter subscription types
export interface NewsletterSubscription {
  email: string
  subscribed_at: string
  status: 'active' | 'unsubscribed' | 'pending'
}

// Admin types (for future admin panel)
export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'moderator'
  created_at: string
  last_login?: string
}

export interface AdminStats {
  totalSubmissions: number
  recentSubmissions: number
  newsletterSubscribers: number
  averageSubmissionsPerDay: number
} 