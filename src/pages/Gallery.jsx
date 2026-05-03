import { useState, useEffect } from 'react';

const GalleryItem = ({ src, onClick }) => (
  <div
    className="relative w-full aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl cursor-pointer group"
    onClick={() => onClick(src)}
  >
    <img 
      src={src} 
      alt="Guayaera in Paradise 3 Moment" 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      loading="lazy" 
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
      <span className="text-white font-bebas text-2xl tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 drop-shadow-md">
        View Moment
      </span>
    </div>
  </div>
);

// We use two identical inner blocks separated by exact padding 
// to create a mathematically flawless 50% translation loop without jumpy gaps.
const Column = ({ images, direction, hiddenClass, onImageClick }) => (
  <div className={`flex-1 h-full overflow-hidden relative ${hiddenClass}`}>
    <div className={`flex flex-col w-full h-max animate-scroll-${direction}`}>
      {/* Group 1 */}
      <div className="flex flex-col gap-4 pb-4 w-full">
        {images.map((src, i) => (
          <GalleryItem key={`g1-${i}`} src={src} onClick={onImageClick} />
        ))}
      </div>
      {/* Group 2 (Exact duplicate for seamless looping) */}
      <div className="flex flex-col gap-4 pb-4 w-full">
        {images.map((src, i) => (
          <GalleryItem key={`g2-${i}`} src={src} onClick={onImageClick} />
        ))}
      </div>
    </div>
  </div>
);

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => {
      if (!el.classList.contains('fade-in-up')) el.classList.add('fade-in-up');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Comprehensive list of unique assets gathered from the project
  const allUniqueImages = [
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/75068594-5bcb-4ac2-b96b-69029113e3ae_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d67c31f6-2ced-4ca2-9d01-be46dd305148_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a9923697-34b5-4861-80d9-7083628ca854_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ca923587-0b23-43e8-aea3-37cb1deaefa7_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1b646865-7167-483d-895f-ea92795c0750_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/389c6ec7-849d-426c-a9cf-897c5dba6717_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e867edd2-dc88-4b3a-a32d-996a01a1bdf8_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/44dacdd8-a6df-44d8-a00c-3867c1d6747a_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c39e0027-3b5b-4798-ad34-7b23f0aca3b2_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/87393380-29a4-4db4-8617-d21c5adf98c6_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ee0fef41-cd6c-4763-b8dc-d07cc3ec1977_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5f8e4b6f-864f-4bab-9017-2e1e01f22c0c_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/38a9b403-4212-410f-b15d-92a2f4ca6ad6_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/6ac17fdf-1b8b-4a57-9859-2e8e4c7ef803_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5aa19376-8f0f-4d17-bc7d-f76b337dab65_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/88091caa-3c51-48e1-bb43-8ec185821a8f_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a86d0283-b993-42a6-bfed-b1d11bd29465_800w.jpg",
    "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/835e052a-e35b-4229-9329-888b7506942f_800w.jpg"
  ];

  // Distribute the restored full gallery set across the 4 columns without reusing photos between columns
const col1 = allUniqueImages.slice(0, 5);
const col2 = allUniqueImages.slice(5, 10);
const col3 = allUniqueImages.slice(10, 14);
const col4 = allUniqueImages.slice(14, 18);

  return (
    <div className="flex flex-col flex-grow bg-[#000000] animate-page-enter">
      <section className="pt-36 pb-16 bg-[#000000] overflow-hidden relative border-b border-[#FDFAF5]/10">
        <div className="absolute top-0 left-0 right-0 w-full h-[500px] bg-gradient-to-b from-[#EB459A]/10 to-transparent pointer-events-none blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-6 text-center fade-in-up relative z-10 visible">
          <span className="font-bebas text-[#01C9CF] text-2xl tracking-widest uppercase mb-4 block">
            Gallery
          </span>
          <h1 className="text-6xl md:text-8xl text-[#FDFAF5] font-anton tracking-tighter uppercase mb-6 leading-none">
            Guayaera In <span className="text-[#EB459A]">Paradise 3</span>
          </h1>
          <h2 className="text-3xl font-bebas tracking-wide text-[#EB7A4B] uppercase mb-4">
            Relive the experience
          </h2>
          <p className="text-xl md:text-2xl text-[#FDFAF5]/70 font-medium">
            A look back at the energy, competition, community, and unforgettable moments from Guayaera in Paradise 3.
          </p>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#000000] flex-grow pt-4 pb-4">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#000000] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent z-20 pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto w-full px-4 h-[80vh] min-h-[600px] max-h-[900px] relative">
          <div className="flex gap-4 h-full w-full justify-center">
            <Column images={col1} direction="up" hiddenClass="" onImageClick={setSelectedImage} />
            <Column images={col2} direction="down" hiddenClass="" onImageClick={setSelectedImage} />
            <Column images={col3} direction="up" hiddenClass="hidden md:block" onImageClick={setSelectedImage} />
            <Column images={col4} direction="down" hiddenClass="hidden lg:block" onImageClick={setSelectedImage} />
          </div>
        </div>
      </section>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]/95 p-4 md:p-12 backdrop-blur-sm transition-opacity" 
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-[#FDFAF5] hover:text-[#EB459A] transition-colors z-[101] hover:scale-110"
            aria-label="Close Lightbox"
          >
            <iconify-icon icon="solar:close-circle-bold" width="48" height="48"></iconify-icon>
          </button>
          <img 
            src={selectedImage} 
            alt="Expanded Gallery View" 
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
}