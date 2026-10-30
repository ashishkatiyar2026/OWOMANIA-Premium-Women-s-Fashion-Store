-- Run this in Supabase SQL Editor. Orders are private: only trusted serverless functions
-- using the service-role key can read/write them. NEVER expose the service-role key in browser code.
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 order_number text unique not null,
 customer_name text not null,
 phone text not null,
 email text,
 address text not null,
 pincode text not null,
 items jsonb not null,
 total integer not null check (total > 0),
 payment_method text not null check (payment_method in ('cod','razorpay')),
 payment_status text not null default 'pending',
 order_status text not null default 'new',
 razorpay_order_id text,
 razorpay_payment_id text,
 created_at timestamptz not null default now()
);
alter table public.orders enable row level security;
-- No anon/authenticated policies: direct client access is denied by default.
