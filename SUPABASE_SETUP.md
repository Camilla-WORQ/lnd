# Supabase Backend Setup

This document provides instructions for setting up the Supabase database backend for the LD Landing Page project.

## Database Schema

The database includes the following structure:

### Table: `interest_submissions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier for each submission |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp when the submission was created |
| `full_name` | TEXT | NOT NULL | Full name of the person submitting interest |
| `company_name` | TEXT | NULL | Company name (optional) |
| `contact_number` | TEXT | NULL | Contact phone number (optional) |
| `email` | TEXT | NOT NULL | Email address of the person submitting interest |
| `subscribed_to_newsletter` | BOOLEAN | NOT NULL, DEFAULT FALSE | Whether the person subscribed to newsletter |

### Function: `get_submission_count()`

Returns the total number of rows in the `interest_submissions` table. This function is callable by the public anon key.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Create a new project
4. Wait for the project to be provisioned

### 2. Run the SQL Script

1. In your Supabase dashboard, navigate to the **SQL Editor**
2. Copy the contents of `supabase-setup.sql`
3. Paste the SQL code into the editor
4. Click **Run** to execute the script

### 3. Verify Setup

After running the script, you should see:

- A new table called `interest_submissions` in the **Table Editor**
- Row Level Security (RLS) enabled on the table
- A policy allowing public INSERT access
- A function called `get_submission_count` in the **Database** section
- Indexes on `created_at` and `email` columns

### 4. Test the Setup

You can test the setup by:

1. **Testing INSERT access**: Try inserting a test record through the Supabase dashboard or API
2. **Testing the function**: Call the `get_submission_count()` function to verify it returns the correct count

## Security Features

### Row Level Security (RLS)

- RLS is enabled on the `interest_submissions` table
- Only INSERT operations are allowed for anonymous users
- This prevents unauthorized access to existing data while allowing new submissions

### Function Security

- The `get_submission_count()` function uses `SECURITY DEFINER`
- This allows the function to run with elevated privileges while being callable by the anon role
- The function only returns a count, not sensitive data

## API Usage

Once set up, you can use the Supabase client in your Next.js application:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
)

// Insert a new submission
const { data, error } = await supabase
  .from('interest_submissions')
  .insert([
    {
      full_name: 'John Doe',
      company_name: 'Acme Corp',
      contact_number: '+1234567890',
      email: 'john@example.com',
      subscribed_to_newsletter: true
    }
  ])

// Get submission count
const { data: count, error: countError } = await supabase
  .rpc('get_submission_count')
```

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

### Common Issues

1. **Permission Denied**: Ensure you're using the correct API keys
2. **Function Not Found**: Verify the SQL script ran successfully
3. **RLS Policy Issues**: Check that the policy allows the operations you're trying to perform

### Support

If you encounter issues, check the Supabase documentation or contact the development team. 