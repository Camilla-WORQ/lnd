-- Fix RLS Policy for interest_submissions table
-- Run this in your Supabase SQL Editor to resolve the "row-level security policy" error

-- 1. First, let's check if the table exists and drop any conflicting policies
DROP POLICY IF EXISTS "Allow public insert access" ON interest_submissions;
DROP POLICY IF EXISTS "Enable read access for all users" ON interest_submissions;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON interest_submissions;

-- 2. Create a comprehensive RLS policy that allows public access
CREATE POLICY "Enable public access for interest submissions" ON interest_submissions
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- 3. Alternative: If you want more restrictive policies, use these instead:
-- (Uncomment the lines below and comment out the policy above if you prefer)

-- CREATE POLICY "Enable insert for all users" ON interest_submissions
--     FOR INSERT
--     TO anon
--     WITH CHECK (true);

-- CREATE POLICY "Enable read access for all users" ON interest_submissions
--     FOR SELECT
--     TO anon
--     USING (true);

-- 4. Verify the policy was created
-- You can check this in the Supabase dashboard under Authentication > Policies

-- 5. Test the function is working
SELECT get_submission_count();

-- 6. Optional: If you want to see all policies on the table
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
-- FROM pg_policies 
-- WHERE tablename = 'interest_submissions'; 