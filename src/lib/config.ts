/**
 * Application configuration management
 */

export interface AppConfig {
  name: string
  version: string
  environment: 'development' | 'production' | 'test'
  supabase: {
    url: string
    anonKey: string
  }
  api: {
    baseUrl: string
    timeout: number
  }
  rateLimit: {
    windowMs: number
    maxRequests: number
  }
  cors: {
    allowedOrigins: string[]
  }
}

/**
 * Load configuration from environment variables
 */
function loadConfig(): AppConfig {
  const environment = (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test'
  
  return {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'LD Landing Page',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment,
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    },
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
      timeout: parseInt(process.env.API_TIMEOUT || '10000', 10)
    },
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
      maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10)
    },
    cors: {
      allowedOrigins: [
        'http://localhost:3000',
        'http://localhost:3001',
        process.env.NEXT_PUBLIC_APP_URL || 'https://your-domain.com'
      ].filter(Boolean)
    }
  }
}

/**
 * Validate configuration
 */
function validateConfig(config: AppConfig): void {
  const errors: string[] = []

  if (!config.supabase.url) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is required')
  }

  if (!config.supabase.anonKey) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is required')
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`)
  }
}

// Load and validate configuration
const config = loadConfig()

// Only validate in production to allow development without full config
if (config.environment === 'production') {
  validateConfig(config)
}

export default config

/**
 * Get environment-specific configuration
 */
export function getConfig(): AppConfig {
  return config
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return config.environment === 'development'
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return config.environment === 'production'
}

/**
 * Check if running in test environment
 */
export function isTest(): boolean {
  return config.environment === 'test'
}

/**
 * Get Supabase configuration
 */
export function getSupabaseConfig() {
  return config.supabase
}

/**
 * Get API configuration
 */
export function getApiConfig() {
  return config.api
}

/**
 * Get rate limiting configuration
 */
export function getRateLimitConfig() {
  return config.rateLimit
}

/**
 * Get CORS configuration
 */
export function getCorsConfig() {
  return config.cors
} 