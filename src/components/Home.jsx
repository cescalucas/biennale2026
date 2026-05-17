export default function Home({ data, setView }) {
  const sections = [
    { id: 'giardini', n: 'I', t: 'Giardini', sub: 'Pavilhões nacionais e mostra principal "In Minor Keys"', count: data.pavilionsGiardini.length + data.mainExhibition.length, label: 'artistas' },
    { id: 'arsenale', n: 'II', t: 'Arsenale', sub: 'Países sem pavilhão fixo e a extensão da mostra principal', count: data.pavilionsArsenale.length, label: 'pavilhões' },
    { id: 'city', n: 'III', t: 'Na cidade', sub: 'Pavilhões nacionais em palácios — Vaticano, Portugal, Índia', count: data.pavilionsCity.length, label: 'pavilhões' },
    { id: 'collateral', n: 'IV', t: 'Colaterais', sub: 'Mostras oficiais aprovadas pela Bienal', count: data.collateral.length, label: 'mostras' },
    { id: 'parallel', n: 'V', t: 'Museus & galerias', sub: 'Pinault, Prada, Querini, Kapoor, Abramović, JR', count: data.parallel.length, label: 'exposições' },
  ];

  return (
    <div>
      <section className="pt-16 md:pt-28 pb-20 grid md:grid-cols-12 gap-10 md:gap-14 items-start">
        <div className="md:col-span-7">
          <div className="label-tag mb-10">N.° LXI · Esposizione Internazionale d&apos;Arte</div>
          <h1 className="font-serif tracking-tightest leading-[0.88] text-[14vw] md:text-[10vw] lg:text-[150px] ink-text">
            In Minor
            <br />
            <span className="italic" style={{ color: 'var(--terra)' }}>Keys</span>
          </h1>
          <div className="mt-12 max-w-lg text-[15px] leading-[1.75] ink-text">
            <span className="drop">U</span>ma escuta atenta às frequências menores — fragilidade, melancolia, alívio, alegria
            contida, transcendência. A 61ª Bienal de Arte reúne <em className="font-serif">110 participantes</em> em Veneza sob a
            curadoria de Koyo Kouoh, executada pela equipe que ela formou.
          </div>
          <div className="mt-12 flex flex-wrap gap-0">
            <button onClick={() => setView('artists')} className="pillbtn px-6 py-3 text-[12px] tracking-widest" style={{ border: '1px solid var(--ink-soft)' }}>
              índice de artistas →
            </button>
            <button onClick={() => setView('giardini')} className="pillbtn px-6 py-3 text-[12px] tracking-widest" style={{ border: '1px solid var(--ink-soft)', borderLeft: 0 }}>
              começar pelos giardini
            </button>
            <button onClick={() => setView('map')} className="pillbtn px-6 py-3 text-[12px] tracking-widest muted-text" style={{ border: '1px solid var(--line)', borderLeft: 0 }}>
              mapa
            </button>
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="p-7 md:p-9" style={{ border: '1px solid var(--line)' }}>
            <div className="flex items-center justify-between">
              <div className="label-tag">Calendário</div>
              <div className="label-tag">MMXXVI</div>
            </div>
            <div className="mt-6 font-serif text-2xl ink-text leading-[1.3]">
              <div className="flex justify-between items-baseline">
                <span className="italic">Pré-abertura</span>
                <span className="text-base muted-text font-sans">6 · 7 · 8 maio</span>
              </div>
              <div className="flex justify-between items-baseline mt-3 pt-3" style={{ borderTop: '1px solid var(--line)' }}>
                <span className="italic">Pública</span>
                <span className="text-base muted-text font-sans">9 maio → 22 novembro</span>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 text-[13px]" style={{ borderTop: '1px solid var(--line)', paddingTop: '24px' }}>
              <div>
                <div className="label-tag">Curadoria</div>
                <div className="font-serif italic text-lg ink-text mt-1">Koyo Kouoh</div>
                <div className="muted-text mt-0.5 text-[11px]">em memória</div>
              </div>
              <div>
                <div className="label-tag">Sedes</div>
                <div className="ink-text mt-1 leading-snug">Giardini · Arsenale · cidade · Marghera</div>
              </div>
              <div>
                <div className="label-tag">Equipe</div>
                <div className="muted-text mt-1 leading-snug">G. Beckhurst Feijoo · M.H. Pereira · R. Salti</div>
              </div>
              <div>
                <div className="label-tag">Participantes</div>
                <div className="font-serif italic text-lg ink-text mt-1">110 artistas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4">
        <div className="hairline-t pt-6 pb-2 flex items-end justify-between">
          <div>
            <div className="label-tag">Sumário</div>
            <div className="font-serif italic text-3xl ink-text mt-2">Os artistas em Veneza · por local</div>
          </div>
          <button onClick={() => setView('artists')} className="text-[12px] tracking-widest font-serif italic" style={{ color: 'var(--terra)' }}>
            Ver tudo →
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 mt-8">
          {sections.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setView(s.id)}
              className="card cursor-pointer p-7"
              style={{
                borderRight: i < sections.length - 1 ? '1px solid var(--line)' : 'none',
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div className="flex items-baseline justify-between">
                <div className="font-serif italic text-2xl" style={{ color: 'var(--terra)' }}>{s.n}</div>
                <div className="font-serif text-4xl ink-text leading-none tnum">{s.count}</div>
              </div>
              <div className="mt-8 font-serif italic text-xl ink-text">{s.t}</div>
              <div className="mt-3 text-[13px] muted-text leading-relaxed min-h-[3.5em]">{s.sub}</div>
              <div className="mt-5 flex items-end justify-between pt-3" style={{ borderTop: '1px solid var(--line)' }}>
                <div className="label-tag">{s.label}</div>
                <div className="text-sm" style={{ color: 'var(--terra)' }}>→</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="hairline-t pt-6 mb-12">
          <div className="label-tag">Em destaque</div>
          <div className="font-serif italic text-5xl md:text-6xl ink-text mt-3 tracking-tightest leading-[1]">As mostras imperdíveis</div>
        </div>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
          {[
            { kicker: 'I · Padiglione Centrale', t: 'Otobong Nkanga', d: 'Reveste as colunas modernistas da entrada com tijolos venezianos, vasos de barro e hotéis para abelhas — uma intervenção arquitetônica que ressoa por toda a mostra principal.' },
            { kicker: 'II · Palazzo Manfrin', t: 'Anish Kapoor', d: 'Cerca de 100 modelos arquitetônicos de projetos realizados e não-realizados em meio século, ao lado de uma nova versão suspensa de "At the Edge of the World".' },
            { kicker: "III · Gallerie dell'Accademia", t: 'Marina Abramović', d: 'Primeira mulher viva celebrada com grande mostra na Accademia. "Transforming Energy" inclui "Rhythm 0" e "Pietà" em diálogo direto com Ticiano.' },
          ].map((h, i) => (
            <article key={i}>
              <div className="label-tag" style={{ color: 'var(--terra)' }}>{h.kicker}</div>
              <div className="font-serif italic text-4xl mt-4 ink-text leading-[1.05]">{h.t}</div>
              <div className="text-[14px] muted-text mt-5 leading-[1.75]">{h.d}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-32 py-24 text-center" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="ornament text-3xl italic">❦</div>
          <blockquote className="font-serif italic text-3xl md:text-4xl leading-[1.3] ink-text mt-8">
            "Em tons menores se manifestam emoções complexas — não só estranheza e tristeza, mas também alegria, alívio,
            esperança e transcendência."
          </blockquote>
          <div className="label-tag mt-10">— da apresentação curatorial</div>
        </div>
      </section>
    </div>
  );
}
