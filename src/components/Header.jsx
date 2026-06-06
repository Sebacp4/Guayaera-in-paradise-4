import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../i18n/LanguageProvider';

const LANGUAGE_OPTIONS = ['en', 'es'];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

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

  const renderLanguageSwitcher = (mobile = false) => (
    <div
      className={
        mobile
          ? 'flex items-center justify-center gap-2 mt-6'
          : 'hidden lg:flex items-center rounded-full border border-[#000000]/10 bg-white/70 p-1 shadow-sm'
      }
    >
      {LANGUAGE_OPTIONS.map((option) => {
        const isActive = language === option;
        const className = mobile
          ? isActive
            ? 'min-w-[88px] rounded-full border border-[#000000] bg-[#000000] px-4 py-2 text-base font-bebas tracking-[0.2em] uppercase text-[#FDFAF5] shadow-lg transition-all duration-300'
            : 'min-w-[88px] rounded-full border border-[#000000]/15 bg-white px-4 py-2 text-base font-bebas tracking-[0.2em] uppercase text-[#000000]/70 transition-all duration-300 hover:border-[#000000]/30 hover:text-[#000000]'
          : isActive
            ? 'rounded-full bg-[#000000] px-3 py-2 text-sm font-bebas tracking-[0.2em] uppercase text-[#FDFAF5] shadow-md transition-all duration-300'
            : 'rounded-full px-3 py-2 text-sm font-bebas tracking-[0.2em] uppercase text-[#000000]/60 transition-all duration-300 hover:text-[#000000]';

        return (
          <button
            key={option}
            type="button"
            onClick={() => {
              void setLanguage(option);
            }}
            aria-pressed={isActive}
            className={className}
          >
            {t('languageSwitcher.' + option)}
          </button>
        );
      })}
    </div>
  );

  return (
    <nav
      id="navbar"
      className={
        'fixed top-0 w-full z-50 backdrop-blur-xl border-b border-[#000000]/10 transition-all duration-500 ' +
        (isScrolled || isMobileMenuOpen ? 'shadow-lg bg-[#FDFAF5]/95' : 'bg-[#FDFAF5]/80')
      }
    >
      <div
        className={
          'relative z-20 flex transition-all duration-500 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between ' +
          (isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-24')
        }
        id="nav-container"
      >
        <Link to="/" className="flex items-center gap-2 group h-full py-2 md:py-4" onClick={closeMenu}>
          <img
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8760da48-b048-4b11-a66f-72e5e6a71a71_320w.png"
            alt={t('header.logoAlt')}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="md:h-16 transition-transform duration-300 group-hover:scale-105 md:translate-y-0 w-20 translate-y-1 scale-150"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8 font-bebas text-2xl tracking-tight uppercase">
          <a href={isHome ? '#divisions' : '/#divisions'} className="hover:text-[#EB7A4B] transition-colors text-[#000000]/70">
            {t('header.divisions')}
          </a>
          <a href={isHome ? '#sponsors' : '/#sponsors'} className="text-[#000000]/70 hover:text-[#01C9CF] transition-colors">
            {t('header.sponsors')}
          </a>
          <Link to="/hotel" className="text-[#000000]/70 hover:text-[#EB459A] transition-colors">
            {t('header.hotel')}
          </Link>
          <Link to="/schedule" className="text-[#000000]/70 hover:text-[#01C9CF] transition-colors">
            {t('header.schedule')}
          </Link>
          <a href={isHome ? '#workouts' : '/#workouts'} className="text-[#000000]/70 hover:text-[#EB459A] transition-colors">
            {t('header.workout')}
          </a>
        </div>

        <div className="flex items-center gap-4">
          {renderLanguageSwitcher()}
          <a
            href="https://circle21.events/guayaera-in-paradise?tab=info"
            className="hidden lg:flex uppercase hover:bg-[#EB459A] hover:scale-105 transition-all duration-300 hover:shadow-[#EB459A]/30 text-xl text-[#FDFAF5] tracking-wide font-bebas bg-[#000000] rounded-sm pt-2.5 pr-6 pb-2.5 pl-6 shadow-lg"
          >
            {t('header.registerNow')}
          </a>
          <button
            className="lg:hidden text-[#000000] flex items-center justify-center hover:scale-110 transition-transform duration-300"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
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

      <div
        className={
          'fixed inset-0 h-[100dvh] w-full bg-[#FDFAF5] z-10 flex flex-col pt-28 px-8 pb-12 transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto ' +
          (isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <div className="flex flex-col gap-2 mt-4 font-bebas text-4xl tracking-tight uppercase text-center w-full">
          <Link
            to="/"
            onClick={(event) => {
              if (isHome) {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              closeMenu();
            }}
            className="hover:text-[#EB7A4B] transition-colors block text-[#000000] w-full border-[#000000]/5 border-b pt-4 pb-4"
          >
            {t('header.home')}
          </Link>
          <Link
            to="/raffle"
            onClick={closeMenu}
            className="hover:text-[#EB459A] transition-colors block text-[#000000] w-full border-[#000000]/5 border-b pt-4 pb-4"
          >
            {t('header.raffle')}
          </Link>
          <a
            href={isHome ? '#divisions' : '/#divisions'}
            onClick={closeMenu}
            className="hover:text-[#EB7A4B] transition-colors block text-[#000000] w-full border-[#000000]/5 border-b pt-4 pb-4"
          >
            {t('header.divisions')}
          </a>
          <a
            href={isHome ? '#sponsors' : '/#sponsors'}
            onClick={closeMenu}
            className="text-[#000000] hover:text-[#01C9CF] transition-colors py-4 border-b border-[#000000]/5 w-full block"
          >
            {t('header.sponsors')}
          </a>
          <Link to="/hotel" onClick={closeMenu} className="text-[#000000] hover:text-[#EB459A] transition-colors py-4 border-b border-[#000000]/5 w-full block">
            {t('header.hotel')}
          </Link>
          <Link to="/schedule" onClick={closeMenu} className="text-[#000000] hover:text-[#01C9CF] transition-colors py-4 border-b border-[#000000]/5 w-full block">
            {t('header.schedule')}
          </Link>
          <a
            href={isHome ? '#workouts' : '/#workouts'}
            onClick={closeMenu}
            className="text-[#000000] hover:text-[#EB459A] transition-colors py-4 border-b border-[#000000]/5 w-full block"
          >
            {t('header.workout')}
          </a>

          {renderLanguageSwitcher(true)}

          <div className="mt-8">
            <a
              href="https://circle21.events/guayaera-in-paradise?tab=info"
              onClick={closeMenu}
              className="inline-flex justify-center w-full uppercase hover:bg-[#EB459A] hover:scale-105 transition-all duration-300 hover:shadow-[#EB459A]/30 text-3xl text-[#FDFAF5] tracking-wide font-bebas bg-[#000000] rounded-xl py-5 shadow-xl"
            >
              {t('header.registerNow')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
