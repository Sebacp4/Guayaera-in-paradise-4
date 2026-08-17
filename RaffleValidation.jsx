import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function RaffleValidation() {
  const { code } = useParams();
  const { t, i18n } = useTranslation();

  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entryItem) => {
        if (entryItem.isIntersecting) entryItem.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach((element) => {
      if (!element.classList.contains('fade-in-up')) element.classList.add('fade-in-up');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function validateEntry() {
      if (!code) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErrorMessage('');
        setNotFound(false);

        const response = await fetch(`/api/validate-raffle?code=${encodeURIComponent(code)}`);
        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.valid) {
          setNotFound(true);
          setEntry(null);
          return;
        }

        setEntry(data);
      } catch (error) {
        console.error('Error loading raffle validation:', error);
        setErrorMessage(t('raffleValidation.errorMessage'));
      } finally {
        setLoading(false);
      }
    }

    validateEntry();
  }, [code, t]);

  const status = entry?.status || '';
  const normalizedStatus = status.toLowerCase();
  const isRefunded = normalizedStatus === 'refunded' || normalizedStatus === 'cancelled' || normalizedStatus === 'canceled';
  const titleState = loading ? 'loading' : notFound ? 'invalid' : isRefunded ? 'cancelled' : 'valid';
  const badgeColor = notFound || isRefunded ? '#EB459A' : '#01C9CF';

  const formattedDate = entry?.created_at
    ? new Date(entry.created_at).toLocaleDateString(i18n.language === 'es' ? 'es-PR' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  const displayCode = entry?.validation_code || code || '—';

  return (
    <div className="flex flex-col flex-grow bg-[#000000] animate-page-enter relative">
      <section className="pt-36 pb-24 md:pt-48 md:pb-32 relative overflow-hidden flex-grow flex flex-col items-center justify-center min-h-[75vh]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#01C9CF]/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EB459A]/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col items-center text-center">
            <div className="fade-in-up mb-10">
              <span className="font-bebas text-[#01C9CF] text-2xl tracking-widest uppercase mb-4 block drop-shadow-md">
                {t('raffleValidation.eyebrow')}
              </span>

              <h1 className="text-5xl md:text-7xl text-[#FDFAF5] font-anton tracking-tighter uppercase mb-6 leading-[0.9]">
                {t(`raffleValidation.titleStates.${titleState}.prefix`)} <span className={titleState === 'cancelled' || titleState === 'invalid' ? 'text-[#EB459A]' : 'text-[#01C9CF]'}>{t(`raffleValidation.titleStates.${titleState}.highlight`)}</span>
              </h1>

              <div
                className="inline-flex items-center gap-2 font-bebas text-xl md:text-2xl px-6 py-2 rounded-full border shadow-[0_0_15px_rgba(1,201,207,0.2)]"
                style={{
                  color: badgeColor,
                  backgroundColor: `${badgeColor}1A`,
                  borderColor: `${badgeColor}4D`,
                }}
              >
                <iconify-icon
                  icon={titleState === 'valid' ? 'solar:verified-check-bold' : 'solar:close-circle-bold'}
                  width="28"
                  height="28"
                ></iconify-icon>
                {t(`raffleValidation.badgeStates.${titleState}`)}
              </div>
            </div>

            <div className="fade-in-up stagger-1 w-full relative mb-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#01C9CF] via-[#EB459A] to-[#EB7A4B] rounded-[2rem] blur opacity-20 pointer-events-none"></div>

              <div className="relative bg-[#FDFAF5] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#000000]/10 overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#01C9CF]/10 rounded-bl-full pointer-events-none"></div>

                {loading ? (
                  <div className="text-center py-10">
                    <div className="font-bebas text-3xl tracking-wide uppercase text-[#000000] mb-3">
                      {t('raffleValidation.loadingTitle')}
                    </div>
                    <p className="text-[#000000]/60 font-medium">
                      {t('raffleValidation.loadingDescription')}
                    </p>
                  </div>
                ) : errorMessage ? (
                  <div className="text-center py-10">
                    <div className="font-bebas text-3xl tracking-wide uppercase text-[#EB459A] mb-3">
                      {t('raffleValidation.errorTitle')}
                    </div>
                    <p className="text-[#000000]/60 font-medium">
                      {errorMessage}
                    </p>
                  </div>
                ) : notFound ? (
                  <div className="text-center py-10">
                    <div className="font-bebas text-3xl tracking-wide uppercase text-[#EB459A] mb-3">
                      {t('raffleValidation.notFoundTitle')}
                    </div>
                    <p className="text-[#000000]/60 font-medium leading-relaxed">
                      {t('raffleValidation.notFoundDescription')}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#000000]/10 pb-6 mb-6 gap-4">
                      <div>
                        <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 mb-1">
                          {t('raffleValidation.reservationLabel')}
                        </div>
                        <div className="font-anton text-4xl md:text-5xl tracking-tighter text-[#000000] leading-none">
                          {entry.reservation_number}
                        </div>
                      </div>
                      <iconify-icon icon="solar:ticket-bold-duotone" className="text-[#01C9CF] hidden md:block opacity-20" width="64" height="64"></iconify-icon>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                      <div>
                        <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 mb-1">
                          {t('raffleValidation.statusLabel')}
                        </div>
                        <div
                          className="flex items-center gap-2 font-bebas text-2xl tracking-wide uppercase"
                          style={{ color: badgeColor }}
                        >
                          <iconify-icon
                            icon={titleState === 'valid' ? 'solar:verified-check-bold' : 'solar:close-circle-bold'}
                            width="24"
                            height="24"
                          ></iconify-icon>
                          {isRefunded ? t('raffleValidation.cancelledEntry') : t('raffleValidation.validEntry')}
                        </div>
                      </div>

                      <div>
                        <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 mb-1">
                          {t('raffleValidation.purchaseDateLabel')}
                        </div>
                        <div className="text-[#000000]/80 font-bebas text-2xl tracking-wide uppercase">
                          {formattedDate}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#000000]/5 p-4 md:p-5 rounded-xl border border-[#000000]/10 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                      <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 shrink-0">
                        {t('raffleValidation.validationCodeLabel')}
                      </div>
                      <div className="font-mono font-medium text-[#000000]/80 bg-white px-3 py-1.5 rounded border border-[#000000]/10 break-all text-sm md:text-base w-full md:w-auto text-center md:text-left">
                        {displayCode}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="fade-in-up stagger-2 space-y-4 max-w-2xl text-center mb-12">
              <p className="text-lg text-[#FDFAF5]/60 font-medium leading-relaxed">
                {t('raffleValidation.pageDescription')}
              </p>
            </div>

            <div className="fade-in-up stagger-3">
              <Link
                to="/raffle"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#FDFAF5]/20 text-[#FDFAF5] font-bebas text-xl md:text-2xl tracking-wide uppercase px-10 py-4 hover:border-[#01C9CF] hover:text-[#01C9CF] hover:bg-[#01C9CF]/5 hover:scale-105 transition-all duration-300 rounded-xl"
              >
                <iconify-icon icon="solar:arrow-left-bold" width="24" height="24"></iconify-icon>
                {t('raffleValidation.backCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
