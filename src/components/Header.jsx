import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav id="navbar" className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b border-[#000000]/10 transition-all duration-500 ${isScrolled || isMobileMenuOpen ? 'shadow-lg bg-[#FDFAF5]/95' : 'bg-[#FDFAF5]/80'}`}>
      <div className={`relative z-20 flex transition-all duration-500 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between ${isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24'}`} id="nav-container">
        <Link to="/" className="flex items-center gap-2 group h-full py-2 md:py-4" onClick={closeMenu}>
          <img 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8760da48-b048-4b11-a66f-72e5e6a71a71_320w.png" 
            alt="Guayaera In Paradise 4" 
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="md:h-16 transition-transform duration-300 group-hover:scale-105 md:translate-y-0 w-20 translate-y-1 scale-150" 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-bebas text-2xl tracking-tight uppercase">
          <a href={isHome ? "#divisions" : "/#divisions"} className="hover:text-[#EB7A4B] transition-colors text-[#000000]/70">
            Divisions
          </a>
          <a href={isHome ? "#sponsors" : "/#sponsors"} className="text-[#000000]/70 hover:text-[#01C9CF] transition-colors">
            Sponsors
          </a>
          <Link to="/hotel" className="text-[#000000]/70 hover:text-[#EB459A] transition-colors">
            Hotel
          </Link>
          <Link to="/schedule" className="text-[#000000]/70 hover:text-[#01C9CF] transition-colors">
            Schedule
          </Link>
          <a href={isHome ? "#workouts" : "/#workouts"} className="text-[#000000]/70 hover:text-[#EB459A] transition-colors">
            Workout
          </a>
        </div>

        {/* Action Buttons & Hamburger Toggle */}
        <div className="flex items-center gap-4">
          <a href="https://circle21.events/guayaera-in-paradise?tab=info" className="hidden lg:flex uppercase hover:bg-[#EB459A] hover:scale-105 transition-all duration-300 hover:shadow-[#EB459A]/30 text-xl text-[#FDFAF5] tracking-wide font-bebas bg-[#000000] rounded-sm pt-2.5 pr-6 pb-2.5 pl-6 shadow-lg">
            Register Now
          </a>
          <button 
            className="lg:hidden text-[#000000] flex items-center justify-center hover:scale-110 transition-transform duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <iconify-icon icon="solar:close-circle-line-duotone" width="36" height="36"></iconify-icon>
            ) : (
              <iconify-icon icon="solar:hamburger-menu-linear" width="36" height="36"></iconify-icon>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Full Screen Overlay */}
      <div className={`fixed inset-0 h-[100dvh] w-full bg-[#FDFAF5] z-10 flex flex-col pt-28 px-8 pb-12 transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-2 mt-4 font-bebas text-4xl tracking-tight uppercase text-center w-full">
          <Link 
            to="/" 
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              closeMenu();
            }} 
            className="hover:text-[#EB7A4B] transition-colors block text-[#000000] w-full border-[#000000]/5 border-b pt-4 pb-4"
          >
            Home
          </Link>
          <a href={isHome ? "#divisions" : "/#divisions"} onClick={closeMenu} className="hover:text-[#EB7A4B] transition-colors block text-[#000000] w-full border-[#000000]/5 border-b pt-4 pb-4">
            Divisions
          </a>
          <a href={isHome ? "#sponsors" : "/#sponsors"} onClick={closeMenu} className="text-[#000000] hover:text-[#01C9CF] transition-colors py-4 border-b border-[#000000]/5 w-full block">
            Sponsors
          </a>
          <Link to="/hotel" onClick={closeMenu} className="text-[#000000] hover:text-[#EB459A] transition-colors py-4 border-b border-[#000000]/5 w-full block">
            Hotel
          </Link>
          <Link to="/schedule" onClick={closeMenu} className="text-[#000000] hover:text-[#01C9CF] transition-colors py-4 border-b border-[#000000]/5 w-full block">
            Schedule
          </Link>
          <a href={isHome ? "#workouts" : "/#workouts"} onClick={closeMenu} className="text-[#000000] hover:text-[#EB459A] transition-colors py-4 border-b border-[#000000]/5 w-full block">
            Workout
          </a>
          
          <div className="mt-8">
            <a 
              href="https://circle21.events/guayaera-in-paradise?tab=info" 
              onClick={closeMenu}
              className="inline-flex justify-center w-full uppercase hover:bg-[#EB459A] hover:scale-105 transition-all duration-300 hover:shadow-[#EB459A]/30 text-3xl text-[#FDFAF5] tracking-wide font-bebas bg-[#000000] rounded-xl py-5 shadow-xl"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}