import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RotatingGalleryCard = ({ images, onSelect, index, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const delay = index * 500;
    let timer;

    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }, 4500);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearInterval(timer);
    };
  }, [images.length, index]);

  return (
    <div
      className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group fade-in-up hover:shadow-[0_15px_35px_rgba(1,201,207,0.25)] transition-all duration-500 hover:-translate-y-1 bg-[#000000]"
      onClick={() => onSelect(images[activeIndex])}
    >
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={alt.replace('{{number}}', String(idx + 1))}
          className={`carousel-img absolute inset-0 w-full h-full object-cover origin-center ${idx === activeIndex ? 'active' : ''}`}
          loading="lazy"
        />
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none transition-opacity duration-300"></div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#01C9CF]/30 rounded-2xl z-30 transition-colors duration-500 pointer-events-none"></div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'w-6 bg-[#01C9CF] shadow-[0_0_8px_rgba(1,201,207,0.8)]' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Hotel() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();
  const dayPassItems = t('hotel.dayPass.items', { returnObjects: true });
  const experienceCards = t('hotel.experience.cards', { returnObjects: true });
  const experienceIcons = [
    'mingcute:tree-4-line',
    'solar:map-point-wave-bold-duotone',
    'solar:users-group-rounded-bold-duotone',
  ];
  const experienceColors = ['#01C9CF', '#EB459A', '#EB7A4B'];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .card-hover, .dark-card-hover').forEach((element) => {
      if (!element.classList.contains('fade-in-up')) element.classList.add('fade-in-up');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const gallerySets = [
    [
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/dda06416-0a01-4b44-8df7-fa87a45f9aef_1600w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/31a2eff4-2a22-4335-907c-50ed4b0b95c2_800w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/9060549d-7fed-49b9-8a0e-768db08e09fa_800w.jpg',
    ],
    [
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/9060549d-7fed-49b9-8a0e-768db08e09fa_1600w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0edaeeb3-8c17-4a0f-b8ac-1bea1b139f73_800w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8d71385f-17e5-4905-a116-6dbf144007fa_800w.jpg',
    ],
    [
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/323b7b66-80c3-420c-b86d-b40b01d049cc_800w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2abf391e-662c-4e1b-b8c6-3a9780ddbf53_1600w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/da261355-8161-4709-a4b2-3eda87423601_800w.jpg',
    ],
    [
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8964b721-1ecc-435a-a059-f749c7f70ec8_1600w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/da6429d1-d4b1-4c1a-bd7a-e0b6a4c01101_800w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/29c55be6-64b8-45f2-b68a-afd09f359920_800w.jpg',
    ],
    [
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/6e739217-e2b0-4af0-b47e-dc2ebe59f426_800w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/80a604bf-1dd2-468c-9ffd-04743b4bf17a_1600w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/05fa8ccb-ec2c-44bc-9e8a-5ddb2993c553_800w.jpg',
    ],
    [
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5f97bb0b-ba1d-48f6-b601-a4224774b149_1600w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/62c63ec7-7db1-4e9d-a51a-aa3a09528d37_800w.jpg',
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/670ffe1f-7de5-433d-9ac9-614359b30303_800w.jpg',
    ],
  ];

  return (
    <div className="flex flex-col flex-grow animate-page-enter bg-[#FDFAF5]">
      <section className="min-h-[90svh] flex overflow-hidden bg-[#000000] pt-24 pb-12 relative items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000&auto=format&fit=crop"
            alt="Hyatt Regency Grand Reserve"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="z-10 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-[#000000]/20 absolute inset-0"></div>

        <div className="flex flex-col fade-in-up text-center w-full max-w-5xl z-20 px-6 relative items-center visible">
          <span className="font-bebas text-[#01C9CF] text-2xl tracking-widest uppercase mb-4 block">{t('hotel.hero.eyebrow')}</span>
          <h1 className="text-6xl md:text-8xl text-[#FDFAF5] font-anton tracking-tighter uppercase mb-6 leading-[0.9] drop-shadow-lg">
            {t('hotel.hero.titlePrefix')} <span className="text-[#EB459A]">{t('hotel.hero.titleHighlight')}</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-bebas tracking-wide text-[#EB7A4B] uppercase mb-6 drop-shadow-md">
            {t('hotel.hero.subtitle')}
          </h2>
          <p className="text-xl md:text-2xl text-[#FDFAF5]/80 font-medium max-w-3xl mb-12 drop-shadow-md">
            {t('hotel.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-3xl">
            <a href="https://www.hyatt.com/events/en-US/group-booking/SJURC/G-CROS" target="_blank" rel="noopener noreferrer" className="md:text-3xl uppercase hover:bg-[#FDFAF5] hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(253,250,245,0.6)] sm:w-auto inline-flex justify-center items-center gap-3 text-2xl text-[#000000] tracking-wide font-bebas text-center bg-[#01C9CF] w-full rounded-lg pt-5 pr-8 pb-5 pl-8 shadow-[0_0_20px_rgba(1,201,207,0.4)]">
              <iconify-icon icon="solar:bed-bold-duotone" width="28" height="28"></iconify-icon>
              <span>{t('hotel.hero.stayCta')}</span>
            </a>
            <a href="#day-pass" className="bg-[#EB459A] text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-8 py-5 hover:bg-[#01C9CF] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(235,69,154,0.4)] hover:shadow-[0_0_30px_rgba(1,201,207,0.6)] w-full sm:w-auto text-center rounded-lg">
              {t('hotel.hero.dayPassCta')}
            </a>
            <a href="#gallery" className="md:text-3xl uppercase hover:bg-[#FDFAF5] hover:text-[#000000] hover:scale-105 transition-all duration-300 sm:w-auto text-2xl text-[#FDFAF5] tracking-wide font-bebas text-center bg-[#000000]/30 w-full border-[#FDFAF5]/50 border-2 rounded-lg px-8 py-5 backdrop-blur-md">
              {t('hotel.hero.galleryCta')}
            </a>
          </div>
        </div>
      </section>

      <section id="day-pass" className="md:py-32 overflow-hidden bg-[#FDFAF5] pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-up visible">
            <h2 className="font-bebas text-[#01C9CF] text-3xl tracking-tight uppercase mb-4 flex items-center justify-center gap-3">
              <span className="w-12 h-1 bg-[#01C9CF]"></span>
              {t('hotel.dayPass.eyebrow')}
              <span className="w-12 h-1 bg-[#01C9CF]"></span>
            </h2>
            <h3 className="font-anton text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-[#000000] mb-6">
              {t('hotel.dayPass.titlePrefix')} <br className="hidden md:block" />
              <span className="text-[#EB7A4B]">{t('hotel.dayPass.titleHighlight')}</span>
            </h3>
            <p className="text-xl md:text-2xl text-[#000000]/70 font-medium max-w-4xl mx-auto leading-relaxed">
              {t('hotel.dayPass.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 gap-x-6 gap-y-6">
            {dayPassItems.map((item, index) => (
              <div key={`${item}-${index}`} className="bg-white p-6 rounded-2xl shadow-sm border border-[#000000]/5 flex flex-col items-center text-center card-hover fade-in-up stagger-1 visible">
                {index === 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#01C9CF] mb-4">
                    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
                  </svg>
                ) : index === 1 ? (
                  <iconify-icon icon="solar:buildings-2-bold-duotone" className="text-[#01C9CF] mb-4" width="40" height="40"></iconify-icon>
                ) : index === 2 ? (
                  <iconify-icon icon="solar:microphone-bold-duotone" className="text-[#01C9CF] mb-4" width="40" height="40"></iconify-icon>
                ) : index === 3 ? (
                  <iconify-icon icon="solar:cup-hot-bold-duotone" className="text-[#01C9CF] mb-4" width="40" height="40"></iconify-icon>
                ) : index === 4 ? (
                  <iconify-icon icon="solar:chair-bold-duotone" className="text-[#01C9CF] mb-4" width="40" height="40"></iconify-icon>
                ) : index === 5 ? (
                  <iconify-icon icon="mingcute:tree-4-line" className="text-[#01C9CF] mb-4" width="40" height="40"></iconify-icon>
                ) : index === 6 ? (
                  <iconify-icon icon="lucide:umbrella" className="text-[#01C9CF] mb-4" width="40" height="40"></iconify-icon>
                ) : (
                  <iconify-icon icon="solar:stars-bold-duotone" className="text-[#01C9CF] mb-4" width="40" height="40"></iconify-icon>
                )}
                <h4 className="font-bebas text-2xl tracking-wide uppercase text-[#000000]">{item}</h4>
              </div>
            ))}
          </div>

          <div className="bg-[#EB459A]/10 border border-[#EB459A]/20 rounded-2xl p-6 md:p-8 flex items-start md:items-center gap-4 max-w-4xl mx-auto fade-in-up stagger-2 visible">
            <iconify-icon icon="solar:info-circle-bold-duotone" className="text-[#EB459A] shrink-0 mt-1 md:mt-0" width="32" height="32"></iconify-icon>
            <p className="md:text-xl text-lg font-medium text-[#000000]/80">
              <span className="font-bold text-[#EB459A]">{t('hotel.dayPass.noteLabel')}</span> {t('hotel.dayPass.note')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#000000] text-[#FDFAF5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EB7A4B]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#01C9CF]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-anton text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-[#FDFAF5] mb-6">
              {t('hotel.experience.titlePrefix')} <span className="text-[#EB459A]">{t('hotel.experience.titleHighlight')}</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#FDFAF5]/70 font-medium max-w-4xl mx-auto leading-relaxed">
              {t('hotel.experience.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {experienceCards.map((card, i) => (
              <div key={card.title} className="bg-[#FDFAF5]/5 border border-[#FDFAF5]/10 p-8 rounded-2xl dark-card-hover fade-in-up flex flex-col items-start relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2" style={{ backgroundColor: experienceColors[i] }}></div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${experienceColors[i]}22`, color: experienceColors[i] }}>
                  <iconify-icon icon={experienceIcons[i]} width="36" height="36"></iconify-icon>
                </div>
                <h3 className="font-bebas text-3xl tracking-wide uppercase mb-4 text-[#FDFAF5]">{card.title}</h3>
                <p className="text-lg text-[#FDFAF5]/60 font-medium">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center fade-in-up stagger-2">
            <a href="https://www.hyatt.com/events/en-US/group-booking/SJURC/G-CROS" className="inline-flex items-center justify-center gap-3 bg-[#01C9CF] text-[#000000] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-5 hover:bg-[#EB459A] hover:text-[#FDFAF5] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(1,201,207,0.4)] hover:shadow-[0_0_30px_rgba(235,69,154,0.6)] rounded-lg">
              <iconify-icon icon="solar:bed-bold-duotone" width="32" height="32" className="group-hover:scale-110 transition-transform"></iconify-icon>
              <span>{t('hotel.experience.stayCta')}</span>
            </a>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-24 md:py-32 bg-[#FDFAF5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-anton text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-[#000000] mb-4">
              {t('hotel.gallery.titlePrefix')} <span className="text-[#01C9CF]">{t('hotel.gallery.titleHighlight')}</span>
            </h2>
            <div className="inline-flex items-center gap-2 text-[#EB459A] font-bebas text-xl mt-4">
              <iconify-icon icon="solar:gallery-wide-bold" width="24" height="24"></iconify-icon>
              <span>{t('hotel.gallery.badge')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallerySets.map((imageSet, i) => (
              <RotatingGalleryCard key={i} images={imageSet} index={i} onSelect={setSelectedImage} alt={t('hotel.galleryAlt')} />
            ))}
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]/95 p-4 backdrop-blur-sm transition-opacity duration-300" onClick={() => setSelectedImage(null)}>
            <button className="absolute top-6 right-6 text-[#FDFAF5] hover:text-[#01C9CF] transition-colors z-[101] hover:scale-110 duration-300" aria-label={t('hotel.gallery.closeLabel')}>
              <iconify-icon icon="solar:close-circle-bold" width="48" height="48"></iconify-icon>
            </button>
            <img src={selectedImage} alt={t('hotel.gallery.expandedAlt')} className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-page-enter" />
          </div>
        )}
      </section>
    </div>
  );
}
