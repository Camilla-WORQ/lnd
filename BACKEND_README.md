# Backend Structure Documentation

This document outlines the complete backend structure for the LD Landing Page application built with Next.js and Supabase.

## 🏗️ Architecture Overview

The backend follows a layered architecture pattern:

```
src/
├── lib/                    # Core utilities and services
│   ├── supabase.ts        # Supabase client configuration
│   ├── database.ts        # Database service layer
│   ├── validation.ts      # Input validation utilities
│   ├── api.ts            # Client-side API service
│   ├── errors.ts         # Error handling system
│   ├── middleware.ts     # API middleware utilities
│   ├── types.ts          # TypeScript type definitions
│   ├── config.ts         # Configuration management
│   └── utils.ts          # Utility functions
├── app/
│   └── api/              # API route handlers
│       ├── submit-interest/
│       ├── submission-count/
│       └── check-email/
```

## 🔧 Core Services

### 1. Supabase Client (`lib/supabase.ts`)
- Configures Supabase client with environment variables
- Exports TypeScript interfaces for database types
- Handles connection to Supabase backend

### 2. Database Service (`lib/database.ts`)
- **submitInterest()**: Submit new interest form data
- **getSubmissionCount()**: Get total submission count
- **getRecentSubmissions()**: Get recent submissions (admin)
- **checkEmailExists()**: Check if email already exists

### 3. Validation Service (`lib/validation.ts`)
- **validateEmail()**: Email format validation
- **validatePhoneNumber()**: Phone number validation
- **validateFullName()**: Name validation
- **validateSubmissionData()**: Complete form validation
- **sanitizeInput()**: Input sanitization

### 4. API Service (`lib/api.ts`)
- Client-side HTTP request handling
- Error handling and response formatting
- Type-safe API calls

### 5. Error Handling (`lib/errors.ts`)
- Custom error classes (ValidationError, DatabaseError, etc.)
- Centralized error handling utilities
- User-friendly error messages

### 6. Middleware (`lib/middleware.ts`)
- Rate limiting
- CORS handling
- Request validation
- Security headers
- Logging

## 🚀 API Endpoints

### POST `/api/submit-interest`
Submit a new interest form.

**Request Body:**
```json
{
  "full_name": "John Doe",
  "company_name": "Acme Corp",
  "contact_number": "+1234567890",
  "email": "john@example.com",
  "subscribed_to_newsletter": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Interest form submitted successfully",
  "data": {
    "id": "uuid",
    "submitted_at": "2024-01-01T00:00:00Z"
  }
}
```

### GET `/api/submission-count`
Get the total number of submissions.

**Response:**
```json
{
  "success": true,
  "count": 42
}
```

### GET `/api/check-email?email=user@example.com`
Check if an email already exists in the database.

**Response:**
```json
{
  "success": true,
  "exists": false
}
```

## 🔒 Security Features

### 1. Input Validation
- Server-side validation for all inputs
- SQL injection prevention through Supabase
- XSS protection through input sanitization

### 2. Rate Limiting
- Configurable rate limiting per IP
- 100 requests per 15 minutes by default
- Customizable through environment variables

### 3. CORS Protection
- Whitelist-based CORS configuration
- Configurable allowed origins
- Secure headers implementation

### 4. Row Level Security (RLS)
- Database-level security policies
- Public INSERT access only
- No direct SELECT access for anonymous users

## 📊 Database Schema

```sql
CREATE TABLE interest_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT,
    contact_number TEXT,
    email TEXT NOT NULL,
    subscribed_to_newsletter BOOLEAN DEFAULT FALSE NOT NULL
);
```

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Application Configuration
NEXT_PUBLIC_APP_NAME=LD Landing Page
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://your-domain.com

# API Configuration
NEXT_PUBLIC_API_BASE_URL=/api
API_TIMEOUT=10000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional: Email service (for future use)
# SMTP_HOST=your_smtp_host
# SMTP_PORT=587
# SMTP_USER=your_smtp_user
# SMTP_PASS=your_smtp_password

# Optional: Analytics (for future use)
# NEXT_PUBLIC_GA_ID=your_google_analytics_id
# NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL setup script from `supabase-setup.sql`
3. Get your project URL and anon key from Settings > API

### 3. Configure Environment
1. Copy the environment variables above
2. Create `.env.local` file
3. Replace placeholder values with your actual Supabase credentials

### 4. Start Development Server
```bash
npm run dev
```

## 🧪 Testing

### Manual Testing
1. **Form Submission**: Fill and submit the interest form
2. **Validation**: Test with invalid data (empty fields, wrong email format)
3. **Rate Limiting**: Submit multiple requests quickly
4. **Email Check**: Test email existence validation

### API Testing
Use tools like Postman or curl:

```bash
# Submit interest form
curl -X POST http://localhost:3000/api/submit-interest \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","email":"test@example.com","subscribed_to_newsletter":true}'

# Get submission count
curl http://localhost:3000/api/submission-count

# Check email
curl "http://localhost:3000/api/check-email?email=test@example.com"
```

## 📈 Monitoring & Logging

### Error Logging
- All errors are logged to console
- Structured error messages for debugging
- User-friendly error responses

### Performance Monitoring
- Request timing logs
- Database query performance
- Rate limiting statistics

## 🔄 Future Enhancements

### Planned Features
1. **Email Notifications**: Send confirmation emails
2. **Admin Dashboard**: View and manage submissions
3. **Analytics**: Track form interactions and conversions
4. **Email Verification**: Verify email addresses
5. **Export Functionality**: Export submissions to CSV/Excel

### Scalability Considerations
1. **Redis Integration**: Replace in-memory rate limiting
2. **Database Indexing**: Optimize query performance
3. **Caching**: Implement response caching
4. **CDN**: Static asset delivery optimization

## 🐛 Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Verify Supabase credentials in `.env.local`
   - Ensure you're using the anon key, not service role key

2. **"Function not found" error**
   - Run the SQL setup script in Supabase
   - Verify `get_submission_count` function exists

3. **"Permission denied" error**
   - Check RLS policies in Supabase
   - Verify function permissions

4. **Form not submitting**
   - Check browser console for errors
   - Verify all required fields are filled
   - Check network tab for API errors

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment.

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

When contributing to the backend:

1. Follow TypeScript best practices
2. Add proper error handling
3. Include input validation
4. Write comprehensive tests
5. Update documentation

## 📄 License

This project is licensed under the MIT License. 