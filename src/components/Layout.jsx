const LINKS = [
  { id: 'home', label: 'Introdução' },
  { id: 'giardini', label: 'Giardini' },
  { id: 'arsenale', label: 'Arsenale' },
  { id: 'city', label: 'Pavilhões na cidade' },
  { id: 'collateral', label: 'Colaterais' },
  { id: 'parallel', label: 'Museus' },
  { id: 'artists', label: 'Índice de Artistas' },
  { id: 'map', label: 'Mapa' },
  { id: 'itineraries', label: 'Roteiros' },
];

export function Header({ view, setView }) {
  return (
    <header className="sticky top-0 z-30" style={{ background: 'rgba(242,236,223,0.92)', backdropFilter: 'blur(6px)' }}>
      <div className="px-6 md:px-10 lg:px-16 max-w-[1480px] mx-auto">
        <div className="flex items-center justify-between py-3 hairline">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M3 20 Q 8 14 12 18 Q 16 22 21 16" stroke="#A03E2E" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="6" r="2.5" fill="#1A1612" />
              <line x1="12" y1="8.5" x2="12" y2="17" stroke="#1A1612" strokeWidth="1" />
            </svg>
            <div className="leading-tight">
              <div className="label-tag muted-text">Biennale Arte · 2026</div>
              <div className="font-serif text-lg leading-none ink-text">In Minor Keys</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-[13px]">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => setView(l.id)}
                className={'nav-link uppercase tracking-wider muted-text ' + (view === l.id ? 'active' : '')}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block label-tag muted-text">Veneza · 09 mai → 22 nov</div>
        </div>
        <nav className="md:hidden flex gap-4 overflow-x-auto py-2 text-[12px] uppercase tracking-wider">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => setView(l.id)}
              className={'nav-link whitespace-nowrap ' + (view === l.id ? 'active' : 'muted-text')}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="hairline-t mt-20 py-10 px-6 md:px-10 lg:px-16 max-w-[1480px] mx-auto text-[11px] muted-text">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="font-serif italic text-base ink-text">In Minor Keys · 2026</div>
          <div className="mt-2 max-w-md">
            Guia não-oficial. Dados oficiais em <span className="underline">labiennale.org</span>. Tempos de deslocamento são
            estimativas baseadas em vaporetto ACTV e tráfego de pedestre em maio.
          </div>
        </div>
        <div className="text-right">
          <div className="label-tag">Veneza · Itália</div>
          <div className="mt-1">61ª Esposizione Internazionale d&apos;Arte</div>
          <div className="mt-1 italic">— em memória de Koyo Kouoh —</div>
        </div>
      </div>
    </footer>
  );
}
