const LINKS = [
  { id: 'home', label: 'Introdução' },
  { id: 'giardini', label: 'Giardini' },
  { id: 'arsenale', label: 'Arsenale' },
  { id: 'city', label: 'Cidade' },
  { id: 'collateral', label: 'Colaterais' },
  { id: 'parallel', label: 'Museus' },
  { id: 'artists', label: 'Artistas' },
  { id: 'map', label: 'Mapa' },
  { id: 'itineraries', label: 'Roteiros' },
];

function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="theme-toggle">
      <button onClick={() => setTheme('dark')} className={theme === 'dark' ? 'is-active' : ''} title="Dark institucional">
        <span className="swatch" style={{ background: '#14110E', border: '1px solid #C5A35E' }} />
        Dark
      </button>
      <button onClick={() => setTheme('light')} className={theme === 'light' ? 'is-active' : ''} title="Papel branco — Biennale × MoMA">
        <span className="swatch" style={{ background: '#FFFFFF', border: '1px solid #E1251B' }} />
        Light
      </button>
    </div>
  );
}

export function Header({ view, setView, theme, setTheme }) {
  return (
    <header className="sticky top-0 z-30" style={{ background: 'color-mix(in srgb, var(--paper) 92%, transparent)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--line)' }}>
      <div className="px-6 md:px-10 lg:px-16 max-w-[1480px] mx-auto">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-terra px-2 py-1 text-[12px] font-bold tracking-widest tnum" style={{ color: 'var(--paper)' }}>
              LXI
            </div>
            <div className="leading-tight" style={{ borderLeft: '1px solid var(--line)', paddingLeft: '16px' }}>
              <div className="label-tag">Biennale Arte · 2026</div>
              <div className="font-serif italic text-xl ink-text leading-tight mt-1">In Minor Keys</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {LINKS.map((l) => (
              <button key={l.id} onClick={() => setView(l.id)} className={'nav-link ' + (view === l.id ? 'active' : '')}>
                {l.label}
              </button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-5">
            <div className="label-tag">09 mai → 22 nov</div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <div className="lg:hidden">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
        <nav className="md:hidden flex gap-5 overflow-x-auto pb-3 -mt-2">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => setView(l.id)} className={'nav-link whitespace-nowrap ' + (view === l.id ? 'active' : '')}>
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
    <footer className="mt-32 px-6 md:px-10 lg:px-16 max-w-[1480px] mx-auto" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="py-14 grid md:grid-cols-12 gap-10 text-[13px]">
        <div className="md:col-span-5">
          <div className="font-serif italic text-3xl ink-text">In Minor Keys</div>
          <div className="label-tag mt-3">LXI · 2026</div>
          <div className="muted-text mt-5 max-w-md leading-relaxed">
            Guia não-oficial da 61ª Esposizione Internazionale d&apos;Arte. Dados oficiais em{' '}
            <span className="ink-text underline underline-offset-4">labiennale.org</span>. Tempos de deslocamento são
            estimativas baseadas em vaporetto ACTV.
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="label-tag">Edição</div>
          <div className="font-serif italic text-xl ink-text mt-2">Sessantunesima</div>
          <div className="muted-text mt-1">Veneza · Itália</div>
        </div>
        <div className="md:col-span-4 md:text-right">
          <div className="label-tag">Curadoria</div>
          <div className="font-serif italic text-xl ink-text mt-2">Koyo Kouoh</div>
          <div className="muted-text mt-1">em memória — exposição realizada pela equipe que ela formou</div>
        </div>
      </div>
    </footer>
  );
}
