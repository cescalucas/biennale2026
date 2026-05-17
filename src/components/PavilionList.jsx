import { biosFor } from '../lib/dataStore.js';

export default function PavilionList({ area, data, mainExhibition, appData, onSelect }) {
  const meta =
    area === 'giardini'
      ? {
          kicker: 'I · GIARDINI',
          title: 'Os pavilhões nacionais',
          sub: '29 pavilhões permanentes nos jardins de Castello, datados desde 1907. A mostra principal "In Minor Keys" — com 110 participantes — ocupa o Padiglione Centrale.',
          stops: 'Giardini · Linha 1 / 2 / 4.1 / 5.1',
        }
      : {
          kicker: 'II · ARSENALE',
          title: 'Tese delle Vergini & Corderie',
          sub: 'O antigo estaleiro naval da República Sereníssima abriga países sem pavilhão fixo e parte da mostra internacional.',
          stops: 'Arsenale · Linha 1 / 4.1',
        };

  const artistCount = data.reduce((sum, p) => sum + (appData.venueArtists[p.id]?.length || 0), 0);
  const showMain = area === 'giardini' && mainExhibition?.length;

  return (
    <div>
      <section className="pt-12 pb-10 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">{meta.kicker}</div>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tightest mt-4 ink-text leading-[0.9]">{meta.title}</h2>
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
        <section className="pt-12 hairline-t mt-2">
          <div className="grid md:grid-cols-12 gap-8 pt-10">
            <div className="md:col-span-4">
              <div className="label-tag terra-text">★ Mostra principal</div>
              <h3 className="font-serif text-4xl md:text-5xl tracking-tightest mt-3 ink-text leading-[0.95]">In Minor Keys</h3>
              <div className="font-serif italic text-xl muted-text mt-2">os 110 participantes convidados</div>
              <p className="text-[13.5px] muted-text mt-5 leading-relaxed">
                Selecionados por <em>Koyo Kouoh</em> e sua equipe (Gabe Beckhurst Feijoo, Marie Hélène Pereira, Rasha Salti), os 110
                artistas, duplas, coletivos e organizações lideradas por artistas atravessam o Padiglione Centrale (Giardini) e as
                Corderie (Arsenale). Listamos {mainExhibition.length} dos confirmados.
              </p>
              <button onClick={() => onSelect('centrale')} className="mt-5 text-[12px] uppercase tracking-widest terra-text hover:underline">
                Saber mais sobre o Padiglione Centrale →
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
            <article key={p.id} className="hairline-t py-12 grid md:grid-cols-12 gap-8 md:gap-10 fade-in">
              <div className="md:col-span-4">
                <div className="flex items-baseline justify-between">
                  <div className="font-serif text-3xl italic terra-text">{String(i + 1).padStart(2, '0')}</div>
                  {p.highlight && <div className="label-tag terra-text">★ Em destaque</div>}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl tracking-tightest mt-4 ink-text leading-[0.95]">{p.name}</h3>
                {p.title && <div className="font-serif italic text-xl muted-text mt-2 leading-snug">"{p.title}"</div>}
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
                <button onClick={() => onSelect(p.id)} className="mt-6 text-[12px] uppercase tracking-widest terra-text hover:underline">
                  Ver detalhes →
                </button>
              </div>
              <div className="md:col-span-8">
                {bios.length > 0 ? (
                  <div className="space-y-9">
                    {bios.map((b, idx) => (
                      <div key={b.key} className={idx > 0 ? 'hairline-t pt-9' : ''}>
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 md:col-span-3">
                            <div className="label-tag muted-text">{bios.length > 1 ? `Artista ${idx + 1} de ${bios.length}` : 'O artista'}</div>
                            <div className="font-serif text-2xl md:text-3xl ink-text mt-2 leading-tight">{b.name}</div>
                            <div className="label-tag muted-text mt-1.5">{b.years}</div>
                          </div>
                          <div className="col-span-12 md:col-span-9">
                            <p className="text-[14.5px] ink-text leading-relaxed">{b.bio}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[14px] muted-text italic leading-relaxed border border-line p-6">
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
