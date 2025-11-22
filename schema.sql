-- Run this in your Supabase SQL Editor

create table pixels (
  id text primary key, -- format: "x_y"
  x int not null,
  y int not null,
  color text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Realtime for this table
alter publication supabase_realtime add table pixels;

-- Optional: Add RLS policies (Simple "allow all" for hackathon speed)
alter table pixels enable row level security;

create policy "Public pixels are viewable by everyone"
  on pixels for select
  using ( true );

create policy "Anyone can paint pixels"
  on pixels for insert
  with check ( true );

create policy "Anyone can update pixels"
  on pixels for update
  using ( true );

