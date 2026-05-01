create extension if not exists pgcrypto;

create table if not exists public.matieres (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  nom text not null,
  couleur text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, nom)
);

create table if not exists public.devoirs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  matiere_id uuid references public.matieres(id) on delete set null,
  titre text not null,
  description text,
  date_limite date not null,
  priorite text not null default 'Moyenne',
  statut text not null default 'A faire',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint devoirs_priorite_check check (priorite in ('Basse', 'Moyenne', 'Haute')),
  constraint devoirs_statut_check check (statut in ('A faire', 'En cours', 'Termine'))
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_matieres_updated_at on public.matieres;
create trigger set_matieres_updated_at
before update on public.matieres
for each row
execute function public.set_updated_at();

drop trigger if exists set_devoirs_updated_at on public.devoirs;
create trigger set_devoirs_updated_at
before update on public.devoirs
for each row
execute function public.set_updated_at();

alter table public.matieres enable row level security;
alter table public.devoirs enable row level security;

drop policy if exists "Users can read their subjects" on public.matieres;
create policy "Users can read their subjects"
on public.matieres
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their subjects" on public.matieres;
create policy "Users can create their subjects"
on public.matieres
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update their subjects" on public.matieres;
create policy "Users can update their subjects"
on public.matieres
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their subjects" on public.matieres;
create policy "Users can delete their subjects"
on public.matieres
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can read their homework" on public.devoirs;
create policy "Users can read their homework"
on public.devoirs
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can create their homework" on public.devoirs;
create policy "Users can create their homework"
on public.devoirs
for insert
to authenticated
with check (
  auth.uid() = user_id
  and (
    matiere_id is null
    or exists (
      select 1
      from public.matieres
      where matieres.id = devoirs.matiere_id
        and matieres.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can update their homework" on public.devoirs;
create policy "Users can update their homework"
on public.devoirs
for update
to authenticated
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and (
    matiere_id is null
    or exists (
      select 1
      from public.matieres
      where matieres.id = devoirs.matiere_id
        and matieres.user_id = auth.uid()
    )
  )
);

drop policy if exists "Users can delete their homework" on public.devoirs;
create policy "Users can delete their homework"
on public.devoirs
for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists matieres_user_id_idx on public.matieres(user_id);
create index if not exists devoirs_user_id_idx on public.devoirs(user_id);
create index if not exists devoirs_matiere_id_idx on public.devoirs(matiere_id);
create index if not exists devoirs_date_limite_idx on public.devoirs(date_limite);
