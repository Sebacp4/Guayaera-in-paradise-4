import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Hotel from './pages/Hotel';
import Schedule from './pages/Schedule';
import FeaturedPartners from './pages/FeaturedPartners';
import Raffle from './pages/Raffle';
import RaffleValidation from './pages/RaffleValidation';

// Component to handle scrolling to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FDFAF5]">
        <Header />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/featured-partners" element={<FeaturedPartners />} />
            <Route path="/raffle" element={<Raffle />} />
            <Route path="/raffle/validate/:code" element={<RaffleValidation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}