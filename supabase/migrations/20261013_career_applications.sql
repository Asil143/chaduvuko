-- Apply once through the Supabase SQL editor or `supabase db push`.
-- Candidate rows have RLS enabled and resume files use a private bucket;
-- application access is mediated by the server-side admin API.
create table if not exists career_applications (
  id uuid primary key default gen_random_uuid(),
  job_slug text not null,
  job_title text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  highest_qualification text not null,
  field_of_study text not null,
  institution text not null,
  graduation_year integer not null,
  years_experience integer not null,
  current_position text,
  engagement_preference text not null,
  availability text,
  compensation_expectation text,
  skills text not null,
  project_details text not null,
  project_links text,
  github_url text,
  linkedin_url text,
  portfolio_url text,
  teaching_sample_url text,
  motivation text not null,
  resume_path text,
  created_at timestamptz not null default now()
);

alter table career_applications enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'career-applications',
  'career-applications',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
