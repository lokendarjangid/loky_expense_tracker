# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy from project directory**:
   ```bash
   cd /home/lokendarjangid1234/clawd/loky_expense_tracker
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? No
   - Project name: `loky-expense-tracker`
   - Which directory? `./`
   - Auto-detected Next.js, continue? Yes
   - Override settings? No

4. **Set environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import from GitHub: `lokendarjangid/loky_expense_tracker`
4. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

---

## Set Up Supabase

1. **Create Supabase project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Choose a name: `loky-expense-tracker`
   - Set a strong database password

2. **Run the schema:**
   - Open SQL Editor in Supabase dashboard
   - Copy contents of `supabase-schema.sql`
   - Run the SQL

3. **Get credentials:**
   - Go to Project Settings → API
   - Copy `Project URL` → This is `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `anon public` key → This is `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Update environment variables:**
   - Locally: Update `.env.local`
   - Vercel: Add in project settings → Environment Variables

---

## After Deployment

1. Visit your deployed app
2. Test adding/deleting expenses
3. Everything should work immediately!

**No authentication required** - the app works without login for now. User auth can be added later for multi-user support.

---

## Troubleshooting

**"Cannot connect to Supabase"**
- Check that env variables are set correctly
- Verify Supabase URL format: `https://xxxxx.supabase.co`
- Confirm anon key is the public key (starts with `eyJ...`)

**"Table doesn't exist"**
- Make sure you ran `supabase-schema.sql` in Supabase SQL editor
- Check that tables were created: Go to Table Editor in Supabase

**Deploy failed**
- Check build logs in Vercel
- Ensure all dependencies are in `package.json`
- Try `npm run build` locally first
