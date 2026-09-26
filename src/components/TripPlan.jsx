import { useMemo } from 'react';
import { usePersistentState } from '../lib/usePersistentState.js';
import { TRIP, biennaleHoursOn } from '../data/tripPlan.js';
import { mapsUrlFor, isOpenOnWeekday, venueStatus, formatShortDate, WEEKDAYS_PT } from '../lib/dataStore.js';
import { TicketLink } from './VisitInfo.jsx';

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const fmt = (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Domingos possíveis de chegada: do próximo domingo até o último que ainda pega a Bienal na quinta.
function sundayOptions() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const first = addDays(today, (7 - today.getDay()) % 7);
  const last = new Date('2026-11-22T00:00:00');
  const out = [];
  for (let d = first; addDays(d, 4) <= last; d = addDays(d, 7)) out.push(d);
  if (out.length === 0) out.push(first);
  return out;
}

function Step({ step, venue, date, onSelect, muted = false }) {
  const st = venue ? venueStatus(venue, date) : null;
  const ended = st === 'encerrada';
  const closedThatDay = venue && !isOpenOnWeekday(venue, date.getDay());
  const isBiennale = venue && (venue.area === 'giardini' || venue.area === 'arsenale');
  const vi = venue?.visit;
  return (
    <li className={'grid grid-cols-12 gap-4 items-start ' + (ended ? 'opacity-60' : '')}>
      <div className="col-span-3 md:col-span-2 text-right">
        <div className="label-tag mt-1 terra-text">{step.time || (muted ? 'opcional' : '')}</div>
      </div>
      <div className="col-span-9 md:col-span-10 pb-6" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {venue ? (
            <button onClick={() => onSelect(venue.id)} className={'text-left font-serif italic ink-text leading-tight hover:terra-text ' + (muted ? 'text-xl' : 'text-2xl')} style={{ textDecoration: ended ? 'line-through' : 'none' }}>
              {step.title}
            </button>
          ) : (
            <div className={'font-serif italic ink-text leading-tight ' + (muted ? 'text-xl' : 'text-2xl')}>{step.title}</div>
          )}
          {ended && (
            <span className="label-tag" style={{ color: 'var(--paper)', background: 'var(--muted)', padding: '3px 6px' }}>
              encerrada em {formatShortDate(venue.visit.ends)} · troque por uma opcional
            </span>
          )}
          {!ended && closedThatDay && (
            <span className="label-tag" style={{ color: 'var(--terra)', border: '1px solid var(--terra)', padding: '3px 6px' }}>
              atenção: fecha na {WEEKDAYS_PT[date.getDay()]}
            </span>
          )}
          {!ended && st === 'ultimos-dias' && <span className="label-tag terra-text">até {formatShortDate(venue.visit.ends)}</span>}
        </div>
        <div className="text-[13.5px] muted-text mt-1.5 leading-relaxed">{step.detail}</div>
        {venue && (
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] muted-text items-baseline">
            {venue.address && <span className="ink-text">{venue.address}</span>}
            {isBiennale ? (
              <span>Ingresso da Bienal · {biennaleHoursOn(date)}</span>
            ) : (
              <>
                {vi?.hours && <span>{vi.hours}</span>}
                {vi?.closed && <span>· {vi.closed}</span>}
                {vi?.price && <span className={vi.free ? 'terra-text' : 'ink-text'}>· {vi.price}</span>}
              </>
            )}
            <a href={mapsUrlFor(venue)} target="_blank" rel="noreferrer" className="uppercase tracking-widest hover:text-ink hover:underline">
              ↗ Maps
            </a>
            {!isBiennale && <TicketLink visit={vi} className="text-[11.5px]" />}
          </div>
        )}
      </div>
    </li>
  );
}

export default function TripPlan({ appData, onSelect, setView }) {
  const options = useMemo(sundayOptions, []);
  // Data de chegada e checklist ficam salvos no aparelho.
  const [arrivalIso, setArrivalIso] = usePersistentState('trip.arrival', null);
  const arrival = options.find((o) => iso(o) === arrivalIso) || options[0];
  const setArrival = (d) => setArrivalIso(iso(d));
  const [checked, setChecked] = usePersistentState('trip.checklist', {});
  const toggle = (k) => setChecked((c) => ({ ...c, [k]: !c[k] }));
  const doneCount = TRIP.checklist.filter((c) => checked[c.text]).length;
  const days = TRIP.days.map((d, i) => ({ ...d, date: addDays(arrival, i) }));
  const V = appData.venuesById;

  // Mostras do roteiro que já terão encerrado na data escolhida
  const endedInPlan = days.flatMap((d) =>
    d.steps.filter((s) => s.venueId && venueStatus(V[s.venueId], d.date) === 'encerrada').map((s) => ({ ...s, day: d })),
  );

  return (
    <div>
      <section className="pt-12 pb-10 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">10 · MINHA VIAGEM</div>
          <h2 className="font-serif italic text-5xl md:text-7xl tracking-tightest mt-5 ink-text leading-[0.95]">
            Domingo
            <br />
            <em>→ quinta, 20h</em>
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">
            {TRIP.subtitle}. A lógica é simples: segunda a Bienal fecha e os museus privados abrem; terça a maioria deles fecha e
            a Bienal abre. Então domingo é Cannaregio (ao lado da estação), segunda é Pinault, e terça, quarta e quinta são
            Bienal: Giardini, Corderie do Arsenale e os pavilhões do Arsenale. Três noites no Londra Palace, na porta de San Zaccaria, e duas no JW Marriott, na Isola delle Rose, de onde sai o táxi aquático para o aeroporto.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right text-[13px]">
          <div className="label-tag muted-text">Chegada no domingo</div>
          <select value={iso(arrival)} onChange={(e) => setArrival(options.find((o) => iso(o) === e.target.value) || options[0])} className="mt-1 border border-line px-3 py-2 text-[13px] w-full md:w-auto">
            {options.map((o) => (
              <option key={iso(o)} value={iso(o)}>
                dom {fmt(o)} → qui {fmt(addDays(o, 4))}
              </option>
            ))}
          </select>
          <div className="label-tag muted-text mt-4">Bienal nesses dias</div>
          <div className="ink-text mt-1">{biennaleHoursOn(addDays(arrival, 2))}</div>
          <div className="muted-text">fechada na segunda{iso(addDays(arrival, 1)) === '2026-11-16' ? ' (exceto 16 nov: aberta!)' : ''}</div>
          <div className="label-tag muted-text mt-4">Volta</div>
          <div className="ink-text mt-1">{TRIP.departure}</div>
        </div>
      </section>

      {endedInPlan.length > 0 && (
        <section className="mt-6 p-5 text-[13px]" style={{ border: '1px solid var(--terra)' }}>
          <div className="label-tag terra-text">Nessa data, {endedInPlan.length} parada(s) do roteiro já terão encerrado</div>
          <ul className="mt-2 space-y-1 muted-text">
            {endedInPlan.map((s) => (
              <li key={s.day.name + s.venueId}>
                <span className="ink-text">{s.day.name}</span> · {s.title} (até {formatShortDate(V[s.venueId].visit.ends)}) → use uma das opcionais do dia.
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bilhetes e transporte */}
      <section className="pt-12">
        <div className="pt-10 mb-6" style={{ borderTop: '1px solid var(--ink-soft)' }}>
          <div className="label-tag" style={{ color: 'var(--terra)' }}>Antes de sair de casa</div>
          <div className="font-serif italic text-4xl md:text-5xl tracking-tightest ink-text mt-4 leading-[0.95]">Bilhetes, passes e a volta</div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {TRIP.hotels.map((h) => (
            <div key={h.id} className="p-6 flex flex-col" style={{ border: '1px solid var(--ink-soft)' }}>
              <div className="flex items-baseline justify-between gap-3">
                <div className="label-tag terra-text">Hotel · {h.nights}</div>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapsQuery)}`} target="_blank" rel="noreferrer" className="text-[11.5px] uppercase tracking-widest muted-text hover:text-ink hover:underline">
                  ↗ Maps
                </a>
              </div>
              <div className="font-serif italic text-2xl ink-text mt-2 leading-tight">{h.name}</div>
              <div className="text-[13px] ink-text mt-1">{h.address}</div>
              <p className="text-[13px] muted-text mt-3 leading-relaxed">{h.note}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TRIP.tickets.map((t) => (
            <div key={t.label} className="p-6" style={{ border: '1px solid var(--line)' }}>
              <div className="label-tag muted-text">{t.label}</div>
              <div className="font-serif italic text-xl ink-text mt-2 leading-tight">{t.value}</div>
              <p className="text-[13px] muted-text mt-3 leading-relaxed">{t.detail}</p>
              <a href={t.url} target="_blank" rel="noreferrer" className="inline-block mt-4 text-[12px] uppercase tracking-widest terra-text hover:underline">
                ↗ abrir
              </a>
            </div>
          ))}
        </div>
        <div className="mt-8 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="label-tag muted-text">Checklist de reservas</div>
            <div className="font-serif italic text-2xl ink-text mt-2 tnum">
              {doneCount} / {TRIP.checklist.length}
            </div>
            <div className="text-[13px] muted-text mt-2 leading-relaxed">Marque conforme for comprando; fica salvo neste aparelho. A ordem é a do roteiro.</div>
            {doneCount > 0 && (
              <button onClick={() => setChecked({})} className="mt-3 text-[11.5px] uppercase tracking-widest muted-text hover:text-ink hover:underline">
                limpar marcações
              </button>
            )}
          </div>
          <ul className="md:col-span-8 space-y-2.5 text-[13.5px]">
            {TRIP.checklist.map((c, i) => {
              const v = c.venueId ? V[c.venueId] : null;
              const url = c.url || v?.visit?.ticketUrl;
              const ended = v && venueStatus(v, addDays(arrival, 4)) === 'encerrada';
              return (
                <li key={i} className={'flex items-start gap-3 ' + (ended ? 'opacity-50 line-through' : '')}>
                  <input id={'chk-' + i} type="checkbox" className="mt-1" checked={!!checked[c.text]} onChange={() => toggle(c.text)} />
                  <label htmlFor={'chk-' + i} className={'leading-snug cursor-pointer ' + (checked[c.text] ? 'muted-text line-through' : 'ink-text')}>
                    {c.text}
                    {url && (
                      <a href={url} target="_blank" rel="noreferrer" className="ml-2 text-[11.5px] uppercase tracking-widest terra-text hover:underline whitespace-nowrap">
                        ↗ link
                      </a>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Dias */}
      {days.map((d, i) => (
        <section key={d.name} className="pt-14">
          <div className="pt-10 grid md:grid-cols-12 gap-6" style={{ borderTop: '1px solid var(--ink-soft)' }}>
            <div className="md:col-span-4">
              <div className="label-tag" style={{ color: 'var(--terra)' }}>
                Dia {i + 1} · {d.name} {fmt(d.date)}
              </div>
              <div className="font-serif italic text-4xl md:text-5xl tracking-tightest ink-text mt-4 leading-[0.95]">{d.theme}</div>
              {d.stay && (
                <div className="mt-4 text-[12.5px] flex flex-wrap items-baseline gap-x-2">
                  <span className="label-tag muted-text">Base</span>
                  <span className="ink-text">{TRIP.hotels.find((h) => h.id === d.stay)?.name}</span>
                </div>
              )}
              <p className="text-[13.5px] muted-text mt-5 leading-relaxed">{d.why}</p>
            </div>
            <div className="md:col-span-8">
              <ol className="space-y-6">
                {d.steps.map((s, j) => (
                  <Step key={j} step={s} venue={s.venueId ? V[s.venueId] : null} date={d.date} onSelect={onSelect} />
                ))}
              </ol>
              {d.optional?.length > 0 && (
                <div className="mt-8">
                  <div className="label-tag muted-text mb-4">Se sobrar tempo ou se algo estiver fechado</div>
                  <ol className="space-y-5">
                    {d.optional.map((s, j) => (
                      <Step key={j} step={s} venue={s.venueId ? V[s.venueId] : null} date={d.date} onSelect={onSelect} muted />
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      <section className="mt-16 pt-6 flex flex-wrap items-center justify-between gap-4 text-[12.5px] muted-text leading-relaxed" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="max-w-2xl">
          Horários e preços vêm da aba Ingressos (levantados em 26 set 2026) e os avisos de "fecha nesse dia" e "encerrada" são calculados
          para a data escolhida. Confirme sempre no site oficial de cada local antes de ir.
        </div>
        <div className="flex gap-0">
          <button onClick={() => setView('tickets')} className="pillbtn px-4 py-2 text-[12px] uppercase tracking-widest" style={{ border: '1px solid var(--ink)' }}>
            Ingressos & horários
          </button>
          <button onClick={() => setView('map')} className="pillbtn px-4 py-2 text-[12px] uppercase tracking-widest" style={{ border: '1px solid var(--ink)', borderLeft: 0 }}>
            Mapa
          </button>
        </div>
      </section>
    </div>
  );
}
