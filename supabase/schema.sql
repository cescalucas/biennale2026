-- =============================================================
-- Schema Supabase para o guia Biennale Arte 2026
-- Rode no SQL Editor do Supabase Studio.
-- =============================================================

-- 1) Tabela de biografias (artistas com bio detalhada)
create table if not exists public.bios (
  slug text primary key,
  name text not null,
  years text,
  bio text
);

-- 2) Locais (venues) — pavilhões, eventos colaterais e mostras paralelas
create table if not exists public.venues (
  id text primary key,
  area text not null check (area in ('giardini','arsenale','city','collateral','parallel')),
  name text not null,
  title text,
  artists text,
  curator text,
  org text,
  address text,
  dates text,
  note text,
  zone text not null,
  x integer,
  y integer,
  highlight boolean default false,
  created_at timestamptz default now()
);

create index if not exists venues_area_idx on public.venues (area);
create index if not exists venues_zone_idx on public.venues (zone);

-- 3) Relação venue → artista (n-para-n entre venues e bios)
create table if not exists public.venue_artists (
  venue_id text references public.venues(id) on delete cascade,
  bio_slug text references public.bios(slug) on delete cascade,
  ord integer default 0,
  primary key (venue_id, bio_slug)
);

-- 4) Participantes da mostra principal "In Minor Keys" (sem bio detalhada)
create table if not exists public.main_exhibition (
  id bigserial primary key,
  name text not null,
  origin text,
  display_order integer default 0
);

-- 5) Roteiros sugeridos
create table if not exists public.itineraries (
  id bigserial primary key,
  slug text unique not null,
  title text not null,
  duration text,
  blurb text
);

create table if not exists public.itinerary_steps (
  id bigserial primary key,
  itinerary_id bigint references public.itineraries(id) on delete cascade,
  ord integer not null,
  time text,
  stop text,
  detail text
);

create index if not exists itinerary_steps_iid_idx on public.itinerary_steps (itinerary_id, ord);

-- 6) Favoritos por usuário (opcional, ativa com Supabase Auth)
create table if not exists public.user_favorites (
  user_id uuid references auth.users(id) on delete cascade,
  venue_id text references public.venues(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, venue_id)
);

-- =============================================================
-- Row Level Security
-- =============================================================

alter table public.bios enable row level security;
alter table public.venues enable row level security;
alter table public.venue_artists enable row level security;
alter table public.main_exhibition enable row level security;
alter table public.itineraries enable row level security;
alter table public.itinerary_steps enable row level security;
alter table public.user_favorites enable row level security;

-- Leitura pública para todos os dados do guia
create policy "Public read bios" on public.bios for select using (true);
create policy "Public read venues" on public.venues for select using (true);
create policy "Public read venue_artists" on public.venue_artists for select using (true);
create policy "Public read main_exhibition" on public.main_exhibition for select using (true);
create policy "Public read itineraries" on public.itineraries for select using (true);
create policy "Public read itinerary_steps" on public.itinerary_steps for select using (true);

-- Favoritos só para o próprio usuário
create policy "Own favorites" on public.user_favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =============================================================
-- Notas
-- =============================================================
-- 1. Para popular as tabelas, rode `npm run seed` no projeto Vite
--    (script em scripts/seed-supabase.mjs) com as variáveis
--    SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY definidas.
-- 2. As inserções/atualizações são restritas. Use o role
--    service_role do Supabase para fazer seed (nunca exponha
--    essa chave no front-end).
-- 3. Os campos x/y são coordenadas SVG (viewBox 1100×720) usadas
--    pelo mapa estilizado de Veneza.
