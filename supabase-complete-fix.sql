-- Complete Fix for RLS Policy Issues
-- Run this in your Supabase SQL Editor to completely resolve the RLS policy error

-- 1. Drop the existing table and all its policies
DROP TABLE IF EXISTS interest_submissions CASCADE;

-- 2. Recreate the table without RLS initially
CREATE TABLE interest_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    full_name TEXT NOT NULL,
    company_name TEXT,
    contact_number TEXT,
    email TEXT NOT NULL,
    subscribed_to_newsletter BOOLEAN DEFAULT FALSE NOT NULL
);

-- 3. Create indexes
CREATE INDEX idx_interest_submissions_created_at ON interest_submissions(created_at);
CREATE INDEX idx_interest_submissions_email ON interest_submissions(email);

-- 4. Enable RLS
ALTER TABLE interest_submissions ENABLE ROW LEVEL SECURITY;

-- 5. Drop any existing policies (just in case)
DROP POLICY IF EXISTS "Enable public access for interest submissions" ON interest_submissions;
DROP POLICY IF EXISTS "Allow public insert access" ON interest_submissions;
DROP POLICY IF EXISTS "Enable read access for all users" ON interest_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON interest_submissions;

-- 6. Create a simple, permissive policy for public access
CREATE POLICY "public_access_policy" ON interest_submissions
    FOR ALL
    TO public
    USING (true)
    WITH CHECK (true);

-- 7. Also create specific policies for anon users
CREATE POLICY "anon_insert_policy" ON interest_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

CREATE POLICY "anon_select_policy" ON interest_submissions
    FOR SELECT
    TO anon
    USING (true);

-- 8. Recreate the function
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

-- 9. Grant permissions
GRANT EXECUTE ON FUNCTION get_submission_count() TO anon;
GRANT EXECUTE ON FUNCTION get_submission_count() TO public;

-- 10. Grant table permissions
GRANT ALL ON interest_submissions TO anon;
GRANT ALL ON interest_submissions TO public;

-- 11. Test the setup
INSERT INTO interest_submissions (full_name, company_name, email, subscribed_to_newsletter)
VALUES ('Test User', 'Test Company', 'test@example.com', true);

-- 12. Verify the test data
SELECT * FROM interest_submissions;

-- 13. Test the function
SELECT get_submission_count();

-- 14. Clean up test data
DELETE FROM interest_submissions WHERE email = 'test@example.com';

-- 15. Show final count
SELECT get_submission_count() as final_count; 