-- Wiyule Technology — orders table
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Stores one row per checkout attempt. The server inserts a 'pending' row when
-- a customer starts paying, then the Flutterwave webhook flips it to
-- 'successful' / 'failed' once payment is confirmed.

create table if not exists public.orders (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  tx_ref              text unique not null,          -- our reference (generated at checkout)
  provider_tracking_id text,                         -- Pesapal OrderTrackingId (set on success)
  product_slug        text not null,
  product_name        text not null,
  currency            text not null,                 -- ZMW | MWK
  amount              numeric not null,
  status              text not null default 'pending', -- pending | successful | failed
  customer_name       text,
  customer_email      text,
  customer_phone      text,
  raw                 jsonb                          -- full webhook payload, for audit
);

-- Fast lookups by our reference (used by the webhook + verify endpoint).
create index if not exists orders_tx_ref_idx on public.orders (tx_ref);

-- Lock the table down: RLS on, and NO policies means the public/anon key
-- cannot read or write it at all. Our server functions use the service-role
-- key, which bypasses RLS — so they keep full access. Orders never leak to the
-- browser.
alter table public.orders enable row level security;
