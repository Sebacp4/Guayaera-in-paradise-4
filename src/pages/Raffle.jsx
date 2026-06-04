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

      {/* SECTION 4 — Raffle Prizes Showcase */}
      <section className="py-24 md:py-32 bg-[#FDFAF5] relative overflow-hidden">
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-[#EB459A]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute left-0 bottom-1/3 w-96 h-96 bg-[#01C9CF]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-bebas text-[#EB7A4B] text-3xl md:text-4xl tracking-tight uppercase mb-2">
              The Rewards
            </h2>
            <h3 className="font-anton text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-[#000000] mb-6">
              Raffle <span className="text-[#EB459A]">Prizes</span>
            </h3>
            <p className="text-xl md:text-2xl text-[#000000]/80 font-medium mt-6 max-w-3xl mx-auto leading-relaxed">
              One entry. Three chances to win exclusive Guayaera in Paradise experiences.
            </p>
            <div className="mt-8">
              <span className="inline-block bg-[#01C9CF] text-[#000000] font-anton text-2xl md:text-3xl px-8 py-3 uppercase tracking-tight rounded-xl shadow-lg border-2 border-black/5 animate-bounce-slow">
                only $10 for entry
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Prize 1 - Featured (Desktop 7 cols) */}
            <div className="lg:col-span-7 fade-in-up stagger-1">
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#000000]/10 flex flex-col h-full card-hover group relative">
                <div className="absolute top-6 left-6 z-20">
                  <span className="bg-[#EB459A] text-white font-bebas text-2xl px-6 py-2 uppercase tracking-wider rounded-lg shadow-xl border border-white/20">
                    first price
                  </span>
                </div>
                <div className="aspect-[16/9] w-full overflow-hidden relative">
                  <img 
                    src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e244631-348e-4741-a4a4-843b0890805e_1600w.jpg" 
                    alt="Hotel Stay Image" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-8 right-8 text-white z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <iconify-icon icon="solar:star-bold-duotone" className="text-[#EB7A4B]" width="32" height="32"></iconify-icon>
                      <span className="font-bebas text-3xl uppercase tracking-wide drop-shadow-md">Vip experience</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-10">
                  <h4 className="font-anton text-4xl md:text-5xl text-[#000000] uppercase tracking-tighter mb-6 leading-tight">
                    Weekend stay <br className="hidden md:block" /> for 2 people
                  </h4>
                  <ul className="space-y-4 text-xl font-medium text-[#000000]/70 mb-8">
                    <li className="flex items-start gap-4">
                      <iconify-icon icon="solar:calendar-date-bold" className="text-[#EB459A] shrink-0 mt-1" width="24" height="24"></iconify-icon>
                      <span>Del 4 al 6 de diciembre</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <iconify-icon icon="solar:medal-ribbon-bold-duotone" className="text-[#01C9CF] shrink-0 mt-1" width="24" height="24"></iconify-icon>
                      <span>Entrada VIP a todos los eventos de Guayaera</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <iconify-icon icon="solar:parking-bold" className="text-[#EB7A4B] shrink-0 mt-1" width="24" height="24"></iconify-icon>
                      <span>Estacionamiento gratis</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <iconify-icon icon="solar:tea-cup-bold-duotone" className="text-[#01C9CF] shrink-0 mt-1" width="24" height="24"></iconify-icon>
                      <span>Desayunos incluidos</span>
                    </li>
                  </ul>
                  <div className="pt-6 border-t border-[#000000]/10 flex items-center justify-between">
                  
                    <div className="bg-[#000000] text-white p-4 rounded-xl shadow-lg -rotate-3 border border-white/10 group-hover:rotate-0 transition-transform">
                      <div className="font-bebas text-lg tracking-widest uppercase mb-1">VIP PASS</div>
                      <div className="font-anton text-2xl text-[#01C9CF]">INCLUDED</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prizes 2 & 3 - Side Stack (Desktop 5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-8 h-full">
              {/* Prize 2 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#000000]/10 flex flex-col h-full card-hover group stagger-2 relative">
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#01C9CF] text-black font-bebas text-xl px-4 py-1 uppercase tracking-wider rounded-lg shadow-md">
                    second price
                  </span>
                </div>
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 aspect-square md:aspect-auto overflow-hidden relative bg-[#000000]">
                    <img 
                      src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/76caa1a5-d868-4970-921e-10201ad45924_800w.png" 
                      alt="Viva La Fitness Gift Card" 
                      className="w-full h-full object-contain p-6 grayscale-0 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-max bg-[#EB459A] text-white px-3 py-1 font-bebas text-sm rounded shadow-lg uppercase tracking-widest">
                       Official Merch
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <h4 className="font-anton text-2xl md:text-3xl text-[#000000] uppercase tracking-tighter mb-4 leading-tight">
                      $300 certificate <br /> from Viva La Fitness
                    </h4>
                    <ul className="space-y-3 text-lg font-medium text-[#000000]/70 mb-2">
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#01C9CF] shrink-0 mt-1" width="20" height="20"></iconify-icon>
                        <span>Needs to be used on the event</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#01C9CF] shrink-0 mt-1" width="20" height="20"></iconify-icon>
                        <span>Includes oficial T-Shirt from the event</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Prize 3 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#000000]/10 flex flex-col h-full card-hover group stagger-3 relative">
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#EB7A4B] text-white font-bebas text-xl px-4 py-1 uppercase tracking-wider rounded-lg shadow-md">
                    third price
                  </span>
                </div>
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 aspect-square md:aspect-auto overflow-hidden relative bg-[#000000]/5">
                    <img 
                      src="https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=800&q=80" 
                      alt="Recovery Weekend photo package" 
                      className="absolute top-0 right-0 bottom-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-br from-[#EB7A4B]/10 via-transparent to-[#01C9CF]/10"></div>
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
                       <iconify-icon icon="solar:gallery-bold-duotone" className="text-[#EB7A4B] mb-2" width="48" height="48"></iconify-icon>
                       <div className="font-anton text-xl text-black/20 uppercase tracking-tighter leading-none">NOIDSTILL<br />PHOTOS</div>
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                    <h4 className="font-anton text-2xl md:text-3xl text-[#000000] uppercase tracking-tighter mb-4 leading-tight">
                      Recovery Weekend Pass + Photo Package
                    </h4>
                    <ul className="space-y-3 text-lg font-medium text-[#000000]/70">
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#EB7A4B] shrink-0 mt-1" width="20" height="20"></iconify-icon>
                        <span>1 Recovery Pass (B-One Wellness)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#EB7A4B] shrink-0 mt-1" width="20" height="20"></iconify-icon>
                        <span>1 Photo package (Noidstill)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" className="text-[#EB7A4B] shrink-0 mt-1" width="20" height="20"></iconify-icon>
                        <span>Photos at the hotel facilities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center fade-in-up stagger-3">
            <p className="text-xl md:text-2xl font-bebas tracking-wide uppercase text-[#000000]/60 mb-8 italic">
              * Raffle ends august 30.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckoutLoading}
              className="inline-flex items-center justify-center gap-4 bg-[#000000] text-[#FDFAF5] font-anton text-3xl md:text-5xl tracking-tighter uppercase px-16 py-8 hover:bg-[#EB459A] hover:scale-105 transition-all duration-500 shadow-2xl rounded-2xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#01C9CF] via-[#EB459A] to-[#EB7A4B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <span className="relative z-10 flex items-center gap-4">
                <iconify-icon icon="solar:ticket-bold-duotone" width="48" height="48"></iconify-icon>
                {isCheckoutLoading ? 'Redirecting...' : 'Buy Raffle Ticket'}
              </span>
            </button>
            {checkoutError && (
              <p className="mt-6 text-xl text-red-600 font-medium" role="alert">
                {checkoutError}
              </p>
            )}
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