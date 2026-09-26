import { ticketLabel, venueStatus, statusLabel } from '../lib/dataStore.js';

// Selo de situação: encerrada / últimos dias.
export function StatusBadge({ venue }) {
  const st = venueStatus(venue);
  const label = statusLabel(st, venue);
  if (!label) return null;
  const closed = st === 'encerrada';
  return (
    <span
      className="label-tag"
      style={{
        color: closed ? 'var(--paper)' : 'var(--terra)',
        background: closed ? 'var(--muted)' : 'transparent',
        border: closed ? '1px solid var(--muted)' : '1px solid var(--terra)',
        padding: '3px 6px',
      }}
    >
      {label}
    </span>
  );
}

// Bloco compacto de informações práticas: horário, dias, preço e link de ingresso.
// `variant`: 'rows' (dl em coluna, usado nas listas) | 'drawer' (grade 2 colunas) | 'inline'
export function VisitRows({ visit, compact = false }) {
  if (!visit) return null;
  const rows = [
    visit.hours && ['Horário', visit.hours],
    visit.closed && ['Dias', visit.closed],
    visit.price && ['Ingresso', visit.price],
  ].filter(Boolean);
  if (rows.length === 0 && !visit.booking) return null;
  return (
    <>
      {rows.map(([k, v]) => (
        <div key={k} className={compact ? '' : undefined}>
          <dt className="label-tag muted-text">{k}</dt>
          <dd className={'mt-0.5 leading-snug ' + (k === 'Ingresso' && visit.free ? 'terra-text' : 'ink-text')}>{v}</dd>
        </div>
      ))}
      {visit.booking && (
        <div>
          <dt className="label-tag muted-text">Reserva</dt>
          <dd className="ink-text mt-0.5 leading-snug italic">{visit.booking}</dd>
        </div>
      )}
    </>
  );
}

// Botão/link para compra de ingresso ou site oficial.
export function TicketLink({ visit, className = '', style = {}, strong = false }) {
  if (!visit) return null;
  const label = ticketLabel(visit);
  if (!label) return null;
  if (!visit.ticketUrl) {
    return (
      <span className={'text-[12px] uppercase tracking-widest terra-text ' + className} style={style}>
        {label}
      </span>
    );
  }
  const isBuy = visit.ticketKind === 'compra' || visit.ticketKind === 'reserva';
  const base = strong
    ? 'pillbtn px-5 py-3 text-[12px] uppercase tracking-widest font-semibold no-underline inline-flex items-center gap-2 '
    : 'text-[12px] uppercase tracking-widest hover:underline text-left inline-flex items-center gap-1 ';
  const color = strong
    ? isBuy
      ? { background: 'var(--terra)', color: '#FFFFFF', border: '1px solid var(--terra)' }
      : { border: '1px solid var(--ink)' }
    : isBuy
      ? { color: 'var(--terra)' }
      : {};
  return (
    <a href={visit.ticketUrl} target="_blank" rel="noreferrer" className={base + (isBuy || strong ? '' : 'muted-text hover:text-ink ') + className} style={{ ...color, ...style }}>
      <span aria-hidden="true">{isBuy ? '🎟' : '↗'}</span> {label}
    </a>
  );
}

// Link secundário para o site oficial quando é diferente do link de ingresso.
export function WebsiteLink({ visit, className = '' }) {
  if (!visit?.website || visit.website === visit.ticketUrl) return null;
  return (
    <a href={visit.website} target="_blank" rel="noreferrer" className={'text-[12px] uppercase tracking-widest muted-text hover:text-ink hover:underline text-left ' + className}>
      ↗ Site oficial
    </a>
  );
}

// Selo pequeno com o tipo de acesso (gratuito / pago / reserva).
export function AccessBadge({ visit }) {
  if (!visit) return null;
  let text = null;
  if (visit.free) text = 'Gratuito';
  else if (visit.ticketKind === 'reserva') text = 'Reserva';
  else if (visit.price) text = 'Pago';
  if (!text) return null;
  return (
    <span className="label-tag" style={{ color: visit.free ? 'var(--terra)' : 'var(--muted)', border: '1px solid var(--line)', padding: '3px 6px' }}>
      {text}
    </span>
  );
}
