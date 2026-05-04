import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState({
    d: '00', h: '00', m: '00', s: '00'
  });

  const carouselImages = [
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3bb92b79-9adc-4d0e-9ab7-c099358e4cbc_1600w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f80d6202-1375-4283-9df0-29a1bffd342a_1600w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/992f4a9e-0417-4e7c-87ad-11feb107d62e_1600w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3981172b-3ad7-488d-a628-1f01dd7afdc3_1600w.jpg"
  ];

  const sponsorList = [
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e2a7ddad-b283-4b77-b418-f83008325f19_800w.png", alt: "Rankiao", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a57b336c-3617-4a21-b13d-9d9cb3875d9b_800w.png", alt: "PRoud Fitwear", extraClass: "scale-150" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5c8834b6-d152-4303-9aa5-f9a7fce58588_800w.jpg", alt: "Noid Stilss", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cc5d6d3b-0910-4d3e-828e-5fd92b5eb761_800w.jpg", alt: "Hyatt Regency Grand Reserve Puerto Rico", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/76caa1a5-d868-4970-921e-10201ad45924_800w.png", alt: "Viva La Fitness", extraClass: "", isPremier: true },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/735cc44c-5fbb-48ab-9771-c20c510fbd78_800w.jpg", alt: "B-One", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e37ba8c9-0204-45ee-92c5-44c678c90b6f_800w.png", alt: "Princess Esthetics", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4d3ebb09-1699-4fb1-afff-f0d72fb59de4_800w.png", alt: "Harpelini SunSalt", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4d3ad60d-caf7-4997-80b4-dd46548e6eeb_800w.png", alt: "FitAid", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ceafe787-b8dc-4dc9-bc94-c005b8df67e5_800w.png", alt: "CrossFit Puerto Rico", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/277b7222-ca3d-46b1-9d32-ca8bb3312fda_800w.jpg", alt: "Jibaros Crossfit", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0b962302-57ae-4098-8b56-523f3bb72a44_800w.jpg", alt: "Sponsor 12", extraClass: "" },
    { src: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/508110e1-cfd8-4591-887f-b09e5787dd72_800w.jpg", alt: "Sponsor 13", extraClass: "" }
  ];

  // Scroll and Intersection Observer effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .card-hover, .dark-card-hover').forEach(el => {
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

  return (
    <div className="flex flex-col w-full animate-page-enter">
      <section className="min-h-[100svh] flex overflow-hidden bg-[#000000] pt-24 pb-12 relative items-center justify-center" id="hero">
        <div 
          className="absolute inset-0 z-0 opacity-40 transform origin-top" 
          id="hero-bg"
          style={{ transform: `scale(1.1) translateY(${scrollY * 0.4}px)` }}
        >
          <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=3269&auto=format&fit=crop" alt="CrossFit Athlete" className="w-full h-full object-cover" />
        </div>
        <div className="z-10 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-transparent absolute top-0 right-0 bottom-0 left-0"></div>

        <div className="flex flex-col z-20 text-center w-full max-w-7xl mt-12 mr-auto ml-auto pr-6 pl-6 relative items-center">
          <h1 className="text-center mb-6 drop-shadow-2xl mt-12 md:mt-0">
            <img 
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8760da48-b048-4b11-a66f-72e5e6a71a71_1600w.png" 
              alt="Guayaera In Paradise 4" 
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="md:max-w-[450px] md:py-12 md:scale-150 w-full h-auto max-w-[85vw] object-contain mr-auto ml-auto pt-8 pb-8 scale-100" 
            />
            <span className="sr-only">Guayaera In Paradise 4</span>
          </h1>

          <p className="fade-in-up md:text-5xl uppercase text-3xl text-[#FDFAF5] tracking-tight font-merriweather max-w-3xl mb-12 drop-shadow-md">
            The Island Becomes Your Arena
          </p>

          <div className="fade-in-up stagger-1 flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-16 font-bebas" id="countdown">
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-md border border-[#01C9CF]/30 p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[130px] shadow-[0_0_15px_rgba(1,201,207,0.15)]">
              <span className="text-4xl md:text-7xl tracking-tight text-[#01C9CF]">{timeLeft.d}</span>
              <span className="text-xs md:text-lg text-[#FDFAF5]/80 uppercase tracking-widest mt-2">Days</span>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-md border border-[#EB459A]/30 p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[130px] shadow-[0_0_15px_rgba(235,69,154,0.15)]">
              <span className="text-4xl md:text-7xl tracking-tight text-[#EB459A]">{timeLeft.h}</span>
              <span className="text-xs md:text-lg text-[#FDFAF5]/80 uppercase tracking-widest mt-2">Hours</span>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-md border border-[#EB7A4B]/30 p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[130px] shadow-[0_0_15px_rgba(235,122,75,0.15)]">
              <span className="text-4xl md:text-7xl tracking-tight text-[#EB7A4B]">{timeLeft.m}</span>
              <span className="text-xs md:text-lg text-[#FDFAF5]/80 uppercase tracking-widest mt-2">Mins</span>
            </div>
            <div className="flex flex-col items-center bg-[#000000]/40 backdrop-blur-md border border-[#FDFAF5]/30 p-4 md:p-6 rounded-2xl min-w-[80px] md:min-w-[130px] shadow-[0_0_15px_rgba(253,250,245,0.1)]">
              <span className="text-4xl md:text-7xl tracking-tight text-[#FDFAF5]">{timeLeft.s}</span>
              <span className="text-xs md:text-lg text-[#FDFAF5]/80 uppercase tracking-widest mt-2">Secs</span>
            </div>
          </div>

          <div className="fade-in-up stagger-2 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <a href="#register" className="bg-[#EB459A] text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-5 hover:bg-[#01C9CF] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(235,69,154,0.4)] hover:shadow-[0_0_30px_rgba(1,201,207,0.6)] w-full sm:w-auto text-center rounded-lg">
              Secure Your Spot
            </a>
            <a href="#about" className="bg-[#000000]/30 backdrop-blur-md border-2 border-[#FDFAF5]/50 text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-5 hover:bg-[#FDFAF5] hover:text-[#000000] hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center rounded-lg">
              Event Details
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
                The Event
              </h2>
              <h3 className="md:text-7xl lg:text-8xl uppercase leading-[0.9] text-5xl text-[#000000] tracking-tighter font-anton mb-8">
                Welcome To
                <br />
                The Island
              </h3>
              <p className="text-xl md:text-2xl text-[#000000]/70 mb-8 leading-relaxed font-medium">
                Guayaera in Paradise 4 is a premier multi-day fitness experience
                that combines competition, community, and lifestyle in a
                world-class destination. Hosted at the Hyatt Regency Grand Reserve
                Puerto Rico, the event transforms the entire resort into a
                high-energy fitness festival where athletes from Puerto Rico and
                abroad compete across multiple divisions in a professionally
                organized environment.
              </p>

              <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 mb-10 w-full">
                <button 
                  type="button" 
                  onClick={() => setEventDetailsOpen(!eventDetailsOpen)}
                  className="group flex-1 flex items-center justify-center gap-3 bg-[#000000] text-[#FDFAF5] font-bebas text-xl md:text-2xl tracking-wide uppercase px-6 py-4 rounded-xl hover:bg-[#01C9CF] transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(1,201,207,0.4)] hover:scale-[1.02] w-full"
                >
                  View Full Event Experience
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
                  <span className="text-xl md:text-2xl leading-none mt-1">Relive Guayaera 3</span>
                  <span className="font-open text-[0.7rem] md:text-xs tracking-normal normal-case font-medium opacity-80 mt-1">Experience last year's energy</span>
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
                      Event Experience
                    </h4>
                    <ul className="space-y-3 text-lg text-[#000000]/80 font-medium">
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#01C9CF] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>Multiple competitive events and categories</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#01C9CF] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>Vendor and brand activation areas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#01C9CF] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>Community-focused activities and seminars</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#01C9CF] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>Wellness experiences and recovery zones</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#01C9CF] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>Social events connecting athletes, brands, and spectators</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl tracking-tight text-[#EB459A] uppercase mb-4 flex items-center gap-2">
                      <iconify-icon icon="solar:bag-heart-bold-duotone" width="24" height="24"></iconify-icon>
                      TYR Package
                      <span className="text-sm font-open tracking-normal text-[#000000]/50 normal-case lowercase ml-2">
                        (individual event only)
                      </span>
                    </h4>
                    <ul className="space-y-3 text-lg text-[#000000]/80 font-medium mb-5">
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#EB459A] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>TYR T-shirt</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#EB459A] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>TYR shoes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#EB459A] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>TYR sweat bands</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#EB459A] mt-1 shrink-0" width="20"></iconify-icon>
                        <span>Shorts (first 200 athletes)</span>
                      </li>
                    </ul>
                    <div className="bg-[#EB459A]/10 text-[#EB459A] p-4 rounded-xl text-base font-medium flex items-start gap-3">
                      <iconify-icon icon="solar:info-circle-bold" className="shrink-0 mt-0.5" width="20"></iconify-icon>
                      <p>
                        Note: Sizes cannot be changed after purchase. If
                        registration is transferred, the package remains assigned
                        to the original registrant.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bebas text-2xl tracking-tight text-[#EB7A4B] uppercase mb-4 flex items-center gap-2">
                      <iconify-icon icon="solar:calendar-date-bold-duotone" width="24" height="24"></iconify-icon>
                      Event Schedule
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white/60 p-4 rounded-xl border border-[#000000]/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-bebas tracking-wide text-[#EB7A4B] text-xl mb-1">
                          Thursday Dec 3
                        </div>
                        <div className="text-[#000000]/80 font-medium leading-tight">
                          Seminars and activities
                        </div>
                      </div>
                      <div className="bg-white/60 p-4 rounded-xl border border-[#000000]/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-bebas tracking-wide text-[#EB7A4B] text-xl mb-1">
                          Friday Dec 4
                        </div>
                        <div className="text-[#000000]/80 font-medium leading-tight">
                          Seminars and fun race (5PM)
                        </div>
                      </div>
                      <div className="bg-white/60 p-4 rounded-xl border border-[#000000]/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-bebas tracking-wide text-[#EB7A4B] text-xl mb-1">
                          Saturday Dec 5
                        </div>
                        <div className="text-[#000000]/80 font-medium leading-tight">
                          Individual Event
                        </div>
                      </div>
                      <div className="bg-white/60 p-4 rounded-xl border border-[#000000]/5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="font-bebas tracking-wide text-[#EB7A4B] text-xl mb-1">
                          Sunday Dec 6
                        </div>
                        <div className="text-[#000000]/80 font-medium leading-tight">
                          Teams Event
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-bebas text-2xl tracking-tight uppercase">
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#01C9CF]/10 flex items-center justify-center text-[#01C9CF] group-hover:bg-[#01C9CF] group-hover:text-[#FDFAF5] transition-all duration-300">
                    <iconify-icon icon="solar:calendar-bold" width="32" height="32"></iconify-icon>
                  </div>
                  <span className="text-[#000000]">Dec 04, 2026</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#EB459A]/10 flex items-center justify-center text-[#EB459A] group-hover:bg-[#EB459A] group-hover:text-[#FDFAF5] transition-all duration-300">
                    <iconify-icon icon="solar:map-bold" width="32" height="32"></iconify-icon>
                  </div>
                  <span className="text-[#000000]">Coco Beach PR</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#EB7A4B]/10 flex items-center justify-center text-[#EB7A4B] group-hover:bg-[#EB7A4B] group-hover:text-[#FDFAF5] transition-all duration-300">
                    <iconify-icon icon="solar:users-group-rounded-bold" width="32" height="32"></iconify-icon>
                  </div>
                  <span className="text-[#000000]">Licensed Event</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-2xl bg-[#000000]/5 flex items-center justify-center text-[#000000] group-hover:bg-[#000000] group-hover:text-[#FDFAF5] transition-all duration-300">
                    <iconify-icon icon="solar:cup-first-bold" width="32" height="32"></iconify-icon>
                  </div>
                  <span className="text-[#000000]">Elite Prizes</span>
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
                      alt={`Event Action ${idx + 1}`} 
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
                    aria-label={`Slide ${idx + 1}`}
                  ></button>
                ))}
              </div>

              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#01C9CF] rounded-full z-20 hidden md:flex items-center justify-center shadow-xl animate-bounce-slow hover:scale-110 hover:shadow-[0_0_30px_rgba(1,201,207,0.6)] transition-all duration-500 cursor-default">
                <span className="font-anton text-5xl text-[#FDFAF5] -rotate-12 tracking-tight">
                  YEAR 4
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="divisions" className="py-24 md:py-32 bg-[#000000] text-[#FDFAF5] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="font-bebas text-[#EB7A4B] text-3xl tracking-tight uppercase mb-2">
              Categories
            </h2>
            <h3 className="font-anton text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9]">
              Choose Your <span className="text-[#01C9CF]">Division</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'RX',
                color: '#EB459A',
                stagger: 'stagger-1',
                desc: 'For elite competitors who can handle any movement and heavy loads as prescribed.',
                features: ['Muscle Ups (Ring/Bar)', 'Handstand Walks', 'Heavy Olympic Lifts']
              },
              {
                title: 'Intermediate',
                color: '#EB7A4B',
                stagger: 'stagger-2',
                desc: 'Proficient in most movements but may struggle with high volume high-skill gymnastics.',
                features: ['Pull-ups / T2B', 'HSPU (Kipping)', 'Moderate Loads']
              },
              {
                title: 'Beginners',
                color: '#01C9CF',
                stagger: 'stagger-3',
                desc: 'First time competing? This is for you. Focus on fun, effort, and simple mechanics.',
                features: ['Ring Rows', 'Single Unders', 'Lighter Loads']
              },
              {
                title: 'Scale',
                color: '#FDFAF5',
                stagger: 'stagger-1',
                desc: 'Intermediate level modified for accessibility. Less complex movements, challenging weights.',
                features: ['Modified Gymnastics', 'Light Olympic Lifts', 'Scaled Volume'],
                btnHoverText: 'text-[#000000]'
              },
              {
                title: 'Masters 39-44',
                color: '#EB459A',
                stagger: 'stagger-2',
                desc: 'For experienced competitors aged 39-44 ready to bring the heat with heavy loads.',
                features: ['Age Verified (39-44)', 'Prescribed Weights', 'Advanced Gymnastics']
              },
              {
                title: 'Masters 45+',
                color: '#EB7A4B',
                stagger: 'stagger-3',
                desc: 'For veteran athletes 45 and over. Scaling options available for complex movements.',
                features: ['Age Verified (45+)', 'Modified Weights', 'Adjusted Volume']
              }
            ].map((div, i) => (
              <div key={i} className={`group bg-[#FDFAF5]/5 border border-[#FDFAF5]/10 p-8 flex flex-col dark-card-hover relative overflow-hidden rounded-2xl ${div.stagger} fade-in-up h-full`}>
                <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2`} style={{ backgroundColor: div.color }}></div>
                <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full blur-3xl transition-all duration-500 pointer-events-none`} style={{ backgroundColor: `${div.color}1A`, ...(i === 0 ? { groupHover: { backgroundColor: `${div.color}33`} } : {}) }}></div>
                <h4 className={`font-bebas text-4xl lg:text-5xl tracking-tight uppercase mb-4 group-hover:scale-105 transition-transform origin-left`} style={{ color: div.color }}>
                  {div.title}
                </h4>
                <div className={`flex flex-col mb-6 bg-[#000000]/40 p-5 rounded-xl border`} style={{ borderColor: `${div.color}33` }}>
                  <span className={`text-sm font-bebas tracking-widest uppercase mb-2`} style={{ color: div.color }}>
                    Early Bird 16% Off
                  </span>
                  <div className="flex items-end gap-3">
                    <span className="font-anton text-5xl text-[#FDFAF5] leading-none">$189</span>
                    <span className="text-xl text-[#FDFAF5]/50 line-through pb-0.5">$225</span>
                    <span className="text-sm text-[#FDFAF5]/60 pb-1 ml-auto font-bebas tracking-widest uppercase">USD</span>
                  </div>
                </div>
                <p className="text-lg text-[#FDFAF5]/60 mb-6">{div.desc}</p>
                <ul className="space-y-4 text-[#FDFAF5]/80 font-medium relative z-10 mb-8 flex-grow">
                  {div.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-4">
                      <iconify-icon icon="solar:check-circle-bold" width="24" height="24" style={{ color: div.color }}></iconify-icon>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`z-10 uppercase transition-all duration-300 ${div.btnHoverText || 'hover:text-[#FDFAF5]'} hover:scale-[1.02] text-xl tracking-wide font-bebas w-full border rounded-lg mt-auto pt-3.5 pr-6 pb-3.5 pl-6 relative cursor-pointer`}
                  style={{ 
                    backgroundColor: `${div.color}1A`, 
                    color: div.color, 
                    borderColor: `${div.color}4D`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = div.color;
                    e.currentTarget.style.color = div.title === 'Scale' || div.title === 'Beginners' ? '#000000' : '#FDFAF5';
                    e.currentTarget.style.boxShadow = `0 0 20px ${div.color}66`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${div.color}1A`;
                    e.currentTarget.style.color = div.color;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => window.location.href='https://circle21.events/guayaera-in-paradise?tab=divisions'}
                >
                  More Info
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workouts" className="py-24 md:py-32 bg-[#FDFAF5] relative overflow-hidden">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-[#01C9CF]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-[#EB459A]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[500px] py-12">
            <div className="text-center mb-12 fade-in-up">
              <h2 className="font-bebas text-[#EB459A] text-4xl tracking-tight uppercase mb-4 animate-[pulse_3s_ease-in-out_infinite]">
                The Tests
              </h2>
              <h3 className="font-anton text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-[#000000] relative drop-shadow-[0_0_20px_rgba(235,69,154,0.2)]">
                Workouts
                <br />
                <span className="text-[#01C9CF] drop-shadow-[0_0_30px_rgba(1,201,207,0.4)]">
                  Coming Soon
                </span>
                <span className="text-[#01C9CF] animate-[pulse_1.5s_ease-in-out_infinite]">...</span>
              </h3>
              <p className="text-2xl text-[#000000]/70 mt-8 font-bebas tracking-wide fade-in-up stagger-1">
                Stay tuned. Events will be announced soon.
              </p>
            </div>
<button
  onClick={() =>
    window.open(
      "https://www.instagram.com/guayaera_in_paradise_4/",
      "_blank",
      "noopener,noreferrer"
    )
  }
  className="fade-in-up stagger-2 z-10 relative overflow-hidden group bg-[#000000] text-[#FDFAF5] font-bebas text-2xl tracking-wide uppercase px-12 py-5 rounded-xl hover:scale-[1.05] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_40px_rgba(1,201,207,0.5)]"
>
  <div className="group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#EB459A] via-[#01C9CF] to-[#EB7A4B] opacity-0 absolute top-0 right-0 bottom-0 left-0"></div>
  <span className="z-10 text-[#FDFAF5] relative">Follow for updates</span>
</button>
          </div>
        </div>
      </section>

      <section id="register" className="md:py-32 overflow-hidden bg-[#01C9CF] pt-24 pb-24 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FDFAF5]/20 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EB459A]/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="font-bebas text-[#000000] text-4xl tracking-tight uppercase mb-2">
              Registration Open
            </h2>
            <h3 className="font-anton text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-[#FDFAF5] drop-shadow-md">
              Secure Your Spot
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Individual Card */}
            <div className="bg-[#FDFAF5] p-8 md:p-12 shadow-2xl flex flex-col rounded-3xl card-hover relative overflow-hidden stagger-1 fade-in-up group hover:shadow-[0_0_40px_rgba(253,250,245,0.4)] transition-all duration-500 border border-[#000000]/5">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#000000]/5 to-transparent rounded-bl-full group-hover:scale-110 transition-transform duration-500"></div>
              <div className="mb-6 relative z-10">
                <div className="flex flex-col gap-2 mb-2">
                  <span className="bg-[#EB459A]/10 text-[#EB459A] font-bebas text-sm px-4 py-1 uppercase tracking-widest rounded-full border border-[#EB459A]/20 w-max">
                    Early Bird 16% Off
                  </span>
                  <h4 className="font-bebas text-5xl tracking-tight uppercase text-[#000000]">
                    Individual
                  </h4>
                </div>
                <p className="text-lg text-[#000000]/60 font-medium">
                  All individual divisions included
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 font-bebas text-sm text-[#000000]/50 tracking-wider uppercase">
                  <span>RX</span>•<span>Intermediate</span>•<span>Beginners</span>•<span>Scale</span>•<span>Masters</span>
                </div>
              </div>

              <div className="mb-8 flex flex-col gap-1 relative z-10 border-t border-b border-[#000000]/5 py-6 bg-[#000000]/[0.02] -mx-8 md:-mx-12 px-8 md:px-12">
                <div className="flex items-end gap-3">
                  <span className="font-anton text-7xl tracking-tighter text-[#000000] leading-none">$189</span>
                  <span className="text-xl text-[#000000]/60 pb-1 font-bebas uppercase tracking-widest">USD</span>
                </div>
                <div className="flex items-center gap-3 text-[#000000]/50 font-medium">
                  <span className="line-through text-lg decoration-[#EB459A] decoration-2">$225</span>
                  <span className="text-sm uppercase tracking-wide">Original Price</span>
                </div>
              </div>

              <div className="mb-10 flex-grow relative z-10 flex flex-col">
                <h5 className="font-bebas text-2xl tracking-wide uppercase text-[#EB459A] mb-4 flex items-center gap-2">
                  <iconify-icon icon="solar:bag-heart-bold-duotone" width="24" height="24"></iconify-icon>
                  TYR package includes:
                </h5>
                <ul className="space-y-3 text-lg font-medium text-[#000000]/80 mb-6">
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="solar:check-circle-bold" width="24" height="24" className="text-[#EB459A] mt-0.5 shrink-0 drop-shadow-sm"></iconify-icon>
                    <span>TYR T-shirt of the event</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="solar:check-circle-bold" width="24" height="24" className="text-[#EB459A] mt-0.5 shrink-0 drop-shadow-sm"></iconify-icon>
                    <span>TYR shoes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="solar:check-circle-bold" width="24" height="24" className="text-[#EB459A] mt-0.5 shrink-0 drop-shadow-sm"></iconify-icon>
                    <span>TYR sweat bands</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="solar:check-circle-bold" width="24" height="24" className="text-[#EB459A] mt-0.5 shrink-0 drop-shadow-sm"></iconify-icon>
                    <span>Short pants (first 200 athletes that register)</span>
                  </li>
                </ul>
                <div className="mt-auto flex flex-col gap-2 text-sm leading-snug font-medium text-[#000000]/50 border-t border-[#000000]/10 pt-4">
                  <p className="flex items-start gap-2 italic">
                    <span className="text-[#EB459A] mt-0.5 font-bold">*</span>
                    <span>Only for individual event</span>
                  </p>
                  <p className="flex items-start gap-2 italic">
                    <span className="text-[#EB459A] mt-0.5 font-bold">*</span>
                    <span>Sizes cannot be changed after purchase. If registration is transferred, the package remains assigned to the original registrant.</span>
                  </p>
                  <p className="flex items-start gap-2 italic">
                    <span className="text-[#EB459A] mt-0.5 font-bold">*</span>
                    <span>All sales are final. No refunds.</span>
                  </p>
                </div>
              </div>

              <button className="uppercase hover:bg-[#EB459A] hover:scale-[1.02] transition-all duration-300 hover:shadow-[#EB459A]/40 z-10 text-3xl text-[#FDFAF5] tracking-wide font-bebas bg-[#000000] w-full rounded-xl pt-5 pb-5 relative shadow-xl cursor-pointer" onClick={() => window.location.href='https://circle21.events/guayaera-in-paradise?tab=info'}>
                Register Individual
              </button>
            </div>

            {/* Teams Card */}
            <div className="bg-[#000000] p-8 md:p-12 shadow-2xl flex flex-col text-[#FDFAF5] rounded-3xl card-hover relative overflow-hidden border-2 border-[#EB7A4B]/30 stagger-2 fade-in-up group hover:shadow-[0_0_40px_rgba(235,122,75,0.4)] transition-all duration-500 hover:border-[#EB7A4B]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#EB7A4B]/20 rounded-bl-full blur-3xl group-hover:bg-[#EB7A4B]/30 transition-colors duration-500 pointer-events-none"></div>
              <div className="absolute top-6 right-6 bg-[#EB7A4B] text-[#FDFAF5] font-bebas text-lg px-5 py-2 uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(235,122,75,0.5)] z-20">
                Most Popular
              </div>

              <div className="mb-6 mt-12 md:mt-0 relative z-10">
                <h4 className="uppercase text-5xl text-[#FDFAF5] tracking-tight font-bebas mb-2 drop-shadow-md">
                  Teams
                </h4>
                <p className="text-lg font-medium text-[#FDFAF5]/60">
                  Mixed Sex (MM/FF) (Sunday Event)
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 font-bebas text-sm text-[#FDFAF5]/50 tracking-wider uppercase">
                  <span>RX</span>•<span>Intermediate</span>•<span>Beginners</span>•<span>Teens</span>•<span>Masters</span>
                </div>
              </div>

              <div className="mb-8 flex flex-col items-center text-center relative z-10 border-t border-b border-[#EB7A4B]/20 py-10 -mx-8 md:-mx-12 px-8 md:px-12 bg-gradient-to-b from-[#FDFAF5]/[0.02] to-[#EB7A4B]/10 shadow-[inset_0_0_30px_rgba(235,122,75,0.1)]">
                <div className="bg-[#EB7A4B]/20 text-[#EB7A4B] font-bebas text-sm px-4 py-1.5 uppercase tracking-widest rounded-full border border-[#EB7A4B]/30 shadow-[0_0_15px_rgba(235,122,75,0.3)] mb-4">
                  Early Bird 37% Off
                </div>
                <span className="text-[#FDFAF5] font-bebas text-2xl tracking-wider uppercase mb-2">
                  Full Payment
                </span>
                <div className="flex items-end justify-center gap-3">
                  <span className="font-anton text-7xl tracking-tighter leading-none text-[#EB7A4B] drop-shadow-[0_0_20px_rgba(235,122,75,0.4)]">$375</span>
                  <span className="text-xl text-[#FDFAF5]/60 pb-1.5 font-bebas uppercase tracking-widest">USD</span>
                </div>
                <div className="flex items-center justify-center gap-3 mt-4 text-[#FDFAF5]/60 font-medium">
                  <span className="line-through decoration-[#EB7A4B] decoration-2 text-xl">$600</span>
                  <span className="text-sm uppercase tracking-wider">Original Price</span>
                </div>
              </div>

              <div className="mb-10 flex-grow relative z-10 flex flex-col">
                <h5 className="font-bebas text-2xl tracking-wide uppercase text-[#EB7A4B] mb-4 flex items-center gap-2">
                  <iconify-icon icon="solar:users-group-two-rounded-bold-duotone" width="24" height="24"></iconify-icon>
                  Team Competition Format
                </h5>
                <ul className="space-y-3 text-lg font-medium text-[#FDFAF5]/70">
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-[#EB7A4B] mt-1 shrink-0 opacity-80"></iconify-icon>
                    <span>Mixed Sex Teams (MM/FF)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-[#EB7A4B] mt-1 shrink-0 opacity-80"></iconify-icon>
                    <span>Multiple divisions available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-[#EB7A4B] mt-1 shrink-0 opacity-80"></iconify-icon>
                    <span>High-level competitive environment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <iconify-icon icon="solar:check-circle-bold" width="20" height="20" className="text-[#EB7A4B] mt-1 shrink-0 opacity-80"></iconify-icon>
                    <span>Official judging and structured format</span>
                  </li>
                </ul>
              </div>

              <button className="uppercase hover:bg-[#FDFAF5] hover:text-[#000000] hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,250,245,0.5)] z-10 text-3xl text-[#FDFAF5] tracking-wide font-bebas bg-[#EB7A4B] w-full rounded-xl pt-5 pb-5 relative shadow-[0_10px_20px_rgba(235,122,75,0.3)] cursor-pointer" onClick={() => window.location.href='https://circle21.events/guayaera-in-paradise?tab=info'}>
                Register Team
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#FDFAF5] border-[#000000]/5 border-b pt-12 pb-12 md:pt-24 md:pb-24" id="sponsors">
        <div className="max-w-7xl mx-auto px-6 fade-in-up mb-6 md:mb-16">
          <h2 className="text-center font-bebas text-4xl tracking-tight uppercase text-[#000000] mb-3">
            Supported By The Best
          </h2>
          <p className="text-center text-[#000000]/50 font-medium text-lg md:text-xl">
            Proud partners powering Guayaera in Paradise 4
          </p>
        </div>

        <div className="relative w-full overflow-hidden flex before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 md:before:w-32 before:bg-gradient-to-r before:from-[#FDFAF5] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 md:after:w-32 after:bg-gradient-to-l after:from-[#FDFAF5] after:to-transparent">
          <div className="animate-infinite-scroll gap-6 md:gap-24 pr-6 md:pr-24 py-4 md:py-8 items-center">
            <div className="flex items-center gap-6 md:gap-24 flex-nowrap">
              {sponsorList.map((sponsor, idx) => (
                <div key={idx} className="w-[150px] md:w-[260px] flex flex-col items-center justify-center shrink-0 relative">
                  {sponsor.isPremier && (
                    <span className="-top-10 text-[10px] md:text-[11px] uppercase whitespace-nowrap text-[#01C9CF] tracking-widest font-bebas bg-[#01C9CF]/10 border-[#01C9CF]/20 border rounded-full pt-1 pr-3 pb-1 pl-3 absolute shadow-[0_0_10px_rgba(1,201,207,0.2)] translate-y-3">
                      Premier Sponsor
                    </span>
                  )}
                  <img 
                    src={sponsor.src} 
                    alt={sponsor.alt} 
                    className={`md:h-20 transition-all duration-500 w-full h-14 object-contain ${
                      sponsor.isPremier 
                        ? 'grayscale-0 opacity-100 scale-[1.15] hover:scale-[1.25] drop-shadow-[0_0_20px_rgba(1,201,207,0.25)]' 
                        : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    } ${sponsor.extraClass}`} 
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 md:gap-24 flex-nowrap" aria-hidden="true">
              {sponsorList.map((sponsor, idx) => (
                <div key={`dup-${idx}`} className="w-[150px] md:w-[260px] flex flex-col items-center justify-center shrink-0 relative">
                  {sponsor.isPremier && (
                    <span className="absolute -top-10 text-[10px] md:text-[11px] font-bebas tracking-widest uppercase text-[#01C9CF] bg-[#01C9CF]/10 px-3 py-1 rounded-full border border-[#01C9CF]/20 whitespace-nowrap shadow-[0_0_10px_rgba(1,201,207,0.2)]">
                      Premier Sponsor
                    </span>
                  )}
                  <img 
                    src={sponsor.src} 
                    alt={sponsor.alt} 
                    className={`md:h-20 transition-all duration-500 w-full h-14 object-contain ${
                      sponsor.isPremier 
                        ? 'grayscale-0 opacity-100 scale-[1.15] hover:scale-[1.25] drop-shadow-[0_0_20px_rgba(1,201,207,0.25)]' 
                        : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    } ${sponsor.extraClass}`} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Sponsor Spotlight */}
        <div className="max-w-4xl mx-auto px-6 mt-8 md:mt-20 mb-4 fade-in-up">
          <div className="bg-white border border-[#000000]/5 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-center shadow-lg hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#01C9CF]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#01C9CF]/10 transition-colors duration-500"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EB459A]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#EB459A]/10 transition-colors duration-500"></div>
            
            <div className="flex-1 text-center md:text-right relative z-10">
              <div className="inline-flex items-center gap-2 mb-2 md:justify-end justify-center w-full">
                <iconify-icon icon="solar:star-fall-bold-duotone" className="text-[#01C9CF]" width="24" height="24"></iconify-icon>
                <h3 className="font-bebas text-3xl tracking-wide uppercase text-[#01C9CF] mt-1">Premier Sponsor</h3>
              </div>
              <p className="text-lg text-[#000000]/60 font-medium max-w-[280px] ml-auto mr-auto md:mr-0 leading-snug">
                Recognized as a leading sponsor of Guayaera in Paradise 4.
              </p>
            </div>
            
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#000000]/10 to-transparent hidden md:block relative z-10"></div>
            
            <div className="flex-1 flex justify-center md:justify-start relative z-10 w-full md:w-auto">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/76caa1a5-d868-4970-921e-10201ad45924_800w.png" alt="Viva La Fitness" className="h-20 md:h-28 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500 group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}