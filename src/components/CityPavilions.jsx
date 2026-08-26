import { useMemo, useState } from 'react';
import { minutesFrom } from '../lib/travelTimes.js';
import { PageHead, ControlBar, Eyebrow, Tick } from './ui.jsx';

export default function CityPavilions({ data, appData, onSelect, anchor }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('az');

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const found = s
      ? data.filter((d) => (d.name + ' ' + (d.artists || '') + ' ' + (d.title || '')).toLowerCase().includes(s))
      : data;
    return [...found].sort((a, b) =>
      sort === 'near'
        ? (minutesFrom(anchor, a.zone) ?? 999) - (minutesFrom(anchor, b.zone) ?? 999)
        : a.name.localeCompare(b.name, 'pt-BR')
    );
  }, [data, q, sort, anchor]);

  return (
    <>
      <PageHead
        access="Espalhados por Cannaregio, Dorsoduro, San Marco e Castello"
        title="Sem teto fixo"
        italic="nos Giardini"
        lede={`${data.length} pavilhões nacionais alojados em palácios, igrejas e institutos por toda a cidade. Entre eles, oito estreias absolutas — Marrocos, Moldávia, Nauru, Guiné Equatorial, Serra Leoa, Somália, El Salvador e Vietnã — e o Pavilhão do Vaticano, com Brian Eno, FKA Twigs e Patti Smith entre 24 artistas.`}
        facts={[
          { k: 'Países', v: `${data.length}` },
          { k: 'Estreias absolutas', v: '8' },
          { k: 'Temporada', v: '9 mai → 22 nov' },
        ]}
      />

      <ControlBar>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="busca-cidade" className="sr-only">
            Buscar país, artista ou exposição
          </label>
          <input
            id="busca-cidade"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar país, artista ou exposição…"
            className="field w-full sm:w-80"
          />
          <div className="seg" role="group" aria-label="Ordenação">
            <button type="button" aria-pressed={sort === 'az'} onClick={() => setSort('az')}>
              A → Z
            </button>
            <button type="button" aria-pressed={sort === 'near'} onClick={() => setSort('near')}>
              Mais perto
            </button>
          </div>
        </div>
        <Eyebrow>
          <span aria-live="polite">{list.length} pavilhões</span>
        </Eyebrow>
      </ControlBar>

      <section className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {list.map((c) => (
          <article key={c.id}>
            <button type="button" onClick={() => onSelect(c.id)} className="card w-full h-full text-left p-6 flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <Tick anchor={anchor} zone={c.zone} />
                {c.highlight && <Eyebrow tone="key">Estreia</Eyebrow>}
              </div>
              <h3 className="u-display u-wonk text-[26px] t-1 mt-4">{c.name}</h3>
              {c.title && <div className="u-display italic text-[16px] t-2 mt-1.5 leading-snug">“{c.title}”</div>}
              <div className="mt-4 space-y-2.5 flex-1">
                {c.artists && (
                  <div>
                    <Eyebrow>Artistas</Eyebrow>
                    <div className="text-[15px] t-1 leading-snug mt-0.5">{c.artists}</div>
                  </div>
                )}
                {c.curator && (
                  <div>
                    <Eyebrow>Curadoria</Eyebrow>
                    <div className="text-[15px] t-1 leading-snug mt-0.5">{c.curator}</div>
                  </div>
                )}
              </div>
              {c.note && <p className="u-prose text-[13.5px] italic mt-4 rule-t pt-3">{c.note}</p>}
              <div className="mt-4 rule-t pt-3 flex items-baseline justify-between gap-4">
                <span className="u-mono text-[10.5px] t-3 leading-snug">{appData.zoneNames[c.zone]}</span>
                <span className="btn-inline" aria-hidden="true">
                  Ver detalhes →
                </span>
              </div>
            </button>
          </article>
        ))}
      </section>

      {list.length === 0 && (
        <p className="u-prose italic text-center py-20">Nenhum pavilhão corresponde a “{q}”.</p>
      )}
    </>
  );
}
