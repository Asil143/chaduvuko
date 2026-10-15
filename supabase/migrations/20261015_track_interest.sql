create table if not exists public.track_interest (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  track_slug text not null,
  created_at timestamptz not null default now(),
  unique (email, track_slug)
);

create index if not exists track_interest_track_slug_idx on public.track_interest (track_slug);

-- Written and read only by server routes using the service role.
alter table public.track_interest enable row level security;
