-- Ensure the is_important column exists on passengers
alter table public.passengers
  add column if not exists is_important boolean not null default false;