# Loky Expense Tracker 💰

A beautiful, smart expense tracking app with AI-powered categorization and budget insights.

## Features

✨ **Core Features:**
- Add/delete expenses with amount, category, description, date
- Real-time expense tracking
- Beautiful gradient UI with Tailwind CSS
- Category-based organization
- Monthly spending totals
- Recent expenses list

🚀 **Coming Soon:**
- AI-powered expense categorization
- Budget tracking and alerts
- Visual spending analytics (charts/graphs)
- Photo receipt uploads
- Monthly reports
- Recurring expense detection
- Multi-currency support
- Export to CSV/PDF

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (PostgreSQL)
- **Charts:** Chart.js, react-chartjs-2
- **Date handling:** date-fns
- **Deployment:** Vercel

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Create a new Supabase project
   - Run the SQL in `supabase-schema.sql` in your Supabase SQL editor
   - Copy your project URL and anon key

3. **Configure environment:**
   - Update `.env.local` with your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_url_here
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
     ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Navigate to `http://localhost:3000`

## Database Schema

### Expenses Table
- `id`: UUID (primary key)
- `amount`: Numeric
- `category`: Text
- `description`: Text
- `date`: Date
- `receipt_url`: Text (optional)
- `user_id`: UUID (for future auth)

### Budgets Table
- `id`: UUID (primary key)
- `category`: Text
- `limit`: Numeric
- `month`: Text
- `user_id`: UUID (for future auth)

## Deployment

Deploy to Vercel with one click:

```bash
vercel
```

Make sure to add environment variables in Vercel dashboard.

## Roadmap

- [ ] Add authentication (Supabase Auth)
- [ ] Implement AI categorization
- [ ] Add budget tracking
- [ ] Create analytics dashboard with charts
- [ ] Add receipt photo uploads
- [ ] Build mobile app (React Native)
- [ ] Add recurring expense detection
- [ ] Implement export functionality
- [ ] Multi-currency support

## License

MIT

---

Built with ❤️ by Loky
