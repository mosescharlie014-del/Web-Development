-- Core schema for 1427 Authors Hub (Supabase / Postgres)
-- Run this in your Supabase SQL editor to create core tables.

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  display_name text,
  avatar_url text,
  role text default 'reader',
  created_at timestamptz default now()
);

create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references users(id) on delete set null,
  title text not null,
  slug text unique not null,
  excerpt text,
  body_markdown text,
  rendered_html text,
  status text default 'draft', -- draft | published
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  story_id uuid references stories(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  parent_id uuid references comments(id) on delete cascade,
  body text not null,
  created_at timestamptz default now(),
  edited_at timestamptz
);

create table if not exists likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  target_type text not null, -- 'story' or 'comment' or 'project'
  target_id uuid not null,
  created_at timestamptz default now(),
  unique (user_id, target_type, target_id)
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references users(id) on delete set null,
  title text not null,
  description text,
  visibility text default 'private', -- private | public
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists project_collaborators (
  project_id uuid references projects(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text default 'collaborator',
  primary key (project_id, user_id)
);

-- basic index for text search
create index if not exists stories_search_idx on stories using gin ((to_tsvector('english', coalesce(title,'') || ' ' || coalesce(body_markdown,''))));