import { useMemo } from 'react';
import VeniceMap, { AREA_COLOR } from './VeniceMap.jsx';
import { TIME, MAX_MINUTES } from '../lib/travelTimes.js';
import { biosFor, mapsUrlFor } from '../lib/dataStore.js';
import { PageHead, ControlBar, Eyebrow } from './ui.jsx';

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'giardini', label: 'Giardini' },
  { id: 'arsenale', label: 'Arsenale' },
  { id: 'city', label: 'Cidade' },
  { id: 'collateral', label: 'Colaterais' },
  { id: 'parallel', label: 'Museus' },
];

const LEGEND = [
  ['giardini', 'Giardini'],
  ['arsenale', 'Arsenale'],
  ['city', 'Pavilhões na cidade'],
  ['collateral', 'Eventos colaterais'],
  ['parallel', 'Museus & instituições'],
];

export default function MapView({
  appData,
  anchor,
  setAnchor,
  selectedId,
  setSelectedId,
  hoveredId,
  setHoveredId,
  filter,
  setFilter,
  showVaporetto,
  setShowVaporetto,
  onOpenDetail,
}) {
  const sel = selectedId ? appData.venuesById[selectedId] : null;
  const selBios = sel ? biosFor(appData, sel.id) : [];

  const distances = useMemo(() => {
    if (!sel) return [];
    return appData.allVenues
      .filter((v) => v.id !== sel.id)
      .map((v) => ({ ...v, minutes: TIME[sel.zone][v.zone] }))
      .sort((a, b) => a.minutes - b.minutes || a.name.localeCompare(b.name, 'pt-BR'));
  }, [sel, appData]);

  return (
    <>
      <PageHead
        access="Traçado esquemático · vaporetto ACTV 1 · 2 · 4.1 · 5.1"
        title="Veneza"
        italic="em pontos"
        lede="Clique em qualquer ponto para ver quanto tempo leva chegar a todos os outros — a pé ou de vaporetto, o que for mais rápido."
        facts={[
          { k: 'Locais no mapa', v: `${appData.allVenues.length}` },
          { k: 'Zonas', v: `${appData.zoneList.length}` },
          { k: 'Você está em', v: appData.zoneNames[anchor] },
        ]}
      />

      <ControlBar>
        <div className="seg" role="group" aria-label="Filtrar locais por tipo">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer u-eyebrow">
          <input
            type="checkbox"
            checked={showVaporetto}
            onChange={(e) => setShowVaporetto(e.target.checked)}
            style={{ accentColor: 'var(--verde)' }}
          />
          Linhas de vaporetto
        </label>
      </ControlBar>

      <section className="grid lg:grid-cols-12 gap-6 mt-8">
        <div className="lg:col-span-8">
          <VeniceMap
            appData={appData}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            filter={filter}
            showVaporetto={showVaporetto}
          />
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGEND.map(([area, label]) => (
              <span key={area} className="u-mono text-[10.5px] t-3 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  style={{ width: 9, height: 9, borderRadius: '50%', background: AREA_COLOR[area], display: 'inline-block' }}
                />
                {label}
              </span>
            ))}
          </div>
          <p className="u-prose text-[13px] italic mt-3">
            Mapa esquemático — as posições são aproximadas. Os tempos consideram o trajeto mais rápido entre zonas,
            caminhando ou de vaporetto.
          </p>
        </div>

        <aside className="lg:col-span-4">
          {!sel ? (
            <div className="card-flat p-7 h-full flex flex-col justify-center">
              <Eyebrow tone="key">Nenhum ponto selecionado</Eyebrow>
              <h2 className="u-display u-wonk text-[26px] t-1 mt-3">Toque em um ponto do mapa</h2>
              <p className="u-prose text-[14.5px] mt-3">
                Os tempos de deslocamento a partir dele aparecem aqui, do mais próximo ao mais distante — e você pode
                adotá-lo como ponto de partida do guia inteiro.
              </p>
            </div>
          ) : (
            <div className="card-flat p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Eyebrow tone="key">Ponto selecionado</Eyebrow>
                  <h2 className="u-display u-wonk text-[24px] t-1 mt-2 leading-tight">{sel.name}</h2>
                  {sel.title && <div className="u-display italic text-[15px] t-2 mt-1">“{sel.title}”</div>}
                </div>
                <button type="button" onClick={() => setSelectedId(null)} className="btn-inline btn-inline-quiet text-lg" aria-label="Limpar seleção">
                  ×
                </button>
              </div>

              <dl className="rule-t mt-4 pt-3 space-y-2">
                {sel.artists && (
                  <div>
                    <dt className="u-eyebrow">Artistas</dt>
                    <dd className="text-[14.5px] t-1 leading-snug">{sel.artists}</dd>
                  </div>
                )}
                {sel.address && (
                  <div>
                    <dt className="u-eyebrow">Endereço</dt>
                    <dd className="text-[14.5px] t-1 leading-snug">{sel.address}</dd>
                  </div>
                )}
                <div>
                  <dt className="u-eyebrow">Zona</dt>
                  <dd className="text-[14.5px] t-1">{appData.zoneNames[sel.zone]}</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-col gap-2">
                <a href={mapsUrlFor(sel)} target="_blank" rel="noreferrer" className="btn btn-key justify-center">
                  Abrir no Google Maps <span aria-hidden="true">↗</span>
                </a>
                <div className="flex gap-2">
                  <button type="button" onClick={() => onOpenDetail(sel.id)} className="btn flex-1 justify-center">
                    Ver detalhes
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnchor(sel.zone)}
                    className="btn btn-quiet flex-1 justify-center"
                    disabled={anchor === sel.zone}
                    style={anchor === sel.zone ? { opacity: 0.45, cursor: 'default' } : undefined}
                  >
                    {anchor === sel.zone ? 'É seu ponto' : 'Partir daqui'}
                  </button>
                </div>
              </div>

              <div className="rule-strong-t mt-6 pt-4">
                <Eyebrow>A partir deste ponto</Eyebrow>
                <ul className="mt-3 max-h-[440px] overflow-y-auto pr-2 space-y-1">
                  {distances.slice(0, 30).map((d) => (
                    <li key={d.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(d.id)}
                        className="w-full flex items-baseline justify-between gap-3 py-1 text-left group"
                      >
                        <span className="text-[14px] t-1 leading-tight truncate">{d.name}</span>
                        <span className="u-num text-[11px] t-num whitespace-nowrap">{d.minutes} min</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {selBios.length > 0 && (
                <div className="rule-strong-t mt-5 pt-4">
                  <Eyebrow tone="key">{selBios.length > 1 ? 'Artistas em exposição' : 'Artista em exposição'}</Eyebrow>
                  <div className="mt-3 space-y-4">
                    {selBios.map((b) => (
                      <div key={b.key}>
                        <div className="u-display text-[18px] t-1">{b.name}</div>
                        <div className="u-mono text-[10.5px] t-3 mt-0.5">{b.years}</div>
                        <p className="u-prose text-[13.5px] mt-1.5">{b.bio}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </section>

      {/* A matriz completa — o motor por trás de cada tique de minutos. */}
      <section className="mt-20">
        <div className="rule-strong-t pt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <Eyebrow tone="key">Zona a zona · minutos pela rota mais rápida</Eyebrow>
            <h2 className="u-display u-wonk text-[clamp(1.9rem,3.6vw,2.7rem)] t-1 mt-2">A matriz de deslocamento</h2>
          </div>
          <p className="u-prose text-[14px] max-w-sm">
            Sua linha está marcada. Quanto mais escura a célula, mais longa a travessia.
          </p>
        </div>

        <div className="overflow-x-auto mt-8">
          <table className="w-full min-w-[860px] table-fixed border-collapse u-mono text-[11.5px]">
            <caption className="sr-only">Tempo de deslocamento em minutos entre as zonas de Veneza</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-left py-2.5 pr-4 u-eyebrow font-normal rule-strong-b whitespace-nowrap"
                  style={{ width: '240px' }}
                >
                  de ↓ / para →
                </th>
                {appData.zoneList.map((z) => (
                  <th key={z} scope="col" className="py-2.5 px-2 u-eyebrow font-normal rule-strong-b text-center" title={appData.zoneNames[z]}>
                    {z}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appData.zoneList.map((a) => (
                <tr key={a} className={a === anchor ? '' : undefined} style={a === anchor ? { background: 'var(--verde-wash)' } : undefined}>
                  <th
                    scope="row"
                    className="text-left py-2 pr-4 rule-b font-normal whitespace-nowrap"
                    style={{ color: a === anchor ? 'var(--verde)' : 'var(--text-2)' }}
                  >
                    <span className="t-num mr-2">{a}</span>
                    {appData.zoneNames[a]}
                  </th>
                  {appData.zoneList.map((b) => {
                    const t = TIME[a][b];
                    const same = a === b;
                    return (
                      <td
                        key={b}
                        className="text-center py-2 px-2 rule-b tabular-nums"
                        style={{
                          background: same ? 'var(--verde)' : `color-mix(in srgb, var(--ottone) ${Math.round((t / MAX_MINUTES) * 34)}%, transparent)`,
                          color: same ? 'var(--ground)' : 'var(--text)',
                        }}
                      >
                        {same ? '·' : t}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-1.5">
          {appData.zoneList.map((z) => (
            <div key={z} className="u-mono text-[10.5px] t-3">
              <span className="t-num mr-2">{z}</span>
              {appData.zoneNames[z]}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
