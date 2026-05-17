import { useMemo, useState } from 'react';

export default function Artists({ appData, onSelectVenue }) {
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
        bio: 'Participante da mostra principal "In Minor Keys" (Padiglione Centrale + Corderie do Arsenale), com curadoria de Koyo Kouoh e equipe.',
        venueId: 'centrale',
        venueName: 'Padiglione Centrale · Mostra Principal',
        venueArea: 'main',
        venueTitle: 'In Minor Keys',
        zone: 'G',
        hasBio: false,
      });
    });
    return list;
  }, [appData]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return flat;
    return flat.filter((x) => x.name.toLowerCase().includes(s) || x.bio.toLowerCase().includes(s) || x.venueName.toLowerCase().includes(s));
  }, [q, flat]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (groupBy === 'alpha') return a.name.localeCompare(b.name, 'pt-BR');
      const areaOrder = { main: 0, giardini: 1, arsenale: 2, city: 3, collateral: 4, parallel: 5 };
      const d = (areaOrder[a.venueArea] ?? 9) - (areaOrder[b.venueArea] ?? 9);
      if (d !== 0) return d;
      return a.venueName.localeCompare(b.venueName, 'pt-BR');
    });
  }, [filtered, groupBy]);

  const groups = useMemo(() => {
    const g = {};
    if (groupBy === 'alpha') {
      sorted.forEach((a) => {
        const letter = a.name.replace(/[^a-zA-ZÀ-Ÿ]/g, '')[0]?.toUpperCase() || '#';
        (g[letter] ||= []).push(a);
      });
    } else {
      const labels = {
        main: 'Mostra Principal · In Minor Keys',
        giardini: 'Giardini · Pavilhões nacionais',
        arsenale: 'Arsenale · Pavilhões nacionais',
        city: 'Pavilhões nacionais na cidade',
        collateral: 'Eventos Colaterais',
        parallel: 'Museus & Instituições',
      };
      sorted.forEach((a) => {
        const lbl = labels[a.venueArea] || a.venueArea;
        (g[lbl] ||= []).push(a);
      });
    }
    return g;
  }, [sorted, groupBy]);

  return (
    <div>
      <section className="pt-12 pb-10 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">06 · ÍNDICE DE ARTISTAS</div>
          <h2 className="font-serif italic text-5xl md:text-7xl tracking-tightest mt-5 ink-text leading-[0.95]">
            Quem está
            <br />
            <em>em Veneza</em>
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">
            {flat.length} artistas catalogados — atravessando a mostra principal "In Minor Keys", os pavilhões nacionais (Giardini,
            Arsenale e cidade), os eventos colaterais e as exposições em museus. Use o filtro para alternar entre ordem alfabética
            e agrupamento por local.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right text-[13px]">
          <div className="label-tag muted-text">No total</div>
          <div className="ink-text mt-1">{flat.length} artistas</div>
          <div className="muted-text mt-1">{flat.filter((x) => x.hasBio).length} com biografia detalhada</div>
          <div className="muted-text mt-1">{flat.filter((x) => !x.hasBio).length} participantes da mostra principal</div>
        </div>
      </section>

      <section className="py-5 flex flex-wrap items-center justify-between gap-4 hairline">
        <div className="flex gap-2">
          <button onClick={() => setGroupBy('alpha')} className={'pillbtn px-3 py-1.5 text-[11.5px] uppercase tracking-widest border border-ink ' + (groupBy === 'alpha' ? 'active' : '')}>
            A → Z
          </button>
          <button onClick={() => setGroupBy('location')} className={'pillbtn px-3 py-1.5 text-[11.5px] uppercase tracking-widest border border-ink ' + (groupBy === 'location' ? 'active' : '')}>
            Por local
          </button>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar artista ou local…"
          className="bg-paper border border-line px-4 py-2 text-[13px] focus:outline-none focus:border-ink w-full md:w-80"
        />
      </section>

      {Object.entries(groups).map(([groupName, arr]) => (
        <section key={groupName} className="pt-10">
          <div className="pt-8 mb-8 flex items-end justify-between" style={{ borderTop: '1px solid var(--ink-soft)' }}>
            <div className="font-serif italic text-6xl tracking-tightest leading-[0.95]" style={{ color: 'var(--terra)' }}>{groupName}</div>
            <div className="label-tag">{arr.length} artista(s)</div>
          </div>
          <div className="space-y-10">
            {arr.map((a) => (
              <article key={a.key + a.venueId} className="grid md:grid-cols-12 gap-6 pb-9" style={{ borderBottom: '1px solid var(--line)' }}>
                <div className="md:col-span-4">
                  <div className="font-serif italic text-3xl ink-text leading-[1.05] tracking-tightest">{a.name}</div>
                  <div className="label-tag muted-text mt-1.5">{a.years}</div>
                  <button onClick={() => onSelectVenue(a.venueId)} className="mt-3 text-[12px] terra-text hover:underline text-left leading-snug">
                    {a.venueArea === 'main' && 'Mostra principal · '}
                    {a.venueArea === 'giardini' && 'Giardini · '}
                    {a.venueArea === 'arsenale' && 'Arsenale · '}
                    {a.venueArea === 'city' && 'Pavilhão na cidade · '}
                    {a.venueArea === 'collateral' && 'Colateral · '}
                    {a.venueArea === 'parallel' && 'Museu · '}
                    {a.venueArea === 'parallel' ? a.venueOrg : a.venueName}
                    {a.venueTitle && a.venueArea !== 'parallel' && <span className="italic"> · "{a.venueTitle}"</span>}
                  </button>
                </div>
                <div className="md:col-span-8">
                  <p className="text-[14.5px] ink-text leading-relaxed">{a.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {sorted.length === 0 && <div className="py-16 text-center italic text-xl muted-text font-medium">Nenhum artista encontrado.</div>}
    </div>
  );
}
