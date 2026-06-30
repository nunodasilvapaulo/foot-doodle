-- ============================================================
-- Football Trivia — Supabase Schema
-- Run this in your Supabase project: SQL Editor → New Query
-- ============================================================

-- Clubs
create table if not exists clubs (
  id        integer primary key,
  name      text    not null,
  logo      text    not null default '',
  country   text    not null default '',
  league    text    not null default ''
);

-- Players
create table if not exists players (
  id          integer primary key,
  name        text    not null,
  photo       text    not null default '',
  nationality text    not null default '',
  age         integer not null default 0,
  position    text    not null default 'Unknown'  -- Goalkeeper | Defender | Midfielder | Attacker
);

-- Career clubs (many-to-many with ordering)
create table if not exists player_clubs (
  player_id integer references players(id) on delete cascade,
  club_id   integer references clubs(id)   on delete cascade,
  sort_order integer not null default 0,    -- 0 = most recent
  primary key (player_id, club_id)
);

-- ── Indexes ─────────────────────────────────────────────────────────────────

-- Full-text search on player name (fast autocomplete)
create index if not exists players_name_fts
  on players using gin(to_tsvector('english', name));

-- Prefix/ILIKE search also works because we index trigrams
create extension if not exists pg_trgm;
create index if not exists players_name_trgm
  on players using gin(name gin_trgm_ops);

-- Lookup by nationality / position for Grid game constraints
create index if not exists players_nationality on players(nationality);
create index if not exists players_position    on players(position);

-- Lookup all clubs a player has been at
create index if not exists player_clubs_player on player_clubs(player_id);
-- Lookup all players who ever played for a club
create index if not exists player_clubs_club   on player_clubs(club_id);

-- ── Helper view (player + their clubs as a JSON array) ───────────────────────
create or replace view player_with_clubs as
  select
    p.*,
    coalesce(
      json_agg(
        json_build_object('id', c.id, 'name', c.name, 'logo', c.logo, 'country', c.country)
        order by pc.sort_order
      ) filter (where c.id is not null),
      '[]'::json
    ) as clubs
  from players p
  left join player_clubs pc on pc.player_id = p.id
  left join clubs c         on c.id = pc.club_id
  group by p.id;

-- ── Row-level security (public read-only) ───────────────────────────────────
alter table clubs        enable row level security;
alter table players      enable row level security;
alter table player_clubs enable row level security;

create policy "Public read clubs"        on clubs        for select using (true);
create policy "Public read players"      on players      for select using (true);
create policy "Public read player_clubs" on player_clubs for select using (true);
