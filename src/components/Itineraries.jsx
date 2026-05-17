import { useState } from 'react';

export default function Itineraries({ data, setView }) {
  const [active, setActive] = useState(data[0]?.id || '1d');
  const route = data.find((r) => r.id === active) || data[0];

  return (
    <div>
      <section className="pt-12 pb-10 grid md:grid-cols-12 gap-6 hairline">
        <div className="md:col-span-8">
          <div className="label-tag terra-text">08 · ROTEIROS</div>
          <h2 className="font-serif italic text-5xl md:text-7xl tracking-tightest mt-5 ink-text leading-[0.95]">
            Como atravessar
            <br />
            <em>a Bienal</em>
          </h2>
          <p className="mt-5 max-w-xl text-[14.5px] muted-text leading-relaxed">
            Quatro roteiros calibrados conforme o tempo disponível. Cada parada já considera o deslocamento (a pé ou vaporetto) até
            a próxima.
          </p>
        </div>
        <div className="md:col-span-4 md:text-right text-[13px]">
          <div className="label-tag muted-text">Bilhete recomendado</div>
          <div className="ink-text mt-1">Vaporetto 48h · €35</div>
          <div className="muted-text">72h · €45 (€27 com Rolling Venice)</div>
        </div>
      </section>

      <section className="py-6 flex flex-wrap gap-2 hairline">
        {data.map((r) => (
          <button
            key={r.id}
            onClick={() => setActive(r.id)}
            className={'pillbtn px-4 py-2 text-[12px] uppercase tracking-widest border border-ink ' + (active === r.id ? 'active' : '')}
          >
            {r.title.split('—')[0].trim()}
          </button>
        ))}
      </section>

      <section className="mt-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-serif italic text-4xl ink-text leading-[1] tracking-tightest">{route.title}</div>
          <div className="label-tag muted-text mt-3">{route.duration}</div>
          <div className="text-[14px] muted-text mt-5 leading-relaxed">{route.blurb}</div>
          <button onClick={() => setView('map')} className="mt-6 pillbtn px-4 py-2 text-[12px] uppercase tracking-widest" style={{ border: '1px solid var(--ink)' }}>
            Ver no mapa →
          </button>
        </div>
        <div className="md:col-span-8">
          <ol className="space-y-7">
            {route.steps.map((s, i) => (
              <li key={i} className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-3 md:col-span-2 text-right">
                  <div className="font-serif italic text-3xl leading-none tnum" style={{ color: 'var(--terra)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div className="label-tag mt-3">{s.time}</div>
                </div>
                <div className="col-span-9 md:col-span-10 pb-7" style={{ borderBottom: '1px solid var(--line)' }}>
                  <div className="font-serif italic text-2xl ink-text leading-tight">{s.stop}</div>
                  <div className="text-[13.5px] muted-text mt-2 leading-relaxed">{s.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
