import { useMemo, useState } from 'react';
import { mapsUrlFor, isOpenOnWeekday, venueStatus, WEEKDAYS_PT, WEEKDAYS_SHORT_PT } from '../lib/dataStore.js';
import { TicketLink, WebsiteLink, AccessBadge, StatusBadge } from './VisitInfo.jsx';

const CATEGORIES = [
  { id: 'all', label: 'Tudo fora da Bienal' },
  { id: 'parallel', label: 'Museus & galerias' },
  { id: 'collateral', label: 'Colaterais' },
  { id: 'city', label: 'Pavilhões na cidade' },
];

const AREA_LABEL = {
  parallel: 'Museu / paralela',
  collateral: 'Evento Colateral',
  city: 'Pavilhão nacional · cidade',
};

function todayWeekday() {
  try {
    return new Date().getDay();
  } catch {
    return null;
  }
}

export default function Tickets({ appData, onSelect }) {
  const [cat, setCat] = useState('all');
  const [zone, setZone] = useState('all');
  const [freeOnly, setFreeOnly] = useState(false);
  const [weekday, setWeekday] = useState(null); // null = qualquer dia
  const [q, setQ] = useState('');
  const [onlyOpen, setOnlyOpen] = useState(true); // esconde mostras já encerradas

  const tickets = appData.tickets;

  const pool = useMemo(() => {
    const list = [...appData.parallel, ...appData.collateral, ...appData.pavilionsCity];
    const order = { parallel: 0, collateral: 1, city: 2 };
    return list.sort((a, b) => order[a.area] - order[b.area] || a.name.localeCompare(b.name, 'pt'));
  }, [appData]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return pool.filter((v) => {
      if (cat !== 'all' && v.area !== cat) return false;
      if (zone !== 'all' && v.zone !== zone) return false;
      if (freeOnly && !v.visit?.free) return false;
      if (onlyOpen && venueStatus(v) === 'encerrada') return false;
      if (weekday !== null && !isOpenOnWeekday(v, weekday)) return false;
      if (s) {
        const hay = [v.name, v.org, v.title, v.artists, v.address, appData.zoneNames[v.zone]].filter(Boolean).join(' ').toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });
  }, [pool, cat, zone, freeOnly, weekday, q, onlyOpen, appData]);

  const stats = useMemo(() => {
    const free = pool.filter((v) => v.visit?.free).length;
    const buy = pool.filter((v) => v.visit?.ticketKind === 'compra' || v.visit?.ticketKind === 'reserva').length;
    const ended = pool.filter((v) => venueStatus(v) === 'encerrada').length;
    return { total: pool.length, free, buy, ended };
  }, [pool]);

  const closedToday = useMemo(() => {
    const wd = todayWeekday();
    if (wd === null) return [];
    return pool.filter((v) => !isOpenOnWeekday(v, wd));
  }, [pool]);

  return (
    <div>
      <section className="pt-12 pb-10 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">09 · INGRESSOS & AGENDAMENTO</div>
          <h2 className="font-serif italic text-5xl md:text-7xl tracking-tightest mt-5 ink-text leading-[0.95]">
            Onde, que dia
            <br />
            <em>e como entrar</em>
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">
            Tudo o que é preciso para agendar a visita: horário de abertura, dia de fechamento, preço e o link oficial de compra ou
            reserva — para a Bienal e para cada uma das {stats.total} exposições fora dela (museus, colaterais e pavilhões na cidade).
          </p>
        </div>
        <div className="md:col-span-4 md:text-right text-[13px]">
          <div className="label-tag muted-text">Fora da Bienal</div>
          <div className="ink-text mt-1">{stats.total} atividades</div>
          <div className="label-tag muted-text mt-4">Entrada gratuita</div>
          <div className="ink-text mt-1">{stats.free} delas</div>
          <div className="label-tag muted-text mt-4">Com ingresso ou reserva online</div>
          <div className="ink-text mt-1">{stats.buy} delas</div>
          {stats.ended > 0 && (
            <>
              <div className="label-tag muted-text mt-4">Já encerradas</div>
              <div className="ink-text mt-1">{stats.ended}</div>
            </>
          )}
        </div>
      </section>

      {/* ── Bienal oficial ─────────────────────────────────────────── */}
      <section className="pt-12">
        <div className="pt-10 mb-6" style={{ borderTop: '1px solid var(--ink-soft)' }}>
          <div className="label-tag" style={{ color: 'var(--terra)' }}>№ 00 · A Bienal</div>
          <div className="font-serif italic text-5xl md:text-6xl tracking-tightest ink-text mt-4 leading-[0.95]">Giardini + Arsenale</div>
          <div className="text-[13px] muted-text mt-3">Um único ingresso dá acesso às duas sedes · shuttle entre elas incluso</div>
        </div>
        <div className="grid md:grid-cols-12 gap-10 pb-12">
          <div className="md:col-span-5">
            <dl className="space-y-4 text-[13.5px]">
              {tickets.hours.map((h) => (
                <div key={h.label}>
                  <dt className="label-tag muted-text">{h.label}</dt>
                  <dd className="ink-text mt-0.5 leading-snug">{h.value}</dd>
                </div>
              ))}
              <div>
                <dt className="label-tag muted-text">Dias</dt>
                <dd className="ink-text mt-0.5">{tickets.closed}</dd>
              </div>
              {tickets.booking && (
                <div>
                  <dt className="label-tag muted-text">Reserva</dt>
                  <dd className="ink-text mt-0.5 italic leading-snug">{tickets.booking}</dd>
                </div>
              )}
            </dl>
            <div className="mt-7 flex flex-wrap gap-0">
              <a href={tickets.ticketUrl} target="_blank" rel="noreferrer" className="pillbtn px-5 py-3 text-[12px] uppercase tracking-widest font-semibold no-underline inline-flex items-center gap-2" style={{ background: 'var(--terra)', color: '#FFFFFF', border: '1px solid var(--terra)' }}>
                <span aria-hidden="true">🎟</span> Comprar ingresso oficial
              </a>
              <a href={tickets.website} target="_blank" rel="noreferrer" className="pillbtn px-5 py-3 text-[12px] uppercase tracking-widest no-underline" style={{ border: '1px solid var(--ink)', borderLeft: 0 }}>
                labiennale.org
              </a>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="label-tag muted-text mb-3">Tabela de preços</div>
            <table className="w-full text-[13.5px]">
              <tbody>
                {tickets.prices.map((p) => (
                  <tr key={p.type} style={{ borderTop: '1px solid var(--line)' }}>
                    <td className="py-2.5 pr-4 ink-text">{p.type}</td>
                    <td className="py-2.5 text-right tnum font-medium ink-text whitespace-nowrap">{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {tickets.notes?.length > 0 && (
              <ul className="mt-5 space-y-1.5 text-[12.5px] muted-text leading-relaxed">
                {tickets.notes.map((n, i) => (
                  <li key={i} className="pl-3 border-l" style={{ borderColor: 'var(--terra)' }}>{n}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ── Filtros ───────────────────────────────────────────────── */}
      <section className="pt-10">
        <div className="pt-10 mb-2" style={{ borderTop: '1px solid var(--ink-soft)' }}>
          <div className="label-tag" style={{ color: 'var(--terra)' }}>№ 01 · Fora da Bienal</div>
          <div className="font-serif italic text-5xl md:text-6xl tracking-tightest ink-text mt-4 leading-[0.95]">Planejar cada visita</div>
          <div className="text-[13px] muted-text mt-3">
            Escolha o dia da semana para esconder o que estará fechado. Museus estatais e MUVE costumam fechar às segundas; a Pinault Collection, às terças.
          </div>
        </div>

        <div className="py-6 flex flex-wrap gap-2 hairline">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={'pillbtn px-3 py-1.5 text-[11.5px] uppercase tracking-widest border border-ink ' + (cat === c.id ? 'active' : '')}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="py-5 grid md:grid-cols-12 gap-4 items-center hairline">
          <div className="md:col-span-5 flex flex-wrap items-center gap-2">
            <span className="label-tag muted-text mr-1">Que dia?</span>
            <button onClick={() => setWeekday(null)} className={'pillbtn px-2.5 py-1 text-[11px] uppercase tracking-widest border border-line ' + (weekday === null ? 'active' : '')}>
              qualquer
            </button>
            {WEEKDAYS_SHORT_PT.map((d, i) => (
              <button key={d} onClick={() => setWeekday(i)} className={'pillbtn px-2.5 py-1 text-[11px] uppercase tracking-widest border border-line tnum ' + (weekday === i ? 'active' : '')} title={WEEKDAYS_PT[i]}>
                {d}
              </button>
            ))}
          </div>
          <div className="md:col-span-3 flex items-center gap-3">
            <select value={zone} onChange={(e) => setZone(e.target.value)} className="border border-line px-3 py-2 text-[12.5px] w-full">
              <option value="all">Toda Veneza</option>
              {appData.zoneList.map((z) => (
                <option key={z} value={z}>
                  {appData.zoneNames[z]}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="flex items-center gap-2 text-[12px] cursor-pointer">
              <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
              <span className="uppercase tracking-widest">Só gratuitas</span>
            </label>
            <label className="flex items-center gap-2 text-[12px] cursor-pointer">
              <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} />
              <span className="uppercase tracking-widest">Só em cartaz</span>
            </label>
          </div>
          <div className="md:col-span-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" className="border border-line px-3 py-2 text-[12.5px] w-full" />
          </div>
        </div>

        <div className="py-3 flex flex-wrap items-baseline justify-between gap-3">
          <div className="label-tag muted-text">
            {filtered.length} resultado(s)
            {weekday !== null && <span> · abertas na {WEEKDAYS_PT[weekday]}</span>}
          </div>
          {weekday === null && closedToday.length > 0 && (
            <button onClick={() => setWeekday(todayWeekday())} className="text-[12px] terra-text hover:underline">
              Hoje é {WEEKDAYS_PT[todayWeekday()]}: {closedToday.length} {closedToday.length === 1 ? 'fechada' : 'fechadas'} → filtrar por hoje
            </button>
          )}
        </div>

        {/* ── Lista ─────────────────────────────────────────────── */}
        <div>
          {filtered.map((v) => {
            const vi = v.visit || {};
            return (
              <article key={v.id} className="py-7 grid md:grid-cols-12 gap-5 md:gap-8 fade-in" style={{ borderTop: '1px solid var(--line)' }}>
                {/* O quê */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="label-tag">{AREA_LABEL[v.area]}</span>
                    <AccessBadge visit={vi} />
                    <StatusBadge venue={v} />
                    {v.highlight && <span className="label-tag terra-text">★</span>}
                  </div>
                  <button onClick={() => onSelect(v.id)} className="text-left mt-2 font-serif italic text-2xl ink-text leading-[1.05] tracking-tightest hover:terra-text">
                    {v.name}
                  </button>
                  {v.title && v.area === 'city' && <div className="text-[13px] muted-text mt-1 leading-snug">"{v.title}"</div>}
                  {v.org && <div className="text-[13px] muted-text mt-1 leading-snug">{v.org}</div>}
                  {v.area === 'city' && v.artists && <div className="text-[12.5px] muted-text mt-1 leading-snug line-clamp-2">{v.artists}</div>}
                </div>

                {/* Onde */}
                <div className="md:col-span-3 text-[13px]">
                  <div className="label-tag muted-text">Onde</div>
                  <div className="ink-text mt-0.5 leading-snug">{v.address || 'endereço a confirmar'}</div>
                  <div className="muted-text italic mt-0.5">{appData.zoneNames[v.zone]}</div>
                  <a href={mapsUrlFor(v)} target="_blank" rel="noreferrer" className="inline-block mt-2 text-[11.5px] uppercase tracking-widest muted-text hover:text-ink hover:underline">
                    ↗ Google Maps
                  </a>
                </div>

                {/* Quando */}
                <div className="md:col-span-3 text-[13px]">
                  <div className="label-tag muted-text">Quando</div>
                  {v.dates && <div className="terra-text mt-0.5">{v.dates}</div>}
                  {vi.hours && <div className="ink-text mt-0.5">{vi.hours}</div>}
                  {vi.closed && <div className="muted-text mt-0.5">{vi.closed}</div>}
                  {!v.dates && !vi.hours && <div className="muted-text mt-0.5 italic">durante a Bienal · confirmar no site</div>}
                </div>

                {/* Ingresso */}
                <div className="md:col-span-2 text-[13px]">
                  <div className="label-tag muted-text">Ingresso</div>
                  <div className={'mt-0.5 leading-snug ' + (vi.free ? 'terra-text' : 'ink-text')}>{vi.price || 'a confirmar'}</div>
                  {vi.booking && <div className="muted-text italic mt-1 text-[12px] leading-snug">{vi.booking}</div>}
                  <div className="mt-3 flex flex-col gap-1.5 items-start">
                    <TicketLink visit={vi} />
                    <WebsiteLink visit={vi} />
                  </div>
                </div>
              </article>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-16 text-center muted-text italic text-[14px]" style={{ borderTop: '1px solid var(--line)' }}>
              Nada aberto com esses filtros. Experimente outro dia da semana ou outra região.
            </div>
          )}
        </div>
      </section>

      <section className="mt-16 pt-6 text-[12.5px] muted-text leading-relaxed max-w-3xl" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="label-tag mb-2">Aviso</div>
        Horários, preços e links foram levantados nos sites oficiais de cada instituição{tickets.verifiedAt ? ` em ${tickets.verifiedAt}` : ''}. Eles mudam ao
        longo da temporada (horário de verão/inverno, feriados, dias de fechamento extraordinário). Confirme sempre na página
        oficial antes de sair — o botão de cada linha leva direto até ela.
      </section>
    </div>
  );
}
