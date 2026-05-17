import { useMemo } from 'react';
import VeniceMap from './VeniceMap.jsx';
import { TIME } from '../lib/travelTimes.js';
import { biosFor, mapsUrlFor } from '../lib/dataStore.js';

const FILTER_BUTTONS = [
  { id: 'all', label: 'Todos' },
  { id: 'giardini', label: 'Giardini' },
  { id: 'arsenale', label: 'Arsenale' },
  { id: 'city', label: 'Na cidade' },
  { id: 'collateral', label: 'Colaterais' },
  { id: 'parallel', label: 'Museus' },
];

export default function MapView({ appData, selectedId, setSelectedId, hoveredId, setHoveredId, filter, setFilter, showVaporetto, setShowVaporetto, onOpenDetail }) {
  const sel = selectedId ? appData.venuesById[selectedId] : null;
  const selBios = sel ? biosFor(appData, sel.id) : [];

  const distances = useMemo(() => {
    if (!sel) return [];
    return appData.allVenues
      .filter((v) => v.id !== sel.id)
      .map((v) => ({ ...v, minutes: TIME[sel.zone][v.zone] }))
      .sort((a, b) => a.minutes - b.minutes);
  }, [selectedId, sel, appData]);

  return (
    <div>
      <section className="pt-12 pb-8 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">07 · MAPA</div>
          <h2 className="font-black text-5xl md:text-7xl tracking-tightest mt-4 ink-text leading-[0.88] uppercase">
            Veneza
            <br />
            <em>em pontos</em>
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">
            Clique em qualquer ponto para ver quanto tempo leva chegar a todos os outros — a pé ou de vaporetto, o que for mais
            rápido.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right">
          <div className="label-tag muted-text">Legenda</div>
          <div className="mt-3 space-y-1.5 text-[12px]">
            {[
              ['#E1251B', 'Giardini'],
              ['#B81C13', 'Arsenale'],
              ['#9A9A9A', 'Pavilhões na cidade'],
              ['#6B6B6B', 'Eventos Colaterais'],
              ['#000000', 'Museus / Paralelas'],
            ].map(([c, l]) => (
              <div key={l} className="flex items-center md:justify-end gap-2">
                <span style={{ width: 10, height: 10, background: c, borderRadius: '50%', display: 'inline-block' }} /> {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 flex flex-wrap items-center justify-between gap-4 hairline">
        <div className="flex flex-wrap gap-2">
          {FILTER_BUTTONS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={'pillbtn px-3 py-1.5 text-[11.5px] uppercase tracking-widest border border-ink ' + (filter === f.id ? 'active' : '')}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[12px] cursor-pointer">
          <input type="checkbox" checked={showVaporetto} onChange={(e) => setShowVaporetto(e.target.checked)} />
          <span className="uppercase tracking-widest">Linhas de vaporetto</span>
        </label>
      </section>

      <section className="grid lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-8">
          <VeniceMap appData={appData} selectedId={selectedId} setSelectedId={setSelectedId} hoveredId={hoveredId} setHoveredId={setHoveredId} filter={filter} showVaporetto={showVaporetto} />
          <div className="text-[11px] muted-text mt-2 italic">
            Mapa esquemático. Tempos calculados pelo trajeto mais rápido (caminhada ou vaporetto ACTV linha 1, 2, 4.1, 5.1).
          </div>
        </div>
        <div className="lg:col-span-4">
          {!sel && (
            <div className="border border-line bg-paper-2/40 p-8 h-full flex flex-col justify-center">
              <div className="w-12 h-1 bg-terra mb-4"></div>
              <div className="font-black text-2xl uppercase tracking-tightest ink-text mt-4 leading-tight">Selecione um ponto no mapa</div>
              <div className="text-[13px] muted-text mt-3 leading-relaxed">
                Os tempos de deslocamento a partir do ponto escolhido aparecerão aqui, ordenados do mais próximo ao mais distante.
              </div>
            </div>
          )}
          {sel && (
            <div className="border border-line bg-paper p-6">
              <div className="label-tag terra-text">Origem selecionada</div>
              <div className="font-black text-xl uppercase tracking-tightest ink-text mt-2 leading-tight">{sel.name}</div>
              {sel.title && <div className="italic font-medium muted-text text-sm mt-1">"{sel.title}"</div>}
              <div className="hairline mt-3 pt-3 text-[12.5px] muted-text">
                {sel.artists && (
                  <div>
                    <span className="label-tag">Artista(s)</span> {sel.artists}
                  </div>
                )}
                {sel.org && (
                  <div>
                    <span className="label-tag">Instituição</span> {sel.org}
                  </div>
                )}
                {sel.address && <div className="mt-1">{sel.address}</div>}
                {sel.dates && <div className="terra-text mt-1">{sel.dates}</div>}
                <div className="mt-2 italic">{appData.zoneNames[sel.zone]}</div>
              </div>
              <div className="mt-5 hairline pt-3">
                <div className="label-tag muted-text">Distância · em minutos</div>
                <div className="mt-3 max-h-[520px] overflow-y-auto pr-2 space-y-2">
                  {distances.slice(0, 28).map((d) => (
                    <div key={d.id} className="flex items-baseline justify-between gap-3 cursor-pointer group" onClick={() => setSelectedId(d.id)}>
                      <div className="text-[13px] ink-text group-hover:terra-text leading-tight flex-1">{d.name}</div>
                      <div className="text-[13px] italic font-medium tnum muted-text whitespace-nowrap">{d.minutes === 0 ? 'mesmo local' : `${d.minutes} min`}</div>
                    </div>
                  ))}
                </div>
              </div>
              {selBios.length > 0 && (
                <div className="mt-5 hairline pt-4">
                  <div className="label-tag terra-text">{selBios.length > 1 ? 'Artistas em exposição' : 'Artista em exposição'}</div>
                  <div className="mt-3 space-y-5">
                    {selBios.map((b) => (
                      <div key={b.key}>
                        <div className="font-serif text-lg ink-text leading-tight">{b.name}</div>
                        <div className="label-tag muted-text mt-0.5">{b.years}</div>
                        <p className="text-[12.5px] muted-text mt-2 leading-relaxed">{b.bio}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <a href={mapsUrlFor(sel)} target="_blank" rel="noreferrer" className="mt-5 pillbtn bg-terra text-paper px-3 py-2 text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 no-underline" style={{ color: '#FFFFFF', border: '1px solid var(--terra)' }}>
                <span aria-hidden="true">↗</span> Abrir no Google Maps
              </a>
              <div className="mt-2 flex gap-2">
                <button onClick={() => onOpenDetail && onOpenDetail(sel.id)} className="pillbtn px-3 py-1.5 text-[11px] uppercase tracking-widest flex-1" style={{ border: '1px solid var(--ink)' }}>
                  Ver detalhes
                </button>
                <button onClick={() => setSelectedId(null)} className="pillbtn px-3 py-1.5 text-[11px] uppercase tracking-widest muted-text" style={{ border: '1px solid var(--line)' }}>
                  Limpar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <details className="mt-12">
        <summary className="hairline pb-3 mb-5 flex items-end justify-between cursor-pointer">
          <div>
            <div className="label-tag terra-text">+ Apêndice</div>
            <div className="font-black text-2xl uppercase tracking-tightest ink-text mt-1">Matriz completa de deslocamento</div>
          </div>
          <div className="label-tag muted-text">minutos · rota mais rápida</div>
        </summary>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px] border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2 px-3 hairline label-tag muted-text font-normal">de · para</th>
                {appData.zoneList.map((z) => (
                  <th key={z} className="text-center py-2 px-3 hairline label-tag muted-text font-normal">
                    {z}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appData.zoneList.map((a) => (
                <tr key={a} className="hairline">
                  <td className="py-2 px-3 ink-text">{appData.zoneNames[a]}</td>
                  {appData.zoneList.map((b) => {
                    const t = TIME[a][b];
                    const isSame = a === b;
                    const intensity = Math.min(1, t / 60);
                    return (
                      <td
                        key={b}
                        className="text-center py-2 px-3 italic font-medium tnum"
                        style={{
                          background: isSame ? 'var(--ink)' : `rgba(160,62,46,${intensity * 0.18})`,
                          color: isSame ? 'var(--paper)' : 'var(--ink)',
                        }}
                      >
                        {isSame ? '—' : t}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 text-[11px] muted-text grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1">
            {appData.zoneList.map((z) => (
              <div key={z}>
                <span className="italic font-medium tnum terra-text mr-1">{z}</span> {appData.zoneNames[z]}
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
