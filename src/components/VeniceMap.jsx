// Mapa SVG estilizado de Veneza
export default function VeniceMap({ appData, selectedId, setSelectedId, hoveredId, setHoveredId, filter, showVaporetto }) {
  const visible = appData.allVenues.filter((v) => filter === 'all' || v.area === filter);
  const selectedVenue = appData.venuesById[selectedId];

  const colorFor = (area) =>
    area === 'giardini'
      ? '#A03E2E'
      : area === 'arsenale'
      ? '#6E2A20'
      : area === 'city'
      ? '#3D352C'
      : area === 'collateral'
      ? '#2C5F66'
      : area === 'parallel'
      ? '#B8893A'
      : '#1A1612';

  return (
    <div className="map-container rounded-sm overflow-hidden" style={{ aspectRatio: '1100/720' }}>
      <svg viewBox="0 0 1100 720" className="w-full h-full" style={{ display: 'block' }}>
        <defs>
          <pattern id="water" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
            <rect width="14" height="14" fill="#B3C6C5" />
            <path d="M 0 7 Q 3.5 4 7 7 T 14 7" stroke="#9DB4B2" strokeWidth="0.6" fill="none" opacity="0.5" />
          </pattern>
          <pattern id="land" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#EFE5CC" />
            <circle cx="1" cy="1" r="0.3" fill="#D8C9A6" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="1100" height="720" fill="url(#water)" />
        <path d="M 80 140 Q 250 110 430 130 Q 580 145 690 175 L 720 195 Q 700 240 660 270 L 510 320 Q 410 340 330 345 L 270 350 Q 190 355 150 340 L 100 320 Q 70 270 75 220 Z" fill="url(#land)" stroke="#B8AB87" strokeWidth="1" />
        <path d="M 175 360 Q 245 350 320 365 Q 380 380 410 410 L 420 460 Q 380 490 320 495 Q 240 500 195 485 Q 165 460 165 415 Z" fill="url(#land)" stroke="#B8AB87" strokeWidth="1" />
        <path d="M 145 510 Q 240 500 380 515 Q 480 525 540 545 L 600 575 Q 640 590 620 615 Q 540 645 420 645 Q 290 645 200 625 Q 140 595 135 555 Z" fill="url(#land)" stroke="#B8AB87" strokeWidth="1" />
        <path d="M 460 380 Q 540 360 620 365 Q 690 375 740 395 L 770 420 Q 780 460 750 495 Q 700 530 650 540 L 590 555 Q 540 565 500 555 Q 465 540 450 510 L 440 470 Q 445 420 460 380 Z" fill="url(#land)" stroke="#B8AB87" strokeWidth="1" />
        <path d="M 740 380 Q 830 370 920 380 Q 980 390 1020 415 L 1040 460 Q 1030 495 990 510 L 940 525 Q 880 530 830 520 L 780 510 Q 740 495 730 460 Z" fill="url(#land)" stroke="#B8AB87" strokeWidth="1" />
        <path d="M 220 670 Q 350 660 510 665 Q 620 670 690 685 L 695 705 Q 600 715 460 712 Q 320 710 230 700 Z" fill="url(#land)" stroke="#B8AB87" strokeWidth="1" />
        <ellipse cx="660" cy="665" rx="35" ry="14" fill="url(#land)" stroke="#B8AB87" strokeWidth="1" />
        <path d="M 100 320 Q 180 360 230 400 Q 290 440 320 470 Q 360 500 410 510 Q 460 530 510 550 Q 560 580 600 600 Q 620 610 640 605" fill="none" stroke="#9DB4B2" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
        <path d="M 100 320 Q 180 360 230 400 Q 290 440 320 470 Q 360 500 410 510 Q 460 530 510 550 Q 560 580 600 600 Q 620 610 640 605" fill="none" stroke="#7FA29F" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" />
        {showVaporetto && (
          <g className="vap-line" stroke="#A03E2E" strokeWidth="1.5" fill="none">
            <path d="M 345 415 Q 405 460 470 500 Q 525 545 585 600 Q 670 580 790 520 Q 880 510 920 495" />
            <path d="M 420 645 Q 470 620 505 600 Q 460 535 455 530" />
            <path d="M 505 600 Q 545 590 585 600 Q 620 620 660 640" />
          </g>
        )}
        <g fill="#6B6157" fontFamily="Cormorant Garamond" fontSize="13" fontStyle="italic" letterSpacing="2">
          <text x="280" y="220">CANNAREGIO</text>
          <text x="220" y="430">SAN POLO</text>
          <text x="180" y="395">SANTA CROCE</text>
          <text x="330" y="585">DORSODURO</text>
          <text x="540" y="450">SAN MARCO</text>
          <text x="850" y="430">CASTELLO</text>
          <text x="380" y="695">GIUDECCA</text>
          <text x="610" y="690" fontSize="9">S. GIORGIO</text>
          <text x="900" y="495" fontSize="11" fill="#A03E2E">GIARDINI</text>
          <text x="755" y="465" fontSize="11" fill="#A03E2E">ARSENALE</text>
        </g>
        {appData.stops.map((s) => (
          <g key={s.id}>
            <circle cx={s.x} cy={s.y} r="3.5" fill="#F2ECDF" stroke="#1A1612" strokeWidth="1.2" />
            <text x={s.x + 6} y={s.y + 3} fontSize="8.5" fill="#3D352C" fontFamily="Inter">
              {s.name}
            </text>
          </g>
        ))}
        {selectedVenue && (
          <g opacity="0.18">
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="60" fill="none" stroke="#A03E2E" strokeWidth="1" />
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="140" fill="none" stroke="#A03E2E" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx={selectedVenue.x} cy={selectedVenue.y} r="250" fill="none" stroke="#A03E2E" strokeWidth="1" strokeDasharray="2 6" />
          </g>
        )}
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
              <circle cx={v.x} cy={v.y} r={isSel ? 7 : isHov ? 6 : 4.5} fill={c} stroke="#F2ECDF" strokeWidth="1.5" />
              {(isHov || isSel) && (
                <g>
                  <rect x={v.x + 10} y={v.y - 22} width={Math.max(120, v.name.length * 5.5)} height="20" fill="#1A1612" rx="2" />
                  <text x={v.x + 16} y={v.y - 9} fontSize="10" fill="#F2ECDF" fontFamily="Inter" fontWeight="500">
                    {v.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <g transform="translate(1030, 60)" opacity="0.55">
          <circle r="22" fill="none" stroke="#6B6157" strokeWidth="0.7" />
          <path d="M 0 -22 L 4 0 L 0 22 L -4 0 Z" fill="#1A1612" />
          <path d="M 0 -22 L 4 0 L -4 0 Z" fill="#A03E2E" />
          <text x="0" y="-28" fontSize="9" textAnchor="middle" fill="#3D352C">
            N
          </text>
        </g>
        <g transform="translate(40, 690)" fill="#6B6157" fontSize="9" fontFamily="Inter">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#6B6157" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#6B6157" strokeWidth="1" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke="#6B6157" strokeWidth="1" />
          <text x="0" y="15">0</text>
          <text x="74" y="15">500m</text>
        </g>
      </svg>
    </div>
  );
}
