-- Supabase Database Setup Script
-- This script sets up the database structure for the LD Landing Page project

-- 1. Create the interest_submissions table with the exact schema from PRD
CREATE TABLE IF NOT EXISTS interest_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT,
    contact_number TEXT,
    email TEXT NOT NULL,
    subscribed_to_newsletter BOOLEAN DEFAULT FALSE NOT NULL
);

-- 2. Enable Row Level Security (RLS) on the table
ALTER TABLE interest_submissions ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policy that allows public INSERT access
CREATE POLICY "Allow public insert access" ON interest_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- 4. Create PostgreSQL function to get submission count
-- This function returns the total number of rows in the interest_submissions table
CREATE OR REPLACE FUNCTION get_submission_count()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    count_result INTEGER;
BEGIN
    SELECT COUNT(*) INTO count_result FROM interest_submissions;
    RETURN count_result;
END;
$$;

-- 5. Grant execute permission on the function to the anon role
-- This allows the public anon key to call the function
GRANT EXECUTE ON FUNCTION get_submission_count() TO anon;

-- 6. Create indexes for better performance (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_interest_submissions_created_at ON interest_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_interest_submissions_email ON interest_submissions(email);

-- 7. Add comments for documentation
COMMENT ON TABLE interest_submissions IS 'Stores user interest submissions from the landing page';
COMMENT ON COLUMN interest_submissions.id IS 'Unique identifier for each submission';
COMMENT ON COLUMN interest_submissions.created_at IS 'Timestamp when the submission was created';
COMMENT ON COLUMN interest_submissions.full_name IS 'Full name of the person submitting interest';
COMMENT ON COLUMN interest_submissions.company_name IS 'Company name (optional)';
COMMENT ON COLUMN interest_submissions.contact_number IS 'Contact phone number (optional)';
COMMENT ON COLUMN interest_submissions.email IS 'Email address of the person submitting interest';
COMMENT ON COLUMN interest_submissions.subscribed_to_newsletter IS 'Whether the person subscribed to newsletter';
COMMENT ON FUNCTION get_submission_count() IS 'Returns the total count of interest submissions'; 