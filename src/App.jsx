import { useEffect, useState } from 'react';
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

function readInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return 'dark';
}

export default function App() {
  const [data, setData] = useState(null);
  const [view, setView] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [mapFilter, setMapFilter] = useState('all');
  const [showVaporetto, setShowVaporetto] = useState(true);
  const [drawerId, setDrawerId] = useState(null);
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    loadData().then(setData);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  useEffect(() => {
    document.body.style.overflow = drawerId ? 'hidden' : '';
  }, [drawerId]);

  if (!data) {
    return <div className="loading-screen">carregando…</div>;
  }

  const goTo = (v) => setView(v);
  const openDetail = (id) => setDrawerId(id);
  const seeOnMap = (id) => {
    setSelectedId(id);
    setDrawerId(null);
    goTo('map');
  };

  return (
    <div className="min-h-screen relative" style={{ zIndex: 2 }}>
      <Header view={view} setView={goTo} theme={theme} setTheme={setTheme} />
      <main className="px-6 md:px-10 lg:px-16 max-w-[1480px] mx-auto pb-32 fade-in" key={view}>
        {view === 'home' && <Home data={data} setView={goTo} />}
        {view === 'giardini' && (
          <PavilionList area="giardini" data={data.pavilionsGiardini} mainExhibition={data.mainExhibition} appData={data} onSelect={openDetail} />
        )}
        {view === 'arsenale' && (
          <PavilionList area="arsenale" data={data.pavilionsArsenale} appData={data} onSelect={openDetail} />
        )}
        {view === 'city' && <CityPavilions data={data.pavilionsCity} onSelect={openDetail} />}
        {view === 'collateral' && <Collateral data={data.collateral} appData={data} onSelect={openDetail} />}
        {view === 'parallel' && <Parallel data={data.parallel} appData={data} onSelect={openDetail} />}
        {view === 'artists' && <Artists appData={data} onSelectVenue={openDetail} />}
        {view === 'map' && (
          <MapView
            appData={data}
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
      <Footer />
      <Drawer venueId={drawerId} appData={data} onClose={() => setDrawerId(null)} onSeeOnMap={seeOnMap} />
    </div>
  );
}
