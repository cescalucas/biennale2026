import { useEffect, useRef } from 'react';
import { biosFor, mapsUrlFor } from '../lib/dataStore.js';
import { Eyebrow, VenueFacts, ArtistBios } from './ui.jsx';

const AREA_LABEL = {
  giardini: 'Giardini · pavilhão nacional',
  arsenale: 'Arsenale · pavilhão nacional',
  city: 'Pavilhão nacional na cidade',
  collateral: 'Evento colateral oficial',
  parallel: 'Museu · exposição paralela',
};

export default function Drawer({ venueId, appData, anchor, onClose, onSeeOnMap }) {
  const v = venueId ? appData.venuesById[venueId] : null;
  const open = !!v;
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);

  // Esc fecha; o foco entra no painel ao abrir e volta de onde veio ao fechar.
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus();
    };
  }, [open, onClose]);

  const bios = v ? biosFor(appData, v.id) : [];

  return (
    <div className={'fixed inset-0 z-40 ' + (open ? 'pointer-events-auto' : 'pointer-events-none')} aria-hidden={!open}>
      <div
        onClick={onClose}
        className="drawer-scrim absolute inset-0"
        style={{ background: 'var(--scrim)', opacity: open ? 1 : 0 }}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={v ? v.name : 'Detalhes do local'}
        className="drawer-panel absolute right-0 top-0 bottom-0 w-full md:w-[620px] bg-ground overflow-y-auto"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          borderLeft: '1px solid var(--rule)',
          boxShadow: open ? '-24px 0 60px var(--shadow)' : 'none',
        }}
      >
        {v && (
          <div className="p-6 md:p-9">
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <Eyebrow tone="key">{AREA_LABEL[v.area]}</Eyebrow>
                <h2 className="u-display u-wonk text-[clamp(2rem,5vw,2.9rem)] t-1 mt-3">{v.name}</h2>
                {v.title && <div className="u-display italic text-[19px] t-2 mt-2">“{v.title}”</div>}
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="btn btn-quiet shrink-0 px-3 py-2"
                aria-label="Fechar detalhes"
              >
                Fechar <span aria-hidden="true">×</span>
              </button>
            </div>

            <VenueFacts venue={v} zoneNames={appData.zoneNames} anchor={anchor} />

            {v.note && (
              <p className="u-prose text-[15px] italic mt-6 pl-4" style={{ borderLeft: '2px solid var(--verde-deep)' }}>
                {v.note}
              </p>
            )}

            <div className="mt-9 rule-strong-t pt-6">
              <Eyebrow tone="key">{bios.length > 1 ? 'Os artistas em exposição' : 'O artista em exposição'}</Eyebrow>
              <div className="mt-5">
                <ArtistBios
                  bios={bios}
                  emptyNote="Esta apresentação reúne um coletivo amplo. A lista completa está no site oficial da Bienal."
                />
              </div>
            </div>

            <div className="mt-10 rule-strong-t pt-6 flex flex-wrap gap-2.5">
              <a href={mapsUrlFor(v)} target="_blank" rel="noreferrer" className="btn btn-key">
                Abrir no Google Maps <span aria-hidden="true">↗</span>
              </a>
              <button type="button" onClick={() => onSeeOnMap(v.id)} className="btn">
                Ver no mapa esquemático
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
