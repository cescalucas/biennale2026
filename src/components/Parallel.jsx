import { useMemo } from 'react';
import { biosFor, mapsUrlFor } from '../lib/dataStore.js';

export default function Parallel({ data, appData, onSelect }) {
  const byOrg = useMemo(() => {
    const g = {};
    data.forEach((d) => {
      (g[d.org] ||= []).push(d);
    });
    return g;
  }, [data]);
  const artistCount = data.reduce((sum, p) => sum + (appData.venueArtists[p.id]?.length || 0), 0);

  return (
    <div>
      <section className="pt-12 pb-10 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">05 · MUSEUS & INSTITUIÇÕES</div>
          <h2 className="font-black text-5xl md:text-7xl tracking-tightest mt-4 ink-text leading-[0.88] uppercase">
            Em paralelo
            <br />
            <em>à Bienal</em>
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">
            Toda Veneza vira uma extensão da Bienal. Pinault Collection, Fondazione Prada, Querini Stampalia, Cini, Peggy
            Guggenheim, Berggruen (Palazzo Diedo e Tre Oci), Sandretto, Dries Van Noten — mais Anish Kapoor, Marina Abramović e JR.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right text-[13px]">
          <div className="label-tag muted-text">Mostras</div>
          <div className="ink-text mt-1">{data.length} exposições</div>
          <div className="label-tag muted-text mt-4">Artistas</div>
          <div className="ink-text mt-1">{artistCount} com biografia</div>
          <div className="label-tag muted-text mt-4">Quando</div>
          <div className="ink-text mt-1">9 maio → 22 novembro 2026</div>
        </div>
      </section>

      {Object.entries(byOrg).map(([org, items], orgIdx) => (
        <section key={org} className="pt-12">
          <div className="pt-8 mb-2" style={{ borderTop: '2px solid var(--ink)' }}>
            <div className="label-tag terra-text">№ {String(orgIdx + 1).padStart(2, '0')} · Instituição</div>
            <div className="font-black text-4xl md:text-5xl tracking-tightest ink-text mt-2 leading-[0.95] uppercase">{org}</div>
            <div className="text-[12px] muted-text mt-2">{items.length} mostra(s) durante a Bienal</div>
          </div>
          {items.map((it, i) => {
            const bios = biosFor(appData, it.id);
            return (
              <article key={it.id} className="mt-8 pt-10 grid md:grid-cols-12 gap-8 md:gap-10 fade-in" style={{ borderTop: '1px solid var(--line)' }}>
                <div className="md:col-span-4">
                  <div className="font-black text-3xl tnum tracking-tight" style={{ color: 'var(--terra)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <h4 className="font-black text-2xl md:text-3xl ink-text mt-3 leading-[0.95] uppercase tracking-tightest">{it.name}</h4>
                  <dl className="mt-5 hairline pt-4 space-y-3 text-[13px]">
                    {it.curator && (
                      <div>
                        <dt className="label-tag muted-text">Curadoria</dt>
                        <dd className="ink-text mt-0.5">{it.curator}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="label-tag muted-text">Endereço</dt>
                      <dd className="ink-text mt-0.5 leading-snug">{it.address}</dd>
                    </div>
                    {it.dates && (
                      <div>
                        <dt className="label-tag muted-text">Período</dt>
                        <dd className="terra-text mt-0.5">{it.dates}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="label-tag muted-text">Localização</dt>
                      <dd className="ink-text mt-0.5 italic">{appData.zoneNames[it.zone]}</dd>
                    </div>
                  </dl>
                  {it.note && (
                    <p className="mt-5 italic text-[13px] muted-text leading-relaxed border-l pl-3" style={{ borderColor: 'var(--terra)' }}>
                      {it.note}
                    </p>
                  )}
                  <div className="mt-5 flex flex-col gap-2">
                    <button onClick={() => onSelect(it.id)} className="text-[12px] uppercase tracking-widest terra-text hover:underline text-left">
                      Ver detalhes →
                    </button>
                    <a href={mapsUrlFor(it)} target="_blank" rel="noreferrer" className="text-[12px] uppercase tracking-widest muted-text hover:text-ink hover:underline text-left">
                      ↗ Google Maps
                    </a>
                  </div>
                </div>
                <div className="md:col-span-8">
                  {bios.length > 0 && (
                    <div className="space-y-9">
                      {bios.map((b, idx) => (
                        <div key={b.key} className={idx > 0 ? 'pt-9' : ''} style={{ borderTop: idx > 0 ? '1px solid var(--line)' : 'none' }}>
                          <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-3">
                              <div className="label-tag muted-text">{bios.length > 1 ? `Artista ${idx + 1} / ${bios.length}` : 'O artista'}</div>
                              <div className="font-black text-2xl md:text-3xl ink-text mt-2 leading-[0.95] uppercase tracking-tightest">{b.name}</div>
                              <div className="label-tag muted-text mt-2">{b.years}</div>
                            </div>
                            <div className="col-span-12 md:col-span-9">
                              <p className="text-[14.5px] ink-text leading-relaxed">{b.bio}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      ))}
    </div>
  );
}
