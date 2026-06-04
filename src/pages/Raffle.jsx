import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Raffle() {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    // Scroll-triggered fade-in animations (same pattern as other pages)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up, .card-hover, .dark-card-hover').forEach(el => {
      if (!el.classList.contains('fade-in-up')) el.classList.add('fade-in-up');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCheckout = async () => {
    setCheckoutError('');
    setIsCheckoutLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', { method: 'POST' });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Unable to create checkout session');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Unable to start Stripe Checkout:', error);
      setCheckoutError('Sorry, we could not start checkout. Please try again.');
      setIsCheckoutLoading(false);
    }
  };

  const steps = [
    { num: '1', title: 'Purchase your raffle entry', icon: 'solar:cart-large-bold-duotone', color: '#EB459A' },
    { num: '2', title: 'Receive your confirmation email', icon: 'solar:letter-bold-duotone', color: '#01C9CF' },
    { num: '3', title: 'Get your reservation number and QR validation', icon: 'solar:qr-code-bold-duotone', color: '#EB7A4B' },
    { num: '4', title: 'Keep your entry for the official raffle announcement', icon: 'solar:medal-ribbon-star-bold-duotone', color: '#EB459A' }
  ];

  const receiveItems = [
    { text: 'Official raffle entry', icon: 'solar:ticket-bold-duotone' },
    { text: 'Unique reservation number', icon: 'solar:hashtag-square-bold-duotone' },
    { text: 'QR validation link', icon: 'solar:qr-code-bold-duotone' },
    { text: 'Email confirmation', icon: 'solar:letter-bold-duotone' },
    { text: 'Valid entry status', icon: 'solar:verified-check-bold-duotone' }
  ];

  return (
    <div className="flex flex-col flex-grow bg-[#000000] animate-page-enter relative">

      {/* SECTION 1 — Hero */}
      <section className="pt-36 pb-20 md:pt-48 md:pb-28 relative overflow-hidden bg-[#000000]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EB459A]/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#01C9CF]/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text content */}
            <div className="text-center lg:text-left fade-in-up visible">
              <span className="font-bebas text-[#01C9CF] text-2xl tracking-widest uppercase mb-6 block drop-shadow-md">
                Guayaera Raffle
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-7xl text-[#FDFAF5] font-anton tracking-tighter uppercase mb-8 leading-[0.9]">
                Enter the <span className="text-[#EB459A]">Guayaera</span> Experience
              </h1>
              <h2 className="text-2xl md:text-3xl font-bebas tracking-wide text-[#EB7A4B] uppercase mb-6">
                Purchase your raffle entry and receive an official reservation number with QR validation by email.
              </h2>
              <p className="text-xl md:text-2xl text-[#FDFAF5]/70 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10">
                Each valid purchase will receive a unique reservation number and a private QR validation link.
              </p>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckoutLoading}
                className="inline-flex items-center justify-center gap-3 bg-[#EB459A] text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-5 hover:bg-[#01C9CF] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(235,69,154,0.4)] hover:shadow-[0_0_30px_rgba(1,201,207,0.6)] rounded-lg text-center disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                <iconify-icon icon="solar:ticket-bold-duotone" width="28" height="28"></iconify-icon>
                {isCheckoutLoading ? 'Redirecting...' : 'Buy Raffle Ticket'}
              </button>
              {checkoutError && (
                <p className="mt-4 text-base md:text-lg text-[#FDFAF5]/80 font-medium" role="alert">
                  {checkoutError}
                </p>
              )}
            </div>

            {/* Premium preview card */}
            <div className="relative fade-in-up stagger-1">
              <div className="absolute -inset-4 bg-[#01C9CF] opacity-20 blur-2xl rounded-full pointer-events-none"></div>

              <div className="relative z-10 bg-[#FDFAF5] rounded-3xl p-8 md:p-10 shadow-2xl border border-[#000000]/5 overflow-hidden group hover:shadow-[0_0_40px_rgba(1,201,207,0.3)] transition-all duration-500">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#01C9CF]/10 to-transparent rounded-bl-full pointer-events-none"></div>

                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="bg-[#EB459A]/10 text-[#EB459A] font-bebas text-sm px-4 py-1 uppercase tracking-widest rounded-full border border-[#EB459A]/20">
                    Official Raffle Entry
                  </span>
                  <iconify-icon icon="solar:ticket-bold-duotone" className="text-[#EB459A]" width="36" height="36"></iconify-icon>
                </div>

                <div className="border-t border-b border-[#000000]/10 py-6 mb-6 relative z-10">
                  <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 mb-1">
                    Reservation #
                  </div>
                  <div className="font-anton text-5xl md:text-6xl tracking-tighter text-[#000000] leading-none">
                    GP-0001
                  </div>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <iconify-icon icon="solar:verified-check-bold" className="text-[#01C9CF] shrink-0" width="28" height="28"></iconify-icon>
                    <span className="font-bebas text-2xl tracking-wide uppercase text-[#01C9CF]">
                      Status: Valid Entry
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <iconify-icon icon="solar:qr-code-bold-duotone" className="text-[#EB7A4B] shrink-0" width="28" height="28"></iconify-icon>
                    <span className="font-bebas text-2xl tracking-wide uppercase text-[#000000]/80">
                      QR Validation Included
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#000000]/40 font-medium mt-6 italic relative z-10">
                  * Visual preview only. Reservation numbers are generated after a valid purchase.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — How It Works */}
      <section className="py-24 md:py-32 bg-[#FDFAF5] relative overflow-hidden border-t border-[#000000]/10">
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-[#01C9CF]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-[#EB459A]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-bebas text-[#01C9CF] text-3xl tracking-tight uppercase mb-2">
              The Process
            </h2>
            <h3 className="font-anton text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-[#000000]">
              How It <span className="text-[#EB7A4B]">Works</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`bg-white border border-[#000000]/5 p-8 rounded-2xl card-hover fade-in-up flex flex-col items-start relative overflow-hidden group shadow-sm stagger-${(i % 3) + 1}`}
              >
                <div className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2" style={{ backgroundColor: step.color }}></div>

                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${step.color}1A`, color: step.color }}>
                    <iconify-icon icon={step.icon} width="32" height="32"></iconify-icon>
                  </div>
                  <span className="font-anton text-6xl leading-none opacity-10" style={{ color: step.color }}>
                    {step.num}
                  </span>
                </div>

                <p className="text-lg md:text-xl font-bebas tracking-wide uppercase text-[#000000] leading-tight">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* SECTION 3 — What You Receive */}
      <section className="py-24 md:py-32 bg-[#000000] text-[#FDFAF5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EB7A4B]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#01C9CF]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-bebas text-[#EB459A] text-3xl tracking-tight uppercase mb-2">
              Included
            </h2>
            <h3 className="font-anton text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9]">
              What You <span className="text-[#01C9CF]">Receive</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {receiveItems.map((item, i) => (
              <div
                key={i}
                className={`bg-[#FDFAF5]/5 border border-[#FDFAF5]/10 p-6 rounded-2xl dark-card-hover fade-in-up flex items-center gap-5 group stagger-${(i % 3) + 1}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#01C9CF]/10 flex items-center justify-center text-[#01C9CF] shrink-0 group-hover:bg-[#01C9CF] group-hover:text-[#000000] transition-all duration-300">
                  <iconify-icon icon={item.icon} width="32" height="32"></iconify-icon>
                </div>
                <span className="font-bebas text-2xl md:text-3xl tracking-wide uppercase text-[#FDFAF5]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Raffle Prize */}
      <section className="py-24 md:py-32 bg-[#FDFAF5] relative overflow-hidden">
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-[#EB459A]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-bebas text-[#EB7A4B] text-3xl tracking-tight uppercase mb-2">
              The Reward
            </h2>
            <h3 className="font-anton text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-[#000000]">
              Raffle <span className="text-[#EB459A]">Prize</span>
            </h3>
            <p className="text-xl md:text-2xl text-[#000000]/70 font-medium mt-6 max-w-2xl mx-auto leading-relaxed">
              Prize details will be announced here.
            </p>
          </div>

          {/* Placeholder area for a future prize photo or graphic */}
          <div className="fade-in-up stagger-1 relative aspect-[16/9] rounded-3xl overflow-hidden border-2 border-dashed border-[#000000]/15 bg-[#000000]/[0.02] flex flex-col items-center justify-center text-center p-8 group hover:border-[#EB459A]/40 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#01C9CF]/5 via-transparent to-[#EB459A]/5 pointer-events-none"></div>
            <div className="w-20 h-20 rounded-2xl bg-[#EB459A]/10 flex items-center justify-center text-[#EB459A] mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <iconify-icon icon="solar:gift-bold-duotone" width="44" height="44"></iconify-icon>
            </div>
            <span className="font-bebas text-3xl md:text-4xl tracking-wide uppercase text-[#000000]/40 relative z-10">
              Prize Reveal Coming Soon
            </span>
            <span className="font-open text-sm text-[#000000]/30 mt-2 relative z-10">
              Prize photo or graphic will be placed here
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Important Notes */}
      <section className="py-20 md:py-28 bg-[#000000] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-[#FDFAF5]/5 border border-[#EB459A]/20 rounded-3xl p-8 md:p-12 fade-in-up flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-[#EB459A]/10 flex items-center justify-center text-[#EB459A] shrink-0">
              <iconify-icon icon="solar:info-circle-bold-duotone" width="32" height="32"></iconify-icon>
            </div>
            <div className="space-y-5">
              <h3 className="font-bebas text-3xl tracking-wide uppercase text-[#EB459A]">
                Important Notes
              </h3>
              <p className="text-lg md:text-xl text-[#FDFAF5]/80 font-medium leading-relaxed">
                All raffle entries are subject to official rules and validation. Each valid purchase receives one unique reservation number and QR validation link by email.
              </p>
              <p className="text-lg md:text-xl text-[#FDFAF5]/80 font-medium leading-relaxed">
                Please keep your confirmation email for your records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Final CTA */}
      <section className="py-24 md:py-32 bg-[#01C9CF] relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FDFAF5]/20 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EB459A]/20 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 fade-in-up">
          <h2 className="font-anton text-5xl md:text-7xl tracking-tighter uppercase leading-[0.9] text-[#000000] mb-6 drop-shadow-sm">
            Ready to Enter?
          </h2>
          <p className="text-xl md:text-2xl text-[#000000]/70 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Purchase your raffle entry and receive your official confirmation by email.
          </p>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isCheckoutLoading}
            className="inline-flex items-center justify-center gap-3 bg-[#000000] text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-5 rounded-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            <iconify-icon icon="solar:ticket-bold-duotone" width="28" height="28"></iconify-icon>
            {isCheckoutLoading ? 'Redirecting...' : 'Buy Raffle Ticket'}
          </button>
          {checkoutError && (
            <p className="mt-4 text-lg text-[#000000]/70 font-medium" role="alert">
              {checkoutError}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
