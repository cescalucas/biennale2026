import { biosFor } from '../lib/dataStore.js';

export default function Collateral({ data, appData, onSelect }) {
  const artistCount = data.reduce((sum, p) => sum + (appData.venueArtists[p.id]?.length || 0), 0);
  return (
    <div>
      <section className="pt-12 pb-10 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">IV · EVENTOS COLATERAIS</div>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tightest mt-4 ink-text leading-[0.9]">
            Espalhados
            <br />
            pela cidade
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">
            31 mostras oficialmente aprovadas pela Bienal e instaladas em palácios, igrejas e fundações venezianas. Aqui as
            principais, com os artistas em exposição.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right text-[13px]">
          <div className="label-tag muted-text">Mostras</div>
          <div className="ink-text mt-1">{data.length} eventos</div>
          <div className="label-tag muted-text mt-4">Artistas</div>
          <div className="ink-text mt-1">{artistCount} com biografia detalhada</div>
          <div className="label-tag muted-text mt-4">Quando</div>
          <div className="ink-text mt-1">9 maio → 22 novembro 2026</div>
        </div>
      </section>

      <section className="pt-10">
        {data.map((c, i) => {
          const bios = biosFor(appData, c.id);
          return (
            <article key={c.id} className="hairline-t py-12 grid md:grid-cols-12 gap-8 md:gap-10 fade-in">
              <div className="md:col-span-4">
                <div className="flex items-baseline justify-between">
                  <div className="font-serif text-3xl italic terra-text">{String(i + 1).padStart(2, '0')}</div>
                  <div className="label-tag lagoon-text">Colateral</div>
                </div>
                <h3 className="font-serif text-3xl tracking-tightest mt-4 ink-text leading-[0.95]">{c.name}</h3>
                <div className="text-[13px] mt-2 ink-text italic">{c.org}</div>
                <dl className="mt-6 hairline pt-5 space-y-3 text-[13px]">
                  <div>
                    <dt className="label-tag muted-text">Endereço</dt>
                    <dd className="ink-text mt-0.5 leading-snug">{c.address}</dd>
                  </div>
                  {c.dates && (
                    <div>
                      <dt className="label-tag muted-text">Período</dt>
                      <dd className="terra-text mt-0.5">{c.dates}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="label-tag muted-text">Localização</dt>
                    <dd className="ink-text mt-0.5 italic">{appData.zoneNames[c.zone]}</dd>
                  </div>
                </dl>
                <button onClick={() => onSelect(c.id)} className="mt-6 text-[12px] uppercase tracking-widest terra-text hover:underline">
                  Ver detalhes →
                </button>
              </div>
              <div className="md:col-span-8">
                {bios.length > 0 && (
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
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
