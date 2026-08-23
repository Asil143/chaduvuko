-- Atomic upsert-and-increment for page_views, replacing the app's previous
-- read-then-write (select views, then update views + 1), which lost
-- increments under concurrent requests to the same page. Mirrors the
-- existing increment_upvotes/decrement_upvotes RPC pattern already used by
-- the comments feature.
--
-- This file isn't run automatically — apply it once via the Supabase SQL
-- editor (or `supabase db push` if this project is linked to the Supabase CLI).

-- ON CONFLICT below needs a unique constraint on slug — add it defensively
-- in case the table was created without one (the old code never required it
-- since it checked existence in the application instead of the database).
create unique index if not exists page_views_slug_key on page_views (slug);

create or replace function increment_page_view(p_slug text)
returns int
language sql
as $$
  insert into page_views (slug, views)
  values (p_slug, 1)
  on conflict (slug) do update set views = page_views.views + 1
  returning views;
$$;
