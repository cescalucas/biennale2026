import { useMemo, useState } from 'react';

export default function CityPavilions({ data, onSelect }) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter((d) => (d.name + (d.artists || '') + (d.title || '')).toLowerCase().includes(s));
  }, [data, q]);

  return (
    <div>
      <section className="pt-12 pb-10 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">III · PAVILHÕES NA CIDADE</div>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tightest mt-4 ink-text leading-[0.9]">
            Sem teto fixo
            <br />
            <em>nos Giardini</em>
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">
            {data.length} pavilhões nacionais espalhados em palácios, igrejas e instituições por toda Veneza. Incluem estreias
            absolutas — Marrocos, Moldávia, Nauru, Guiné Equatorial, Serra Leoa, Somália, El Salvador e Vietnã — e o experimental
            Pavilhão do Vaticano com Brian Eno, FKA Twigs, Patti Smith e mais 21 artistas.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right text-[13px]">
          <div className="label-tag muted-text">Pavilhões</div>
          <div className="ink-text mt-1">{data.length} países</div>
          <div className="label-tag muted-text mt-4">Estreias absolutas</div>
          <div className="ink-text mt-1">8 países</div>
          <div className="label-tag muted-text mt-4">Quando</div>
          <div className="ink-text mt-1">9 maio → 22 novembro 2026</div>
        </div>
      </section>

      <section className="py-5 flex flex-wrap items-center justify-between gap-4 hairline">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar país, artista ou exposição…"
          className="bg-paper border border-line px-4 py-2 text-[13px] focus:outline-none focus:border-ink w-full md:w-96"
        />
        <div className="label-tag muted-text">{filtered.length} resultado(s)</div>
      </section>

      <section className="pt-10 grid md:grid-cols-2 gap-px bg-line">
        {filtered.map((c, i) => (
          <article key={c.id} className="bg-paper p-7 card cursor-pointer flex flex-col" onClick={() => onSelect(c.id)}>
            <div className="flex items-baseline justify-between">
              <div className="label-tag muted-text">№ {String(i + 1).padStart(3, '0')}</div>
              {c.highlight && <div className="label-tag terra-text">★ Estreia / destaque</div>}
            </div>
            <h3 className="font-serif text-2xl ink-text mt-3 leading-tight">{c.name}</h3>
            {c.title && <div className="font-serif italic text-base muted-text mt-1">"{c.title}"</div>}
            <div className="mt-4 text-[13px] ink-text leading-relaxed">
              {c.artists && (
                <div>
                  <span className="label-tag muted-text mr-1">Artistas</span> {c.artists}
                </div>
              )}
              {c.curator && (
                <div className="mt-2">
                  <span className="label-tag muted-text mr-1">Curadoria</span> {c.curator}
                </div>
              )}
            </div>
            {c.note && <div className="hairline mt-4 pt-3 italic muted-text text-[12.5px] leading-relaxed">{c.note}</div>}
            <div className="mt-auto pt-4 hairline-t flex justify-between items-end text-[12px]">
              <div className="muted-text leading-snug">{c.address || ''}</div>
              <div className="terra-text whitespace-nowrap">Saber mais →</div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
