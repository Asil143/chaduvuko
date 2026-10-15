create table if not exists public.lesson_feedback (
  id uuid primary key default gen_random_uuid(),
  lesson_href text not null check (lesson_href like '/learn/%'),
  category text not null check (category in ('helpful', 'unclear', 'incorrect')),
  details text check (char_length(details) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.lesson_feedback enable row level security;
revoke all on public.lesson_feedback from anon, authenticated;
grant insert on public.lesson_feedback to service_role;
grant select on public.lesson_feedback to service_role;

create index if not exists lesson_feedback_created_at_idx
  on public.lesson_feedback (created_at desc);
