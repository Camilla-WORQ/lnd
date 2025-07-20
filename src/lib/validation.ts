/**
 * Validation utilities for form data
 */

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export class ValidationService {
  /**
   * Validate email format
   */
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.trim())
  }

  /**
   * Validate phone number format (basic validation)
   */
  static validatePhoneNumber(phone: string): boolean {
    if (!phone) return true // Optional field
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
  }

  /**
   * Validate full name (non-empty and reasonable length)
   */
  static validateFullName(name: string): boolean {
    const trimmed = name.trim()
    return trimmed.length >= 2 && trimmed.length <= 100
  }

  /**
   * Validate company name (optional field)
   */
  static validateCompanyName(company: string): boolean {
    if (!company) return true // Optional field
    const trimmed = company.trim()
    return trimmed.length >= 1 && trimmed.length <= 100
  }

  /**
   * Validate interest submission data
   */
  static validateSubmissionData(data: {
    full_name: string
    company_name?: string
    contact_number?: string
    email: string
    subscribed_to_newsletter: boolean
  }): ValidationResult {
    const errors: string[] = []

    // Validate full name
    if (!this.validateFullName(data.full_name)) {
      errors.push('Full name must be between 2 and 100 characters')
    }

    // Validate company name
    if (data.company_name && !this.validateCompanyName(data.company_name)) {
      errors.push('Company name must be between 1 and 100 characters')
    }

    // Validate email
    if (!this.validateEmail(data.email)) {
      errors.push('Please enter a valid email address')
    }

    // Validate phone number
    if (data.contact_number && !this.validatePhoneNumber(data.contact_number)) {
      errors.push('Please enter a valid phone number')
    }

    // Validate newsletter subscription (should be boolean)
    if (typeof data.subscribed_to_newsletter !== 'boolean') {
      errors.push('Invalid newsletter subscription value')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Sanitize input data
   */
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .substring(0, 1000) // Limit length
  }

  /**
   * Sanitize submission data
   */
  static sanitizeSubmissionData(data: {
    full_name: string
    company_name?: string
    contact_number?: string
    email: string
    subscribed_to_newsletter: boolean
  }) {
    return {
      full_name: this.sanitizeInput(data.full_name),
      company_name: data.company_name ? this.sanitizeInput(data.company_name) : undefined,
      contact_number: data.contact_number ? this.sanitizeInput(data.contact_number) : undefined,
      email: this.sanitizeInput(data.email).toLowerCase(),
      subscribed_to_newsletter: Boolean(data.subscribed_to_newsletter)
    }
  }
} 