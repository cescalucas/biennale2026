export default function Home({ data, setView }) {
  const sections = [
    {
      id: 'giardini',
      n: 'I',
      t: 'Giardini',
      sub: 'Pavilhões nacionais + mostra principal "In Minor Keys" (110 artistas)',
      count: data.pavilionsGiardini.length + data.mainExhibition.length,
      pavilions: data.pavilionsGiardini.length,
      label: 'artistas',
    },
    {
      id: 'arsenale',
      n: 'II',
      t: 'Arsenale',
      sub: 'Países sem pavilhão fixo + extensão da mostra principal',
      count: data.pavilionsArsenale.length,
      pavilions: data.pavilionsArsenale.length,
      label: 'pavilhões',
    },
    {
      id: 'city',
      n: 'III',
      t: 'Na cidade',
      sub: 'Pavilhões nacionais espalhados em palácios (Vaticano, Portugal, Índia…)',
      count: data.pavilionsCity.length,
      pavilions: data.pavilionsCity.length,
      label: 'pavilhões',
    },
    {
      id: 'collateral',
      n: 'IV',
      t: 'Colaterais',
      sub: 'Mostras oficiais aprovadas pela Bienal',
      count: data.collateral.length,
      pavilions: data.collateral.length,
      label: 'mostras',
    },
    {
      id: 'parallel',
      n: 'V',
      t: 'Museus & Galerias',
      sub: 'Pinault, Prada, Querini, Cini, Peggy Guggenheim, V-A-C, Kapoor, Abramović, JR…',
      count: data.parallel.length,
      pavilions: data.parallel.length,
      label: 'exposições',
    },
  ];

  return (
    <div>
      <section className="pt-14 md:pt-24 pb-16 grid md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-7 lg:col-span-7">
          <div className="label-tag terra-text mb-6">N.° LXI · ESPOSIZIONE INTERNAZIONALE D&apos;ARTE</div>
          <h1 className="font-serif tracking-tightest leading-[0.85] text-[14vw] md:text-[10vw] lg:text-[160px] ink-text">
            In Minor
            <br />
            <span className="italic">Keys</span>
          </h1>
          <div className="mt-8 max-w-lg text-[15px] leading-relaxed ink-text">
            <span className="drop">U</span>ma escuta atenta às frequências menores — fragilidade, melancolia, alívio, alegria
            contida, transcendência. A 61ª Bienal de Arte reúne 110 participantes em Veneza sob a curadoria de <em>Koyo Kouoh</em>,
            executada pela equipe que ela formou.
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => setView('artists')} className="pillbtn px-5 py-3 border border-ink text-[13px] uppercase tracking-widest">
              Índice de artistas
            </button>
            <button onClick={() => setView('giardini')} className="pillbtn px-5 py-3 border border-ink text-[13px] uppercase tracking-widest">
              Começar pelos Giardini
            </button>
            <button onClick={() => setView('map')} className="pillbtn px-5 py-3 border border-line text-[13px] uppercase tracking-widest muted-text">
              Mapa
            </button>
          </div>
        </div>
        <div className="md:col-span-5 lg:col-span-5">
          <div className="border border-line p-6 md:p-8 bg-paper-2/30">
            <div className="label-tag muted-text">Calendário</div>
            <div className="mt-3 font-serif text-2xl ink-text leading-tight">
              <div>Pré-abertura</div>
              <div className="italic muted-text">6 · 7 · 8 maio 2026</div>
              <div className="mt-3 hairline pt-3">Aberta ao público</div>
              <div className="italic muted-text">9 maio → 22 novembro 2026</div>
            </div>
            <div className="mt-6 hairline pt-4 grid grid-cols-2 gap-4 text-[12px]">
              <div>
                <div className="label-tag muted-text">Curadoria</div>
                <div className="mt-1 ink-text">Koyo Kouoh</div>
                <div className="muted-text italic mt-0.5">em memória</div>
              </div>
              <div>
                <div className="label-tag muted-text">Equipe</div>
                <div className="mt-1 ink-text leading-snug">G. Beckhurst Feijoo · M.H. Pereira · R. Salti</div>
              </div>
              <div>
                <div className="label-tag muted-text">Sedes</div>
                <div className="mt-1 ink-text">Giardini · Arsenale · cidade · Forte Marghera</div>
              </div>
              <div>
                <div className="label-tag muted-text">Participantes</div>
                <div className="mt-1 ink-text">110 artistas e coletivos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hairline-t pt-10">
        <div className="label-tag muted-text mb-6">Os artistas em Veneza · divididos por local de exposição</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-line">
          {sections.map((s) => (
            <div key={s.id} className="bg-paper p-8 card cursor-pointer" onClick={() => setView(s.id)}>
              <div className="font-serif text-5xl italic terra-text leading-none">{s.n}</div>
              <div className="mt-6 font-serif text-2xl ink-text">{s.t}</div>
              <div className="mt-2 text-[13px] muted-text leading-relaxed">{s.sub}</div>
              <div className="mt-6 flex items-end justify-between hairline pt-3">
                <div>
                  <div className="font-serif text-3xl italic ink-text leading-none">{s.count}</div>
                  <div className="label-tag muted-text mt-1">{s.label}</div>
                </div>
                <div className="text-lg">→</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-[12px] muted-text italic">
          Para ver todos juntos, em ordem alfabética ou agrupados por local:{' '}
          <button onClick={() => setView('artists')} className="underline ink-text hover:terra-text">
            → Índice de Artistas
          </button>
        </div>
      </section>

      <section className="mt-16">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <div className="label-tag muted-text">Em destaque</div>
            <div className="font-serif text-3xl mt-2 ink-text leading-tight">
              As mostras
              <br />
              <em>imperdíveis</em>
            </div>
          </div>
          <div className="md:col-span-9 grid md:grid-cols-3 gap-6">
            {[
              { kicker: 'Padiglione Centrale', t: 'Otobong Nkanga', d: 'Reveste as colunas modernistas da entrada com tijolos venezianos, vasos de barro e hotéis para abelhas.' },
              { kicker: 'Palazzo Manfrin', t: 'Anish Kapoor', d: '~100 modelos arquitetônicos + nova "At the Edge of the World" suspensa.' },
              { kicker: 'Gallerie dell\'Accademia', t: 'Marina Abramović', d: 'Primeira mulher viva celebrada com grande mostra na Accademia.' },
            ].map((h, i) => (
              <article key={i} className="border-l border-line pl-5">
                <div className="label-tag terra-text">{h.kicker}</div>
                <div className="font-serif text-2xl mt-2 ink-text">{h.t}</div>
                <div className="text-[13px] muted-text mt-3 leading-relaxed">{h.d}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-20 py-16 hairline-t hairline">
        <div className="max-w-3xl mx-auto text-center">
          <div className="ornament text-4xl">❦</div>
          <blockquote className="font-serif italic text-3xl md:text-4xl leading-snug ink-text mt-6">
            "Em tons menores se manifestam emoções complexas — não só estranheza e tristeza, mas também alegria, alívio,
            esperança e transcendência."
          </blockquote>
          <div className="label-tag muted-text mt-6">— da apresentação curatorial</div>
        </div>
      </section>
    </div>
  );
}
