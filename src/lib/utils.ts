/**
 * Utility functions for common operations
 */

import { ValidationService } from './validation'

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return ''
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone // Return original if can't format
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format date and time for display
 */
export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Generate a random string
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Validate form data and return field-specific errors
 */
export function validateFormFields(data: {
  full_name: string
  company_name?: string
  contact_number?: string
  email: string
  subscribed_to_newsletter: boolean
}): Record<string, string> {
  const errors: Record<string, string> = {}

  // Validate full name
  if (!data.full_name.trim()) {
    errors.full_name = 'Full name is required'
  } else if (!ValidationService.validateFullName(data.full_name)) {
    errors.full_name = 'Full name must be between 2 and 100 characters'
  }

  // Validate email
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!ValidationService.validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Validate company name (optional)
  if (data.company_name && !ValidationService.validateCompanyName(data.company_name)) {
    errors.company_name = 'Company name must be between 1 and 100 characters'
  }

  // Validate phone number (optional)
  if (data.contact_number && !ValidationService.validatePhoneNumber(data.contact_number)) {
    errors.contact_number = 'Please enter a valid phone number'
  }

  return errors
}

/**
 * Sanitize form data for submission
 */
export function sanitizeFormData(data: {
  full_name: string
  company_name?: string
  contact_number?: string
  email: string
  subscribed_to_newsletter: boolean
}) {
  return {
    full_name: data.full_name.trim(),
    company_name: data.company_name?.trim() || undefined,
    contact_number: data.contact_number?.trim() || undefined,
    email: data.email.trim().toLowerCase(),
    subscribed_to_newsletter: Boolean(data.subscribed_to_newsletter)
  }
}

/**
 * Check if two objects are equal (shallow comparison)
 */
export function isEqual(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean {
  if (obj1 === obj2) return true
  if (obj1 == null || obj2 == null) return false
  if (typeof obj1 !== typeof obj2) return false
  if (typeof obj1 !== 'object') return false

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (!keys2.includes(key)) return false
    if (obj1[key] !== obj2[key]) return false
  }

  return true
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T
  if (typeof obj === 'object') {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * Convert bytes to human readable format
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Sleep function for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Retry function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      
      if (attempt === maxAttempts) {
        throw lastError
      }

      const delay = baseDelay * Math.pow(2, attempt - 1)
      await sleep(delay)
    }
  }

  throw lastError!
} 