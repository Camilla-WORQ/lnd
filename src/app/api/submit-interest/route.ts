import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { ValidationService } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate request body
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Validate and sanitize input data
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

    // Sanitize the data
    const sanitizedData = ValidationService.sanitizeSubmissionData(body)

    // Submit to database
    const result = await DatabaseService.submitInterest(sanitizedData)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Interest form submitted successfully',
      data: {
        id: result.data?.id,
        submitted_at: result.data?.created_at
      }
    })

  } catch (error) {
    console.error('Error in submit-interest API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 