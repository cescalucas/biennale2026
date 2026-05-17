// Mapa esquemático estilizado de Veneza
// Inspirado nos catálogos editoriais da Biennale + sinalética MoMA
export default function VeniceMap({ appData, selectedId, setSelectedId, hoveredId, setHoveredId, filter, showVaporetto }) {
  const visible = appData.allVenues.filter((v) => filter === 'all' || v.area === filter);
  const selectedVenue = appData.venuesById[selectedId];

  const colorFor = (area) =>
    area === 'giardini'
      ? '#E1251B'
      : area === 'arsenale'
      ? '#B81C13'
      : area === 'city'
      ? '#9A9A9A'
      : area === 'collateral'
      ? '#6B6B6B'
      : area === 'parallel'
      ? '#000000'
      : '#000000';

  return (
    <div className="map-container rounded-sm overflow-hidden" style={{ aspectRatio: '1100/720' }}>
      <svg viewBox="0 0 1100 720" className="w-full h-full" style={{ display: 'block' }}>
        <defs>
          {/* Padrão sutil da lagoa */}
          <pattern id="water" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="24" height="24" fill="#F2F2F0" />
            <circle cx="6" cy="6" r="0.6" fill="#DCDCD8" />
            <circle cx="18" cy="14" r="0.5" fill="#DCDCD8" />
            <circle cx="10" cy="20" r="0.4" fill="#DCDCD8" />
          </pattern>
          {/* Sombra sutil das ilhas */}
          <filter id="islandShadow" x="-3%" y="-3%" width="106%" height="106%">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* Lagoa */}
        <rect width="1100" height="720" fill="url(#water)" />

        {/* Continente (Mestre/Marghera) — faixa oeste muito sutil */}
        <rect x="0" y="0" width="42" height="720" fill="#E8E8E5" />
        <text x="8" y="362" fontSize="9" fill="#9A9A9A" fontFamily="'Inter Tight', sans-serif" fontWeight="600" letterSpacing="1.5" transform="rotate(-90 8 362)">MESTRE · MARGHERA</text>

        {/* Ponte della Libertà — chega do continente */}
        <line x1="42" y1="295" x2="98" y2="296" stroke="#000" strokeWidth="2.5" />
        <line x1="42" y1="299" x2="98" y2="300" stroke="#000" strokeWidth="2.5" />

        {/* Lido — barreira ao leste, muito sutil */}
        <path d="M 1070 180 Q 1080 195 1082 250 L 1085 580 Q 1083 620 1070 630 L 1062 625 Q 1065 585 1063 250 Q 1062 195 1070 180 Z" fill="#E8E8E5" stroke="#C0C0BD" strokeWidth="0.5" />
        <text x="1075" y="395" fontSize="9" fill="#9A9A9A" fontFamily="'Inter Tight', sans-serif" fontWeight="600" letterSpacing="2" transform="rotate(90 1075 395)">LIDO</text>

        {/* Murano hint — pequeno indicador no nordeste */}
        <text x="985" y="125" fontSize="9" fill="#9A9A9A" fontFamily="'Inter Tight', sans-serif" fontWeight="600" letterSpacing="2">↗ MURANO</text>

        {/* === Ilha principal — silhueta contínua tipo peixe === */}
        <path
          d="
            M 98,296
            Q 150,283 230,275
            Q 320,267 410,262
            Q 490,261 560,268
            Q 630,277 700,288
            Q 770,302 830,318
            Q 890,336 940,360
            Q 985,382 1020,408
            Q 1045,432 1048,460
            Q 1042,488 1015,508
            Q 985,524 950,535
            Q 905,544 855,544
            Q 800,542 745,545
            Q 705,550 670,558
            Q 645,565 620,575
            Q 600,584 585,595
            Q 575,605 565,615
            Q 558,622 550,625
            Q 510,627 460,628
            Q 400,628 330,624
            Q 270,617 220,602
            Q 180,588 150,564
            Q 120,532 102,495
            Q 88,455 80,410
            Q 76,365 80,330
            Q 86,308 98,296 Z
          "
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="1.2"
        />

        {/* === Canais internos discretos === */}
        {/* Rio di Cannaregio — entra do norte em direção sul (Ghetto) */}
        <path d="M 280,275 Q 290,330 305,395 Q 310,425 300,455" fill="none" stroke="#D8D8D5" strokeWidth="3" />
        {/* Rio Nuovo — Santa Croce → Grande Canal */}
        <path d="M 165,400 Q 230,418 290,440" fill="none" stroke="#D8D8D5" strokeWidth="2" />
        {/* Rio dell'Arsenale — corta o Castello vertical */}
        <path d="M 810,325 Q 815,400 818,475 Q 820,510 800,540" fill="none" stroke="#D8D8D5" strokeWidth="2.5" />

        {/* === Grande Canal — o "S invertido" === */}
        {/* Largura cheia */}
        <path
          d="
            M 108,302
            Q 175,355 245,400
            Q 320,438 385,470
            Q 445,498 495,528
            Q 545,560 580,585
            Q 605,600 625,608
            Q 645,612 658,612
          "
          fill="none"
          stroke="#B8BEC0"
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* Linha de definição central */}
        <path
          d="
            M 108,302
            Q 175,355 245,400
            Q 320,438 385,470
            Q 445,498 495,528
            Q 545,560 580,585
            Q 605,600 625,608
            Q 645,612 658,612
          "
          fill="none"
          stroke="#8A9092"
          strokeWidth="1"
          strokeDasharray="2 5"
          opacity="0.55"
        />

        {/* === Pontes sobre o Grande Canal === */}
        {/* Scalzi — junto à Stazione */}
        <g>
          <line x1="153" y1="338" x2="162" y2="358" stroke="#000" strokeWidth="3" strokeLinecap="round" />
          <text x="170" y="345" fontSize="8" fill="#000" fontFamily="'Inter Tight', sans-serif" fontWeight="700">SCALZI</text>
        </g>
        {/* Ponte di Rialto — a mais icônica */}
        <g>
          <line x1="385" y1="458" x2="397" y2="482" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="391" cy="470" r="3" fill="#E1251B" stroke="#000" strokeWidth="0.8" />
          <text x="405" y="466" fontSize="9" fill="#000" fontFamily="'Inter Tight', sans-serif" fontWeight="800">RIALTO</text>
        </g>
        {/* Ponte dell'Accademia */}
        <g>
          <line x1="515" y1="528" x2="528" y2="551" stroke="#000" strokeWidth="3" strokeLinecap="round" />
          <text x="535" y="540" fontSize="8" fill="#000" fontFamily="'Inter Tight', sans-serif" fontWeight="700">ACCADEMIA</text>
        </g>
        {/* Ponte della Costituzione (Calatrava) */}
        <line x1="115" y1="312" x2="121" y2="326" stroke="#000" strokeWidth="2" strokeLinecap="round" />

        {/* === Estação Santa Lucia — marcador === */}
        <g>
          <rect x="100" y="282" width="14" height="10" fill="#FFF" stroke="#000" strokeWidth="1" />
          <text x="100" y="277" fontSize="7" fill="#000" fontFamily="'Inter Tight', sans-serif" fontWeight="700" letterSpacing="0.5">S. LUCIA</text>
        </g>

        {/* === Piazza San Marco — área destacada === */}
        <g>
          <rect x="582" y="568" width="34" height="20" fill="#FFFFFF" stroke="#000" strokeWidth="0.8" />
          <text x="599" y="580" fontSize="7" fill="#000" fontFamily="'Inter Tight', sans-serif" fontWeight="800" textAnchor="middle">PIAZZA</text>
          <text x="599" y="587" fontSize="7" fill="#000" fontFamily="'Inter Tight', sans-serif" fontWeight="800" textAnchor="middle">S. MARCO</text>
        </g>

        {/* === Arsenale — muralhas (retângulo institucional) === */}
        <g>
          <rect x="755" y="395" width="105" height="105" fill="none" stroke="#000" strokeWidth="0.8" strokeDasharray="3 2.5" />
          <text x="807" y="455" fontSize="9" fill="#E1251B" fontFamily="'Inter Tight', sans-serif" fontWeight="800" letterSpacing="1.5" textAnchor="middle">ARSENALE</text>
        </g>

        {/* === Giardini della Biennale — área destacada === */}
        <g>
          <path d="M 890,455 Q 945,448 1010,460 Q 1030,475 1020,510 Q 980,525 925,520 Q 890,510 890,485 Q 885,468 890,455 Z"
                fill="#FFFFFF" stroke="#E1251B" strokeWidth="1.2" />
          <text x="950" y="490" fontSize="10" fill="#E1251B" fontFamily="'Inter Tight', sans-serif" fontWeight="800" letterSpacing="1.5" textAnchor="middle">GIARDINI</text>
        </g>

        {/* === Punta della Dogana — ponta dramática no sul === */}
        <circle cx="572" cy="618" r="2.5" fill="#000" />
        <text x="510" y="615" fontSize="8" fill="#6B6B6B" fontFamily="'Inter Tight', sans-serif" fontStyle="italic" fontWeight="500">Punta della Dogana</text>

        {/* === Giudecca === */}
        <path
          d="
            M 200,665
            Q 260,656 350,660
            Q 450,663 540,668
            Q 620,672 690,684
            Q 702,694 690,704
            Q 600,712 460,710
            Q 330,708 235,702
            Q 198,690 200,665 Z
          "
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="1.2"
        />
        <text x="430" y="690" fontSize="11" fill="#5A5A5A" fontFamily="'Inter Tight', sans-serif" fontWeight="700" letterSpacing="2.5" textAnchor="middle">GIUDECCA</text>

        {/* === San Giorgio Maggiore === */}
        <ellipse cx="660" cy="665" rx="32" ry="13" fill="#FFFFFF" stroke="#000000" strokeWidth="1.2" />
        {/* Campanário de San Giorgio — pontinho dentro */}
        <circle cx="655" cy="665" r="1.6" fill="#E1251B" />
        <text x="660" y="649" fontSize="8" fill="#5A5A5A" fontFamily="'Inter Tight', sans-serif" fontWeight="700" letterSpacing="1.5" textAnchor="middle">S. GIORGIO MAGGIORE</text>

        {/* === Linhas de vaporetto === */}
        {showVaporetto && (
          <g>
            {/* Linha 1 — Grand Canal completo (vermelho) */}
            <path
              d="M 108,302 Q 175,355 245,400 Q 320,438 385,470 Q 445,498 495,528 Q 545,560 580,585 Q 605,600 625,608 Q 660,615 745,560 Q 820,540 900,520 Q 950,510 970,500"
              fill="none"
              stroke="#E1251B"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.7"
            />
            {/* Linha 2 — alternativa */}
            <path d="M 420,645 Q 470,620 505,600 Q 460,535 455,530" fill="none" stroke="#E1251B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
            <path d="M 505,600 Q 545,590 585,600 Q 620,620 660,640" fill="none" stroke="#E1251B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
          </g>
        )}

        {/* === Sestieri labels === */}
        <g fill="#5A5A5A" fontFamily="'Inter Tight', sans-serif" fontSize="11" fontWeight="700" letterSpacing="2.8">
          <text x="270" y="216">CANNAREGIO</text>
          <text x="230" y="450">SAN POLO</text>
          <text x="100" y="382">SANTA CROCE</text>
          <text x="345" y="588">DORSODURO</text>
          <text x="510" y="438">SAN MARCO</text>
          <text x="870" y="370">CASTELLO</text>
        </g>

        {/* === Anel de destaque na seleção === */}
        {selectedVenue && (
          <g opacity="0.85">
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="22" fill="none" stroke="#E1251B" strokeWidth="2" />
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="60" fill="none" stroke="#E1251B" strokeWidth="1" opacity="0.5" />
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="120" fill="none" stroke="#E1251B" strokeWidth="0.7" strokeDasharray="3 4" opacity="0.35" />
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="240" fill="none" stroke="#E1251B" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.2" />
          </g>
        )}

        {/* === Paradas de vaporetto === */}
        {appData.stops.map((s) => (
          <g key={s.id}>
            <rect x={s.x - 3} y={s.y - 3} width="6" height="6" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
            <text x={s.x + 7} y={s.y + 3} fontSize="8" fill="#3D3D3D" fontFamily="'Inter Tight', sans-serif" fontWeight="600">
              {s.name}
            </text>
          </g>
        ))}

        {/* === Pins dos locais === */}
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
              <circle cx={v.x} cy={v.y} r={isSel ? 7 : isHov ? 6 : 4.5} fill={c} stroke="#FFFFFF" strokeWidth="1.5" />
              {(isHov || isSel) && (
                <g>
                  <rect x={v.x + 10} y={v.y - 22} width={Math.max(120, v.name.length * 5.5)} height="20" fill="#000000" rx="0" />
                  <text x={v.x + 16} y={v.y - 9} fontSize="10" fill="#FFFFFF" fontFamily="'Inter Tight', sans-serif" fontWeight="600">
                    {v.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* === Rosa dos ventos === */}
        <g transform="translate(1015, 65)" opacity="0.8">
          <circle r="22" fill="#FFFFFF" stroke="#000" strokeWidth="0.7" />
          <path d="M 0 -22 L 4 0 L 0 22 L -4 0 Z" fill="#000000" />
          <path d="M 0 -22 L 4 0 L -4 0 Z" fill="#E1251B" />
          <text x="0" y="-30" fontSize="10" textAnchor="middle" fill="#000" fontFamily="'Inter Tight', sans-serif" fontWeight="800">
            N
          </text>
        </g>

        {/* === Escala === */}
        <g transform="translate(50, 685)" fill="#5A5A5A" fontSize="9" fontFamily="'Inter Tight', sans-serif" fontWeight="600">
          <line x1="0" y1="0" x2="120" y2="0" stroke="#000" strokeWidth="1.5" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="#000" strokeWidth="1.5" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="#000" strokeWidth="1" />
          <line x1="120" y1="-4" x2="120" y2="4" stroke="#000" strokeWidth="1.5" />
          <text x="0" y="16" letterSpacing="1">0</text>
          <text x="55" y="16" letterSpacing="1">500m</text>
          <text x="105" y="16" letterSpacing="1">1km</text>
        </g>

        {/* === Cartouche / título do mapa === */}
        <g transform="translate(50, 60)">
          <text x="0" y="0" fontSize="10" fill="#6B6B6B" fontFamily="'Inter Tight', sans-serif" fontWeight="600" letterSpacing="2.5">VENEZIA · 1:25 000</text>
          <text x="0" y="22" fontSize="20" fill="#000" fontFamily="'Inter Tight', sans-serif" fontWeight="900" letterSpacing="-0.04em">LA BIENNALE</text>
          <text x="0" y="40" fontSize="11" fill="#E1251B" fontFamily="'Inter Tight', sans-serif" fontWeight="700" letterSpacing="1">61ª · IN MINOR KEYS</text>
        </g>
      </svg>
    </div>
  );
}
