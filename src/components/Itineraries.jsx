import { useState } from 'react';
import { PageHead, ControlBar, Eyebrow } from './ui.jsx';

export default function Itineraries({ data, setView }) {
  const [active, setActive] = useState(data[0]?.id || '1d');
  const route = data.find((r) => r.id === active) || data[0];

  return (
    <>
      <PageHead
        access="Sequências cronometradas · deslocamento já embutido"
        title="Como atravessar"
        italic="a Bienal"
        lede="Quatro roteiros calibrados pelo tempo que você tem. Cada parada já conta o deslocamento até a seguinte."
        facts={[
          { k: 'Roteiros', v: `${data.length}` },
          { k: 'Vaporetto 48 h', v: '€ 35' },
          { k: 'Vaporetto 72 h', v: '€ 45' },
        ]}
      />

      <ControlBar>
        <div className="seg" role="group" aria-label="Escolher roteiro">
          {data.map((r) => (
            <button key={r.id} type="button" aria-pressed={active === r.id} onClick={() => setActive(r.id)}>
              {r.title.split('—')[0].trim()}
            </button>
          ))}
        </div>
        <Eyebrow>
          {route.steps.length} paradas · {route.duration}
        </Eyebrow>
      </ControlBar>

      <section className="mt-12 grid md:grid-cols-12 gap-x-10 gap-y-8">
        <div className="md:col-span-4">
          <h2 className="u-display u-wonk text-[clamp(1.9rem,3.6vw,2.6rem)] t-1">{route.title}</h2>
          <div className="u-mono text-[11px] t-3 mt-3">{route.duration}</div>
          <p className="u-prose text-[15px] mt-5">{route.blurb}</p>
          <button type="button" onClick={() => setView('map')} className="btn mt-6">
            Conferir no mapa <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* A numeração aqui é verdadeira: a ordem das paradas importa. */}
        <ol className="md:col-span-8 rule-strong-t">
          {route.steps.map((s, i) => (
            <li key={i} className="grid grid-cols-12 gap-x-5 py-6 rule-b">
              <div className="col-span-3 sm:col-span-2">
                <div className="u-num text-[26px] t-num leading-none">{String(i + 1).padStart(2, '0')}</div>
                <div className="u-mono text-[11px] t-3 mt-2">{s.time}</div>
              </div>
              <div className="col-span-9 sm:col-span-10">
                <h3 className="u-display text-[21px] t-1 leading-snug">{s.stop}</h3>
                <p className="u-prose text-[15px] mt-1.5">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
