-- Keep page-view increments atomic and callable only by the server-side service role.
create unique index if not exists page_views_slug_key on public.page_views (slug);

create or replace function public.increment_page_view(p_slug text)
returns integer
language sql
security definer
set search_path = public
as $$
  insert into public.page_views (slug, views)
  values (p_slug, 1)
  on conflict (slug) do update set views = page_views.views + 1
  returning views;
$$;

revoke all on function public.increment_page_view(text) from public, anon, authenticated;
grant execute on function public.increment_page_view(text) to service_role;
