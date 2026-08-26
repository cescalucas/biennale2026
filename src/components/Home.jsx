import { useMemo, useState } from 'react';
import { minutesFrom } from '../lib/travelTimes.js';
import LivingField from './LivingField.jsx';
import { Eyebrow, Tick } from './ui.jsx';

const NEAR = 15; // minutos — o limite do “dá para encaixar agora”

const AREA_LABEL = {
  giardini: 'Giardini',
  arsenale: 'Arsenale',
  city: 'Pavilhão na cidade',
  collateral: 'Colateral',
  parallel: 'Museu',
};

/* As três leituras do mesmo conjunto. O texto muda junto com o campo, porque
   o que você está vendo muda de verdade — não é uma opção de estilo. */
const MODES = [
  {
    id: 'geo',
    label: 'Onde estão',
    read: (z) => `As posições reais dos 165 locais sobre a laguna. A leste, o caroço dos Giardini e do Arsenale; o resto se espalha pelo Canal Grande.`,
  },
  {
    id: 'raios',
    label: 'A que distância',
    read: (z) => `Anéis de minutos a partir de ${z}. Você no centro; cada anel, um intervalo real de vaporetto.`,
  },
  {
    id: 'sedi',
    label: 'Por sede',
    read: () => `Cada aglomerado é uma sede da Bienal, do tamanho do seu acervo. Museus e pavilhões na cidade somam mais que a Bienal oficial.`,
  },
];

const AREAS = [
  { id: 'giardini', name: 'Giardini', unit: 'pavilhões', gloss: 'Os 29 pavilhões permanentes de Castello e o Padiglione Centrale, onde a mostra principal começa.' },
  { id: 'arsenale', name: 'Arsenale', unit: 'pavilhões', gloss: 'O estaleiro da Sereníssima: países sem teto fixo nos Giardini e a continuação das Corderie.' },
  { id: 'city', name: 'Na cidade', unit: 'pavilhões', gloss: 'Pavilhões nacionais alojados em palácios e igrejas — inclusive oito estreias absolutas.' },
  { id: 'collateral', name: 'Colaterais', unit: 'mostras', gloss: 'Exposições com chancela oficial da Bienal, espalhadas entre fundações e conventos.' },
  { id: 'parallel', name: 'Museus', unit: 'exposições', gloss: 'Pinault, Prada, Querini, Accademia, Guggenheim — a cidade inteira responde à Bienal.' },
];

export default function Home({ data, setView, anchor, onOpenVenue }) {
  const [mode, setMode] = useState('geo');
  const leitura = MODES.find((m) => m.id === mode);

  const areas = useMemo(
    () =>
      AREAS.map((a) => {
        const venues = data.allVenues.filter((v) => v.area === a.id);
        const near = venues.filter((v) => {
          const m = minutesFrom(anchor, v.zone);
          return m !== null && m <= NEAR;
        }).length;
        return { ...a, total: venues.length, near, pct: venues.length ? Math.round((near / venues.length) * 100) : 0 };
      }),
    [data, anchor]
  );

  const withinReach = useMemo(
    () => data.allVenues.filter((v) => { const m = minutesFrom(anchor, v.zone); return m !== null && m <= NEAR; }).length,
    [data, anchor]
  );

  const nearest = useMemo(() => {
    const perZone = {};
    return data.allVenues
      .map((v) => ({ ...v, minutes: minutesFrom(anchor, v.zone) }))
      .filter((v) => v.minutes !== null)
      .sort((a, b) => a.minutes - b.minutes || a.name.localeCompare(b.name, 'pt-BR'))
      .filter((v) => {
        perZone[v.zone] = (perZone[v.zone] || 0) + 1;
        return perZone[v.zone] <= 2;
      })
      .slice(0, 6);
  }, [data, anchor]);

  return (
    <>
      {/* ── O campo vivo. Não é fundo: é o conteúdo. ─────────────────────── */}
      <section className="field-hero">
        <div className="field-canvas">
          <LivingField
            venues={data.allVenues}
            anchor={anchor}
            mode={mode}
            zoneNames={data.zoneNames}
            onPick={onOpenVenue}
          />
        </div>

        <div className="field-over">
          <div>
            <Eyebrow tone="key">61ª Esposizione Internazionale d&apos;Arte · Venezia · MMXXVI</Eyebrow>
            <h1 className="hero-mark">
              In Minor
              <br />
              <em>Keys</em>
            </h1>
            <p className="hero-lede">
              Cento e sessenta e cinco locais, duzentos e quatro artistas, uma cidade sobre a água.
              O guia inteiro se orienta a partir de onde você está.
            </p>
          </div>

          <div className="field-controls">
            <div className="seg" role="group" aria-label="Como ver os 165 locais">
              {MODES.map((m) => (
                <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
                  {m.label}
                </button>
              ))}
            </div>
            <p className="field-read" aria-live="polite">
              {leitura.read(data.zoneNames[anchor])}
            </p>
          </div>
        </div>

        <div className="field-legend" aria-hidden="true">
          {AREAS.map((a) => (
            <span key={a.id} className="field-legend-item">
              <i style={{ background: `var(--pin-${a.id})` }} />
              {a.name}
            </span>
          ))}
        </div>
      </section>

      {/* ── A Bienal em minutos ──────────────────────────────────────────── */}
      <section className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow tone="key">A partir de {data.zoneNames[anchor]}</Eyebrow>
            <h2 className="u-display u-wonk text-[clamp(2.2rem,5vw,3.6rem)] t-1 mt-3">A Bienal em minutos</h2>
          </div>
          <p className="u-prose text-[15px] max-w-sm">
            Troque o ponto de partida no cabeçalho: o campo se reorganiza e cada local passa a mostrar
            quanto tempo leva chegar até lá.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 mt-10">
          {areas.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setView(a.id)}
              className="card p-6 text-left flex flex-col -ml-px -mt-px"
            >
              <div className="flex items-baseline justify-between">
                <span className="u-display italic text-[22px] t-1">{a.name}</span>
                <span className="u-num text-[38px] leading-none" style={{ color: `var(--pin-${a.id})` }}>
                  {a.total}
                </span>
              </div>
              <div className="u-eyebrow mt-1.5">{a.unit}</div>
              <p className="u-prose text-[13.5px] mt-4 flex-1">{a.gloss}</p>
              <div className="mt-5 rule-t pt-3">
                <div className="gauge mb-2.5" aria-hidden="true">
                  <span style={{ width: `${Math.max(2, a.pct)}%`, background: `var(--pin-${a.id})` }} />
                </div>
                <div className="u-mono text-[11px] t-3">
                  <span className="t-num">{a.near}</span> num raio de {NEAR} min
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── O que dá para ver agora ──────────────────────────────────────── */}
      <section className="mt-24 grid md:grid-cols-12 gap-x-10 gap-y-8">
        <div className="md:col-span-4 min-w-0">
          <Eyebrow>Mais perto de você</Eyebrow>
          <h2 className="u-display u-wonk text-[clamp(1.9rem,3.6vw,2.7rem)] t-1 mt-3">
            Seis paradas a
            <br />
            <em className="italic">poucos minutos</em>
          </h2>
          <p className="u-prose text-[14.5px] mt-4">
            Calculado sobre a malha de vaporetto ACTV (linhas 1, 2, 4.1 e 5.1) e os trechos a pé entre
            as paradas.
          </p>
          <button type="button" onClick={() => setView('map')} className="btn-inline mt-5">
            Abrir o mapa completo <span aria-hidden="true">→</span>
          </button>
          <div className="rule-strong-t mt-8 pt-5">
            <div className="u-num text-[52px] t-num leading-none">{withinReach}</div>
            <div className="u-eyebrow mt-2">
              dos {data.allVenues.length} locais ficam a até {NEAR} min de {data.zoneNames[anchor]}
            </div>
          </div>
        </div>
        <ol className="md:col-span-8 min-w-0">
          {nearest.map((v) => (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => onOpenVenue(v.id)}
                className="card w-full text-left px-5 py-4 -mt-px flex items-baseline justify-between gap-5 min-w-0"
              >
                <span className="min-w-0">
                  <span className="block u-display text-[20px] t-1 truncate">{v.name}</span>
                  <span className="block u-mono text-[11px] t-3 mt-1 truncate">
                    {AREA_LABEL[v.area]} · {data.zoneNames[v.zone]}
                  </span>
                </span>
                <Tick anchor={anchor} zone={v.zone} />
              </button>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Em destaque ──────────────────────────────────────────────────── */}
      <section className="mt-24">
        <div className="rule-strong-t pt-8 flex items-end justify-between gap-6">
          <h2 className="u-display u-wonk text-[clamp(2.2rem,5vw,3.6rem)] t-1">As três imperdíveis</h2>
          <Eyebrow>Escolha da edição</Eyebrow>
        </div>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-10 mt-10">
          {[
            {
              where: 'Padiglione Centrale · Giardini',
              t: 'Otobong Nkanga',
              d: 'Reveste as colunas modernistas da entrada com tijolos venezianos, vasos de barro e hotéis para abelhas. A intervenção arquitetônica dá o tom de tudo que vem depois.',
            },
            {
              where: 'Palazzo Manfrin · Cannaregio',
              t: 'Anish Kapoor',
              d: 'Cerca de 100 maquetes de projetos realizados e não-realizados em meio século, ao lado de uma nova versão suspensa de “At the Edge of the World”.',
            },
            {
              where: 'Gallerie dell’Accademia · Dorsoduro',
              t: 'Marina Abramović',
              d: 'Primeira artista mulher viva com grande mostra na Accademia. “Transforming Energy” põe “Rhythm 0” e “Pietà” em diálogo direto com Ticiano.',
            },
          ].map((h) => (
            <article key={h.t}>
              <Eyebrow tone="key">{h.where}</Eyebrow>
              <h3 className="u-display italic text-[clamp(1.8rem,2.8vw,2.3rem)] t-1 mt-3">{h.t}</h3>
              <p className="u-prose text-[15px] mt-4">{h.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── A voz da curadoria ───────────────────────────────────────────── */}
      <section className="mt-24 rule-strong-t pt-12 grid md:grid-cols-12 gap-x-10 gap-y-6">
        <div className="md:col-span-3">
          <Eyebrow>Da apresentação curatorial</Eyebrow>
          <div className="u-mono text-[11px] t-3 mt-2">Koyo Kouoh, 1967–2025</div>
        </div>
        <blockquote className="md:col-span-9">
          <p className="u-display italic text-[clamp(1.7rem,3.4vw,2.6rem)] t-1 leading-[1.24]">
            “Em tons menores se manifestam emoções complexas — não só estranheza e tristeza, mas também
            alegria, alívio, esperança e transcendência.”
          </p>
        </blockquote>
      </section>
    </>
  );
}
