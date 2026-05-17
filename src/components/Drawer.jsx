import { biosFor } from '../lib/dataStore.js';

export default function Drawer({ venueId, appData, onClose, onSeeOnMap }) {
  const v = venueId ? appData.venuesById[venueId] : null;
  const bios = v ? biosFor(appData, v.id) : [];
  const open = !!v;

  return (
    <div className={'fixed inset-0 z-40 ' + (open ? 'pointer-events-auto' : 'pointer-events-none')}>
      <div
        onClick={onClose}
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'rgba(26,22,18,0.55)', opacity: open ? 1 : 0 }}
      />
      <aside
        className="absolute right-0 top-0 bottom-0 w-full md:w-[640px] bg-paper overflow-y-auto transition-transform duration-300 shadow-2xl"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {v && (
          <div className="p-7 md:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="label-tag terra-text">
                  {v.area === 'giardini' && 'Giardini · Pavilhão Nacional'}
                  {v.area === 'arsenale' && 'Arsenale · Pavilhão Nacional'}
                  {v.area === 'city' && 'Pavilhão Nacional · na cidade'}
                  {v.area === 'collateral' && 'Evento Colateral oficial'}
                  {v.area === 'parallel' && 'Exposição paralela · Museu'}
                </div>
                <h3 className="font-serif text-4xl md:text-5xl tracking-tightest ink-text leading-[0.95] mt-3">{v.name}</h3>
                {v.title && <div className="font-serif italic text-xl muted-text mt-2">"{v.title}"</div>}
              </div>
              <button onClick={onClose} className="text-2xl muted-text hover:terra-text leading-none">×</button>
            </div>
            <div className="mt-6 hairline pt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
              {v.artists && (
                <div className="col-span-2">
                  <div className="label-tag muted-text">Artista(s)</div>
                  <div className="ink-text mt-0.5">{v.artists}</div>
                </div>
              )}
              {v.curator && (
                <div className="col-span-2">
                  <div className="label-tag muted-text">Curadoria</div>
                  <div className="ink-text mt-0.5">{v.curator}</div>
                </div>
              )}
              {v.org && (
                <div className="col-span-2">
                  <div className="label-tag muted-text">Instituição</div>
                  <div className="ink-text mt-0.5">{v.org}</div>
                </div>
              )}
              {v.address && (
                <div className="col-span-2">
                  <div className="label-tag muted-text">Endereço</div>
                  <div className="ink-text mt-0.5">{v.address}</div>
                </div>
              )}
              {v.dates && (
                <div className="col-span-2">
                  <div className="label-tag muted-text">Período</div>
                  <div className="terra-text mt-0.5">{v.dates}</div>
                </div>
              )}
              <div className="col-span-2">
                <div className="label-tag muted-text">Localização</div>
                <div className="ink-text mt-0.5 italic">{appData.zoneNames[v.zone]}</div>
              </div>
            </div>
            {v.note && (
              <div className="mt-6 border-l-2 pl-4 italic text-[14px] muted-text leading-relaxed" style={{ borderColor: 'var(--terra)' }}>
                {v.note}
              </div>
            )}
            {bios.length > 0 ? (
              <div className="mt-10">
                <div className="ornament text-2xl">❦</div>
                <div className="label-tag terra-text mt-2">{bios.length > 1 ? 'Os artistas em exposição' : 'O artista em exposição'}</div>
                <div className="mt-6 space-y-8">
                  {bios.map((b) => (
                    <article key={b.key}>
                      <div className="font-serif text-2xl ink-text leading-tight">{b.name}</div>
                      <div className="label-tag muted-text mt-1">{b.years}</div>
                      <p className="text-[14px] ink-text mt-3 leading-relaxed">{b.bio}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-10 text-[13px] muted-text italic leading-relaxed">
                Esta exposição reúne um coletivo amplo de artistas. Consulte o site oficial da Bienal para a lista completa de
                participantes.
              </div>
            )}
            <div className="mt-12 hairline-t pt-6 flex flex-wrap gap-3">
              <button onClick={() => onSeeOnMap(v.id)} className="pillbtn px-5 py-3 border border-ink text-[12px] uppercase tracking-widest">
                Ver no mapa →
              </button>
              <button onClick={onClose} className="pillbtn px-5 py-3 border border-line text-[12px] uppercase tracking-widest muted-text">
                Fechar
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
