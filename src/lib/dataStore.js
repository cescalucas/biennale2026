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
import { VISITOR_INFO, CITY_PAVILION_DEFAULT } from '../data/visitorInfo.js';
import { BIENNALE_TICKETS } from '../data/tickets.js';

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
  visitorInfo: VISITOR_INFO,
  tickets: BIENNALE_TICKETS,
  zoneNames: ZONE_NAMES,
  zoneCenters: ZONE_CENTERS,
  zoneList: ZONE_LIST,
  edges: EDGES,
  stops: STOPS,
};

// Constrói ALL_VENUES e estruturas derivadas
// Campos de visita que podem vir do Supabase (colunas) ou do módulo local.
const VISIT_FIELDS = ['hours', 'closed', 'closedDays', 'price', 'free', 'ticketUrl', 'ticketKind', 'website', 'booking', 'ends', 'verified'];

// Mescla as informações práticas de visita (horário, dias, preço, ingresso)
// em cada venue. Prioridade: colunas vindas do banco → VISITOR_INFO local →
// padrão da área (pavilhões na cidade são gratuitos e seguem o horário da Bienal).
function withVisitInfo(v, area, visitorInfo) {
  const fromDb = {};
  VISIT_FIELDS.forEach((k) => {
    if (v[k] !== undefined && v[k] !== null) fromDb[k] = v[k];
  });
  const local = visitorInfo?.[v.id] || {};
  const fallback = area === 'city' ? CITY_PAVILION_DEFAULT : {};
  const visit = { ...fallback, ...local, ...fromDb };
  if (visit.free === undefined && visit.price) visit.free = /gratuit|grátis|gratis|free/i.test(visit.price);
  if (!visit.ticketKind) visit.ticketKind = visit.free ? 'gratis' : visit.ticketUrl ? 'site' : null;
  return { ...v, area, visit };
}

function build(d) {
  const vi = d.visitorInfo || VISITOR_INFO;
  const pavilionsGiardini = d.pavilionsGiardini.map((v) => withVisitInfo(v, 'giardini', vi));
  const pavilionsArsenale = d.pavilionsArsenale.map((v) => withVisitInfo(v, 'arsenale', vi));
  const pavilionsCity = d.pavilionsCity.map((v) => withVisitInfo(v, 'city', vi));
  const collateral = d.collateral.map((v) => withVisitInfo(v, 'collateral', vi));
  const parallel = d.parallel.map((v) => withVisitInfo(v, 'parallel', vi));
  const allVenues = [...pavilionsGiardini, ...pavilionsArsenale, ...pavilionsCity, ...collateral, ...parallel];
  const venuesById = Object.fromEntries(allVenues.map((v) => [v.id, v]));
  return {
    ...d,
    pavilionsGiardini,
    pavilionsArsenale,
    pavilionsCity,
    collateral,
    parallel,
    tickets: d.tickets || BIENNALE_TICKETS,
    allVenues,
    venuesById,
  };
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
      // Colunas de visita em snake_case → camelCase usado no front
      const { closed_days, ticket_url, ticket_kind, ...rest } = v;
      const obj = {
        ...rest,
        closedDays: closed_days ?? undefined,
        ticketUrl: ticket_url ?? undefined,
        ticketKind: ticket_kind ?? undefined,
      };
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

// Monta o URL do Google Maps para um venue.
// Prioriza o address (mais preciso); cai pro name se não houver.
// Sempre inclui "Venezia, Italia" para garantir a cidade.
export function mapsUrlFor(venue) {
  if (!venue) return null;
  const query = [venue.address || venue.name, 'Venezia', 'Italia'].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const WEEKDAYS_PT = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
export const WEEKDAYS_SHORT_PT = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

// true se o venue abre no dia da semana informado (0=dom … 6=sáb).
// Sem informação de fechamento, assume aberto.
export function isOpenOnWeekday(venue, weekday) {
  const days = venue?.visit?.closedDays;
  if (!Array.isArray(days) || days.length === 0) return true;
  return !days.includes(weekday);
}

// Situação da mostra em relação a hoje: 'encerrada' | 'ultimos-dias' | 'em-cartaz' | null (sem data).
export function venueStatus(venue, today = new Date()) {
  const ends = venue?.visit?.ends;
  if (!ends) return null;
  const end = new Date(ends + 'T23:59:59');
  if (Number.isNaN(end.getTime())) return null;
  if (end < today) return 'encerrada';
  const days = Math.ceil((end - today) / 86400000);
  return days <= 14 ? 'ultimos-dias' : 'em-cartaz';
}

export function statusLabel(status, venue) {
  if (status === 'encerrada') return `Encerrada${venue?.visit?.ends ? ' em ' + formatShortDate(venue.visit.ends) : ''}`;
  if (status === 'ultimos-dias') return `Últimos dias · até ${formatShortDate(venue.visit.ends)}`;
  return null;
}

const MONTHS_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
export function formatShortDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_PT[m - 1]}`;
}

// Rótulo do botão de ingresso conforme o tipo de link.
export function ticketLabel(visit) {
  if (!visit) return null;
  switch (visit.ticketKind) {
    case 'compra':
      return 'Comprar ingresso';
    case 'reserva':
      return 'Reservar visita';
    case 'gratis':
      return visit.ticketUrl ? 'Entrada gratuita · site oficial' : 'Entrada gratuita';
    case 'site':
      return 'Ingressos · site oficial';
    default:
      return visit.ticketUrl ? 'Site oficial' : null;
  }
}
