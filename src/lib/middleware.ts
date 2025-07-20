import { NextRequest, NextResponse } from 'next/server'
import { ValidationService } from './validation'
import { ErrorHandler } from './errors'

/**
 * Rate limiting configuration
 */
interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

/**
 * Rate limiting store (in-memory for development, use Redis for production)
 */
class RateLimitStore {
  private requests = new Map<string, { count: number; resetTime: number }>()

  isRateLimited(identifier: string, config: RateLimitConfig): boolean {
    const now = Date.now()
    const record = this.requests.get(identifier)

    if (!record || now > record.resetTime) {
      // Reset or create new record
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + config.windowMs
      })
      return false
    }

    if (record.count >= config.maxRequests) {
      return true
    }

    // Increment count
    record.count++
    return false
  }

  getRemainingTime(identifier: string): number {
    const record = this.requests.get(identifier)
    if (!record) return 0
    return Math.max(0, record.resetTime - Date.now())
  }
}

const rateLimitStore = new RateLimitStore()

/**
 * Rate limiting middleware
 */
export function withRateLimit(
  config: RateLimitConfig = { windowMs: 15 * 60 * 1000, maxRequests: 100 }
) {
  return function (request: NextRequest) {
    const identifier = getClientIdentifier(request)
    
    if (rateLimitStore.isRateLimited(identifier, config)) {
      const remainingTime = rateLimitStore.getRemainingTime(identifier)
      return NextResponse.json(
        {
          error: 'Too many requests',
          retryAfter: Math.ceil(remainingTime / 1000)
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(remainingTime / 1000).toString(),
            'X-RateLimit-Limit': config.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + remainingTime).toISOString()
          }
        }
      )
    }

    return null
  }
}

/**
 * Get client identifier for rate limiting
 */
function getClientIdentifier(request: NextRequest): string {
  // Use IP address as identifier
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}

/**
 * CORS middleware
 */
export function withCORS(request: NextRequest) {
  const origin = request.headers.get('origin')
  const allowedOrigins = [
    'http://localhost:3000',
    'https://your-domain.com' // Add your production domain
  ]

  const isAllowedOrigin = origin && allowedOrigins.includes(origin)

  const response = NextResponse.next()
  
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')

  return response
}

/**
 * Request validation middleware
 */
export function withValidation() {
  return async function (request: NextRequest) {
    try {
      if (request.method === 'POST' || request.method === 'PUT') {
        const body = await request.json()
        const validation = ValidationService.validateSubmissionData(body)
        
        if (!validation.isValid) {
          return NextResponse.json(
            {
              error: 'Validation failed',
              details: validation.errors
            },
            { status: 400 }
          )
        }
      }
      
      return null
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }
  }
}

/**
 * Error handling middleware
 */
export function withErrorHandling(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async function (request: NextRequest) {
    try {
      return await handler(request)
    } catch (error) {
      ErrorHandler.handle(error as Error)
      
      const apiResponse = ErrorHandler.toApiResponse(error as Error)
      return NextResponse.json(
        {
          success: apiResponse.success,
          error: apiResponse.error,
          details: apiResponse.details
        },
        { status: apiResponse.statusCode }
      )
    }
  }
}

/**
 * Logging middleware
 */
export function withLogging(request: NextRequest) {
  const startTime = Date.now()
  
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.url}`)
  
  return function (response: NextResponse) {
    const duration = Date.now() - startTime
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${response.status} (${duration}ms)`)
    return response
  }
}

/**
 * Security headers middleware
 */
export function withSecurityHeaders(response: NextResponse) {
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
} 