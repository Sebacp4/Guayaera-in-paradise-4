import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function RaffleValidation() {
  const { code } = useParams();

  // TODO: Read validation code from URL params.
  // TODO: Fetch real raffle entry from Supabase using the private validation code.
  // TODO: Show valid entry if code exists.
  // TODO: Show invalid entry if code does not exist.
  // TODO: Show refunded/cancelled state if payment is refunded.

  useEffect(() => {
    // Scroll-triggered fade-in animations to match existing pages
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

  const displayCode = code || 'rf_SAMPLECODE';

  return (
    <div className="flex flex-col flex-grow bg-[#000000] animate-page-enter relative">
      <section className="pt-36 pb-24 md:pt-48 md:pb-32 relative overflow-hidden flex-grow flex flex-col items-center justify-center min-h-[75vh]">
        
        {/* Ambient Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#01C9CF]/15 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EB459A]/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col items-center text-center">
            
            {/* Header Area */}
            <div className="fade-in-up mb-10">
              <span className="font-bebas text-[#01C9CF] text-2xl tracking-widest uppercase mb-4 block drop-shadow-md">
                RAFFLE VALIDATION
              </span>
              <h1 className="text-5xl md:text-7xl text-[#FDFAF5] font-anton tracking-tighter uppercase mb-6 leading-[0.9]">
                Valid Raffle <span className="text-[#01C9CF]">Entry</span>
              </h1>
              <div className="inline-flex items-center gap-2 bg-[#01C9CF]/10 text-[#01C9CF] font-bebas text-xl md:text-2xl px-6 py-2 rounded-full border border-[#01C9CF]/30 shadow-[0_0_15px_rgba(1,201,207,0.2)]">
                <iconify-icon icon="solar:verified-check-bold" width="28" height="28"></iconify-icon>
                VALID ENTRY
              </div>
            </div>

            {/* Premium Validation Card */}
            <div className="fade-in-up stagger-1 w-full relative mb-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#01C9CF] via-[#EB459A] to-[#EB7A4B] rounded-[2rem] blur opacity-20 pointer-events-none"></div>
              
              <div className="relative bg-[#FDFAF5] rounded-3xl p-8 md:p-12 shadow-2xl border border-[#000000]/10 overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#01C9CF]/10 rounded-bl-full pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#000000]/10 pb-6 mb-6 gap-4">
                  <div>
                    <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 mb-1">
                      Reservation Number
                    </div>
                    <div className="font-anton text-4xl md:text-5xl tracking-tighter text-[#000000] leading-none">
                      GP-0001
                    </div>
                  </div>
                  <iconify-icon icon="solar:ticket-bold-duotone" className="text-[#01C9CF] hidden md:block opacity-20" width="64" height="64"></iconify-icon>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 mb-1">
                      Status
                    </div>
                    <div className="flex items-center gap-2 text-[#01C9CF] font-bebas text-2xl tracking-wide uppercase">
                      <iconify-icon icon="solar:verified-check-bold" width="24" height="24"></iconify-icon>
                      Valid Entry
                    </div>
                  </div>
                  <div>
                    <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 mb-1">
                      Purchase Date
                    </div>
                    <div className="text-[#000000]/80 font-bebas text-2xl tracking-wide uppercase">
                      May 10, 2026
                    </div>
                  </div>
                </div>

                <div className="bg-[#000000]/5 p-4 md:p-5 rounded-xl border border-[#000000]/10 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                   <div className="font-bebas text-sm tracking-widest uppercase text-[#000000]/50 shrink-0">
                      Validation Code
                   </div>
                   <div className="font-mono font-medium text-[#000000]/80 bg-white px-3 py-1.5 rounded border border-[#000000]/10 break-all text-sm md:text-base w-full md:w-auto text-center md:text-left">
                      {displayCode}
                   </div>
                </div>
              </div>
            </div>

            {/* Context & Notes */}
            <div className="fade-in-up stagger-2 space-y-4 max-w-2xl text-center mb-12">
              <p className="text-lg text-[#FDFAF5]/60 font-medium leading-relaxed">
                This page confirms that this raffle entry exists in the Guayaera in Paradise validation system.
              </p>
              <div className="bg-[#EB459A]/10 text-[#EB459A] text-sm md:text-base font-medium py-3 px-5 rounded-xl border border-[#EB459A]/20 inline-block">
                This is a sample validation preview. Real validation will be connected to the raffle database later.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="fade-in-up stagger-3">
              <Link 
                to="/raffle"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-[#FDFAF5]/20 text-[#FDFAF5] font-bebas text-xl md:text-2xl tracking-wide uppercase px-10 py-4 hover:border-[#01C9CF] hover:text-[#01C9CF] hover:bg-[#01C9CF]/5 hover:scale-105 transition-all duration-300 rounded-xl"
              >
                <iconify-icon icon="solar:arrow-left-bold" width="24" height="24"></iconify-icon>
                Back to Raffle
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}