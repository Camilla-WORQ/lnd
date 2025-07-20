-- Temporary Fix: Disable RLS to test form functionality
-- Run this if you want to quickly test if the form works without RLS

-- 1. Disable RLS on the table
ALTER TABLE interest_submissions DISABLE ROW LEVEL SECURITY;

-- 2. Grant all permissions to anon and public
GRANT ALL ON interest_submissions TO anon;
GRANT ALL ON interest_submissions TO public;

-- 3. Test insert
INSERT INTO interest_submissions (full_name, company_name, email, subscribed_to_newsletter)
VALUES ('Test User', 'Test Company', 'test@example.com', true);

-- 4. Verify it worked
SELECT * FROM interest_submissions;

-- 5. Clean up test data
DELETE FROM interest_submissions WHERE email = 'test@example.com';

-- 6. Test the function
SELECT get_submission_count();

-- ⚠️  WARNING: This disables security. Only use for testing!
-- To re-enable RLS later, run the supabase-complete-fix.sql script 