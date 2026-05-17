import { biosFor, mapsUrlFor } from '../lib/dataStore.js';

export default function PavilionList({ area, data, mainExhibition, appData, onSelect }) {
  const meta =
    area === 'giardini'
      ? {
          kicker: '01 · GIARDINI',
          title: 'Os pavilhões\nnacionais',
          sub: '29 pavilhões permanentes nos jardins de Castello, datados desde 1907. A mostra principal "In Minor Keys" — com 110 participantes — ocupa o Padiglione Centrale.',
          stops: 'Giardini · Linha 1 / 2 / 4.1 / 5.1',
        }
      : {
          kicker: '02 · ARSENALE',
          title: 'Tese delle Vergini\n& Corderie',
          sub: 'O antigo estaleiro naval da República Sereníssima abriga países sem pavilhão fixo e parte da mostra internacional.',
          stops: 'Arsenale · Linha 1 / 4.1',
        };

  const artistCount = data.reduce((sum, p) => sum + (appData.venueArtists[p.id]?.length || 0), 0);
  const showMain = area === 'giardini' && mainExhibition?.length;

  return (
    <div>
      <section className="pt-16 pb-12 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">{meta.kicker}</div>
          <h2 className="font-serif italic text-5xl md:text-7xl tracking-tightest mt-5 ink-text leading-[0.95] whitespace-pre-line">{meta.title}</h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">{meta.sub}</p>
        </div>
        <div className="md:col-span-4 md:text-right text-[13px]">
          <div className="label-tag muted-text">Pavilhões</div>
          <div className="ink-text mt-1">{data.length} catalogados</div>
          <div className="label-tag muted-text mt-4">Artistas</div>
          <div className="ink-text mt-1">{artistCount} com biografia detalhada</div>
          <div className="label-tag muted-text mt-4">Como chegar</div>
          <div className="ink-text mt-1">{meta.stops}</div>
        </div>
      </section>

      {showMain && (
        <section className="pt-16 mt-4" style={{ borderTop: '1px solid var(--line)' }}>
          <div className="grid md:grid-cols-12 gap-10 pt-12">
            <div className="md:col-span-4">
              <div className="label-tag" style={{ color: 'var(--terra)' }}>★ Mostra principal</div>
              <h3 className="font-serif italic text-5xl md:text-6xl tracking-tightest mt-4 ink-text leading-[0.95]">In Minor Keys</h3>
              <div className="text-base muted-text mt-3">os 110 participantes convidados</div>
              <p className="text-[13.5px] muted-text mt-5 leading-relaxed">
                Selecionados por <span className="font-medium ink-text">Koyo Kouoh</span> e sua equipe (Beckhurst Feijoo · Pereira · Salti), os
                110 artistas, duplas, coletivos e organizações lideradas por artistas atravessam o Padiglione Centrale (Giardini) e
                as Corderie (Arsenale). Listamos {mainExhibition.length} dos confirmados.
              </p>
              <button onClick={() => onSelect('centrale')} className="mt-5 text-[12px] uppercase tracking-widest font-medium hover:underline" style={{ color: 'var(--terra)' }}>
                Sobre o Padiglione Centrale →
              </button>
            </div>
            <div className="md:col-span-8">
              <ul className="columns-1 sm:columns-2 lg:columns-3 gap-x-6 text-[13px] space-y-2">
                {mainExhibition.map((p, i) => (
                  <li key={i} className="break-inside-avoid">
                    <div className="ink-text">{p.name}</div>
                    <div className="muted-text text-[11.5px] italic">{p.origin}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="pt-10">
        {data.map((p, i) => {
          const bios = biosFor(appData, p.id);
          return (
            <article key={p.id} className="py-14 grid md:grid-cols-12 gap-10 md:gap-12 fade-in" style={{ borderTop: '1px solid var(--line)' }}>
              <div className="md:col-span-4">
                <div className="flex items-baseline justify-between">
                  <div className="font-serif italic text-3xl tnum" style={{ color: 'var(--terra)' }}>{String(i + 1).padStart(2, '0')}</div>
                  {p.highlight && <div className="label-tag" style={{ color: 'var(--terra)' }}>★ Em destaque</div>}
                </div>
                <h3 className="font-serif italic text-4xl md:text-5xl tracking-tightest mt-5 ink-text leading-[0.95]">{p.name}</h3>
                {p.title && <div className="text-lg muted-text mt-3 leading-snug">"{p.title}"</div>}
                <dl className="mt-6 hairline pt-5 space-y-3 text-[13px]">
                  {p.artists && (
                    <div>
                      <dt className="label-tag muted-text">Artista(s)</dt>
                      <dd className="ink-text mt-0.5">{p.artists}</dd>
                    </div>
                  )}
                  {p.curator && (
                    <div>
                      <dt className="label-tag muted-text">Curadoria</dt>
                      <dd className="ink-text mt-0.5">{p.curator}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="label-tag muted-text">Localização</dt>
                    <dd className="ink-text mt-0.5 italic">{appData.zoneNames[p.zone]}</dd>
                  </div>
                </dl>
                {p.note && (
                  <p className="mt-6 italic text-[13px] muted-text leading-relaxed border-l pl-3" style={{ borderColor: 'var(--terra)' }}>
                    {p.note}
                  </p>
                )}
                <div className="mt-6 flex flex-col gap-2">
                  <button onClick={() => onSelect(p.id)} className="text-[12px] uppercase tracking-widest terra-text hover:underline text-left">
                    Ver detalhes →
                  </button>
                  <a href={mapsUrlFor(p)} target="_blank" rel="noreferrer" className="text-[12px] uppercase tracking-widest muted-text hover:text-ink hover:underline text-left">
                    ↗ Google Maps
                  </a>
                </div>
              </div>
              <div className="md:col-span-8">
                {bios.length > 0 ? (
                  <div className="space-y-9">
                    {bios.map((b, idx) => (
                      <div key={b.key} className={idx > 0 ? 'pt-9' : ''} style={{ borderTop: idx > 0 ? '1px solid var(--line)' : 'none' }}>
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 md:col-span-3">
                            <div className="label-tag">{bios.length > 1 ? `Artista ${idx + 1} / ${bios.length}` : 'O artista'}</div>
                            <div className="font-serif italic text-3xl ink-text mt-3 leading-[1.05]">{b.name}</div>
                            <div className="label-tag mt-3">{b.years}</div>
                          </div>
                          <div className="col-span-12 md:col-span-9">
                            <p className="text-[14.5px] ink-text leading-relaxed">{b.bio}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[14px] muted-text italic leading-relaxed p-6" style={{ border: '1px solid var(--line)' }}>
                    Esta exposição reúne um coletivo amplo de artistas. Veja a lista completa no site oficial da Bienal.
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
