import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ColorProvider } from './context/ColorContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeChecker } from './pages/HomeChecker';
import { PaletteGenerator } from './pages/PaletteGenerator';
import { UiLab } from './pages/UiLab';
import { SavedPalettes } from './pages/SavedPalettes';
import { AboutPage } from './pages/AboutPage';

export function App() {
  return (
    <ColorProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <main className="container main-content">
            <Routes>
              <Route path="/" element={<HomeChecker />} />
              <Route path="/paletas" element={<PaletteGenerator />} />
              <Route path="/preview" element={<UiLab />} />
              <Route path="/salvos" element={<SavedPalettes />} />
              <Route path="/sobre" element={<AboutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ColorProvider>
  );
}

export default App;