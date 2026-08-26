/* Mapa esquemático de Veneza. Toda cor vem de custom properties, de modo que
   o desenho acompanha os dois temas sem nenhuma cor duplicada aqui. */

const WATER = 'var(--map-water)';
const LAND = 'var(--map-land)';
const EDGE = 'var(--map-land-edge)';
const CANAL = 'var(--map-canal)';
const INK = 'var(--map-ink)';
const DIM = 'var(--map-dim)';
const KEY = 'var(--map-key)';
const MAINLAND = 'var(--map-mainland)';

const FACE = "'IBM Plex Mono', ui-monospace, monospace";
const DISPLAY = "'Fraunces Variable', Georgia, serif";

export const AREA_COLOR = {
  giardini: 'var(--pin-giardini)',
  arsenale: 'var(--pin-arsenale)',
  city: 'var(--pin-city)',
  collateral: 'var(--pin-collateral)',
  parallel: 'var(--pin-parallel)',
};

export default function VeniceMap({ appData, selectedId, setSelectedId, hoveredId, setHoveredId, filter, showVaporetto }) {
  const visible = appData.allVenues.filter((v) => filter === 'all' || v.area === filter);
  const sel = appData.venuesById[selectedId];

  return (
    <div className="map-frame" style={{ aspectRatio: '1100/720' }}>
      <svg
        viewBox="0 0 1100 720"
        className="w-full h-full"
        style={{ display: 'block', background: WATER }}
        role="img"
        aria-label="Mapa esquemático de Veneza com os locais da Bienal"
      >
        <defs>
          <pattern id="lagoon" width="26" height="26" patternUnits="userSpaceOnUse">
            <rect width="26" height="26" fill={WATER} />
            <circle cx="6" cy="6" r="0.6" fill="var(--map-water-fleck)" />
            <circle cx="19" cy="15" r="0.5" fill="var(--map-water-fleck)" />
            <circle cx="11" cy="21" r="0.4" fill="var(--map-water-fleck)" />
          </pattern>
        </defs>

        <rect width="1100" height="720" fill="url(#lagoon)" />

        {/* Terra firme */}
        <rect x="0" y="0" width="42" height="720" fill={MAINLAND} />
        <text x="8" y="362" fontSize="9" fill={DIM} fontFamily={FACE} letterSpacing="2" transform="rotate(-90 8 362)">
          MESTRE · MARGHERA
        </text>

        {/* Ponte della Libertà */}
        <line x1="42" y1="295" x2="98" y2="296" stroke={EDGE} strokeWidth="1.5" />
        <line x1="42" y1="299" x2="98" y2="300" stroke={EDGE} strokeWidth="1.5" />

        {/* Lido */}
        <path
          d="M 1070 180 Q 1080 195 1082 250 L 1085 580 Q 1083 620 1070 630 L 1062 625 Q 1065 585 1063 250 Q 1062 195 1070 180 Z"
          fill={MAINLAND}
          stroke={EDGE}
          strokeWidth="0.5"
        />
        <text x="1075" y="395" fontSize="9" fill={DIM} fontFamily={FACE} letterSpacing="2" transform="rotate(90 1075 395)">
          LIDO
        </text>
        <text x="978" y="125" fontSize="9" fill={DIM} fontFamily={FACE} letterSpacing="1.5">
          ↗ MURANO
        </text>

        {/* Ilha principal */}
        <path
          d="M 98,296 Q 150,283 230,275 Q 320,267 410,262 Q 490,261 560,268 Q 630,277 700,288 Q 770,302 830,318 Q 890,336 940,360 Q 985,382 1020,408 Q 1045,432 1048,460 Q 1042,488 1015,508 Q 985,524 950,535 Q 905,544 855,544 Q 800,542 745,545 Q 705,550 670,558 Q 645,565 620,575 Q 600,584 585,595 Q 575,605 565,615 Q 558,622 550,625 Q 510,627 460,628 Q 400,628 330,624 Q 270,617 220,602 Q 180,588 150,564 Q 120,532 102,495 Q 88,455 80,410 Q 76,365 80,330 Q 86,308 98,296 Z"
          fill={LAND}
          stroke={EDGE}
          strokeWidth="0.8"
        />

        {/* Canais internos */}
        <path d="M 280,275 Q 290,330 305,395 Q 310,425 300,455" fill="none" stroke={CANAL} strokeWidth="3" />
        <path d="M 165,400 Q 230,418 290,440" fill="none" stroke={CANAL} strokeWidth="2" />
        <path d="M 810,325 Q 815,400 818,475 Q 820,510 800,540" fill="none" stroke={CANAL} strokeWidth="2.5" />

        {/* Canal Grande */}
        <path
          d="M 108,302 Q 175,355 245,400 Q 320,438 385,470 Q 445,498 495,528 Q 545,560 580,585 Q 605,600 625,608 Q 645,612 658,612"
          fill="none"
          stroke={CANAL}
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Pontes */}
        <line x1="153" y1="338" x2="162" y2="358" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <text x="170" y="345" fontSize="8" fill={INK} fontFamily={FACE}>
          Scalzi
        </text>
        <line x1="385" y1="458" x2="397" y2="482" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <circle cx="391" cy="470" r="3" fill={KEY} stroke={INK} strokeWidth="0.8" />
        <text x="405" y="466" fontSize="9" fill={INK} fontFamily={FACE}>
          Rialto
        </text>
        <line x1="515" y1="528" x2="528" y2="551" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        <text x="535" y="540" fontSize="8" fill={INK} fontFamily={FACE}>
          Accademia
        </text>
        <line x1="115" y1="312" x2="121" y2="326" stroke={INK} strokeWidth="2" strokeLinecap="round" />

        {/* Santa Lucia */}
        <rect x="100" y="282" width="14" height="10" fill={LAND} stroke={INK} strokeWidth="0.8" />
        <text x="100" y="277" fontSize="7" fill={INK} fontFamily={FACE}>
          S. Lucia
        </text>

        {/* Piazza San Marco */}
        <rect x="582" y="568" width="34" height="20" fill={LAND} stroke={INK} strokeWidth="0.8" />
        <text x="599" y="581" fontSize="6.5" fill={INK} fontFamily={FACE} textAnchor="middle">
          PIAZZA
        </text>
        <text x="599" y="589" fontSize="6.5" fill={INK} fontFamily={FACE} textAnchor="middle">
          S. MARCO
        </text>

        {/* Arsenale */}
        <rect x="755" y="395" width="105" height="105" fill="none" stroke={KEY} strokeWidth="0.8" strokeDasharray="3 2.5" opacity="0.85" />
        <text x="807" y="455" fontSize="13" fill={KEY} fontFamily={DISPLAY} fontStyle="italic" textAnchor="middle">
          Arsenale
        </text>

        {/* Giardini */}
        <path
          d="M 890,455 Q 945,448 1010,460 Q 1030,475 1020,510 Q 980,525 925,520 Q 890,510 890,485 Q 885,468 890,455 Z"
          fill={LAND}
          stroke={KEY}
          strokeWidth="1.2"
        />
        <text x="950" y="492" fontSize="14" fill={KEY} fontFamily={DISPLAY} fontStyle="italic" textAnchor="middle">
          Giardini
        </text>

        {/* Punta della Dogana */}
        <circle cx="572" cy="618" r="2.5" fill={INK} />
        <text x="498" y="614" fontSize="8" fill={DIM} fontFamily={FACE}>
          Punta della Dogana
        </text>

        {/* Giudecca */}
        <path
          d="M 200,665 Q 260,656 350,660 Q 450,663 540,668 Q 620,672 690,684 Q 702,694 690,704 Q 600,712 460,710 Q 330,708 235,702 Q 198,690 200,665 Z"
          fill={LAND}
          stroke={EDGE}
          strokeWidth="0.8"
        />
        <text x="430" y="691" fontSize="13" fill={INK} fontFamily={DISPLAY} fontStyle="italic" textAnchor="middle">
          Giudecca
        </text>

        {/* San Giorgio Maggiore */}
        <ellipse cx="660" cy="665" rx="32" ry="13" fill={LAND} stroke={EDGE} strokeWidth="0.8" />
        <circle cx="655" cy="665" r="1.6" fill={KEY} />
        <text x="660" y="648" fontSize="8" fill={DIM} fontFamily={FACE} textAnchor="middle">
          San Giorgio Maggiore
        </text>

        {/* Linhas de vaporetto */}
        {showVaporetto && (
          <g>
            <path
              d="M 108,302 Q 175,355 245,400 Q 320,438 385,470 Q 445,498 495,528 Q 545,560 580,585 Q 605,600 625,608 Q 660,615 745,560 Q 820,540 900,520 Q 950,510 970,500"
              fill="none"
              stroke={KEY}
              strokeWidth="1.5"
              strokeDasharray="5 5"
              opacity="0.7"
            />
            <path d="M 420,645 Q 470,620 505,600 Q 460,535 455,530" fill="none" stroke={KEY} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
            <path d="M 505,600 Q 545,590 585,600 Q 620,620 660,640" fill="none" stroke={KEY} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
          </g>
        )}

        {/* Sestieri */}
        <g fill={INK} fontFamily={DISPLAY} fontSize="14" fontStyle="italic" opacity="0.75">
          <text x="280" y="216">Cannaregio</text>
          <text x="230" y="450">San Polo</text>
          <text x="105" y="382">Santa Croce</text>
          <text x="345" y="588">Dorsoduro</text>
          <text x="510" y="438">San Marco</text>
          <text x="870" y="370">Castello</text>
        </g>

        {/* Anel do ponto selecionado */}
        {sel && (
          <g>
            <circle cx={sel.x} cy={sel.y} r="20" fill="none" stroke={KEY} strokeWidth="2" />
            <circle cx={sel.x} cy={sel.y} r="56" fill="none" stroke={KEY} strokeWidth="1" opacity="0.5" />
            <circle cx={sel.x} cy={sel.y} r="112" fill="none" stroke={KEY} strokeWidth="0.7" strokeDasharray="3 5" opacity="0.32" />
            <circle cx={sel.x} cy={sel.y} r="224" fill="none" stroke={KEY} strokeWidth="0.5" strokeDasharray="2 7" opacity="0.2" />
          </g>
        )}

        {/* Paradas de vaporetto */}
        {appData.stops.map((s) => (
          <g key={s.id}>
            <rect x={s.x - 3} y={s.y - 3} width="6" height="6" fill={LAND} stroke={INK} strokeWidth="0.8" />
            <text x={s.x + 7} y={s.y + 3} fontSize="7.5" fill={INK} fontFamily={FACE}>
              {s.name}
            </text>
          </g>
        ))}

        {/* Locais */}
        {visible.map((v) => {
          const isSel = v.id === selectedId;
          const isHov = v.id === hoveredId;
          const c = AREA_COLOR[v.area] || 'var(--text-2)';
          return (
            <g
              key={v.id}
              className={'pin ' + (isSel ? 'is-on' : '')}
              onClick={() => setSelectedId(v.id)}
              onMouseEnter={() => setHoveredId(v.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={v.x} cy={v.y} r={isSel ? 7 : isHov ? 6 : 4.5} fill={c} stroke={WATER} strokeWidth="1.5" />
              {(isHov || isSel) && (
                <g style={{ pointerEvents: 'none' }}>
                  <rect x={v.x + 10} y={v.y - 22} width={Math.max(110, v.name.length * 6.2)} height="19" fill={INK} />
                  <text x={v.x + 16} y={v.y - 9} fontSize="9.5" fill={LAND} fontFamily={FACE}>
                    {v.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Rosa dos ventos */}
        <g transform="translate(1015, 65)" opacity="0.9">
          <circle r="21" fill={WATER} stroke={EDGE} strokeWidth="0.7" />
          <path d="M 0 -21 L 4 0 L 0 21 L -4 0 Z" fill={DIM} />
          <path d="M 0 -21 L 4 0 L -4 0 Z" fill={KEY} />
          <text x="0" y="-28" fontSize="9" textAnchor="middle" fill={DIM} fontFamily={FACE}>
            N
          </text>
        </g>

        {/* Escala */}
        <g transform="translate(50, 685)" fill={DIM} fontSize="8" fontFamily={FACE}>
          <line x1="0" y1="0" x2="120" y2="0" stroke={DIM} strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke={DIM} strokeWidth="1.5" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke={DIM} strokeWidth="1" />
          <line x1="120" y1="-4" x2="120" y2="4" stroke={DIM} strokeWidth="1.5" />
          <text x="0" y="15">0</text>
          <text x="52" y="15">500 m</text>
          <text x="104" y="15">1 km</text>
        </g>

      </svg>
    </div>
  );
}
