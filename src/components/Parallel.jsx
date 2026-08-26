import { useMemo } from 'react';
import { biosFor, mapsUrlFor } from '../lib/dataStore.js';
import { PageHead, Eyebrow, Tick, VenueFacts, ArtistBios, VenueActions } from './ui.jsx';

export default function Parallel({ data, appData, onSelect, anchor }) {
  const byOrg = useMemo(() => {
    const g = {};
    data.forEach((d) => {
      (g[d.org] ||= []).push(d);
    });
    return g;
  }, [data]);
  const artistCount = data.reduce((sum, p) => sum + (appData.venueArtists[p.id]?.length || 0), 0);

  return (
    <>
      <PageHead
        access="Instituições da cidade · fora do circuito oficial"
        title="Em paralelo"
        italic="à Bienal"
        lede="De maio a novembro a cidade inteira vira extensão da Bienal. Pinault Collection, Fondazione Prada, Querini Stampalia, Cini, Peggy Guggenheim, Berggruen, Sandretto — mais Anish Kapoor, Marina Abramović e JR."
        facts={[
          { k: 'Exposições', v: `${data.length}` },
          { k: 'Instituições', v: `${Object.keys(byOrg).length}` },
          { k: 'Artistas com bio', v: `${artistCount}` },
        ]}
      />

      {Object.entries(byOrg).map(([org, items]) => (
        <section key={org} className="mt-16">
          <div className="rule-strong-t pt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <Eyebrow tone="key">Instituição</Eyebrow>
              <h2 className="u-display u-wonk text-[clamp(2rem,4.2vw,3.2rem)] t-1 mt-2">{org}</h2>
            </div>
            <Eyebrow>
              {items.length} mostra{items.length > 1 ? 's' : ''} durante a Bienal
            </Eyebrow>
          </div>

          {items.map((it) => {
            const bios = biosFor(appData, it.id);
            return (
              <article key={it.id} className="py-12 grid md:grid-cols-12 gap-x-10 gap-y-8 rule-t mt-8">
                <div className="md:col-span-4">
                  <Tick anchor={anchor} zone={it.zone} />
                  <h3 className="u-display italic text-[clamp(1.7rem,3vw,2.3rem)] t-1 mt-4">{it.name}</h3>
                  <VenueFacts venue={{ ...it, org: undefined }} zoneNames={appData.zoneNames} />
                  {it.note && (
                    <p
                      className="u-prose text-[14px] italic mt-6 pl-4"
                      style={{ borderLeft: '2px solid var(--verde-deep)' }}
                    >
                      {it.note}
                    </p>
                  )}
                  <VenueActions venue={it} mapsUrl={mapsUrlFor(it)} onDetail={onSelect} />
                </div>
                <div className="md:col-span-8">
                  <ArtistBios bios={bios} />
                </div>
              </article>
            );
          })}
        </section>
      ))}
    </>
  );
}
