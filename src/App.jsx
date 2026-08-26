import { useCallback, useEffect, useState } from 'react';
import { loadData } from './lib/dataStore.js';
import { Header, Footer } from './components/Layout.jsx';
import Home from './components/Home.jsx';
import PavilionList from './components/PavilionList.jsx';
import CityPavilions from './components/CityPavilions.jsx';
import Collateral from './components/Collateral.jsx';
import Parallel from './components/Parallel.jsx';
import Artists from './components/Artists.jsx';
import MapView from './components/MapView.jsx';
import Itineraries from './components/Itineraries.jsx';
import Drawer from './components/Drawer.jsx';

const THEME_KEY = 'biennale-theme';
const ANCHOR_KEY = 'biennale-anchor';
const VIEWS = ['home', 'giardini', 'arsenale', 'city', 'collateral', 'parallel', 'artists', 'map', 'itineraries'];

/* O endereço reflete onde você está: #/giardini, #/map/brasil.
   Assim o botão “voltar” funciona e qualquer local pode ser compartilhado. */
function parseHash() {
  const raw = (typeof window === 'undefined' ? '' : window.location.hash).replace(/^#\/?/, '');
  const [view, venueId] = raw.split('/');
  return { view: VIEWS.includes(view) ? view : 'home', venueId: venueId || null };
}

function readStored(key, fallback, allowed) {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return allowed.includes(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [data, setData] = useState(null);
  const [route, setRoute] = useState(parseHash);
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mapFilter, setMapFilter] = useState('all');
  const [showVaporetto, setShowVaporetto] = useState(true);
  const [theme, setTheme] = useState(() => readStored(THEME_KEY, 'notturno', ['notturno', 'pietra']));
  // Ponto de partida do visitante. Alimenta todos os tempos de deslocamento.
  const [anchor, setAnchor] = useState(() =>
    readStored(ANCHOR_KEY, 'M', ['G', 'A', 'Z', 'M', 'S', 'C', 'L', 'T', 'P', 'O', 'R', 'J'])
  );

  const { view, venueId: drawerId } = route;

  useEffect(() => {
    loadData().then(setData);
  }, []);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ANCHOR_KEY, anchor);
    } catch {}
  }, [anchor]);

  useEffect(() => {
    if (!drawerId) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  useEffect(() => {
    document.body.style.overflow = drawerId ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerId]);

  const goTo = useCallback((v) => {
    window.location.hash = `#/${v}`;
  }, []);

  const openDetail = useCallback((id) => {
    const { view: v } = parseHash();
    window.location.hash = `#/${v}/${id}`;
  }, []);

  const closeDetail = useCallback(() => {
    const { view: v } = parseHash();
    window.location.hash = `#/${v}`;
  }, []);

  const seeOnMap = useCallback((id) => {
    setSelectedId(id);
    window.location.hash = '#/map';
  }, []);

  if (!data) {
    return (
      <div className="boot" role="status">
        <div className="u-display text-3xl t-1">In Minor Keys</div>
        <div className="boot-bar">
          <span />
        </div>
        <div className="u-eyebrow">Carregando o guia</div>
      </div>
    );
  }

  const shared = { anchor, appData: data, onSelect: openDetail };

  return (
    <>
      {/* Move o foco sem tocar no hash — que aqui é a rota, não uma âncora. */}
      <a
        href="#conteudo"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('conteudo')?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <Header
        view={view}
        setView={goTo}
        theme={theme}
        setTheme={setTheme}
        anchor={anchor}
        setAnchor={setAnchor}
        zoneNames={data.zoneNames}
      />
      <main id="conteudo" className="px-5 md:px-10 lg:px-14 max-w-shell mx-auto pb-20 enter" key={view} tabIndex={-1}>
        {view === 'home' && <Home data={data} setView={goTo} anchor={anchor} />}
        {view === 'giardini' && (
          <PavilionList area="giardini" data={data.pavilionsGiardini} mainExhibition={data.mainExhibition} {...shared} />
        )}
        {view === 'arsenale' && <PavilionList area="arsenale" data={data.pavilionsArsenale} {...shared} />}
        {view === 'city' && <CityPavilions data={data.pavilionsCity} {...shared} />}
        {view === 'collateral' && <Collateral data={data.collateral} {...shared} />}
        {view === 'parallel' && <Parallel data={data.parallel} {...shared} />}
        {view === 'artists' && <Artists appData={data} anchor={anchor} onSelectVenue={openDetail} />}
        {view === 'map' && (
          <MapView
            appData={data}
            anchor={anchor}
            setAnchor={setAnchor}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            filter={mapFilter}
            setFilter={setMapFilter}
            showVaporetto={showVaporetto}
            setShowVaporetto={setShowVaporetto}
            onOpenDetail={openDetail}
          />
        )}
        {view === 'itineraries' && <Itineraries data={data.itineraries} setView={goTo} />}
      </main>
      <Footer setView={goTo} />
      <Drawer venueId={drawerId} appData={data} anchor={anchor} onClose={closeDetail} onSeeOnMap={seeOnMap} />
    </>
  );
}
