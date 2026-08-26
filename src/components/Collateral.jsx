import { useMemo, useState } from 'react';
import { biosFor, mapsUrlFor } from '../lib/dataStore.js';
import { minutesFrom } from '../lib/travelTimes.js';
import { PageHead, ControlBar, Eyebrow, Tick, VenueFacts, ArtistBios, VenueActions } from './ui.jsx';

export default function Collateral({ data, appData, onSelect, anchor }) {
  const [sort, setSort] = useState('catalog');
  const artistCount = data.reduce((sum, p) => sum + (appData.venueArtists[p.id]?.length || 0), 0);

  const ordered = useMemo(() => {
    if (sort !== 'near') return data;
    return [...data].sort((a, b) => (minutesFrom(anchor, a.zone) ?? 999) - (minutesFrom(anchor, b.zone) ?? 999));
  }, [data, sort, anchor]);

  return (
    <>
      <PageHead
        access="Chancela oficial da Bienal · sedes independentes"
        title="Espalhados"
        italic="pela cidade"
        lede="Trinta e uma mostras aprovadas oficialmente pela Bienal e instaladas em palácios, igrejas e fundações venezianas. Aqui estão as principais, com os artistas em exposição."
        facts={[
          { k: 'Mostras', v: `${data.length}` },
          { k: 'Artistas com bio', v: `${artistCount}` },
          { k: 'Temporada', v: '9 mai → 22 nov' },
        ]}
      />

      <section className="mt-14">
        <ControlBar>
          <Eyebrow>{data.length} eventos colaterais</Eyebrow>
          <div className="seg" role="group" aria-label="Ordenação">
            <button type="button" aria-pressed={sort === 'catalog'} onClick={() => setSort('catalog')}>
              Catálogo
            </button>
            <button type="button" aria-pressed={sort === 'near'} onClick={() => setSort('near')}>
              Mais perto
            </button>
          </div>
        </ControlBar>

        {ordered.map((c) => {
          const bios = biosFor(appData, c.id);
          return (
            <article key={c.id} className="py-12 grid md:grid-cols-12 gap-x-10 gap-y-8 rule-t">
              <div className="md:col-span-4">
                <div className="flex items-center justify-between gap-4">
                  <Tick anchor={anchor} zone={c.zone} />
                  <Eyebrow>Colateral</Eyebrow>
                </div>
                <h3 className="u-display u-wonk text-[clamp(1.9rem,3.4vw,2.6rem)] t-1 mt-4">{c.name}</h3>
                <div className="u-display italic text-[18px] t-2 mt-2">{c.org}</div>
                <VenueFacts venue={c} zoneNames={appData.zoneNames} />
                <VenueActions venue={c} mapsUrl={mapsUrlFor(c)} onDetail={onSelect} />
              </div>
              <div className="md:col-span-8">
                <ArtistBios bios={bios} />
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
