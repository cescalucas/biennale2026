// Mapa esquemático de Veneza — usa CSS variables (segue o tema)
export default function VeniceMap({ appData, selectedId, setSelectedId, hoveredId, setHoveredId, filter, showVaporetto }) {
  const visible = appData.allVenues.filter((v) => filter === 'all' || v.area === filter);
  const selectedVenue = appData.venuesById[selectedId];

  // Cores temáticas — puxam direto das CSS vars do tema atual
  const BG = 'var(--map-bg)';
  const LAND = 'var(--map-land)';
  const LAND_STROKE = 'var(--map-land-stroke)';
  const TYPE_DIM = 'var(--map-text-dim)';
  const TYPE_BRIGHT = 'var(--map-text-bright)';
  const CANAL_LIGHT = 'var(--map-canal)';

  const colorFor = (area) =>
    area === 'giardini'
      ? 'var(--map-text-bright)' // accent principal
      : area === 'arsenale'
      ? 'var(--terra-deep)'
      : area === 'city'
      ? 'var(--muted)'
      : area === 'collateral'
      ? 'var(--ink-soft)'
      : area === 'parallel'
      ? 'var(--ink)'
      : 'var(--ink)';

  return (
    <div className="map-container rounded-sm overflow-hidden" style={{ aspectRatio: '1100/720', borderColor: 'var(--line)' }}>
      <svg viewBox="0 0 1100 720" className="w-full h-full" style={{ display: 'block', background: BG }}>
        <defs>
          <pattern id="water-dark" width="28" height="28" patternUnits="userSpaceOnUse">
            <rect width="28" height="28" fill={BG} />
            <circle cx="7" cy="7" r="0.6" fill="#1A1714" />
            <circle cx="21" cy="16" r="0.5" fill="#1A1714" />
            <circle cx="12" cy="22" r="0.4" fill="#1A1714" />
          </pattern>
        </defs>

        {/* Lagoa */}
        <rect width="1100" height="720" fill="url(#water-dark)" />

        {/* Continente — faixa oeste sutilíssima */}
        <rect x="0" y="0" width="42" height="720" fill="#15120F" />
        <text x="8" y="362" fontSize="9" fill={TYPE_DIM} fontFamily="'Inter', sans-serif" fontWeight="400" letterSpacing="2" fontStyle="italic" transform="rotate(-90 8 362)">Mestre · Marghera</text>

        {/* Ponte della Libertà */}
        <line x1="42" y1="295" x2="98" y2="296" stroke={LAND} strokeWidth="1.5" />
        <line x1="42" y1="299" x2="98" y2="300" stroke={LAND} strokeWidth="1.5" />

        {/* Lido — sombra muito sutil */}
        <path d="M 1070 180 Q 1080 195 1082 250 L 1085 580 Q 1083 620 1070 630 L 1062 625 Q 1065 585 1063 250 Q 1062 195 1070 180 Z" fill="#15120F" stroke="#2A2520" strokeWidth="0.5" />
        <text x="1075" y="395" fontSize="9" fill={TYPE_DIM} fontFamily="'Inter', sans-serif" fontStyle="italic" letterSpacing="2" transform="rotate(90 1075 395)">Lido</text>

        {/* Indicação de Murano */}
        <text x="985" y="125" fontSize="9" fill={TYPE_DIM} fontFamily="'Inter', sans-serif" fontStyle="italic" letterSpacing="2">↗ Murano</text>

        {/* === Ilha principal === */}
        <path
          d="M 98,296 Q 150,283 230,275 Q 320,267 410,262 Q 490,261 560,268 Q 630,277 700,288 Q 770,302 830,318 Q 890,336 940,360 Q 985,382 1020,408 Q 1045,432 1048,460 Q 1042,488 1015,508 Q 985,524 950,535 Q 905,544 855,544 Q 800,542 745,545 Q 705,550 670,558 Q 645,565 620,575 Q 600,584 585,595 Q 575,605 565,615 Q 558,622 550,625 Q 510,627 460,628 Q 400,628 330,624 Q 270,617 220,602 Q 180,588 150,564 Q 120,532 102,495 Q 88,455 80,410 Q 76,365 80,330 Q 86,308 98,296 Z"
          fill={LAND}
          stroke={LAND_STROKE}
          strokeWidth="0.8"
        />

        {/* === Canais internos === */}
        <path d="M 280,275 Q 290,330 305,395 Q 310,425 300,455" fill="none" stroke="#C8C2B3" strokeWidth="3" />
        <path d="M 165,400 Q 230,418 290,440" fill="none" stroke="#C8C2B3" strokeWidth="2" />
        <path d="M 810,325 Q 815,400 818,475 Q 820,510 800,540" fill="none" stroke="#C8C2B3" strokeWidth="2.5" />

        {/* === Grande Canal === */}
        <path
          d="M 108,302 Q 175,355 245,400 Q 320,438 385,470 Q 445,498 495,528 Q 545,560 580,585 Q 605,600 625,608 Q 645,612 658,612"
          fill="none"
          stroke="#A8A296"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M 108,302 Q 175,355 245,400 Q 320,438 385,470 Q 445,498 495,528 Q 545,560 580,585 Q 605,600 625,608 Q 645,612 658,612"
          fill="none"
          stroke="#6E6960"
          strokeWidth="1"
          strokeDasharray="2 5"
          opacity="0.6"
        />

        {/* === Pontes === */}
        <line x1="153" y1="338" x2="162" y2="358" stroke={LAND_STROKE} strokeWidth="2.5" strokeLinecap="round" />
        <text x="170" y="345" fontSize="8" fill={LAND_STROKE} fontFamily="'Inter', sans-serif" fontStyle="italic" fontWeight="500">Scalzi</text>

        <line x1="385" y1="458" x2="397" y2="482" stroke={LAND_STROKE} strokeWidth="3" strokeLinecap="round" />
        <circle cx="391" cy="470" r="3" fill={TYPE_BRIGHT} stroke={LAND_STROKE} strokeWidth="0.8" />
        <text x="405" y="466" fontSize="9" fill={LAND_STROKE} fontFamily="'Inter', sans-serif" fontStyle="italic" fontWeight="500">Rialto</text>

        <line x1="515" y1="528" x2="528" y2="551" stroke={LAND_STROKE} strokeWidth="2.5" strokeLinecap="round" />
        <text x="535" y="540" fontSize="8" fill={LAND_STROKE} fontFamily="'Inter', sans-serif" fontStyle="italic" fontWeight="500">Accademia</text>

        <line x1="115" y1="312" x2="121" y2="326" stroke={LAND_STROKE} strokeWidth="2" strokeLinecap="round" />

        {/* Estação Santa Lucia */}
        <rect x="100" y="282" width="14" height="10" fill={LAND} stroke={LAND_STROKE} strokeWidth="0.8" />
        <text x="100" y="277" fontSize="7" fill={LAND_STROKE} fontFamily="'Inter', sans-serif" fontStyle="italic" fontWeight="500">S. Lucia</text>

        {/* Piazza San Marco */}
        <rect x="582" y="568" width="34" height="20" fill={LAND} stroke={LAND_STROKE} strokeWidth="0.8" />
        <text x="599" y="580" fontSize="7" fill={LAND_STROKE} fontFamily="'Cormorant Garamond', serif" fontWeight="500" fontStyle="italic" textAnchor="middle">Piazza</text>
        <text x="599" y="587" fontSize="7" fill={LAND_STROKE} fontFamily="'Cormorant Garamond', serif" fontWeight="500" fontStyle="italic" textAnchor="middle">S. Marco</text>

        {/* Arsenale */}
        <rect x="755" y="395" width="105" height="105" fill="none" stroke={TYPE_BRIGHT} strokeWidth="0.8" strokeDasharray="3 2.5" opacity="0.85" />
        <text x="807" y="455" fontSize="11" fill={TYPE_BRIGHT} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500" letterSpacing="1" textAnchor="middle">Arsenale</text>

        {/* Giardini */}
        <path d="M 890,455 Q 945,448 1010,460 Q 1030,475 1020,510 Q 980,525 925,520 Q 890,510 890,485 Q 885,468 890,455 Z" fill={LAND} stroke={TYPE_BRIGHT} strokeWidth="1.2" />
        <text x="950" y="492" fontSize="13" fill={TYPE_BRIGHT} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500" letterSpacing="0.5" textAnchor="middle">Giardini</text>

        {/* Punta della Dogana */}
        <circle cx="572" cy="618" r="2.5" fill={LAND_STROKE} />
        <text x="500" y="615" fontSize="9" fill={TYPE_DIM} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500">Punta della Dogana</text>

        {/* Giudecca */}
        <path
          d="M 200,665 Q 260,656 350,660 Q 450,663 540,668 Q 620,672 690,684 Q 702,694 690,704 Q 600,712 460,710 Q 330,708 235,702 Q 198,690 200,665 Z"
          fill={LAND}
          stroke={LAND_STROKE}
          strokeWidth="0.8"
        />
        <text x="430" y="690" fontSize="13" fill={LAND_STROKE} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500" letterSpacing="1" textAnchor="middle">Giudecca</text>

        {/* San Giorgio */}
        <ellipse cx="660" cy="665" rx="32" ry="13" fill={LAND} stroke={LAND_STROKE} strokeWidth="0.8" />
        <circle cx="655" cy="665" r="1.6" fill={TYPE_BRIGHT} />
        <text x="660" y="649" fontSize="9" fill={TYPE_DIM} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500" textAnchor="middle">San Giorgio Maggiore</text>

        {/* Vaporetto */}
        {showVaporetto && (
          <g>
            <path
              d="M 108,302 Q 175,355 245,400 Q 320,438 385,470 Q 445,498 495,528 Q 545,560 580,585 Q 605,600 625,608 Q 660,615 745,560 Q 820,540 900,520 Q 950,510 970,500"
              fill="none"
              stroke={TYPE_BRIGHT}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.65"
            />
            <path d="M 420,645 Q 470,620 505,600 Q 460,535 455,530" fill="none" stroke={TYPE_BRIGHT} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
            <path d="M 505,600 Q 545,590 585,600 Q 620,620 660,640" fill="none" stroke={TYPE_BRIGHT} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
          </g>
        )}

        {/* Sestieri labels — em italic Cormorant pequeno */}
        <g fill={LAND_STROKE} fontFamily="'Cormorant Garamond', serif" fontSize="13" fontStyle="italic" fontWeight="500" letterSpacing="1.5">
          <text x="280" y="216">Cannaregio</text>
          <text x="230" y="450">San Polo</text>
          <text x="105" y="382">Santa Croce</text>
          <text x="345" y="588">Dorsoduro</text>
          <text x="510" y="438">San Marco</text>
          <text x="870" y="370">Castello</text>
        </g>

        {/* Anel de seleção */}
        {selectedVenue && (
          <g opacity="0.9">
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="22" fill="none" stroke={TYPE_BRIGHT} strokeWidth="2" />
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="60" fill="none" stroke={TYPE_BRIGHT} strokeWidth="1" opacity="0.55" />
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="120" fill="none" stroke={TYPE_BRIGHT} strokeWidth="0.7" strokeDasharray="3 4" opacity="0.4" />
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="240" fill="none" stroke={TYPE_BRIGHT} strokeWidth="0.5" strokeDasharray="2 6" opacity="0.25" />
          </g>
        )}

        {/* Paradas de vaporetto */}
        {appData.stops.map((s) => (
          <g key={s.id}>
            <rect x={s.x - 3} y={s.y - 3} width="6" height="6" fill={LAND} stroke={LAND_STROKE} strokeWidth="0.8" />
            <text x={s.x + 7} y={s.y + 3} fontSize="8" fill={LAND_STROKE} fontFamily="'Inter', sans-serif" fontStyle="italic" fontWeight="500">
              {s.name}
            </text>
          </g>
        ))}

        {/* Pins */}
        {visible.map((v) => {
          const isSel = v.id === selectedId;
          const isHov = v.id === hoveredId;
          const c = colorFor(v.area);
          return (
            <g
              key={v.id}
              className={'pin ' + (isSel ? 'pin-active' : '')}
              onClick={() => setSelectedId(v.id)}
              onMouseEnter={() => setHoveredId(v.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={v.x} cy={v.y} r={isSel ? 7 : isHov ? 6 : 4.5} fill={c} stroke={BG} strokeWidth="1.5" />
              {(isHov || isSel) && (
                <g>
                  <rect x={v.x + 10} y={v.y - 22} width={Math.max(120, v.name.length * 5.5)} height="20" fill={LAND} rx="0" />
                  <text x={v.x + 16} y={v.y - 9} fontSize="10" fill={BG} fontFamily="'Inter', sans-serif" fontWeight="500" fontStyle="italic">
                    {v.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Rosa dos ventos */}
        <g transform="translate(1015, 65)" opacity="0.85">
          <circle r="22" fill={BG} stroke={LAND} strokeWidth="0.7" />
          <path d="M 0 -22 L 4 0 L 0 22 L -4 0 Z" fill={LAND} />
          <path d="M 0 -22 L 4 0 L -4 0 Z" fill={TYPE_BRIGHT} />
          <text x="0" y="-30" fontSize="10" textAnchor="middle" fill={LAND} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500">N</text>
        </g>

        {/* Escala */}
        <g transform="translate(50, 685)" fill={TYPE_DIM} fontSize="9" fontFamily="'Inter', sans-serif" fontStyle="italic">
          <line x1="0" y1="0" x2="120" y2="0" stroke={LAND} strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke={LAND} strokeWidth="1.5" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke={LAND} strokeWidth="1" />
          <line x1="120" y1="-4" x2="120" y2="4" stroke={LAND} strokeWidth="1.5" />
          <text x="0" y="16">0</text>
          <text x="55" y="16">500m</text>
          <text x="105" y="16">1km</text>
        </g>

        {/* Cartouche */}
        <g transform="translate(50, 60)">
          <text x="0" y="0" fontSize="10" fill={TYPE_DIM} fontFamily="'Inter', sans-serif" fontStyle="italic" letterSpacing="2.5">venezia · 1:25 000</text>
          <text x="0" y="32" fontSize="26" fill={LAND} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" fontWeight="500" letterSpacing="-0.02em">La Biennale</text>
          <text x="0" y="52" fontSize="11" fill={TYPE_BRIGHT} fontFamily="'Cormorant Garamond', serif" fontStyle="italic" letterSpacing="0.5">61ª · In Minor Keys</text>
        </g>
      </svg>
    </div>
  );
}
