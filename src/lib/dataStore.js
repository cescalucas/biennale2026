// Camada de dados unificada — usa Supabase se as env vars estiverem
// configuradas, senão cai nos JSONs locais. Expõe a mesma forma de dados.

import { supabase, supabaseEnabled } from './supabase.js';
import { FESTIVAL } from '../data/festival.js';
import { ZONE_NAMES, ZONE_CENTERS, ZONE_LIST, EDGES, STOPS } from '../data/zones.js';
import { BIOS } from '../data/bios.js';
import { VENUE_ARTISTS } from '../data/venueArtists.js';
import { MAIN_EXHIBITION } from '../data/mainExhibition.js';
import { PAVILIONS_GIARDINI } from '../data/pavilionsGiardini.js';
import { PAVILIONS_ARSENALE } from '../data/pavilionsArsenale.js';
import { PAVILIONS_CITY } from '../data/pavilionsCity.js';
import { COLLATERAL } from '../data/collateral.js';
import { PARALLEL } from '../data/parallel.js';
import { ITINERARIES } from '../data/itineraries.js';

const localData = {
  festival: FESTIVAL,
  bios: BIOS,
  venueArtists: VENUE_ARTISTS,
  mainExhibition: MAIN_EXHIBITION,
  pavilionsGiardini: PAVILIONS_GIARDINI.map((v) => ({ ...v, area: 'giardini' })),
  pavilionsArsenale: PAVILIONS_ARSENALE.map((v) => ({ ...v, area: 'arsenale' })),
  pavilionsCity: PAVILIONS_CITY.map((v) => ({ ...v, area: 'city' })),
  collateral: COLLATERAL.map((v) => ({ ...v, area: 'collateral' })),
  parallel: PARALLEL.map((v) => ({ ...v, area: 'parallel' })),
  itineraries: ITINERARIES,
  zoneNames: ZONE_NAMES,
  zoneCenters: ZONE_CENTERS,
  zoneList: ZONE_LIST,
  edges: EDGES,
  stops: STOPS,
};

// Constrói ALL_VENUES e estruturas derivadas
function build(d) {
  const allVenues = [
    ...d.pavilionsGiardini,
    ...d.pavilionsArsenale,
    ...d.pavilionsCity,
    ...d.collateral,
    ...d.parallel,
  ];
  const venuesById = Object.fromEntries(allVenues.map((v) => [v.id, v]));
  return { ...d, allVenues, venuesById };
}

async function loadFromSupabase() {
  // Tabelas esperadas: bios, venues (com area), venue_artists, main_exhibition, itineraries, itinerary_steps
  // Se algo falhar, faz fallback para os dados locais.
  try {
    const [bios, venues, vaJoin, mainExh, itins, itinSteps] = await Promise.all([
      supabase.from('bios').select('*'),
      supabase.from('venues').select('*'),
      supabase.from('venue_artists').select('*'),
      supabase.from('main_exhibition').select('*').order('display_order', { ascending: true }),
      supabase.from('itineraries').select('*'),
      supabase.from('itinerary_steps').select('*').order('ord', { ascending: true }),
    ]);

    if (bios.error || venues.error || vaJoin.error) {
      console.warn('Supabase fetch failed, falling back to local data', bios.error || venues.error || vaJoin.error);
      return localData;
    }

    // Reconstruir BIOS como objeto indexado por slug
    const biosObj = {};
    (bios.data || []).forEach((b) => {
      biosObj[b.slug] = { name: b.name, years: b.years, bio: b.bio };
    });

    // Reconstruir VENUE_ARTISTS
    const va = {};
    (vaJoin.data || []).forEach((row) => {
      (va[row.venue_id] ||= []).push(row.bio_slug);
    });

    // Reconstruir venues por área
    const byArea = { giardini: [], arsenale: [], city: [], collateral: [], parallel: [] };
    (venues.data || []).forEach((v) => {
      const obj = { ...v };
      if (byArea[v.area]) byArea[v.area].push(obj);
    });

    // Reconstruir itineraries
    const stepsByIt = {};
    (itinSteps.data || []).forEach((s) => {
      (stepsByIt[s.itinerary_id] ||= []).push({ time: s.time, stop: s.stop, detail: s.detail });
    });
    const itinerariesFromDb = (itins.data || []).map((it) => ({
      id: it.slug,
      title: it.title,
      duration: it.duration,
      blurb: it.blurb,
      steps: stepsByIt[it.id] || [],
    }));

    return {
      ...localData,
      bios: biosObj,
      venueArtists: va,
      mainExhibition: (mainExh.data || []).map((p) => ({ name: p.name, origin: p.origin })),
      pavilionsGiardini: byArea.giardini,
      pavilionsArsenale: byArea.arsenale,
      pavilionsCity: byArea.city,
      collateral: byArea.collateral,
      parallel: byArea.parallel,
      itineraries: itinerariesFromDb.length ? itinerariesFromDb : localData.itineraries,
    };
  } catch (err) {
    console.warn('Supabase load failed', err);
    return localData;
  }
}

export async function loadData() {
  const data = supabaseEnabled ? await loadFromSupabase() : localData;
  return build(data);
}

export function biosFor(data, venueId) {
  return (data.venueArtists[venueId] || []).map((slug) => ({ key: slug, ...data.bios[slug] }));
}
