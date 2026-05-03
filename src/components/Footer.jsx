import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <footer className="overflow-hidden text-[#FDFAF5] bg-[#000000] pt-24 pb-12 relative mt-auto" id="footer">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#01C9CF]/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          <div className="md:col-span-5 flex flex-col">
            <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/96828eb2-ec23-4a1b-92c0-735af0c8b914_320w.png" alt="Guayaera In Paradise 4" className="md:h-32 self-start w-auto h-24 object-contain mb-8 ml-4" />
            <p className="text-xl text-[#FDFAF5]/60 max-w-sm mb-8 leading-relaxed font-medium">
              The premier functional fitness competition in paradise. Test your
              limits, forge new friendships, and experience the ultimate
              throwdown.
            </p>
            <div className="flex gap-4">
            <a
  href="https://www.instagram.com/guayaera_in_paradise_4/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-14 h-14 rounded-full bg-[#FDFAF5]/10 flex items-center justify-center text-[#FDFAF5] hover:bg-[#EB459A] hover:scale-110 transition-all duration-300 shadow-lg"
>
  <iconify-icon icon="mdi:instagram" width="28" height="28"></iconify-icon>
</a>            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bebas text-3xl tracking-wide uppercase text-[#01C9CF] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4 text-xl text-[#FDFAF5]/70 font-medium">
              <li>
                <a href={isHome ? "#divisions" : "/#divisions"} className="hover:text-[#01C9CF] transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:alt-arrow-right-linear" width="20"></iconify-icon>
                  Divisiones
                </a>
              </li>
              <li>
                <a href={isHome ? "#workouts" : "/#workouts"} className="hover:text-[#01C9CF] transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:alt-arrow-right-linear" width="20"></iconify-icon>
                  Workouts
                </a>
              </li>
              <li>
                <a href={isHome ? "#sponsors" : "/#sponsors"} className="hover:text-[#01C9CF] transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:alt-arrow-right-linear" width="20"></iconify-icon>
                  Sponsors
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bebas text-3xl tracking-wide uppercase text-[#EB7A4B] mb-6">
              Contact & Location
            </h4>
            <ul className="space-y-5 text-lg text-[#FDFAF5]/80 font-medium">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-12 h-12 rounded-full bg-[#EB7A4B]/10 flex items-center justify-center shrink-0 text-[#EB7A4B]">
                  <iconify-icon icon="solar:map-point-bold" width="24" height="24"></iconify-icon>
                </div>
                <span className="leading-relaxed">
                  200 Coco Beach Blvd. Highway, 955-I, Río Grande, 00745, Puerto
                  Rico
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
          <p>© 2026 Guayaera In Paradise. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#FDFAF5] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FDFAF5] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}