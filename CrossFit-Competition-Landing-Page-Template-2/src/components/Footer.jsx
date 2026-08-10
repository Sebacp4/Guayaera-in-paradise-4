import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t } = useTranslation();

  return (
    <footer className="overflow-hidden text-[#FDFAF5] bg-[#000000] pt-24 pb-12 relative mt-auto" id="footer">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#01C9CF]/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          <div className="md:col-span-5 flex flex-col">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8760da48-b048-4b11-a66f-72e5e6a71a71_800w.png"
              alt={t('footer.logoAlt')}
              loading="lazy"
              className="md:h-32 self-start w-auto h-24 object-contain mb-8 ml-4 scale-150"
            />
            <p className="text-xl text-[#FDFAF5]/60 max-w-sm mb-8 leading-relaxed font-medium">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/guayaera_in_paradise_4/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-[#FDFAF5]/10 flex items-center justify-center text-[#FDFAF5] hover:bg-[#EB459A] hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label={t('footer.instagramLabel')}
              >
                <iconify-icon icon="mdi:instagram" width="28" height="28"></iconify-icon>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bebas text-3xl tracking-wide uppercase text-[#01C9CF] mb-6">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-4 text-xl text-[#FDFAF5]/70 font-medium">
              <li>
                <a href={isHome ? '#divisions' : '/#divisions'} className="hover:text-[#01C9CF] transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:alt-arrow-right-linear" width="20"></iconify-icon>
                  {t('footer.divisions')}
                </a>
              </li>
              <li>
                <a href={isHome ? '#workouts' : '/#workouts'} className="hover:text-[#01C9CF] transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:alt-arrow-right-linear" width="20"></iconify-icon>
                  {t('footer.workouts')}
                </a>
              </li>
              <li>
                <a href={isHome ? '#sponsors' : '/#sponsors'} className="hover:text-[#01C9CF] transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:alt-arrow-right-linear" width="20"></iconify-icon>
                  {t('footer.sponsors')}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bebas text-3xl tracking-wide uppercase text-[#EB7A4B] mb-6">
              {t('footer.contactLocation')}
            </h4>
            <ul className="space-y-5 text-lg text-[#FDFAF5]/80 font-medium">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-12 h-12 rounded-full bg-[#EB7A4B]/10 flex items-center justify-center shrink-0 text-[#EB7A4B]">
                  <iconify-icon icon="solar:map-point-bold" width="24" height="24"></iconify-icon>
                </div>
                <span className="leading-relaxed">
                  {t('footer.locationText')}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#EB7A4B]/10 flex items-center justify-center shrink-0 text-[#EB7A4B]">
                  <iconify-icon icon="solar:phone-bold" width="24" height="24"></iconify-icon>
                </div>
                <span className="text-xl">787 903 9363</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#EB7A4B]/10 flex items-center justify-center shrink-0 text-[#EB7A4B]">
                  <iconify-icon icon="solar:letter-bold" width="24" height="24"></iconify-icon>
                </div>
                <a href="mailto:guayaerainparadise@gmail.com" className="hover:text-[#EB7A4B] transition-colors break-all text-lg">
                  guayaerainparadise@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#FDFAF5]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-lg text-[#FDFAF5]/40 font-medium">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#FDFAF5] transition-colors">{t('footer.privacyPolicy')}</a>
            <a href="#" className="hover:text-[#FDFAF5] transition-colors">{t('footer.termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
