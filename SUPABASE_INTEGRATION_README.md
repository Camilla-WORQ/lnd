# Supabase Integration Setup Guide

This guide will help you set up the Supabase backend integration for the LD Landing Page project.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed on your system

## Step 1: Set Up Supabase Database

1. **Create a new Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in to your account
   - Click "New Project"
   - Choose your organization and enter a project name
   - Set a database password (save this securely)
   - Choose a region close to your users
   - Click "Create new project"

2. **Run the database setup script:**
   - In your Supabase dashboard, navigate to the **SQL Editor**
   - Copy the contents of `supabase-setup.sql`
   - Paste the SQL code into the editor
   - Click **Run** to execute the script

3. **Verify the setup:**
   - Go to **Table Editor** and confirm you see the `interest_submissions` table
   - Go to **Database > Functions** and confirm you see the `get_submission_count` function

## Step 2: Get Your Supabase Credentials

1. **Get your project URL:**
   - In your Supabase dashboard, go to **Settings > API**
   - Copy the "Project URL" (it looks like: `https://your-project-id.supabase.co`)

2. **Get your anon key:**
   - In the same **Settings > API** page
   - Copy the "anon public" key (it starts with `eyJ...`)

## Step 3: Configure Environment Variables

1. **Create the environment file:**
   - Copy the content from `env-template.txt`
   - Create a new file named `.env.local` in the project root
   - Paste the content and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Install Dependencies and Run the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - You should see the landing page with the form

## Step 5: Test the Integration

1. **Test form submission:**
   - Fill out the interest form with test data
   - Submit the form
   - Check that you see a success message
   - Verify the submission count increases

2. **Test database:**
   - Go to your Supabase dashboard
   - Navigate to **Table Editor > interest_submissions**
   - Confirm you see your test submission

3. **Test submission count:**
   - Refresh the page
   - Verify the submission count displays correctly
   - Submit another test entry and confirm the count updates

## Features Implemented

### ✅ Form Validation
- Required field validation (name, company, email)
- Email format validation
- Phone number format validation (optional field)

### ✅ Supabase Integration
- Real-time submission count fetching
- Form data insertion into database
- Error handling for duplicate emails
- Loading states during submission

### ✅ User Experience
- Success/error message display
- Form field clearing after successful submission
- Loading indicators
- Real-time submission counter updates

## Database Schema

The application uses the following database structure:

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

## Security Features

- **Row Level Security (RLS)** enabled on the table
- **Public INSERT access** for form submissions
- **No SELECT access** for anonymous users (prevents data leakage)
- **Function-based count retrieval** using `get_submission_count()`

## Troubleshooting

### Common Issues

1. **"Invalid API key" error:**
   - Verify your environment variables are set correctly
   - Ensure you're using the "anon public" key, not the service role key

2. **"Function not found" error:**
   - Confirm the SQL setup script ran successfully
   - Check that the `get_submission_count` function exists in your database

3. **"Permission denied" error:**
   - Verify RLS policies are set up correctly
   - Check that the function has proper permissions

4. **Form not submitting:**
   - Check browser console for JavaScript errors
   - Verify all required fields are filled
   - Ensure email format is valid

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase project settings
3. Review the `SUPABASE_SETUP.md` file for detailed setup instructions
4. Check the Supabase documentation at [supabase.com/docs](https://supabase.com/docs)

## Next Steps

Once the basic integration is working, you might want to consider:

1. **Email notifications** when new submissions are received
2. **Admin dashboard** to view and manage submissions
3. **Analytics tracking** for form interactions
4. **Rate limiting** to prevent spam submissions
5. **Email verification** for submissions

## Support

For technical support or questions about this integration, please refer to the project documentation or contact the development team. 