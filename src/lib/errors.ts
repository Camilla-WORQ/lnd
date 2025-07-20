/**
 * Centralized error handling and custom error classes
 */

export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: string[]) {
    super(message, 400)
    this.details = details
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, public originalError?: any) {
    super(message, 500)
    this.originalError = originalError
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(message, 403)
  }
}

/**
 * Error handler utility
 */
export class ErrorHandler {
  /**
   * Handle and log errors
   */
  static handle(error: Error | AppError): void {
    if (error instanceof AppError && error.isOperational) {
      // Log operational errors (expected errors)
      console.warn(`Operational error: ${error.message}`)
    } else {
      // Log unexpected errors
      console.error('Unexpected error:', error)
    }
  }

  /**
   * Convert error to API response format
   */
  static toApiResponse(error: Error | AppError): {
    success: false
    error: string
    details?: string[]
    statusCode: number
  } {
    if (error instanceof ValidationError) {
      return {
        success: false,
        error: error.message,
        details: error.details,
        statusCode: error.statusCode
      }
    }

    if (error instanceof AppError) {
      return {
        success: false,
        error: error.message,
        statusCode: error.statusCode
      }
    }

    // Handle unexpected errors
    return {
      success: false,
      error: 'Internal server error',
      statusCode: 500
    }
  }

  /**
   * Create a user-friendly error message
   */
  static getUserFriendlyMessage(error: Error | AppError): string {
    if (error instanceof ValidationError) {
      return 'Please check your input and try again.'
    }

    if (error instanceof DatabaseError) {
      return 'A database error occurred. Please try again later.'
    }

    if (error instanceof NotFoundError) {
      return 'The requested resource was not found.'
    }

    if (error instanceof UnauthorizedError) {
      return 'You need to be logged in to perform this action.'
    }

    if (error instanceof ForbiddenError) {
      return 'You do not have permission to perform this action.'
    }

    // Default message for unexpected errors
    return 'Something went wrong. Please try again later.'
  }
}

/**
 * Common error messages
 */
export const ErrorMessages = {
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    NAME_TOO_SHORT: 'Name must be at least 2 characters long',
    NAME_TOO_LONG: 'Name must be less than 100 characters',
    EMAIL_EXISTS: 'An account with this email already exists'
  },
  DATABASE: {
    CONNECTION_FAILED: 'Database connection failed',
    INSERT_FAILED: 'Failed to save data',
    QUERY_FAILED: 'Failed to retrieve data',
    DUPLICATE_ENTRY: 'This record already exists'
  },
  API: {
    INVALID_REQUEST: 'Invalid request format',
    RATE_LIMITED: 'Too many requests. Please try again later',
    SERVER_ERROR: 'Server error occurred'
  }
} as const 