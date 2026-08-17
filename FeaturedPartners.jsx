import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FeaturedPartners() {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .card-hover').forEach((element) => {
      if (!element.classList.contains('fade-in-up')) element.classList.add('fade-in-up');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col flex-grow bg-[#000000] animate-page-enter relative">
      <section className="pt-36 pb-20 md:pt-48 md:pb-28 relative overflow-hidden bg-[#000000]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#01C9CF]/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EB459A]/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 fade-in-up visible">
          <span className="font-bebas text-[#01C9CF] text-2xl tracking-widest uppercase mb-6 block drop-shadow-md">
            {t('featuredPartners.hero.eyebrow')}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-[#FDFAF5] font-anton tracking-tighter uppercase mb-8 leading-[0.9]">
            {t('featuredPartners.hero.titlePrefix')} <span className="text-[#EB459A]">{t('featuredPartners.hero.titleHighlight')}</span> {t('featuredPartners.hero.titleSuffix')}
          </h1>
          <h2 className="text-2xl md:text-3xl font-bebas tracking-wide text-[#EB7A4B] uppercase mb-6">
            {t('featuredPartners.hero.subtitle')}
          </h2>
          <p className="text-xl md:text-2xl text-[#FDFAF5]/70 font-medium max-w-3xl mx-auto leading-relaxed">
            {t('featuredPartners.hero.description')}
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#FDFAF5] relative overflow-hidden border-t border-[#000000]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col fade-in-up stagger-1">
              <div className="mb-8 p-4 md:p-5 bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#000000]/5 w-max">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/76caa1a5-d868-4970-921e-10201ad45924_800w.png"
                  alt="Viva La Fitness"
                  className="h-28 md:h-36 max-w-[280px] object-contain"
                />
              </div>
              <h3 className="font-anton text-5xl md:text-7xl text-[#000000] uppercase tracking-tighter mb-6 leading-none">
                {t('featuredPartners.viva.titlePrefix')} <span className="text-[#01C9CF]">{t('featuredPartners.viva.titleHighlight')}</span>
              </h3>
              <p className="text-xl text-[#000000]/70 font-medium mb-10 leading-relaxed max-w-lg">
                {t('featuredPartners.viva.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://shopvivalafitness.myshopify.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#000000] text-[#FDFAF5] font-bebas text-2xl tracking-wide uppercase px-8 py-4 hover:scale-105 transition-transform duration-300 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                >
                  <iconify-icon icon="solar:global-bold-duotone" width="24" height="24"></iconify-icon>
                  {t('featuredPartners.common.visitWebsite')}
                </a>
                <a
                  href="https://www.instagram.com/vivalafitness_shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#000000]/20 text-[#000000] font-bebas text-2xl tracking-wide uppercase px-8 py-4 hover:border-[#01C9CF] hover:text-[#01C9CF] hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  <iconify-icon icon="mdi:instagram" width="24" height="24"></iconify-icon>
                  {t('featuredPartners.common.follow')}
                </a>
              </div>
            </div>

            <div className="relative fade-in-up stagger-2 grid grid-cols-2 gap-4 h-[500px] md:h-[600px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#01C9CF]/20 blur-[80px] rounded-full pointer-events-none z-0"></div>

              <div className="col-span-1 rounded-3xl overflow-hidden relative group shadow-lg z-10 h-full">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/6466268c-a2cc-4ed4-89fa-0b2148923502_800w.png"
                  alt="Viva La Fitness"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
              <div className="col-span-1 grid grid-rows-2 gap-4 h-full z-10">
                <div className="rounded-3xl overflow-hidden relative group shadow-lg h-full">
                  <img
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80"
                    alt="Viva La Fitness"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="group-hover:bg-black/20 transition-colors duration-300 bg-black/0 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/bd7ff393-3605-4ad6-97ba-2c51003742d9_800w.png)] bg-cover bg-center absolute top-0 right-0 bottom-0 left-0"></div>
                </div>
                <div className="rounded-3xl overflow-hidden relative group shadow-lg h-full">
                  <img
                    src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80"
                    alt="Viva La Fitness"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="group-hover:bg-black/20 transition-colors duration-300 bg-black/0 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c8214087-70eb-4043-83ab-9d82c1692ccb_800w.png)] bg-cover bg-center absolute top-0 right-0 bottom-0 left-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#000000] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative fade-in-up stagger-1 grid grid-cols-2 gap-4 h-[500px] md:h-[600px] w-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#EB7A4B]/20 blur-[80px] rounded-full pointer-events-none z-0"></div>

              <div className="col-span-1 grid grid-rows-2 gap-4 h-full z-10">
                <div className="rounded-3xl overflow-hidden relative group shadow-[0_10px_30px_rgba(235,122,75,0.15)] h-full">
                  <img
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80"
                    alt="VitaSport"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="group-hover:bg-transparent transition-colors duration-300 bg-[#000000]/10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b7c8ae5a-bab1-41d4-b601-d963d0d163a6_800w.png)] bg-cover bg-center absolute top-0 right-0 bottom-0 left-0"></div>
                </div>
                <div className="rounded-3xl overflow-hidden relative group shadow-[0_10px_30px_rgba(235,122,75,0.15)] h-full">
                  <img
                    src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80"
                    alt="VitaSport"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="group-hover:bg-transparent transition-colors duration-300 bg-[#000000]/10 bg-[url(https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/88a9acda-b474-4e4e-9fb4-271a2ee0b097_800w.png)] bg-cover bg-center absolute top-0 right-0 bottom-0 left-0"></div>
                </div>
              </div>
              <div className="col-span-1 rounded-3xl overflow-hidden relative group shadow-[0_10px_30px_rgba(235,122,75,0.15)] z-10 h-full">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f237f330-eea5-489a-8dbc-77234927bba4_800w.png"
                  alt="VitaSport"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#000000]/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
            </div>

            <div className="flex flex-col fade-in-up stagger-2 lg:pl-8">
              <div className="mb-8 p-4 md:p-5 bg-[#FDFAF5] rounded-3xl shadow-lg border border-[#000000]/5 w-max">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/cf28394f-efd9-4b69-9ae9-1657763ed462_800w.png"
                  alt="VitaSport"
                  className="h-28 md:h-36 max-w-[280px] object-contain"
                />
              </div>
              <h3 className="md:text-7xl uppercase leading-none text-5xl text-[#FDFAF5] tracking-tighter font-anton mb-6">
                {t('featuredPartners.vitaSport.titlePrefix')} <span className="text-[#EB7A4B]">{t('featuredPartners.vitaSport.titleHighlight')}</span>
              </h3>
              <p className="text-xl text-[#FDFAF5]/70 font-medium mb-10 leading-relaxed max-w-lg">
                {t('featuredPartners.vitaSport.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://vitasportpr.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGn1aZleXmmWpGTsS7s-J0ADZKLw4_LsBS2cb6G5RXD1EPsdNPBzEXMLHLXvk0_aem_TFRdC0PmmOTAP3ul1dkgIg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#EB7A4B] text-[#FDFAF5] font-bebas text-2xl tracking-wide uppercase px-8 py-4 hover:scale-105 transition-transform duration-300 rounded-xl shadow-[0_0_20px_rgba(235,122,75,0.3)] hover:shadow-[0_0_30px_rgba(235,122,75,0.5)]"
                >
                  <iconify-icon icon="solar:global-bold-duotone" width="24" height="24"></iconify-icon>
                  {t('featuredPartners.common.visitWebsite')}
                </a>
                <a
                  href="https://www.instagram.com/vitasportpr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#FDFAF5]/20 text-[#FDFAF5] font-bebas text-2xl tracking-wide uppercase px-8 py-4 hover:border-[#EB7A4B] hover:text-[#EB7A4B] hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  <iconify-icon icon="mdi:instagram" width="24" height="24"></iconify-icon>
                  {t('featuredPartners.common.follow')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#FDFAF5] relative overflow-hidden border-t border-[#000000]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col fade-in-up stagger-1">
              <div className="mb-8 p-4 md:p-5 bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#000000]/5 w-max">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ebc4e659-0bd0-4e9c-9a20-85bb3612c1a6_800w.png"
                  alt="Hyundai de Guaynabo"
                  className="h-28 md:h-36 max-w-[280px] object-contain"
                />
              </div>
              <h3 className="font-anton text-5xl md:text-7xl text-[#000000] uppercase tracking-tighter mb-6 leading-none">
                {t('featuredPartners.hyundai.titlePrefix')} <span className="text-[#01C9CF]">{t('featuredPartners.hyundai.titleHighlight')}</span>
              </h3>
              <p className="text-xl text-[#000000]/70 font-medium mb-10 leading-relaxed max-w-lg">
                {t('featuredPartners.hyundai.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.hyundaiguaynabo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#01C9CF] text-[#000000] font-bebas text-2xl tracking-wide uppercase px-8 py-4 hover:scale-105 transition-transform duration-300 rounded-xl shadow-[0_0_20px_rgba(1,201,207,0.3)] hover:shadow-[0_0_30px_rgba(1,201,207,0.5)]"
                >
                  <iconify-icon icon="solar:global-bold-duotone" width="24" height="24"></iconify-icon>
                  {t('featuredPartners.common.visitWebsite')}
                </a>
                <a
                  href="https://www.instagram.com/hyundaideguaynabo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#000000]/20 text-[#000000] font-bebas text-2xl tracking-wide uppercase px-8 py-4 hover:border-[#01C9CF] hover:text-[#01C9CF] hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  <iconify-icon icon="mdi:instagram" width="24" height="24"></iconify-icon>
                  {t('featuredPartners.common.follow')}
                </a>
              </div>
            </div>

            <div className="relative fade-in-up stagger-2 flex flex-col gap-6 z-10 w-full max-w-[500px] mx-auto lg:ml-auto lg:mr-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#01C9CF]/20 blur-[100px] rounded-full pointer-events-none z-0"></div>

              {/* Horizontal / Landscape Card (Top) */}
              <div className="rounded-3xl overflow-hidden relative group shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-10 w-full aspect-[16/9] shrink-0 border border-[#000000]/10 bg-white flex items-center justify-center">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c8342dcf-8750-4370-991c-4a0690a1943d_1600w.png"
                  alt="Hyundai Dealership Exterior and Service Center"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Vertical / Portrait Card (Bottom) */}
              <div className="rounded-3xl overflow-hidden relative group shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-10 w-full aspect-[4/5] md:aspect-[3/4] border border-[#000000]/10 bg-white">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/248b99c2-0474-4915-9a1b-741599cae869_1600w.png"
                  alt="Hyundai Performance"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#01C9CF] relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FDFAF5]/20 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EB459A]/20 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 fade-in-up">
          <h2 className="font-anton text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-[#000000] mb-6 drop-shadow-sm">
            {t('featuredPartners.closing.title')}
          </h2>
          <p className="text-xl md:text-2xl text-[#000000]/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('featuredPartners.closing.description')}
          </p>

          <Link
            to="/#sponsors"
            className="inline-flex items-center justify-center gap-3 bg-[#000000] text-[#FDFAF5] font-bebas text-2xl tracking-wide uppercase px-10 py-5 rounded-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          >
            <iconify-icon icon="solar:arrow-left-bold" width="24" height="24"></iconify-icon>
            {t('featuredPartners.closing.cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}
