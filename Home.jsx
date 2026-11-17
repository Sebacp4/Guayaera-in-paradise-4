import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import WeekendItinerary from '../components/WeekendItinerary';

export default function Home() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    d: '00', h: '00', m: '00', s: '00'
  });

  const [mapOpen, setMapOpen] = useState(false);
  const mapCloseRef = useRef(null);

  const carouselImages = [
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3bb92b79-9adc-4d0e-9ab7-c099358e4cbc_1600w.jpg',
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f80d6202-1375-4283-9df0-29a1bffd342a_1600w.jpg',
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/992f4a9e-0417-4e7c-87ad-11feb107d62e_1600w.jpg',
    'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3981172b-3ad7-488d-a628-1f01dd7afdc3_1600w.jpg'
  ];

  const sponsorList = [
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/546cdd7f-e89a-4fcb-bff8-30f6094b3182_1600w.png', alt: 'Hyundai de Guaynabo', extraClass: 'scale-125 md:scale-150' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e2a7ddad-b283-4b77-b418-f83008325f19_800w.png', alt: 'Rankiao', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a57b336c-3617-4a21-b13d-9d9cb3875d9b_800w.png', alt: 'PRoud Fitwear', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5c8834b6-d152-4303-9aa5-f9a7fce58588_800w.jpg', alt: 'Noid Stilss', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cc5d6d3b-0910-4d3e-828e-5fd92b5eb761_800w.jpg', alt: 'Hyatt Regency Grand Reserve Puerto Rico', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/76caa1a5-d868-4970-921e-10201ad45924_800w.png', alt: 'Viva La Fitness', extraClass: '', isPremier: true },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/735cc44c-5fbb-48ab-9771-c20c510fbd78_800w.jpg', alt: 'B-One', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e37ba8c9-0204-45ee-92c5-44c678c90b6f_800w.png', alt: 'Princess Esthetics', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4d3ebb09-1699-4fb1-afff-f0d72fb59de4_800w.png', alt: 'Harpelini SunSalt', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4d3ad60d-caf7-4997-80b4-dd46548e6eeb_800w.png', alt: 'FitAid', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ceafe787-b8dc-4dc9-bc94-c005b8df67e5_800w.png', alt: 'CrossFit Puerto Rico', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/277b7222-ca3d-46b1-9d32-ca8bb3312fda_800w.jpg', alt: 'Jibaros Crossfit', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0b962302-57ae-4098-8b56-523f3bb72a44_800w.jpg', alt: 'Sponsor 12', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/508110e1-cfd8-4591-887f-b09e5787dd72_800w.jpg', alt: 'Sponsor 13', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cf28394f-efd9-4b69-9ae9-1657763ed462_800w.png', alt: 'VitaSport', extraClass: '' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/26746a6e-3233-4602-9b6a-1711924783c4_1600w.png', alt: 'FE Ropa Deportiva', extraClass: 'scale-125 md:scale-150' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c8db568f-0b66-4f94-b8d6-c7a82e82b8a4_1600w.jpg', alt: 'Glow Station Glitter Bar', extraClass: 'scale-125 md:scale-150' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30310331-9808-4d5e-b49e-76a912aa5a01_1600w.png', alt: 'Wing Stop', extraClass: 'scale-125 md:scale-150' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/750b1c06-a9ce-439d-8330-8622591c053a_1600w.png', alt: 'More Amor', extraClass: 'scale-125 md:scale-150' },
    { src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c30b9daf-f8fa-416a-bfde-2172abe1494f_1600w.png', alt: 'Cuidado y Vitalidad', extraClass: 'scale-125 md:scale-150' },
    // "Logo Diferente" - served untouched from /public/sponsors/logo-diferente.jpeg.
    // preserveOriginal: rendered exactly as supplied (no grayscale, no dimming, no scaling).
  {
src:'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/19868f28-402d-40bf-81cf-eb39ad0097a5_1600w.jpg',
  alt: 'ZALUT',
  extraClass: 'scale-125 md:scale-150',
  preserveOriginal: true
},
  ];

  const asArray = (value) => (Array.isArray(value) ? value : []);

  const eventMapHighlights = asArray(
    t('home.eventMap.highlights', { returnObjects: true })
  );

  const aboutExperienceItems = asArray(
    t('home.about.experienceItems', { returnObjects: true })
  );
  const aboutTyrItems = asArray(
    t('home.about.tyr.items', { returnObjects: true })
  );
  const aboutSchedule = asArray(
    t('home.about.schedule.items', { returnObjects: true })
  );

  // Scroll and Intersection Observer effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .card-hover, .dark-card-hover').forEach((el) => {
      if (!el.classList.contains('fade-in-up')) el.classList.add('fade-in-up');
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Countdown effect
  useEffect(() => {
    const cdDate = new Date('Dec 4, 2026 00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const dist = cdDate - now;

      if (dist < 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(dist / (1000 * 60 * 60 * 24));
      const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((dist % (1000 * 60)) / 1000);

      setTimeLeft({
        d: d < 10 ? `0${d}` : d,
        h: h < 10 ? `0${h}` : h,
        m: m < 10 ? `0${m}` : m,
        s: s < 10 ? `0${s}` : s
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Carousel auto-play effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  // Event map lightbox: close on Escape and lock page scroll while open
  useEffect(() => {
    if (!mapOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMapOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    if (mapCloseRef.current) mapCloseRef.current.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [mapOpen]);

  return (
    <div className="flex flex-col w-full animate-page-enter">
      <section className="min-h-[100svh] flex overflow-hidden bg-[#000000] pt-24 pb-12 relative items-center justify-center" id="hero">
        <div
          className="absolute inset-0 z-0 opacity-40 transform origin-top"
          id="hero-bg"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.4}px)` }}
        >
          <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=3269&auto=format&fit=crop" alt={t('home.hero.backgroundAlt')} className="w-full h-full object-cover" />
        </div>
        <div className="z-10 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent absolute top-0 right-0 bottom-0 left-0"></div>

        <div className="flex flex-col z-20 text-center w-full max-w-7xl mt-12 mr-auto ml-auto pr-6 pl-6 relative items-center">
          <h1 className="text-center mb-6 drop-shadow-2xl mt-12 md:mt-0">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8760da48-b048-4b11-a66f-72e5e6a71a71_1600w.png"
              alt={t('header.logoAlt')}
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="md:max-w-[450px] md:py-12 md:scale-150 w-full h-auto max-w-[85vw] object-contain mr-auto ml-auto pt-8 pb-8 scale-100"
            />
            <span className="sr-only">{t('header.logoAlt')}</span>
          </h1>

          <p className="fade-in-up md:text-5xl uppercase text-3xl text-[#FDFAF5] tracking-tight font-merriweather max-w-3xl mb-12 drop-shadow-md">
            {t('home.hero.tagline')}
          </p>

          <div className="fade-in-up stagger-1 flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-16 font-bebas" id="countdown">
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-md border border-[#01C9CF]/30 p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[130px] shadow-[0_0_15px_rgba(1,201,207,0.15)]">
              <span className="text-4xl md:text-7xl tracking-tight text-[#01C9CF]">{timeLeft.d}</span>
              <span className="text-xs md:text-lg text-[#FDFAF5]/80 uppercase tracking-widest mt-2">{t('home.hero.countdown.days')}</span>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-md border border-[#EB459A]/30 p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[130px] shadow-[0_0_15px_rgba(235,69,154,0.15)]">
              <span className="text-4xl md:text-7xl tracking-tight text-[#EB459A]">{timeLeft.h}</span>
              <span className="text-xs md:text-lg text-[#FDFAF5]/80 uppercase tracking-widest mt-2">{t('home.hero.countdown.hours')}</span>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-md border border-[#EB7A4B]/30 p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[130px] shadow-[0_0_15px_rgba(235,122,75,0.15)]">
              <span className="text-4xl md:text-7xl tracking-tight text-[#EB7A4B]">{timeLeft.m}</span>
              <span className="text-xs md:text-lg text-[#FDFAF5]/80 uppercase tracking-widest mt-2">{t('home.hero.countdown.minutes')}</span>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-md border border-[#FDFAF5]/30 p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[130px] shadow-[0_0_15px_rgba(253,250,245,0.1)]">
              <span className="text-4xl md:text-7xl tracking-tight text-[#FDFAF5]">{timeLeft.s}</span>
              <span className="text-xs md:text-lg text-[#FDFAF5]/80 uppercase tracking-widest mt-2">{t('home.hero.countdown.seconds')}</span>
            </div>
          </div>

          <div className="fade-in-up stagger-2 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <a href="#register" className="bg-[#EB459A] text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-5 hover:bg-[#01C9CF] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(235,69,154,0.4)] hover:shadow-[0_0_30px_rgba(1,201,207,0.6)] w-full sm:w-auto text-center rounded-lg">
              {t('home.hero.primaryCta')}
            </a>
            <a href="#about" className="bg-[#000000]/30 backdrop-blur-md border-2 border-[#FDFAF5]/50 text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-5 hover:bg-[#FDFAF5] hover:text-[#000000] hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center rounded-lg">
              {t('home.hero.secondaryCta')}
            </a>
          </div>
        </div>
      </section>

      <section className="md:py-32 overflow-hidden bg-[#FDFAF5] pt-24 pb-24" id="about">
        <div className="fade-in-up max-w-7xl mr-auto ml-auto pr-6 pl-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 gap-x-16 gap-y-16 items-center">
            <div className="stagger-1">
              <h2 className="font-bebas text-[#01C9CF] text-3xl tracking-tight uppercase mb-4 flex items-center gap-3">
                <span className="w-12 h-1 bg-[#01C9CF]"></span>
                {t('home.about.eyebrow')}
              </h2>
              <h3 className="md:text-7xl lg:text-8xl uppercase leading-[0.9] text-5xl text-[#000000] tracking-tighter font-anton mb-8">
                {t('home.about.titleLineOne')}
                <br />
                {t('home.about.titleLineTwo')}
              </h3>
              <p className="text-xl md:text-2xl text-[#000000]/70 mb-8 leading-relaxed font-medium">
                {t('home.about.description')}
              </p>

              <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 mb-10 w-full">
                <button
                  type="button"
                  onClick={() => setEventDetailsOpen((prev) => !prev)}
                  className="group flex-1 flex items-center justify-center gap-3 bg-[#000000] text-[#FDFAF5] font-bebas text-xl md:text-2xl tracking-wide uppercase px-6 py-4 rounded-xl hover:bg-[#01C9CF] transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(1,201,207,0.4)] hover:scale-[1.02] w-full"
                >
                  {t('home.about.detailsCta')}
                  <iconify-icon
                    icon="solar:alt-arrow-down-linear"
                    width="24"
                    height="24"
                    style={{ transform: eventDetailsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                  ></iconify-icon>
                </button>

                <Link
                  to="/gallery"
                  className="group flex-1 flex flex-col items-center justify-center bg-transparent border-2 border-[#EB459A] text-[#EB459A] font-bebas tracking-wide uppercase px-6 py-2 rounded-xl hover:bg-[#EB459A] hover:text-[#FDFAF5] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(235,69,154,0.4)] hover:scale-[1.02] text-center w-full min-h-[64px]"
                >
                  <span className="text-xl md:text-2xl leading-none mt-1">{t('home.about.galleryCtaTitle')}</span>
                  <span className="font-open text-[0.7rem] md:text-xs tracking-normal normal-case font-medium opacity-80 mt-1">{t('home.about.galleryCtaSubtitle')}</span>
                </Link>
              </div>

              <div
                style={{
                  maxHeight: eventDetailsOpen ? '2000px' : '0px',
                  opacity: eventDetailsOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginBottom: eventDetailsOpen ? '2.5rem' : '0px'
                }}
                className="bg-[#000000]/5 border border-[#000000]/10 rounded-2xl"
              >
                <div className="p-6 md:p-8 space-y-10">
                  <div>
                    <h4 className="font-bebas text-2xl tracking-tight text-[#01C9CF] uppercase mb-4 flex items-center gap-2">
                      <iconify-icon icon="solar:star-fall-bold-duotone" width="24" height="24"></iconify-icon>
                      {t('home.about.experienceTitle')}
                    </h4>
                    <ul className="space-y-3 text-lg text-[#000000]/80 font-medium">
                      {aboutExperienceItems.map((item, index) => (
                        <li key={`${item}-${index}`} className="flex items-start gap-3">
                          <iconify-icon icon="solar:check-circle-bold" className="text-[#01C9CF] mt-1 shrink-0" width="20"></iconify-icon>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl tracking-tight text-[#EB459A] uppercase mb-4 flex items-center gap-2">
                      <iconify-icon icon="solar:bag-heart-bold-duotone" width="24" height="24"></iconify-icon>
                      {t('home.about.tyr.title')}
                      <span className="text-sm font-open tracking-normal text-[#000000]/50 normal-case lowercase ml-2">
                        {t('home.about.tyr.noteLabel')}
                      </span>
                    </h4>
                    <ul className="space-y-3 text-lg text-[#000000]/80 font-medium mb-5">
                      {aboutTyrItems.map((item, index) => (
                        <li key={`${item}-${index}`} className="flex items-start gap-3">
                          <iconify-icon icon="solar:check-circle-bold" className="text-[#EB459A] mt-1 shrink-0" width="20"></iconify-icon>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-[#EB459A]/10 text-[#EB459A] p-4 rounded-xl text-base font-medium flex items-start gap-3">
                      <iconify-icon icon="solar:info-circle-bold" className="shrink-0 mt-0.5" width="20"></iconify-icon>
                      <p>{t('home.about.tyr.note')}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl tracking-tight text-[#EB7A4B] uppercase mb-4 flex items-center gap-2">
                      <iconify-icon icon="solar:calendar-date-bold-duotone" width="24" height="24"></iconify-icon>
                      {t('home.about.schedule.title')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {aboutSchedule.map((item, index) => (
                        <div key={`${item.day}-${index}`} className="bg-white/60 p-4 rounded-xl border border-[#000000]/5 shadow-sm hover:shadow-md transition-shadow">
                          <div className="font-bebas tracking-wide text-[#EB7A4B] text-xl mb-1">
                            {item.day}
                          </div>
                          <div className="text-[#000000]/80 font-medium leading-tight">
                            {item.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-bebas text-2xl tracking-tight uppercase">
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#01C9CF]/10 flex items-center justify-center text-[#01C9CF] group-hover:bg-[#01C9CF] group-hover:text-[#FDFAF5] transition-all duration-300">
                    <iconify-icon icon="solar:calendar-bold" width="32" height="32"></iconify-icon>
                  </div>
                  <span className="text-[#000000]">{t('home.about.facts.date')}</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#EB459A]/10 flex items-center justify-center text-[#EB459A] group-hover:bg-[#EB459A] group-hover:text-[#FDFAF5] transition-all duration-300">
                    <iconify-icon icon="solar:map-bold" width="32" height="32"></iconify-icon>
                  </div>
                  <span className="text-[#000000]">{t('home.about.facts.venue')}</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#EB7A4B]/10 flex items-center justify-center text-[#EB7A4B] group-hover:bg-[#EB7A4B] group-hover:text-[#FDFAF5] transition-all duration-300">
                    <iconify-icon icon="solar:users-group-rounded-bold" width="32" height="32"></iconify-icon>
                  </div>
                  <span className="text-[#000000]">{t('home.about.facts.licensedEvent')}</span>
                </div>
                <div className="flex group gap-x-4 gap-y-4 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#000000]/5 flex items-center justify-center text-[#000000] group-hover:bg-[#000000] group-hover:text-[#FDFAF5] transition-all duration-300">
                    <iconify-icon icon="solar:cup-first-bold" width="32" height="32"></iconify-icon>
                  </div>
                  <span className="text-[#000000]">{t('home.about.facts.elitePrizes')}</span>
                </div>
              </div>
            </div>
            <div className="relative group stagger-2">
              <div className="absolute -inset-4 bg-[#EB7A4B] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700 rounded-full"></div>

              <div className="relative z-10 w-full h-[600px] rounded-3xl shadow-2xl overflow-hidden group-hover:shadow-[0_20px_50px_rgba(235,122,75,0.2)] transition-all duration-700">
                <div className="relative w-full h-full bg-[#000000]">
                  {carouselImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={t('home.about.carouselAlt', { number: idx + 1 })}
                      className={`carousel-img origin-center w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0 ${activeSlide === idx ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-10 left-0 right-0 flex justify-center items-center gap-2 z-30">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`rounded-full transition-all duration-300 carousel-dot ${activeSlide === idx ? 'bg-[#EB7A4B] w-8 h-2' : 'bg-[#000000]/20 w-2 h-2 hover:bg-[#EB7A4B]/50'}`}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={t('home.about.carouselSlideLabel', { number: idx + 1 })}
                  ></button>
                ))}
              </div>

              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#01C9CF] rounded-full z-20 hidden md:flex items-center justify-center shadow-xl animate-bounce-slow hover:scale-110 hover:shadow-[0_0_30px_rgba(1,201,207,0.6)] transition-all duration-500 cursor-default">
                <span className="font-anton text-5xl text-[#FDFAF5] -rotate-12 tracking-tight">
                  {t('home.about.yearBadge')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="event-map" aria-labelledby="event-map-title" className="py-24 md:py-32 bg-[#000000] text-[#FDFAF5] overflow-hidden relative">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#01C9CF]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#EB459A]/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 fade-in-up text-center lg:text-left">
              <h2 className="font-bebas text-[#EB7A4B] text-3xl tracking-tight uppercase mb-2">
                {t('home.eventMap.eyebrow')}
              </h2>
              <h3 id="event-map-title" className="font-anton text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9] mb-6">
                {t('home.eventMap.titlePrefix')} <span className="text-[#01C9CF]">{t('home.eventMap.titleHighlight')}</span>
              </h3>
              <p className="text-lg md:text-xl text-[#FDFAF5]/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {t('home.eventMap.description')}
              </p>

              <ul className="grid grid-cols-2 gap-3 mb-10 max-w-xl mx-auto lg:mx-0 text-left">
                {eventMapHighlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-[#FDFAF5]/5 border border-[#FDFAF5]/10 rounded-xl px-4 py-3 text-sm md:text-base font-medium text-[#FDFAF5]/90">
                    <iconify-icon icon="solar:map-point-bold" width="22" height="22" style={{ color: ['#01C9CF', '#EB459A', '#EB7A4B', '#FDFAF5'][i % 4] }} className="shrink-0"></iconify-icon>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="inline-flex items-center justify-center gap-3 font-bebas text-2xl tracking-wide uppercase bg-[#01C9CF] text-[#000000] rounded-lg px-8 py-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(1,201,207,0.5)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#01C9CF]/50 w-full sm:w-auto"
              >
                <iconify-icon icon="solar:maximize-square-bold" width="26" height="26"></iconify-icon>
                {t('home.eventMap.openMap')}
              </button>
            </div>

            <div className="lg:col-span-7 fade-in-up stagger-2">
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                aria-label={t('home.eventMap.openMap')}
                className="group relative block w-full rounded-3xl overflow-hidden border border-[#FDFAF5]/15 bg-[#FDFAF5]/5 p-2 md:p-3 shadow-[0_30px_80px_rgba(1,201,207,0.15)] cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-[#01C9CF]/50"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-h-[720px] mx-auto bg-[#111]">
                  <img
                    src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_1600w.png"
                    srcSet="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_800w.png 800w, https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_1600w.png 1600w"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    alt={t('home.eventMap.imageAlt')}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <span className="font-bebas text-lg md:text-xl tracking-widest uppercase text-[#FDFAF5]">
                      {t('home.eventMap.hint')}
                    </span>
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FDFAF5] text-[#000000] transition-transform duration-300 group-hover:scale-110 shrink-0">
                      <iconify-icon icon="solar:magnifer-zoom-in-bold" width="24" height="24"></iconify-icon>
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {mapOpen && createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t('home.eventMap.imageAlt')}
            className="fixed inset-0 z-[100] bg-[#000000]/95 backdrop-blur-sm flex flex-col"
            onClick={() => setMapOpen(false)}
          >
            <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-4 border-b border-[#FDFAF5]/10" onClick={(e) => e.stopPropagation()}>
              <span className="font-anton text-2xl md:text-3xl uppercase tracking-tight text-[#FDFAF5]">
                {t('home.eventMap.titlePrefix')} <span className="text-[#01C9CF]">{t('home.eventMap.titleHighlight')}</span>
              </span>
              <div className="flex items-center gap-2 md:gap-3">
                <a
                  href="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_3840w.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 font-bebas text-lg tracking-wide uppercase text-[#FDFAF5] border border-[#FDFAF5]/30 rounded-lg px-4 py-2 hover:bg-[#FDFAF5] hover:text-[#000000] transition-colors"
                >
                  <iconify-icon icon="solar:square-arrow-right-up-bold" width="20" height="20"></iconify-icon>
                  {t('home.eventMap.openInNewTab')}
                </a>
                <button
                  ref={mapCloseRef}
                  type="button"
                  onClick={() => setMapOpen(false)}
                  aria-label={t('home.eventMap.closeMap')}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FDFAF5] text-[#000000] hover:bg-[#EB459A] hover:text-[#FDFAF5] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#01C9CF]/60"
                >
                  <iconify-icon icon="solar:close-circle-bold" width="26" height="26"></iconify-icon>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center">
              <img
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_3840w.png"
                alt={t('home.eventMap.imageAlt')}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>,
          document.body
        )}
      </section>

      <section id="workouts" className="py-24 md:py-32 bg-[#FDFAF5] relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-[#01C9CF]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-[#EB459A]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[500px] py-12">
            <div className="text-center mb-12 fade-in-up">
              <h2 className="font-bebas text-[#EB459A] text-4xl tracking-tight uppercase mb-4 animate-[pulse_3s_ease-in-out_infinite]">
                {t('home.workouts.eyebrow')}
              </h2>
              <h3 className="font-anton text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-[#000000] relative drop-shadow-[0_0_20px_rgba(235,69,154,0.2)]">
                {t('home.workouts.title')}
                <br />
                <span className="text-[#01C9CF] drop-shadow-[0_0_30px_rgba(1,201,207,0.4)]">
                  {t('home.workouts.comingSoon')}
                </span>
                <span className="text-[#01C9CF]">.</span>
              </h3>
              <p className="text-2xl text-[#000000]/70 mt-8 font-bebas tracking-wide fade-in-up stagger-1">
                {t('home.workouts.description')}
              </p>
            </div>
            <Link
              to="/workouts"
              className="fade-in-up stagger-2 z-10 relative overflow-hidden group bg-[#000000] text-[#FDFAF5] font-bebas text-2xl tracking-wide uppercase px-12 py-5 rounded-xl hover:scale-[1.05] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_40px_rgba(1,201,207,0.5)] inline-flex items-center justify-center gap-3"
            >
              <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#EB459A] via-[#01C9CF] to-[#EB7A4B] opacity-0 absolute top-0 right-0 bottom-0 left-0"></div>
              <span className="z-10 text-[#FDFAF5] relative">{t('home.workouts.cta')}</span>
              <iconify-icon icon="solar:arrow-right-bold" width="24" height="24" className="relative z-10 group-hover:translate-x-1 transition-transform"></iconify-icon>
            </Link>
          </div>
        </div>
      </section>

      <WeekendItinerary />

      <EventDayPass />

      <section className="overflow-hidden bg-[#FDFAF5] border-[#000000]/5 border-b pt-12 pb-12 md:pt-24 md:pb-24" id="sponsors">
        <div className="max-w-7xl mx-auto px-6 fade-in-up mb-6 md:mb-16">
          <h2 className="text-center font-bebas text-4xl tracking-tight uppercase text-[#000000] mb-3">
            {t('home.sponsors.eyebrow')}
          </h2>
          <p className="text-center text-[#000000]/50 font-medium text-lg md:text-xl">
            {t('home.sponsors.description')}
          </p>
        </div>

        <div className="relative w-full overflow-hidden flex before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 md:before:w-32 before:bg-gradient-to-r before:from-[#FDFAF5] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 md:after:w-32 after:bg-gradient-to-l after:from-[#FDFAF5] after:to-transparent">
          <div className="animate-infinite-scroll gap-6 md:gap-24 pr-6 md:pr-24 py-4 md:py-8 items-center">
            <div className="flex items-center gap-6 md:gap-24 flex-nowrap">
              {sponsorList.map((sponsor, idx) => (
                <div key={idx} className="w-[150px] md:w-[260px] h-[80px] md:h-[120px] flex flex-col items-center justify-center shrink-0 relative">
                  {sponsor.isPremier && (
                    <span className="absolute -top-6 md:-top-8 text-[10px] md:text-[11px] font-bebas tracking-widest uppercase text-[#01C9CF] bg-[#01C9CF]/10 px-3 py-1 rounded-full border border-[#01C9CF]/20 whitespace-nowrap shadow-[0_0_10px_rgba(1,201,207,0.2)] z-10">
                      {t('home.sponsors.premierBadge')}
                    </span>
                  )}
                  {sponsor.Component ? (
                    <sponsor.Component
                      title={sponsor.alt}
                      className={`w-[90%] md:w-[95%] h-full max-h-[85%] md:max-h-[90%] text-[#000000] transition-all duration-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-[1.08] hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] ${sponsor.extraClass}`}
                    />
                  ) : (
                    <img
                      src={sponsor.src}
                      alt={sponsor.alt}
                      className={`w-[90%] md:w-[95%] h-full max-h-[85%] md:max-h-[90%] object-contain transition-all duration-500 ${
                        sponsor.preserveOriginal
                          ? 'grayscale-0 opacity-100'
                          : sponsor.isPremier
                            ? 'grayscale-0 opacity-100 scale-[1.15] hover:scale-[1.25] drop-shadow-[0_0_20px_rgba(1,201,207,0.25)]'
                            : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-[1.08] hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      } ${sponsor.extraClass}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 md:gap-24 flex-nowrap" aria-hidden="true">
              {sponsorList.map((sponsor, idx) => (
                <div key={`dup-${idx}`} className="w-[150px] md:w-[260px] h-[80px] md:h-[120px] flex flex-col items-center justify-center shrink-0 relative">
                  {sponsor.isPremier && (
                    <span className="absolute -top-6 md:-top-8 text-[10px] md:text-[11px] font-bebas tracking-widest uppercase text-[#01C9CF] bg-[#01C9CF]/10 px-3 py-1 rounded-full border border-[#01C9CF]/20 whitespace-nowrap shadow-[0_0_10px_rgba(1,201,207,0.2)] z-10">
                      {t('home.sponsors.premierBadge')}
                    </span>
                  )}
                  {sponsor.Component ? (
                    <sponsor.Component
                      title={sponsor.alt}
                      className={`w-[90%] md:w-[95%] h-full max-h-[85%] md:max-h-[90%] text-[#000000] transition-all duration-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-[1.08] hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] ${sponsor.extraClass}`}
                    />
                  ) : (
                    <img
                      src={sponsor.src}
                      alt={sponsor.alt}
                      className={`w-[90%] md:w-[95%] h-full max-h-[85%] md:max-h-[90%] object-contain transition-all duration-500 ${
                        sponsor.preserveOriginal
                          ? 'grayscale-0 opacity-100'
                          : sponsor.isPremier
                            ? 'grayscale-0 opacity-100 scale-[1.15] hover:scale-[1.25] drop-shadow-[0_0_20px_rgba(1,201,207,0.25)]'
                            : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-[1.08] hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      } ${sponsor.extraClass}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 md:mt-16 mb-4 fade-in-up relative z-20">
          <Link
            to="/featured-partners"
            className="group relative overflow-hidden bg-[#000000] text-[#FDFAF5] font-bebas text-2xl tracking-wide uppercase px-10 py-5 rounded-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(1,201,207,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#01C9CF] to-[#EB459A] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            <span className="relative z-10 flex items-center gap-3">
              {t('home.sponsors.cta')}
              <iconify-icon icon="solar:arrow-right-bold" width="24" height="24" className="group-hover:translate-x-1 transition-transform"></iconify-icon>
            </span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-12 md:mt-20 mb-4 fade-in-up relative z-10">
          <div className="bg-white border border-[#000000]/5 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center shadow-lg hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#01C9CF]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#01C9CF]/10 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EB459A]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#EB459A]/10 transition-colors duration-500"></div>

            <div className="flex-1 text-center md:text-right relative z-10">
              <div className="inline-flex items-center gap-2 mb-2 md:justify-end justify-center w-full">
                <iconify-icon icon="solar:star-fall-bold-duotone" className="text-[#01C9CF]" width="24" height="24"></iconify-icon>
                <h3 className="font-bebas text-3xl tracking-wide uppercase text-[#01C9CF] mt-1">{t('home.sponsors.spotlightTitle')}</h3>
              </div>
              <p className="text-lg text-[#000000]/60 font-medium max-w-[280px] ml-auto mr-auto md:mr-0 leading-snug">
                {t('home.sponsors.spotlightDescription')}
              </p>
            </div>

            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#000000]/10 to-transparent hidden md:block relative z-10"></div>

            <div className="flex-1 flex justify-center md:justify-start relative z-10 w-full md:w-auto">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/76caa1a5-d868-4970-921e-10201ad45924_800w.png" alt="Viva La Fitness" className="h-28 md:h-36 w-[95%] max-w-[300px] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Dedicated namespace on the existing i18next instance; follows the EN/ES switch.
import i18n from '../i18n/config';

i18n.addResourceBundle('en', 'eventDayPass', {
  eyebrow: 'Event Day Pass',
  title: 'Experience Guayaera',
  highlight: 'for the day.',
  description: 'Coming to Guayaera in Paradise 4? Secure your Day Pass and enjoy the event experience at Hyatt Regency Grand Reserve Puerto Rico.',
  cta: 'Get your Day Pass',
  note: 'View availability and pass details on Hyatt Experiences.',
  newTab: 'Opens in a new tab',
  location: 'Río Grande, Puerto Rico'
}, true, true);
i18n.addResourceBundle('es', 'eventDayPass', {
  eyebrow: 'Day Pass del evento',
  title: 'Vive Guayaera',
  highlight: 'por un día.',
  description: '¿Vienes a Guayaera in Paradise 4? Reserva tu Day Pass y disfruta la experiencia del evento en Hyatt Regency Grand Reserve Puerto Rico.',
  cta: 'Obtén tu Day Pass',
  note: 'Consulta disponibilidad y detalles del pase en Hyatt Experiences.',
  newTab: 'Abre en una pestaña nueva',
  location: 'Río Grande, Puerto Rico'
}, true, true);

function EventDayPass() {
  const { t } = useTranslation('eventDayPass');
  return (
    <section id="event-day-pass" aria-labelledby="event-day-pass-title" className="relative isolate overflow-hidden bg-[#000000] text-[#FDFAF5] py-16 md:py-24">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#01C9CF] via-[#EB459A] to-[#EB7A4B]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#01C9CF]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 -bottom-40 h-96 w-96 rounded-full bg-[#EB459A]/10 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-5 lg:gap-16 items-center">
        <div className="lg:col-span-3 min-w-0">
          <p className="font-bebas text-[#01C9CF] text-2xl tracking-widest uppercase mb-5">{t('eyebrow')}</p>
          <h2 id="event-day-pass-title" className="font-anton text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[1.1]">
            {t('title')}<br /><span className="text-[#EB7A4B]">{t('highlight')}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-[#FDFAF5]/75">{t('description')}</p>
        </div>
        <div className="lg:col-span-2 min-w-0 relative rounded-3xl border border-[#FDFAF5]/20 bg-[#FDFAF5]/5 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-7">
            <span className="font-bebas text-sm tracking-widest text-[#01C9CF] uppercase">Guayaera in Paradise 4</span>
            <iconify-icon aria-hidden="true" icon="solar:ticket-bold-duotone" width="32" height="32" className="text-[#EB7A4B] shrink-0"></iconify-icon>
          </div>
          <p className="font-bebas text-3xl leading-tight tracking-wide">Hyatt Regency<br />Grand Reserve Puerto Rico</p>
          <p className="mt-2 text-sm text-[#FDFAF5]/70">{t('location')}</p>
          <div className="border-t border-dashed border-[#FDFAF5]/20 my-7" />
          <a href="https://www.hyattexperiences.com/hyatt-regency/sjurc?eventId=01a0f3c4-4b73-7136-8b5d-732f23f55abe&icamp=property_page_menu_book_experiences" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#01C9CF] text-[#000000] px-5 py-4 text-center font-bebas text-2xl tracking-wide uppercase hover:bg-[#FDFAF5] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#01C9CF]">
            <span>{t('cta')}</span><span aria-hidden="true">↗</span><span className="sr-only"> ({t('newTab')})</span>
          </a>
          <p className="mt-4 text-center text-sm leading-relaxed text-[#FDFAF5]/65">{t('note')}</p>
        </div>
      </div>
    </section>
  );
}
