export default function Home({ data, setView }) {
  const sections = [
    {
      id: 'giardini',
      n: '01',
      t: 'Giardini',
      sub: 'Pavilhões nacionais + mostra principal "In Minor Keys" (110 artistas)',
      count: data.pavilionsGiardini.length + data.mainExhibition.length,
      pavilions: data.pavilionsGiardini.length,
      label: 'artistas',
    },
    {
      id: 'arsenale',
      n: '02',
      t: 'Arsenale',
      sub: 'Países sem pavilhão fixo + extensão da mostra principal',
      count: data.pavilionsArsenale.length,
      pavilions: data.pavilionsArsenale.length,
      label: 'pavilhões',
    },
    {
      id: 'city',
      n: '03',
      t: 'Na cidade',
      sub: 'Pavilhões nacionais em palácios (Vaticano, Portugal, Índia…)',
      count: data.pavilionsCity.length,
      pavilions: data.pavilionsCity.length,
      label: 'pavilhões',
    },
    {
      id: 'collateral',
      n: '04',
      t: 'Colaterais',
      sub: 'Mostras oficiais aprovadas pela Bienal',
      count: data.collateral.length,
      pavilions: data.collateral.length,
      label: 'mostras',
    },
    {
      id: 'parallel',
      n: '05',
      t: 'Museus & Galerias',
      sub: 'Pinault, Prada, Querini, Kapoor, Abramović, JR…',
      count: data.parallel.length,
      pavilions: data.parallel.length,
      label: 'exposições',
    },
  ];

  return (
    <div>
      <section className="pt-12 md:pt-20 pb-16 grid md:grid-cols-12 gap-8 md:gap-10 items-start">
        <div className="md:col-span-7 lg:col-span-7">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-terra text-paper inline-block px-2 py-1 text-[11px] font-bold tracking-widest" style={{ color: 'var(--paper)' }}>
              N.° LXI
            </div>
            <div className="label-tag muted-text">Esposizione Internazionale d&apos;Arte</div>
          </div>
          <h1 className="font-black tracking-tightest leading-[0.82] text-[14vw] md:text-[10vw] lg:text-[160px] ink-text uppercase">
            In Minor
            <br />
            <span className="italic" style={{ color: 'var(--terra)' }}>Keys</span>
          </h1>
          <div className="mt-10 max-w-lg text-[15px] leading-relaxed ink-text">
            <span className="drop">U</span>ma escuta atenta às frequências menores — fragilidade, melancolia, alívio, alegria
            contida, transcendência. A 61ª Bienal de Arte reúne 110 participantes em Veneza sob a curadoria de Koyo Kouoh,
            executada pela equipe que ela formou.
          </div>
          <div className="mt-10 flex flex-wrap gap-0">
            <button onClick={() => setView('artists')} className="pillbtn bg-terra text-paper px-6 py-3 text-[12px] uppercase tracking-widest" style={{ color: '#FFFFFF', borderColor: 'var(--terra)' }}>
              Índice de artistas →
            </button>
            <button onClick={() => setView('giardini')} className="pillbtn px-6 py-3 border text-[12px] uppercase tracking-widest" style={{ borderColor: 'var(--ink)', borderLeftWidth: 0 }}>
              Giardini
            </button>
            <button onClick={() => setView('map')} className="pillbtn px-6 py-3 border text-[12px] uppercase tracking-widest" style={{ borderColor: 'var(--ink)', borderLeftWidth: 0 }}>
              Mapa
            </button>
          </div>
        </div>
        <div className="md:col-span-5 lg:col-span-5">
          <div className="bg-paper-2 p-6 md:p-8" style={{ border: '1px solid var(--ink)' }}>
            <div className="flex items-center justify-between">
              <div className="label-tag">Calendário</div>
              <div className="label-tag muted-text">2026</div>
            </div>
            <div className="mt-5 text-2xl font-bold tracking-tight ink-text leading-tight">
              <div className="flex justify-between items-baseline">
                <span>Pré-abertura</span>
                <span className="text-base muted-text font-normal">6 · 7 · 8 mai</span>
              </div>
              <div className="flex justify-between items-baseline mt-2 hairline-t pt-3" style={{ borderColor: 'var(--ink)' }}>
                <span>Pública</span>
                <span className="text-base muted-text font-normal">9 mai → 22 nov</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-[12px]" style={{ borderTop: '1px solid var(--ink)', paddingTop: '20px' }}>
              <div>
                <div className="label-tag muted-text">Curadoria</div>
                <div className="ink-text mt-1 font-medium">Koyo Kouoh</div>
                <div className="muted-text mt-0.5 italic">em memória</div>
              </div>
              <div>
                <div className="label-tag muted-text">Equipe</div>
                <div className="ink-text mt-1 leading-snug">G. Beckhurst Feijoo · M.H. Pereira · R. Salti</div>
              </div>
              <div>
                <div className="label-tag muted-text">Sedes</div>
                <div className="ink-text mt-1">Giardini · Arsenale · cidade</div>
              </div>
              <div>
                <div className="label-tag muted-text">Participantes</div>
                <div className="ink-text mt-1 font-medium">110 artistas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-2">
        <div className="hairline-strong pb-4 flex items-end justify-between">
          <div className="label-tag">Os artistas em Veneza · por local</div>
          <button onClick={() => setView('artists')} className="text-[12px] uppercase tracking-widest font-medium hover:text-terra" style={{ color: 'var(--terra)' }}>
            Ver tudo →
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5">
          {sections.map((s, i) => (
            <div
              key={s.id}
              onClick={() => setView(s.id)}
              className="card cursor-pointer p-6"
              style={{
                borderRight: i < sections.length - 1 ? '1px solid var(--ink)' : 'none',
                borderBottom: '1px solid var(--ink)',
              }}
            >
              <div className="flex items-baseline justify-between">
                <div className="font-bold text-[11px] tracking-widest tnum">{s.n}</div>
                <div className="font-black text-3xl tracking-tightest tnum" style={{ color: 'var(--terra)' }}>{s.count}</div>
              </div>
              <div className="mt-4 font-bold text-xl tracking-tight ink-text">{s.t}</div>
              <div className="mt-2 text-[12.5px] muted-text leading-relaxed min-h-[3em]">{s.sub}</div>
              <div className="mt-4 flex items-end justify-between pt-3" style={{ borderTop: '1px solid var(--line)' }}>
                <div className="label-tag muted-text">{s.label}</div>
                <div className="text-base">→</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="hairline-strong pb-3 mb-8">
          <div className="label-tag">Em destaque</div>
          <div className="font-black text-4xl md:text-5xl tracking-tightest mt-2 ink-text uppercase">As mostras imperdíveis</div>
        </div>
        <div className="grid md:grid-cols-3">
          {[
            { kicker: '01 · Padiglione Centrale', t: 'Otobong Nkanga', d: 'Reveste as colunas modernistas da entrada com tijolos venezianos, vasos de barro e hotéis para abelhas.' },
            { kicker: '02 · Palazzo Manfrin', t: 'Anish Kapoor', d: '~100 modelos arquitetônicos + nova "At the Edge of the World" suspensa em escala monumental.' },
            { kicker: "03 · Gallerie dell'Accademia", t: 'Marina Abramović', d: 'Primeira mulher viva celebrada com grande mostra na Accademia. "Transforming Energy".' },
          ].map((h, i) => (
            <article key={i} className="p-6" style={{ borderRight: i < 2 ? '1px solid var(--ink)' : 'none', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
              <div className="label-tag" style={{ color: 'var(--terra)' }}>{h.kicker}</div>
              <div className="font-black text-3xl mt-3 ink-text tracking-tightest uppercase leading-[0.95]">{h.t}</div>
              <div className="text-[13.5px] muted-text mt-4 leading-relaxed">{h.d}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 py-16 text-center" style={{ borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="label-tag" style={{ color: 'var(--terra)' }}>Da apresentação curatorial</div>
          <blockquote className="font-black text-3xl md:text-5xl tracking-tightest leading-[1.05] ink-text mt-6 uppercase">
            "Em tons menores se manifestam emoções complexas — alegria, alívio, esperança e transcendência."
          </blockquote>
          <div className="label-tag muted-text mt-8">— Koyo Kouoh / In Minor Keys</div>
        </div>
      </section>
    </div>
  );
}
