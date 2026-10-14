alter table career_applications
  add column if not exists work_history jsonb not null default '[]'::jsonb,
  add column if not exists certifications text,
  add column if not exists teaching_approach text;
