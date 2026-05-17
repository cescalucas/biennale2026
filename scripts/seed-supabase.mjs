#!/usr/bin/env node
// Popula as tabelas do Supabase a partir dos JSONs locais em src/data.
// Uso:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-supabase.mjs
//
// Sempre execute com a SERVICE_ROLE_KEY — a anon key não tem permissão de write
// para as tabelas (RLS). NUNCA versionar a service role.

import { createClient } from '@supabase/supabase-js';
import { BIOS } from '../src/data/bios.js';
import { VENUE_ARTISTS } from '../src/data/venueArtists.js';
import { MAIN_EXHIBITION } from '../src/data/mainExhibition.js';
import { PAVILIONS_GIARDINI } from '../src/data/pavilionsGiardini.js';
import { PAVILIONS_ARSENALE } from '../src/data/pavilionsArsenale.js';
import { PAVILIONS_CITY } from '../src/data/pavilionsCity.js';
import { COLLATERAL } from '../src/data/collateral.js';
import { PARALLEL } from '../src/data/parallel.js';
import { ITINERARIES } from '../src/data/itineraries.js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Faltam SUPABASE_URL e/ou SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

function asVenue(v, area) {
  return {
    id: v.id,
    area,
    name: v.name,
    title: v.title ?? null,
    artists: v.artists ?? null,
    curator: v.curator ?? null,
    org: v.org ?? null,
    address: v.address ?? null,
    dates: v.dates ?? null,
    note: v.note ?? null,
    zone: v.zone,
    x: v.x ?? null,
    y: v.y ?? null,
    highlight: Boolean(v.highlight),
  };
}

async function main() {
  console.log('Limpando tabelas existentes…');
  await supabase.from('venue_artists').delete().neq('venue_id', '');
  await supabase.from('venues').delete().neq('id', '');
  await supabase.from('bios').delete().neq('slug', '');
  await supabase.from('main_exhibition').delete().neq('id', 0);
  await supabase.from('itinerary_steps').delete().neq('id', 0);
  await supabase.from('itineraries').delete().neq('id', 0);

  // Bios
  const biosRows = Object.entries(BIOS).map(([slug, b]) => ({
    slug,
    name: b.name,
    years: b.years ?? null,
    bio: b.bio ?? null,
  }));
  console.log(`Inserindo ${biosRows.length} bios…`);
  let r = await supabase.from('bios').insert(biosRows);
  if (r.error) throw r.error;

  // Venues
  const venues = [
    ...PAVILIONS_GIARDINI.map((v) => asVenue(v, 'giardini')),
    ...PAVILIONS_ARSENALE.map((v) => asVenue(v, 'arsenale')),
    ...PAVILIONS_CITY.map((v) => asVenue(v, 'city')),
    ...COLLATERAL.map((v) => asVenue(v, 'collateral')),
    ...PARALLEL.map((v) => asVenue(v, 'parallel')),
  ];
  console.log(`Inserindo ${venues.length} venues…`);
  r = await supabase.from('venues').insert(venues);
  if (r.error) throw r.error;

  // venue_artists
  const va = [];
  Object.entries(VENUE_ARTISTS).forEach(([venueId, keys]) => {
    keys.forEach((slug, i) => va.push({ venue_id: venueId, bio_slug: slug, ord: i }));
  });
  console.log(`Inserindo ${va.length} relações venue ↔ bio…`);
  r = await supabase.from('venue_artists').insert(va);
  if (r.error) throw r.error;

  // Mostra principal
  const main = MAIN_EXHIBITION.map((p, i) => ({ name: p.name, origin: p.origin, display_order: i }));
  console.log(`Inserindo ${main.length} participantes da mostra principal…`);
  r = await supabase.from('main_exhibition').insert(main);
  if (r.error) throw r.error;

  // Roteiros
  for (const it of ITINERARIES) {
    const ins = await supabase
      .from('itineraries')
      .insert({ slug: it.id, title: it.title, duration: it.duration, blurb: it.blurb })
      .select('id')
      .single();
    if (ins.error) throw ins.error;
    const itinId = ins.data.id;
    const steps = it.steps.map((s, i) => ({ itinerary_id: itinId, ord: i, time: s.time, stop: s.stop, detail: s.detail }));
    r = await supabase.from('itinerary_steps').insert(steps);
    if (r.error) throw r.error;
  }

  console.log('Seed concluído ✓');
}

main().catch((err) => {
  console.error('Erro no seed:', err);
  process.exit(1);
});
