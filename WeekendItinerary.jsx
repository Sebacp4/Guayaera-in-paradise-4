import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { itineraryDays, localize, toMinutes, totalActivities } from '../data/itinerary';

const hexToRgba = (hex, alpha) => {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function WeekendItinerary() {
  const { t, i18n } = useTranslation();
  const language = String(i18n.resolvedLanguage || i18n.language || 'en').startsWith('es') ? 'es' : 'en';
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  const days = useMemo(
    () =>
      itineraryDays.map((day) => ({
        ...day,
        // Stable sort keeps the official order for activities that share a start time.
        activities: day.activities
          .map((activity, order) => ({ ...activity, order }))
          .sort((a, b) => toMinutes(a.start) - toMinutes(b.start) || a.order - b.order),
      })),
    []
  );

  const activeDay = days[activeIndex];
  const accent = activeDay.accent;

  const selectDay = (index, focus = false) => {
    const next = (index + days.length) % days.length;
    setActiveIndex(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const handleTabKeyDown = (event, index) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectDay(index + 1, true);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectDay(index - 1, true);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectDay(0, true);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectDay(days.length - 1, true);
    }
  };

  const activityCountLabel = (count) =>
    `${count} ${count === 1 ? t('home.itinerary.activity') : t('home.itinerary.activities')}`;

  return (
    <section
      id="itinerary"
      aria-labelledby="itinerary-title"
      className="relative overflow-hidden bg-[#01C9CF] py-24 md:py-32"
    >
      {/* Keeps the hero CTA anchor working */}
      <span id="register" className="absolute top-0" aria-hidden="true"></span>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FDFAF5]/25 rounded-full blur-[110px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EB459A]/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      <div className="itin-grid-pattern absolute inset-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16 fade-in-up">
          <p className="inline-flex items-center gap-2 bg-[#000000] text-[#FDFAF5] font-bebas text-lg md:text-xl tracking-widest uppercase px-5 py-2 rounded-full shadow-lg mb-6">
            <iconify-icon icon="solar:calendar-bold-duotone" width="22" height="22" style={{ color: '#EB7A4B' }}></iconify-icon>
            {t('home.itinerary.eyebrow')}
          </p>
          <h2
            id="itinerary-title"
            className="font-anton text-5xl sm:text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-[#FDFAF5] drop-shadow-[0_4px_0_rgba(0,0,0,0.85)]"
          >
            Guayaera <span className="text-[#000000] drop-shadow-none">Weekend</span>
            <br />
            Itinerary
          </h2>
          <p className="mt-6 text-lg md:text-xl text-[#000000]/75 font-medium max-w-2xl mx-auto">
            {t('home.itinerary.description')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 font-bebas text-xl tracking-wider uppercase">
            <span className="bg-[#FDFAF5] text-[#000000] px-5 py-2 rounded-xl shadow-md">
              <span className="text-[#EB459A]">4</span> {t('home.itinerary.statDays')}
            </span>
            <span className="bg-[#FDFAF5] text-[#000000] px-5 py-2 rounded-xl shadow-md">
              <span className="text-[#EB7A4B]">{totalActivities}</span> {t('home.itinerary.activities')}
            </span>
            <span className="bg-[#000000] text-[#FDFAF5] px-5 py-2 rounded-xl shadow-md">
              {t('home.itinerary.dateRange')}
            </span>
          </div>
        </div>

        {/* Day selector cards */}
        <div
          role="tablist"
          aria-label={t('home.itinerary.selectDay')}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-10 fade-in-up stagger-1"
        >
          {days.map((day, index) => {
            const isActive = index === activeIndex;
            const first = day.activities[0];
            return (
              <button
                key={day.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`itinerary-tab-${day.id}`}
                aria-selected={isActive}
                aria-controls={`itinerary-panel-${day.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectDay(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`itin-day-card group relative overflow-hidden text-left rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border-2 transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#000000]/40 ${
                  isActive
                    ? 'bg-[#000000] text-[#FDFAF5] border-transparent -translate-y-1 md:-translate-y-2'
                    : 'bg-[#FDFAF5]/90 text-[#000000] border-[#000000]/10 hover:bg-[#FDFAF5] hover:-translate-y-1'
                }`}
                style={{
                  boxShadow: isActive
                    ? `0 24px 50px -18px ${hexToRgba(day.accent === '#FDFAF5' ? '#000000' : day.accent, 0.75)}, 0 0 0 2px ${hexToRgba(day.accent, 0.9)}`
                    : '0 10px 25px -15px rgba(0,0,0,0.35)',
                }}
              >
                <span
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500"
                  style={{ background: day.accent, opacity: isActive ? 0.35 : 0 }}
                  aria-hidden="true"
                ></span>

                <div className="relative flex items-start justify-between gap-2">
                  <div>
                    <span
                      className="block font-bebas text-lg sm:text-xl md:text-2xl tracking-widest uppercase leading-none"
                      style={{ color: isActive ? day.accent : '#000000' }}
                    >
                      {t(`home.itinerary.days.${day.id}.weekday`)}
                    </span>
                    <span className="block font-bebas text-sm md:text-base tracking-widest uppercase opacity-60 mt-1">
                      {t('home.itinerary.month')}
                    </span>
                  </div>
                  <span
                    className={`hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 ${
                      isActive ? 'rotate-0 scale-100' : '-rotate-45 scale-90 opacity-40 group-hover:opacity-100'
                    }`}
                    style={{
                      background: isActive ? day.accent : 'transparent',
                      color: '#000000',
                      border: isActive ? 'none' : '2px solid rgba(0,0,0,0.25)',
                    }}
                    aria-hidden="true"
                  >
                    <iconify-icon icon="solar:arrow-right-down-linear" width="18" height="18"></iconify-icon>
                  </span>
                </div>

                <span className="relative block font-anton text-6xl sm:text-7xl md:text-8xl leading-none tracking-tighter mt-2 md:mt-3">
                  {day.dayNumber}
                </span>

                <div className="relative mt-3 md:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 font-bebas text-base md:text-lg tracking-wider uppercase">
                  <span className={isActive ? 'text-[#FDFAF5]/80' : 'text-[#000000]/70'}>
                    {activityCountLabel(day.activities.length)}
                  </span>
                  <span className={isActive ? 'text-[#FDFAF5]/50' : 'text-[#000000]/45'}>
                    {t('home.itinerary.from')} {first.start}
                  </span>
                </div>

                <span className="relative mt-3 block h-1.5 w-full rounded-full overflow-hidden" aria-hidden="true" style={{ background: isActive ? 'rgba(253,250,245,0.12)' : 'rgba(0,0,0,0.08)' }}>
                  <span
                    className="block h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: isActive ? '100%' : `${Math.round((day.activities.length / 13) * 100)}%`,
                      background: day.accent === '#FDFAF5' && !isActive ? '#000000' : day.accent,
                    }}
                  ></span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active day panel */}
        <div
          role="tabpanel"
          id={`itinerary-panel-${activeDay.id}`}
          aria-labelledby={`itinerary-tab-${activeDay.id}`}
          className="relative bg-[#000000] text-[#FDFAF5] rounded-3xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] fade-in-up stagger-2"
        >
          <div
            className="absolute inset-x-0 top-0 h-1.5 transition-colors duration-500"
            style={{ background: `linear-gradient(90deg, ${accent}, #EB459A, #EB7A4B)` }}
            aria-hidden="true"
          ></div>
          <div
            className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full blur-[120px] transition-colors duration-700 pointer-events-none"
            style={{ background: hexToRgba(accent, 0.18) }}
            aria-hidden="true"
          ></div>

          <div key={activeDay.id} className="relative p-5 sm:p-8 md:p-12">
            {/* Panel header */}
            <div className="itin-panel-in flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10 pb-6 md:pb-8 border-b border-[#FDFAF5]/10">
              <div>
                <p className="font-bebas text-lg md:text-xl tracking-widest uppercase mb-1" style={{ color: accent }}>
                  {t('home.itinerary.dayLabel')} {activeIndex + 1} / {days.length}
                </p>
                <h3 className="font-anton text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight leading-[0.95]">
                  {t(`home.itinerary.days.${activeDay.id}.full`)}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="font-bebas text-xl tracking-wider uppercase px-4 py-2 rounded-xl"
                  style={{ background: hexToRgba(accent, 0.15), color: accent, border: `1px solid ${hexToRgba(accent, 0.4)}` }}
                >
                  {activityCountLabel(activeDay.activities.length)}
                </span>
              </div>
            </div>

            {/* Timeline */}
            <ol className="relative">
              <span
                className="absolute top-2 bottom-2 left-[7px] md:left-[167px] w-px"
                style={{ background: `linear-gradient(to bottom, ${hexToRgba(accent, 0.7)}, rgba(253,250,245,0.08))` }}
                aria-hidden="true"
              ></span>

              {activeDay.activities.map((activity, index) => {
                const name = localize(activity.name, language);
                const location = activity.location
                  ? localize(activity.location, language)
                  : t('home.itinerary.notSpecified');
                return (
                  <li
                    key={`${activeDay.id}-${index}`}
                    className="itin-row relative grid grid-cols-[16px_1fr] md:grid-cols-[136px_16px_1fr] gap-x-4 md:gap-x-6 pb-4 md:pb-5 last:pb-0"
                    style={{ animationDelay: `${120 + index * 55}ms` }}
                  >
                    {/* Desktop time column */}
                    <div className="hidden md:block text-right pt-4">
                      <span className="block font-bebas text-2xl tracking-wide leading-none text-[#FDFAF5]">
                        {activity.start}
                      </span>
                      {activity.end && (
                        <span className="block font-bebas text-lg tracking-wide leading-none text-[#FDFAF5]/45 mt-1">
                          – {activity.end}
                        </span>
                      )}
                    </div>

                    {/* Dot */}
                    <div className="relative flex justify-center pt-5">
                      <span
                        className="relative z-10 w-3.5 h-3.5 rounded-full ring-4 ring-[#000000]"
                        style={{ background: activity.featured ? accent : '#FDFAF5', boxShadow: activity.featured ? `0 0 16px ${accent}` : 'none' }}
                        aria-hidden="true"
                      ></span>
                    </div>

                    {/* Card */}
                    <div
                      className={`itin-activity group rounded-2xl border px-4 py-4 sm:px-5 md:px-6 md:py-5 transition-all duration-300 ${
                        activity.featured ? '' : 'bg-[#FDFAF5]/[0.04] border-[#FDFAF5]/10'
                      }`}
                      style={{
                        '--itin-accent': accent,
                        ...(activity.featured
                          ? {
                              background: `linear-gradient(120deg, ${hexToRgba(accent, 0.2)}, rgba(253,250,245,0.03) 70%)`,
                              borderColor: hexToRgba(accent, 0.55),
                            }
                          : {}),
                      }}
                    >
                      {/* Mobile time */}
                      <p className="md:hidden font-bebas text-xl tracking-wide leading-none mb-2" style={{ color: accent }}>
                        {activity.start}
                        {activity.end && <span className="text-[#FDFAF5]/50"> – {activity.end}</span>}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h4 className="text-lg md:text-xl font-bold leading-snug text-[#FDFAF5] flex items-start gap-2">
                          {activity.featured && (
                            <iconify-icon
                              icon="solar:star-bold"
                              width="20"
                              height="20"
                              style={{ color: accent }}
                              className="shrink-0 mt-1"
                              aria-hidden="true"
                            ></iconify-icon>
                          )}
                          <span>{name}</span>
                        </h4>
                        <span
                          className={`self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 font-bebas text-lg tracking-wider uppercase px-3 py-1 rounded-lg border whitespace-nowrap ${
                            activity.location ? '' : 'italic'
                          }`}
                          style={{
                            color: activity.location ? '#FDFAF5' : 'rgba(253,250,245,0.55)',
                            borderColor: activity.location ? hexToRgba(accent, 0.45) : 'rgba(253,250,245,0.15)',
                            background: activity.location ? hexToRgba(accent, 0.1) : 'transparent',
                          }}
                        >
                          <iconify-icon
                            icon="solar:map-point-bold"
                            width="16"
                            height="16"
                            style={{ color: activity.location ? accent : 'rgba(253,250,245,0.45)' }}
                            aria-hidden="true"
                          ></iconify-icon>
                          <span className="sr-only">{t('home.itinerary.locationLabel')}: </span>
                          {location}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Day navigation */}
            <div className="mt-10 pt-6 border-t border-[#FDFAF5]/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => selectDay(activeIndex - 1)}
                className="inline-flex items-center gap-2 font-bebas text-lg md:text-xl tracking-wider uppercase text-[#FDFAF5]/70 hover:text-[#FDFAF5] px-4 py-2 rounded-xl border border-[#FDFAF5]/15 hover:border-[#FDFAF5]/40 transition-all duration-300"
              >
                <iconify-icon icon="solar:arrow-left-linear" width="20" height="20"></iconify-icon>
                {t(`home.itinerary.days.${days[(activeIndex - 1 + days.length) % days.length].id}.weekday`)}
              </button>
              <div className="hidden sm:flex items-center gap-2" aria-hidden="true">
                {days.map((day, index) => (
                  <span
                    key={day.id}
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: index === activeIndex ? 32 : 8,
                      background: index === activeIndex ? accent : 'rgba(253,250,245,0.25)',
                    }}
                  ></span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => selectDay(activeIndex + 1)}
                className="inline-flex items-center gap-2 font-bebas text-lg md:text-xl tracking-wider uppercase text-[#000000] px-4 py-2 rounded-xl transition-all duration-300 hover:scale-[1.04]"
                style={{ background: days[(activeIndex + 1) % days.length].accent }}
              >
                {t(`home.itinerary.days.${days[(activeIndex + 1) % days.length].id}.weekday`)}
                <iconify-icon icon="solar:arrow-right-linear" width="20" height="20"></iconify-icon>
              </button>
            </div>
          </div>
        </div>

        {/* Raffle CTA (preserved) */}
        <div className="mt-16 md:mt-24 text-center relative z-20 fade-in-up stagger-3 flex flex-col items-center">
          <h4 className="font-bebas text-[#000000] text-3xl tracking-tight uppercase mb-6 drop-shadow-sm">
            {t('home.itinerary.raffleEyebrow')}
          </h4>
          <Link
            to="/raffle"
            className="group relative overflow-hidden bg-[#EB459A] text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-5 rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(235,69,154,0.3)] hover:shadow-[0_0_40px_rgba(235,69,154,0.6)] flex items-center justify-center gap-3 w-full sm:w-auto border border-[#000000]/5"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#01C9CF] to-[#EB7A4B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            <iconify-icon icon="solar:ticket-bold-duotone" width="28" height="28" className="relative z-10"></iconify-icon>
            <span className="relative z-10">{t('home.itinerary.raffleCta')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
