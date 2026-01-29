-- Expenses table
create table expenses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  amount numeric not null,
  category text not null,
  description text not null,
  date date not null,
  receipt_url text,
  user_id uuid references auth.users
);

-- Budgets table
create table budgets (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  category text not null,
  limit numeric not null,
  month text not null,
  user_id uuid references auth.users,
  unique(category, month, user_id)
);

-- Row Level Security
alter table expenses enable row level security;
alter table budgets enable row level security;

-- Policies (for now, allow all - add auth later)
create policy "Allow all for expenses" on expenses for all using (true);
create policy "Allow all for budgets" on budgets for all using (true);

-- Indexes for performance
create index expenses_date_idx on expenses(date);
create index expenses_category_idx on expenses(category);
create index budgets_month_idx on budgets(month);
