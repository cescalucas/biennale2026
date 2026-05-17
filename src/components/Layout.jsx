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

export function Header({ view, setView }) {
  return (
    <header className="sticky top-0 z-30 bg-paper" style={{ borderBottom: '1px solid var(--ink)' }}>
      <div className="px-6 md:px-10 lg:px-16 max-w-[1480px] mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
            <div className="bg-ink text-paper px-2 py-1 text-[11px] font-bold tracking-widest" style={{ color: 'var(--paper)' }}>
              LXI
            </div>
            <div className="leading-tight">
              <div className="label-tag muted-text">Biennale Arte · 2026</div>
              <div className="text-lg font-bold tracking-tight ink-text leading-none mt-0.5">In Minor Keys</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {LINKS.map((l) => (
              <button key={l.id} onClick={() => setView(l.id)} className={'nav-link muted-text ' + (view === l.id ? 'active' : '')}>
                {l.label}
              </button>
            ))}
          </nav>
          <div className="hidden lg:block label-tag muted-text">09 mai → 22 nov</div>
        </div>
        <nav className="md:hidden flex gap-4 overflow-x-auto pb-3 -mt-1">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => setView(l.id)} className={'nav-link whitespace-nowrap ' + (view === l.id ? 'active' : 'muted-text')}>
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
    <footer className="mt-24 px-6 md:px-10 lg:px-16 max-w-[1480px] mx-auto" style={{ borderTop: '1px solid var(--ink)' }}>
      <div className="py-10 grid md:grid-cols-12 gap-8 text-[12px]">
        <div className="md:col-span-5">
          <div className="bg-ink text-paper inline-block px-2 py-1 text-[11px] font-bold tracking-widest" style={{ color: 'var(--paper)' }}>
            LXI · 2026
          </div>
          <div className="font-bold tracking-tight text-2xl ink-text mt-3">In Minor Keys</div>
          <div className="muted-text mt-3 max-w-md leading-relaxed">
            Guia não-oficial. Dados oficiais em <span className="underline">labiennale.org</span>. Tempos de deslocamento são
            estimativas baseadas em vaporetto ACTV e tráfego de pedestre em maio.
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="label-tag muted-text">Edição</div>
          <div className="ink-text mt-2">61ª Esposizione Internazionale d&apos;Arte</div>
          <div className="muted-text mt-1">Veneza · Itália</div>
        </div>
        <div className="md:col-span-4 md:text-right">
          <div className="label-tag muted-text">Curadoria</div>
          <div className="ink-text mt-2">Koyo Kouoh</div>
          <div className="muted-text mt-1">— em memória, exposição realizada pela equipe que ela formou</div>
        </div>
      </div>
    </footer>
  );
}
