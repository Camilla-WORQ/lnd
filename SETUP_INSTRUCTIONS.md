# Setup Instructions for WORQ L&D Training Landing Page

## 🚨 Form Submission Issue Resolution

The form submission is currently failing because Supabase is not configured. Here's how to fix it:

### Option 1: Set up Supabase (Recommended for Production)

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key from Settings > API

2. **Set up environment variables:**
   ```bash
   # Copy the template
   cp env-template.txt .env.local
   
   # Edit .env.local and add your actual values:
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Create the database table:**
   - Run the SQL from `supabase-setup.sql` in your Supabase SQL editor
   - This creates the `interest_submissions` table and `get_submission_count` function
   - **If you get RLS policy errors**, try these options in order:
     - **Option A**: Run `supabase-fix-rls.sql` (recommended)
     - **Option B**: Run `supabase-complete-fix.sql` (recreates everything)
     - **Option C**: Run `supabase-disable-rls.sql` (temporary, for testing only)

4. **Restart your development server:**
   ```bash
   npm run dev
   ```

### Option 2: Use Demo Mode (For Development/Testing)

The form will work in demo mode without Supabase:
- Form submissions will show success messages
- Submission count will show a demo number (42)
- No data will be stored

### Option 3: Disable Form Temporarily

If you want to disable the form while setting up Supabase:

1. Edit `src/components/HeroSection.tsx`
2. Comment out the form section
3. Replace with a simple "Coming Soon" message

## 🔧 Current Status

- ✅ Landing page displays correctly
- ✅ All sections are functional
- ✅ Form validation works
- ❌ Form submission fails (Supabase not configured)
- ✅ Fallback demo mode available

## 🐛 Debug Information

Check your browser console for:
- `⚠️ Supabase not configured` - Environment variables missing
- `✅ Supabase configured successfully` - Everything is set up correctly
- Detailed error messages if Supabase is configured but failing

### Common Error Codes:
- **42501**: Row Level Security policy violation - Run `supabase-fix-rls.sql`
- **42P01**: Table not found - Run `supabase-setup.sql`
- **23505**: Duplicate email - User already submitted

## 📞 Support

If you need help setting up Supabase or have other issues:
1. Check the console for error messages
2. Verify your environment variables are set correctly
3. Ensure the database table exists in Supabase
4. Check Supabase project settings and permissions 