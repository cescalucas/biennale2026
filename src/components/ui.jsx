import { minutesFrom, MAX_MINUTES } from '../lib/travelTimes.js';

/* Peças compartilhadas entre as páginas do guia. Tudo que aparecia copiado em
   quatro componentes mora aqui. */

export function Eyebrow({ children, tone = 'quiet', className = '' }) {
  return <div className={`u-eyebrow ${tone === 'key' ? 'u-eyebrow-key' : ''} ${className}`}>{children}</div>;
}

/* A assinatura do guia: a que distância isto fica de onde você está.
   O número vem do grafo de deslocamento (vaporetto ACTV + caminhada). */
export function Tick({ anchor, zone, size = 'sm' }) {
  const m = minutesFrom(anchor, zone);
  if (m === null) return null;
  if (m === 0) return <span className={`tick tick-here ${size === 'lg' ? 'tick-lg' : ''}`}>a pé</span>;
  return (
    <span className={`tick ${size === 'lg' ? 'tick-lg' : ''}`} title="Tempo estimado a partir do ponto escolhido no cabeçalho">
      {m} min
    </span>
  );
}

/* Régua: o traço cresce com a distância. Só onde há espaço para ela respirar. */
export function Gauge({ anchor, zone }) {
  const m = minutesFrom(anchor, zone);
  if (m === null) return null;
  const pct = Math.max(3, Math.round((m / MAX_MINUTES) * 100));
  return (
    <div className="gauge mt-2" aria-hidden="true">
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

/* Cabeçalho de página. `access` traz o dado real de como se chega ali —
   linha de vaporetto, parada — em vez de um número de seção decorativo. */
export function PageHead({ access, title, italic, lede, facts = [] }) {
  return (
    <section className="pt-10 md:pt-14 pb-9 grid md:grid-cols-12 gap-x-10 gap-y-8 rule-b">
      <div className="md:col-span-7">
        <Eyebrow tone="key">{access}</Eyebrow>
        <h1 className="u-display u-wonk text-[clamp(2.6rem,6.5vw,4.6rem)] t-1 mt-5">
          {title}
          {italic && (
            <>
              <br />
              <em className="italic">{italic}</em>
            </>
          )}
        </h1>
        {lede && <p className="u-lede mt-6 max-w-measure">{lede}</p>}
      </div>
      {facts.length > 0 && (
        <div className="md:col-span-4 md:col-start-9 self-end">
          <dl className="rule-strong-t pt-5 space-y-4">
            {facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6">
                <dt className="u-eyebrow">{f.k}</dt>
                <dd className="u-mono text-[13px] t-1 text-right">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

/* Faixa de controles — busca, filtros, ordenação. */
export function ControlBar({ children }) {
  return <div className="py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rule-b">{children}</div>;
}

/* Ficha técnica de um local. */
export function VenueFacts({ venue, zoneNames, anchor }) {
  const rows = [
    venue.artists && ['Artistas', venue.artists],
    venue.curator && ['Curadoria', venue.curator],
    venue.org && ['Instituição', venue.org],
    venue.address && ['Endereço', venue.address],
    venue.dates && ['Período', venue.dates],
    ['Onde', zoneNames[venue.zone]],
  ].filter(Boolean);

  return (
    <dl className="rule-strong-t mt-6 pt-5 space-y-3.5">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt className="u-eyebrow">{k}</dt>
          <dd className={`mt-1 text-[15px] leading-snug ${k === 'Período' ? 't-key u-mono text-[13px]' : 't-1'}`}>{v}</dd>
        </div>
      ))}
      {anchor && minutesFrom(anchor, venue.zone) !== null && (
        <div className="pt-1">
          <dt className="u-eyebrow">Daqui</dt>
          <dd className="mt-1">
            <Tick anchor={anchor} zone={venue.zone} size="lg" />
            <Gauge anchor={anchor} zone={venue.zone} />
          </dd>
        </div>
      )}
    </dl>
  );
}

/* Bloco de biografias — idêntico em Giardini, Arsenale, Colaterais e Museus. */
export function ArtistBios({ bios, emptyNote }) {
  if (!bios.length) {
    return emptyNote ? (
      <p className="u-prose italic rule-box p-6 max-w-measure">{emptyNote}</p>
    ) : null;
  }
  return (
    <div className="space-y-8">
      {bios.map((b, i) => (
        <article key={b.key} className={i > 0 ? 'rule-t pt-8' : ''}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-2">
            <div className="col-span-12 md:col-span-4">
              <h4 className="u-display text-[26px] t-1">{b.name}</h4>
              <div className="u-mono text-[11px] t-3 mt-1.5">{b.years}</div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <p className="u-prose">{b.bio}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* Par de ações repetido no rodapé de cada ficha. */
export function VenueActions({ venue, mapsUrl, onDetail }) {
  return (
    <div className="mt-6 flex flex-col items-start gap-2.5">
      <button type="button" onClick={() => onDetail(venue.id)} className="btn-inline">
        Ver detalhes <span aria-hidden="true">→</span>
      </button>
      <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-inline btn-inline-quiet">
        Abrir no Google Maps <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
