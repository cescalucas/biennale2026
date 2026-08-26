import { useMemo, useState } from 'react';
import { PageHead, ControlBar, Eyebrow, Tick } from './ui.jsx';

const AREA_PREFIX = {
  main: 'Mostra principal',
  giardini: 'Giardini',
  arsenale: 'Arsenale',
  city: 'Pavilhão na cidade',
  collateral: 'Colateral',
  parallel: 'Museu',
};

const AREA_GROUP = {
  main: 'Mostra principal · In Minor Keys',
  giardini: 'Giardini · pavilhões nacionais',
  arsenale: 'Arsenale · pavilhões nacionais',
  city: 'Pavilhões nacionais na cidade',
  collateral: 'Eventos colaterais',
  parallel: 'Museus & instituições',
};

const AREA_ORDER = { main: 0, giardini: 1, arsenale: 2, city: 3, collateral: 4, parallel: 5 };

export default function Artists({ appData, onSelectVenue, anchor }) {
  const [groupBy, setGroupBy] = useState('alpha');
  const [q, setQ] = useState('');

  const flat = useMemo(() => {
    const list = [];
    Object.entries(appData.venueArtists).forEach(([venueId, keys]) => {
      const v = appData.venuesById[venueId];
      if (!v) return;
      keys.forEach((k) => {
        const bio = appData.bios[k];
        if (!bio) return;
        list.push({
          key: k,
          ...bio,
          venueId,
          venueName: v.name,
          venueArea: v.area,
          venueTitle: v.title,
          venueOrg: v.org,
          zone: v.zone,
          hasBio: true,
        });
      });
    });
    appData.mainExhibition.forEach((p, i) => {
      list.push({
        key: 'main-' + i,
        name: p.name,
        years: p.origin,
        bio: 'Convidado da mostra principal “In Minor Keys”, entre o Padiglione Centrale dos Giardini e as Corderie do Arsenale.',
        venueId: 'centrale',
        venueName: 'Padiglione Centrale',
        venueArea: 'main',
        venueTitle: 'In Minor Keys',
        zone: 'G',
        hasBio: false,
      });
    });
    return list;
  }, [appData]);

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    const filtered = s
      ? flat.filter((x) => (x.name + ' ' + x.bio + ' ' + x.venueName).toLowerCase().includes(s))
      : flat;

    const sorted = [...filtered].sort((a, b) => {
      if (groupBy === 'alpha') return a.name.localeCompare(b.name, 'pt-BR');
      const d = (AREA_ORDER[a.venueArea] ?? 9) - (AREA_ORDER[b.venueArea] ?? 9);
      return d !== 0 ? d : a.venueName.localeCompare(b.venueName, 'pt-BR');
    });

    const g = new Map();
    sorted.forEach((a) => {
      const label =
        groupBy === 'alpha'
          ? a.name.replace(/[^a-zA-ZÀ-Ÿ]/g, '')[0]?.toUpperCase() || '#'
          : AREA_GROUP[a.venueArea] || a.venueArea;
      if (!g.has(label)) g.set(label, []);
      g.get(label).push(a);
    });
    return { entries: [...g.entries()], count: sorted.length };
  }, [flat, q, groupBy]);

  return (
    <>
      <PageHead
        access="Índice geral · mostra principal, pavilhões, colaterais e museus"
        title="Quem está"
        italic="em Veneza"
        lede={`${flat.length} artistas catalogados. Clique no local abaixo de cada nome para abrir a ficha da exposição em que ele aparece.`}
        facts={[
          { k: 'No índice', v: `${flat.length}` },
          { k: 'Com biografia', v: `${flat.filter((x) => x.hasBio).length}` },
          { k: 'Mostra principal', v: `${flat.filter((x) => !x.hasBio).length}` },
        ]}
      />

      <ControlBar>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="busca-artista" className="sr-only">
            Buscar artista ou local
          </label>
          <input
            id="busca-artista"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar artista ou local…"
            className="field w-full sm:w-80"
          />
          <div className="seg" role="group" aria-label="Agrupamento">
            <button type="button" aria-pressed={groupBy === 'alpha'} onClick={() => setGroupBy('alpha')}>
              A → Z
            </button>
            <button type="button" aria-pressed={groupBy === 'location'} onClick={() => setGroupBy('location')}>
              Por local
            </button>
          </div>
        </div>
        <Eyebrow>
          <span aria-live="polite">{groups.count} artistas</span>
        </Eyebrow>
      </ControlBar>

      {groups.entries.map(([label, arr]) => (
        <section key={label} className="mt-6">
          <div className="pt-8 pb-6 flex items-baseline justify-between gap-6">
            <h2 className={`u-display u-wonk t-key ${groupBy === 'alpha' ? 'text-[44px]' : 'text-[clamp(1.4rem,2.6vw,2rem)]'}`}>
              {label}
            </h2>
            <Eyebrow>{arr.length}</Eyebrow>
          </div>
          <div>
            {arr.map((a) => (
              <article key={a.key + a.venueId} className="grid md:grid-cols-12 gap-x-8 gap-y-2 py-6 rule-b">
                <div className="md:col-span-4">
                  <h3 className="u-display text-[22px] t-1 leading-tight">{a.name}</h3>
                  <div className="u-mono text-[11px] t-3 mt-1">{a.years}</div>
                  <button type="button" onClick={() => onSelectVenue(a.venueId)} className="btn-inline mt-2 block leading-snug">
                    {AREA_PREFIX[a.venueArea]} · {a.venueArea === 'parallel' ? a.venueOrg : a.venueName}
                  </button>
                  <div className="mt-1.5">
                    <Tick anchor={anchor} zone={a.zone} />
                  </div>
                </div>
                <div className="md:col-span-8">
                  <p className="u-prose text-[15.5px]">{a.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {groups.count === 0 && <p className="u-prose italic text-center py-20">Nenhum artista corresponde a “{q}”.</p>}
    </>
  );
}
