import { useMemo, useState } from 'react';
import { biosFor, mapsUrlFor } from '../lib/dataStore.js';
import { minutesFrom } from '../lib/travelTimes.js';
import { PageHead, ControlBar, Eyebrow, Tick, VenueFacts, ArtistBios, VenueActions } from './ui.jsx';

const META = {
  giardini: {
    access: 'Vaporetto 1 · 2 · 4.1 · 5.1 — parada Giardini',
    title: 'Os pavilhões',
    italic: 'nacionais',
    lede: 'Vinte e nove pavilhões permanentes nos jardins de Castello, o mais antigo de 1907. No meio deles, o Padiglione Centrale abriga a abertura de “In Minor Keys”.',
  },
  arsenale: {
    access: 'Vaporetto 1 · 4.1 — parada Arsenale',
    title: 'Tese delle Vergini',
    italic: '& Corderie',
    lede: 'O estaleiro naval da República Sereníssima, fechado ao público por séculos, hoje abriga os países sem pavilhão fixo e a continuação da mostra internacional.',
  },
};

export default function PavilionList({ area, data, mainExhibition, appData, onSelect, anchor }) {
  const [sort, setSort] = useState('catalog');
  const meta = META[area];

  const artistCount = data.reduce((sum, p) => sum + (appData.venueArtists[p.id]?.length || 0), 0);
  const showMain = area === 'giardini' && mainExhibition?.length;

  const ordered = useMemo(() => {
    if (sort !== 'near') return data;
    return [...data].sort((a, b) => (minutesFrom(anchor, a.zone) ?? 999) - (minutesFrom(anchor, b.zone) ?? 999));
  }, [data, sort, anchor]);

  return (
    <>
      <PageHead
        access={meta.access}
        title={meta.title}
        italic={meta.italic}
        lede={meta.lede}
        facts={[
          { k: 'Pavilhões', v: `${data.length}` },
          { k: 'Artistas com bio', v: `${artistCount}` },
          { k: 'Daqui', v: <Tick anchor={anchor} zone={area === 'giardini' ? 'G' : 'A'} /> },
        ]}
      />

      {showMain && (
        <section className="pt-14 grid md:grid-cols-12 gap-x-10 gap-y-8">
          <div className="md:col-span-4">
            <Eyebrow tone="key">Mostra principal</Eyebrow>
            <h2 className="u-display u-wonk italic text-[clamp(2.2rem,4.5vw,3.4rem)] t-1 mt-3">In Minor Keys</h2>
            <p className="u-prose text-[15px] mt-5">
              Os 110 artistas, duplas, coletivos e organizações escolhidos por Koyo Kouoh e sua equipe atravessam o
              Padiglione Centrale, aqui nos Giardini, e as Corderie do Arsenale. Estão listados{' '}
              <em>{mainExhibition.length} confirmados</em>.
            </p>
            <button type="button" onClick={() => onSelect('centrale')} className="btn-inline mt-5">
              Sobre o Padiglione Centrale <span aria-hidden="true">→</span>
            </button>
          </div>
          <ul className="md:col-span-8 columns-1 sm:columns-2 lg:columns-3 gap-x-8 rule-strong-t pt-6">
            {mainExhibition.map((p, i) => (
              <li key={i} className="break-inside-avoid mb-3">
                <div className="text-[15px] t-1 leading-snug">{p.name}</div>
                <div className="u-mono text-[10.5px] t-3">{p.origin}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16">
        <ControlBar>
          <Eyebrow>
            {data.length} pavilhões · {area === 'giardini' ? 'Giardini' : 'Arsenale'}
          </Eyebrow>
          <div className="seg" role="group" aria-label="Ordenação">
            <button type="button" aria-pressed={sort === 'catalog'} onClick={() => setSort('catalog')}>
              Catálogo
            </button>
            <button type="button" aria-pressed={sort === 'near'} onClick={() => setSort('near')}>
              Mais perto
            </button>
          </div>
        </ControlBar>

        {ordered.map((p) => {
          const bios = biosFor(appData, p.id);
          return (
            <article key={p.id} className="py-12 grid md:grid-cols-12 gap-x-10 gap-y-8 rule-t">
              <div className="md:col-span-4">
                <div className="flex items-center justify-between gap-4">
                  <Tick anchor={anchor} zone={p.zone} />
                  {p.highlight && <Eyebrow tone="key">Em destaque</Eyebrow>}
                </div>
                <h3 className="u-display u-wonk text-[clamp(2rem,3.6vw,2.8rem)] t-1 mt-4">{p.name}</h3>
                {p.title && <div className="u-display italic text-[19px] t-2 mt-2">“{p.title}”</div>}
                <VenueFacts venue={p} zoneNames={appData.zoneNames} />
                {p.note && (
                  <p className="u-prose text-[14px] italic mt-6 pl-4" style={{ borderLeft: '2px solid var(--verde-deep)' }}>
                    {p.note}
                  </p>
                )}
                <VenueActions venue={p} mapsUrl={mapsUrlFor(p)} onDetail={onSelect} />
              </div>
              <div className="md:col-span-8">
                <ArtistBios
                  bios={bios}
                  emptyNote="Esta apresentação reúne um coletivo amplo. A lista completa de participantes está no site oficial da Bienal."
                />
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
