      <section id="event-map" aria-labelledby="event-map-title" className="py-24 md:py-32 bg-[#000000] text-[#FDFAF5] overflow-hidden relative">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#01C9CF]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#EB459A]/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 fade-in-up text-center lg:text-left">
              <h2 className="font-bebas text-[#EB7A4B] text-3xl tracking-tight uppercase mb-2">
                {t('home.eventMap.eyebrow')}
              </h2>
              <h3 id="event-map-title" className="font-anton text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9] mb-6">
                {t('home.eventMap.titlePrefix')} <span className="text-[#01C9CF]">{t('home.eventMap.titleHighlight')}</span>
              </h3>
              <p className="text-lg md:text-xl text-[#FDFAF5]/70 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {t('home.eventMap.description')}
              </p>

              <ul className="grid grid-cols-2 gap-3 mb-10 max-w-xl mx-auto lg:mx-0 text-left">
                {eventMapHighlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 bg-[#FDFAF5]/5 border border-[#FDFAF5]/10 rounded-xl px-4 py-3 text-sm md:text-base font-medium text-[#FDFAF5]/90">
                    <iconify-icon icon="solar:map-point-bold" width="22" height="22" style={{ color: ['#01C9CF', '#EB459A', '#EB7A4B', '#FDFAF5'][i % 4] }} className="shrink-0"></iconify-icon>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="inline-flex items-center justify-center gap-3 font-bebas text-2xl tracking-wide uppercase bg-[#01C9CF] text-[#000000] rounded-lg px-8 py-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(1,201,207,0.5)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#01C9CF]/50 w-full sm:w-auto"
              >
                <iconify-icon icon="solar:maximize-square-bold" width="26" height="26"></iconify-icon>
                {t('home.eventMap.openMap')}
              </button>
            </div>

            <div className="lg:col-span-7 fade-in-up stagger-2">
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                aria-label={t('home.eventMap.openMap')}
                className="group relative block w-full rounded-3xl overflow-hidden border border-[#FDFAF5]/15 bg-[#FDFAF5]/5 p-2 md:p-3 shadow-[0_30px_80px_rgba(1,201,207,0.15)] cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-[#01C9CF]/50"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-h-[720px] mx-auto bg-[#111]">
                  <img
                    src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_1600w.png"
                    srcSet="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_800w.png 800w, https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_1600w.png 1600w"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    alt={t('home.eventMap.imageAlt')}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <span className="font-bebas text-lg md:text-xl tracking-widest uppercase text-[#FDFAF5]">
                      {t('home.eventMap.hint')}
                    </span>
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FDFAF5] text-[#000000] transition-transform duration-300 group-hover:scale-110 shrink-0">
                      <iconify-icon icon="solar:magnifer-zoom-in-bold" width="24" height="24"></iconify-icon>
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {mapOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t('home.eventMap.imageAlt')}
            className="fixed inset-0 z-[100] bg-[#000000]/95 backdrop-blur-sm flex flex-col"
            onClick={() => setMapOpen(false)}
          >
            <div className="flex items-center justify-between gap-3 px-4 md:px-8 py-4 border-b border-[#FDFAF5]/10" onClick={(e) => e.stopPropagation()}>
              <span className="font-anton text-2xl md:text-3xl uppercase tracking-tight text-[#FDFAF5]">
                {t('home.eventMap.titlePrefix')} <span className="text-[#01C9CF]">{t('home.eventMap.titleHighlight')}</span>
              </span>
              <div className="flex items-center gap-2 md:gap-3">
                <a
                  href="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_3840w.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 font-bebas text-lg tracking-wide uppercase text-[#FDFAF5] border border-[#FDFAF5]/30 rounded-lg px-4 py-2 hover:bg-[#FDFAF5] hover:text-[#000000] transition-colors"
                >
                  <iconify-icon icon="solar:square-arrow-right-up-bold" width="20" height="20"></iconify-icon>
                  {t('home.eventMap.openInNewTab')}
                </a>
                <button
                  ref={mapCloseRef}
                  type="button"
                  onClick={() => setMapOpen(false)}
                  aria-label={t('home.eventMap.closeMap')}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-[#FDFAF5] text-[#000000] hover:bg-[#EB459A] hover:text-[#FDFAF5] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#01C9CF]/60"
                >
                  <iconify-icon icon="solar:close-circle-bold" width="26" height="26"></iconify-icon>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-8 flex items-start justify-center">
              <img
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/8c1a5243-7654-4b80-9e11-ae37e85657f9_3840w.png"
                alt={t('home.eventMap.imageAlt')}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </section>
