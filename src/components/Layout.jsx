import { ZONE_LIST } from '../data/zones.js';

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

/* O controle que faz o guia inteiro se orientar a partir de você. Escolhido
   uma vez, ele anota todos os locais do site com o tempo até lá. */
export function AnchorPicker({ anchor, setAnchor, zoneNames, id = 'anchor', block = false }) {
  return (
    <div className={'flex items-center gap-2.5 ' + (block ? 'w-full' : '')}>
      <label htmlFor={id} className="u-eyebrow whitespace-nowrap">
        Você está em
      </label>
      <select
        id={id}
        className={'field text-[12px] py-1.5 ' + (block ? 'flex-1 min-w-0' : '')}
        value={anchor}
        onChange={(e) => setAnchor(e.target.value)}
      >
        {ZONE_LIST.map((z) => (
          <option key={z} value={z}>
            {zoneNames[z]}
          </option>
        ))}
      </select>
    </div>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <div className="seg" role="group" aria-label="Tema visual">
      <button type="button" aria-pressed={theme === 'notturno'} onClick={() => setTheme('notturno')}>
        Notturno
      </button>
      <button type="button" aria-pressed={theme === 'pietra'} onClick={() => setTheme('pietra')}>
        Pietra
      </button>
    </div>
  );
}

export function Header({ view, setView, theme, setTheme, anchor, setAnchor, zoneNames }) {
  return (
    <header
      className="sticky top-0 z-30"
      style={{
        background: 'color-mix(in srgb, var(--ground) 90%, transparent)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--rule-soft)',
      }}
    >
      {/* Faixa de serviço: a temporada e o ponto de partida do visitante. */}
      <div className="rule-b">
        <div className="px-5 md:px-10 lg:px-14 max-w-shell mx-auto flex items-center justify-between gap-4 py-2">
          <div className="u-eyebrow whitespace-nowrap">
            9 mai → 22 nov<span className="hidden sm:inline"> 2026 · Venezia</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <AnchorPicker anchor={anchor} setAnchor={setAnchor} zoneNames={zoneNames} />
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <div className="md:hidden">
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </div>
      </div>

      <div className="px-5 md:px-10 lg:px-14 max-w-shell mx-auto">
        <div className="flex items-center gap-8 py-3">
          <a
            href="#/home"
            onClick={(e) => {
              e.preventDefault();
              setView('home');
            }}
            className="flex items-baseline gap-3 no-underline shrink-0"
          >
            <span className="u-mono text-[11px] t-key tracking-widest">LXI</span>
            <span className="u-display u-wonk text-[21px] t-1 italic leading-none">In Minor Keys</span>
          </a>

          <nav className="hidden lg:flex items-center gap-6 ml-auto" aria-label="Seções do guia">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setView(l.id)}
                aria-current={view === l.id ? 'page' : undefined}
                className={'nav-link ' + (view === l.id ? 'is-current' : '')}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:hidden pb-3">
          <AnchorPicker anchor={anchor} setAnchor={setAnchor} zoneNames={zoneNames} id="anchor-mobile" block />
        </div>

        <nav className="lg:hidden flex gap-5 overflow-x-auto pb-2.5 -mt-1" aria-label="Seções do guia">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setView(l.id)}
              aria-current={view === l.id ? 'page' : undefined}
              className={'nav-link whitespace-nowrap ' + (view === l.id ? 'is-current' : '')}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer({ setView }) {
  return (
    <footer className="px-5 md:px-10 lg:px-14 max-w-shell mx-auto">
      <div className="rule-strong-t pt-12 pb-16 grid md:grid-cols-12 gap-x-10 gap-y-10">
        <div className="md:col-span-5">
          <div className="u-display u-wonk italic text-4xl t-1">In Minor Keys</div>
          <div className="u-mono text-[11px] t-3 mt-3">LXI · Esposizione Internazionale d&apos;Arte · MMXXVI</div>
          <p className="u-prose text-[15px] mt-5 max-w-md">
            Guia não-oficial. Confirme horários e ingressos em{' '}
            <a
              href="https://www.labiennale.org"
              target="_blank"
              rel="noreferrer"
              className="t-key underline underline-offset-4"
            >
              labiennale.org
            </a>
            . Os tempos de deslocamento são estimativas pela rota mais rápida — caminhada ou vaporetto ACTV.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="u-eyebrow">Curadoria</div>
          <div className="u-display italic text-2xl t-1 mt-2">Koyo Kouoh</div>
          <p className="u-prose text-[14px] mt-2">
            1967–2025. A exposição foi realizada pela equipe que ela formou: Gabe Beckhurst Feijoo, Marie Hélène Pereira e
            Rasha Salti.
          </p>
        </div>

        <div className="md:col-span-4">
          <div className="u-eyebrow">Índice</div>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
            {LINKS.filter((l) => l.id !== 'home').map((l) => (
              <li key={l.id}>
                <button type="button" onClick={() => setView(l.id)} className="btn-inline btn-inline-quiet">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
