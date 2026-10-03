import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const asArray = (value) => (Array.isArray(value) ? value : []);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToSection(event, id) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
  if (typeof window.history?.replaceState === 'function') {
    window.history.replaceState(null, '', `#${id}`);
  }
}

function MetaChip({ icon, label, value, dark, accent }) {
  return (
    <div
      className={
        'flex items-center gap-3 rounded-xl border px-4 py-3 min-h-[56px] ' +
        (dark
          ? 'border-[#FDFAF5]/15 bg-[#FDFAF5]/5'
          : 'border-[#000000]/10 bg-white/70')
      }
    >
      <span
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${accent}1F`, color: accent }}
      >
        <iconify-icon icon={icon} width="22" height="22"></iconify-icon>
      </span>
      <div className="flex flex-col leading-tight min-w-0">
        <span
          className={
            'font-bebas tracking-[0.2em] uppercase text-xs ' +
            (dark ? 'text-[#FDFAF5]/50' : 'text-[#000000]/50')
          }
        >
          {label}
        </span>
        <span
          className={
            'font-bebas text-xl tracking-wide uppercase break-words ' +
            (dark ? 'text-[#FDFAF5]' : 'text-[#000000]')
          }
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function Standards({ id, items, accent, dark, labels }) {
  const [open, setOpen] = useState(false);
  const buttonId = `${id}-button`;
  const list = asArray(items);

  if (list.length === 0) return null;

  return (
    <div
      className={
        'rounded-xl border overflow-hidden ' +
        (dark ? 'border-[#FDFAF5]/15 bg-[#000000]/40' : 'border-[#000000]/10 bg-[#000000]/[0.03]')
      }
    >
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((prev) => !prev)}
        className={
          'w-full min-h-[60px] flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
          (dark
            ? 'text-[#FDFAF5] hover:bg-[#FDFAF5]/5 focus-visible:ring-[#FDFAF5] focus-visible:ring-offset-[#000000]'
            : 'text-[#000000] hover:bg-[#000000]/5 focus-visible:ring-[#000000] focus-visible:ring-offset-[#FDFAF5]')
        }
      >
        <span className="flex items-center gap-3">
          <iconify-icon icon="solar:clipboard-check-bold-duotone" width="24" height="24" style={{ color: accent }}></iconify-icon>
          <span className="font-bebas text-2xl tracking-wide uppercase">{labels.standards}</span>
        </span>
        <span className="flex items-center gap-2 shrink-0 font-bebas tracking-[0.15em] uppercase text-sm" style={{ color: accent }}>
          <span className="hidden sm:inline">{open ? labels.hideStandards : labels.showStandards}</span>
          <iconify-icon
            icon="solar:alt-arrow-down-linear"
            width="22"
            height="22"
            className="transition-transform duration-300 motion-reduce:transition-none"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          ></iconify-icon>
        </span>
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={buttonId}
        className={
          'grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ' +
          (open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')
        }
      >
        <div className="overflow-hidden min-h-0" aria-hidden={!open}>
          <ul
            className={
              'px-5 pb-5 pt-1 space-y-3 text-base md:text-lg font-medium leading-relaxed ' +
              (dark ? 'text-[#FDFAF5]/80' : 'text-[#000000]/80')
            }
          >
            {list.map((item, index) => (
              <li key={`${id}-${index}`} className="flex items-start gap-3">
                <iconify-icon icon="solar:check-circle-bold" width="22" height="22" className="shrink-0 mt-0.5" style={{ color: accent }}></iconify-icon>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PartCard({ part, accent, dark, labels, standardsId, extra }) {
  return (
    <article
      className={
        'rounded-2xl border p-6 md:p-8 relative overflow-hidden ' +
        (dark
          ? 'bg-[#FDFAF5]/5 border-[#FDFAF5]/10'
          : 'bg-white border-[#000000]/10 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]')
      }
    >
      <div className="absolute top-0 left-0 h-full w-1.5" style={{ backgroundColor: accent }}></div>

      <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pl-2">
        <div className="min-w-0">
          <span className="font-bebas tracking-[0.25em] uppercase text-sm md:text-base block mb-1" style={{ color: accent }}>
            {part.label}
          </span>
          <h4
            className={
              'font-anton uppercase tracking-tight leading-none text-3xl md:text-5xl ' +
              (dark ? 'text-[#FDFAF5]' : 'text-[#000000]')
            }
          >
            {part.title}
          </h4>
        </div>
        <span
          className="font-bebas text-xl md:text-2xl tracking-wide uppercase rounded-lg px-4 py-2 shrink-0"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          {part.duration}
        </span>
      </div>

      <p
        className={
          'pl-2 text-lg md:text-xl font-medium leading-relaxed mb-5 ' +
          (dark ? 'text-[#FDFAF5]/80' : 'text-[#000000]/80')
        }
      >
        {part.description}
      </p>

      {extra}

      <div
        className={
          'ml-2 rounded-xl px-5 py-4 mb-5 flex items-start gap-3 ' +
          (dark ? 'bg-[#000000]/50 border border-[#FDFAF5]/10' : 'bg-[#FDFAF5] border border-[#000000]/10')
        }
      >
        <iconify-icon icon="solar:cup-first-bold" width="24" height="24" className="shrink-0 mt-0.5" style={{ color: accent }}></iconify-icon>
        <div className="min-w-0">
          <span
            className={
              'font-bebas tracking-[0.2em] uppercase text-xs block mb-1 ' +
              (dark ? 'text-[#FDFAF5]/50' : 'text-[#000000]/50')
            }
          >
            {labels.score}
          </span>
          <p className={'text-base md:text-lg font-semibold leading-snug ' + (dark ? 'text-[#FDFAF5]' : 'text-[#000000]')}>
            {part.score}
          </p>
        </div>
      </div>

      {part.standards && (
        <div className="ml-2">
          <Standards id={standardsId} items={part.standards} accent={accent} dark={dark} labels={labels} />
        </div>
      )}
    </article>
  );
}

function TieBreakers({ items, accent, dark, labels }) {
  const list = asArray(items);
  if (list.length === 0) return null;
  return (
    <div
      className={
        'rounded-2xl border p-6 md:p-8 ' +
        (dark ? 'bg-[#FDFAF5]/5 border-[#FDFAF5]/10' : 'bg-white border-[#000000]/10')
      }
    >
      <h4 className="font-bebas text-2xl md:text-3xl tracking-wide uppercase mb-4 flex items-center gap-3" style={{ color: accent }}>
        <iconify-icon icon="solar:scale-bold-duotone" width="28" height="28"></iconify-icon>
        {labels.tieBreakers}
      </h4>
      <ul className={'space-y-3 text-base md:text-lg font-medium ' + (dark ? 'text-[#FDFAF5]/80' : 'text-[#000000]/80')}>
        {list.map((item, index) => (
          <li key={`tb-${index}`} className="flex items-start gap-3">
            <span className="font-bebas text-xl leading-none mt-0.5 shrink-0" style={{ color: accent }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RulesSectionHeader({ number, title, subtitle, icon, accent }) {
  return (
    <div className="bg-[#000000] text-[#FDFAF5] px-5 md:px-7 py-4 flex items-center gap-4">
      <span className="font-anton text-3xl md:text-4xl leading-none tracking-tight shrink-0" style={{ color: accent }}>
        {number}
      </span>
      <div className="min-w-0 flex-1">
        <h5 className="font-anton uppercase tracking-tight leading-none text-xl md:text-2xl break-words">{title}</h5>
        {subtitle && (
          <span className="font-bebas tracking-[0.3em] uppercase text-xs md:text-sm block mt-1" style={{ color: accent }}>
            {subtitle}
          </span>
        )}
      </div>
      <iconify-icon icon={icon} width="26" height="26" className="shrink-0 hidden sm:block" style={{ color: accent }}></iconify-icon>
    </div>
  );
}

function RulesList({ items, accent, idPrefix, numbered }) {
  const list = asArray(items);
  if (list.length === 0) return null;
  return (
    <ul className="px-5 md:px-7 py-5 md:py-6 space-y-4">
      {list.map((item, index) => (
        <li key={`${idPrefix}-${index}`} className="flex items-start gap-3 md:gap-4">
          {numbered ? (
            <span
              className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center font-bebas text-lg leading-none mt-0.5"
              style={{ backgroundColor: `${accent}1F`, color: accent }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          ) : (
            <iconify-icon icon="solar:check-circle-bold" width="24" height="24" className="shrink-0 mt-0.5" style={{ color: accent }}></iconify-icon>
          )}
          <p className="text-base md:text-lg font-medium leading-relaxed text-[#000000]/85">{item}</p>
        </li>
      ))}
    </ul>
  );
}

function FullRules({ id, data }) {
  const [open, setOpen] = useState(false);
  const buttonId = `${id}-button`;
  const weightRows = asArray(data.weights.rows);
  const sectionNumbers = ['01', '02', '03', '04', '05'];

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-[#EB7A4B]/60 bg-[#000000] shadow-[0_0_40px_-10px_rgba(235,122,75,0.35)]">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((prev) => !prev)}
        className={
          'w-full text-left px-6 md:px-8 py-6 md:py-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDFAF5] focus-visible:ring-inset ' +
          (open ? 'bg-[#EB7A4B]' : 'bg-[#000000] hover:bg-[#EB7A4B]/15')
        }
      >
        <span className="flex items-start sm:items-center gap-4 min-w-0">
          <span
            className={
              'w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 motion-reduce:transition-none ' +
              (open ? 'bg-[#000000] text-[#EB7A4B]' : 'bg-[#EB7A4B] text-[#000000]')
            }
          >
            <iconify-icon icon="solar:document-text-bold" width="30" height="30"></iconify-icon>
          </span>
          <span className="flex flex-col min-w-0">
            <span
              className={
                'font-bebas tracking-[0.3em] uppercase text-xs md:text-sm mb-1 ' +
                (open ? 'text-[#000000]/70' : 'text-[#EB7A4B]')
              }
            >
              {data.eyebrow}
            </span>
            <span
              className={
                'font-anton uppercase tracking-tight leading-none text-2xl sm:text-3xl md:text-4xl break-words ' +
                (open ? 'text-[#000000]' : 'text-[#FDFAF5]')
              }
            >
              {open ? data.hideLabel : data.showLabel}
            </span>
            {!open && (
              <span className="text-sm md:text-base text-[#FDFAF5]/60 font-medium leading-relaxed mt-2 max-w-xl">
                {data.intro}
              </span>
            )}
          </span>
        </span>
        <span
          className={
            'self-end sm:self-auto inline-flex items-center gap-2 shrink-0 rounded-full px-5 py-3 min-h-[48px] font-bebas tracking-[0.2em] uppercase text-sm md:text-base transition-colors duration-300 motion-reduce:transition-none ' +
            (open ? 'bg-[#000000] text-[#FDFAF5]' : 'bg-[#FDFAF5] text-[#000000]')
          }
        >
          {open ? data.hideShort : data.showShort}
          <iconify-icon
            icon="solar:alt-arrow-down-linear"
            width="22"
            height="22"
            className="transition-transform duration-300 motion-reduce:transition-none"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          ></iconify-icon>
        </span>
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={buttonId}
        className={
          'grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ' +
          (open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')
        }
      >
        <div className="overflow-hidden min-h-0" aria-hidden={!open}>
          <div className="bg-[#FDFAF5] text-[#000000] p-4 sm:p-6 md:p-8">
            {/* Index of sections */}
            <nav aria-label={data.showLabel} className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {[
                data.sections.weights,
                data.sections.yoke,
                data.sections.jumps,
                data.sections.rules,
                data.sections.scoring,
              ].map((label, index) => (
                <span
                  key={`${id}-index-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#000000]/15 bg-white px-3.5 py-2 font-bebas tracking-[0.15em] uppercase text-xs sm:text-sm text-[#000000]"
                >
                  <span className="text-[#EB7A4B]">{sectionNumbers[index]}</span>
                  {label}
                </span>
              ))}
            </nav>

            <div className="flex flex-col gap-6 md:gap-8">
              {/* 01 — YOKE WEIGHTS */}
              <section className="rounded-xl overflow-hidden border border-[#000000]/10 bg-white shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)]">
                <RulesSectionHeader
                  number={sectionNumbers[0]}
                  title={data.weights.title}
                  icon="solar:dumbbell-large-bold-duotone"
                  accent="#EB7A4B"
                />
                <div className="w-full overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-left min-w-0">
                    <thead>
                      <tr className="bg-[#000000]/[0.04] text-[#000000]">
                        <th scope="col" className="w-1/2 px-5 md:px-7 py-3 font-bebas tracking-[0.2em] uppercase text-sm md:text-base font-normal text-[#000000]/60">
                          {data.weights.division}
                        </th>
                        <th scope="col" className="w-1/4 px-3 md:px-7 py-3 font-bebas tracking-[0.2em] uppercase text-sm md:text-base font-normal text-center text-[#01C9CF]">
                          {data.weights.male}
                        </th>
                        <th scope="col" className="w-1/4 px-3 md:px-7 py-3 font-bebas tracking-[0.2em] uppercase text-sm md:text-base font-normal text-center text-[#EB459A]">
                          {data.weights.female}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {weightRows.map((row, index) => {
                        const isRx = row.division === 'RX';
                        return (
                          <tr
                            key={`${id}-weight-${index}`}
                            className={
                              'border-t border-[#000000]/10 ' +
                              (isRx ? 'bg-[#EB7A4B]/10' : index % 2 === 1 ? 'bg-[#FDFAF5]' : 'bg-white')
                            }
                          >
                            <th scope="row" className="px-5 md:px-7 py-4 font-bebas text-xl sm:text-2xl tracking-wide uppercase text-[#000000] font-normal break-words">
                              <span className="flex items-center gap-2">
                                {isRx && <span className="w-2 h-2 rounded-full bg-[#EB7A4B] shrink-0" aria-hidden="true"></span>}
                                {row.division}
                              </span>
                            </th>
                            <td className="px-3 md:px-7 py-4 text-center font-anton text-2xl sm:text-3xl tracking-tight tabular-nums whitespace-nowrap" style={{ color: isRx ? '#EB7A4B' : '#000000' }}>
                              {row.male}
                            </td>
                            <td className="px-3 md:px-7 py-4 text-center font-anton text-2xl sm:text-3xl tracking-tight tabular-nums whitespace-nowrap" style={{ color: isRx ? '#EB7A4B' : '#000000' }}>
                              {row.female}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 02 — ZERCHER YOKE CARRY STANDARD */}
              <section className="rounded-xl overflow-hidden border border-[#000000]/10 bg-white shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)]">
                <RulesSectionHeader
                  number={sectionNumbers[1]}
                  title={data.yokeStandard.title}
                  subtitle={data.yokeStandard.subtitle}
                  icon="solar:walking-round-bold"
                  accent="#EB7A4B"
                />
                <RulesList items={data.yokeStandard.items} accent="#01C9CF" idPrefix={`${id}-yoke`} />
              </section>

              {/* 03 — DOUBLE-UNDERS / SINGLE-UNDERS STANDARD */}
              <section className="rounded-xl overflow-hidden border border-[#000000]/10 bg-white shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)]">
                <RulesSectionHeader
                  number={sectionNumbers[2]}
                  title={data.jumpsStandard.title}
                  subtitle={data.jumpsStandard.subtitle}
                  icon="solar:running-round-bold"
                  accent="#EB7A4B"
                />
                <RulesList items={data.jumpsStandard.items} accent="#EB459A" idPrefix={`${id}-jumps`} />
              </section>

              {/* 04 — TEAM WOD RULES */}
              <section className="rounded-xl overflow-hidden border border-[#000000]/10 bg-white shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)]">
                <RulesSectionHeader
                  number={sectionNumbers[3]}
                  title={data.teamRules.title}
                  icon="solar:users-group-two-rounded-bold"
                  accent="#EB7A4B"
                />
                <RulesList items={data.teamRules.items} accent="#EB7A4B" idPrefix={`${id}-rules`} numbered />
              </section>

              {/* 05 — SCORING SUMMARY */}
              <section className="rounded-xl overflow-hidden border border-[#000000]/10 bg-white shadow-[0_10px_40px_-24px_rgba(0,0,0,0.35)]">
                <RulesSectionHeader
                  number={sectionNumbers[4]}
                  title={data.scoringSummary.title}
                  icon="solar:cup-first-bold"
                  accent="#EB7A4B"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 md:p-7">
                  <div className="rounded-xl border-2 border-[#01C9CF]/40 bg-[#01C9CF]/10 p-5 relative overflow-hidden">
                    <span className="font-bebas tracking-[0.3em] uppercase text-sm text-[#01C9CF] block mb-2">
                      {data.scoringSummary.partA.label}
                    </span>
                    <p className="text-base md:text-lg font-semibold leading-snug text-[#000000]">
                      {data.scoringSummary.partA.text}
                    </p>
                  </div>
                  <div className="rounded-xl border-2 border-[#EB459A]/40 bg-[#EB459A]/10 p-5 relative overflow-hidden">
                    <span className="font-bebas tracking-[0.3em] uppercase text-sm text-[#EB459A] block mb-2">
                      {data.scoringSummary.partB.label}
                    </span>
                    <p className="text-base md:text-lg font-semibold leading-snug text-[#000000]">
                      {data.scoringSummary.partB.text}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-6 md:mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 min-h-[48px] rounded-xl border-2 border-[#000000] bg-transparent px-6 py-3 font-bebas text-lg tracking-[0.15em] uppercase text-[#000000] hover:bg-[#000000] hover:text-[#FDFAF5] transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000000] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFAF5]"
              >
                <iconify-icon icon="solar:alt-arrow-up-linear" width="20" height="20"></iconify-icon>
                {data.hideLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Workouts() {
  const { t } = useTranslation();

  const labels = {
    event: t('workouts.labels.event'),
    location: t('workouts.labels.location'),
    timeCap: t('workouts.labels.timeCap'),
    scoring: t('workouts.labels.scoring'),
    format: t('workouts.labels.format'),
    score: t('workouts.labels.score'),
    standards: t('workouts.labels.standards'),
    showStandards: t('workouts.labels.showStandards'),
    hideStandards: t('workouts.labels.hideStandards'),
    tieBreakers: t('workouts.labels.tieBreakers'),
    weightsTitle: t('workouts.labels.weightsTitle'),
    weightsNote: t('workouts.labels.weightsNote'),
    division: t('workouts.labels.division'),
    load: t('workouts.labels.load'),
    flow: t('workouts.labels.flow'),
    partialNote: t('workouts.labels.partialNote'),
  };

  const event1 = {
    number: t('workouts.event1.number'),
    name: t('workouts.event1.name'),
    location: t('workouts.event1.location'),
    timeCap: t('workouts.event1.timeCap'),
    scoring: t('workouts.event1.scoring'),
    summary: t('workouts.event1.summary'),
    partA: {
      label: t('workouts.event1.partA.label'),
      title: t('workouts.event1.partA.title'),
      duration: t('workouts.event1.partA.duration'),
      description: t('workouts.event1.partA.description'),
      score: t('workouts.event1.partA.score'),
      standards: asArray(t('workouts.event1.partA.standards', { returnObjects: true })),
    },
    transition: {
      label: t('workouts.event1.transition.label'),
      duration: t('workouts.event1.transition.duration'),
      description: t('workouts.event1.transition.description'),
    },
    partB: {
      label: t('workouts.event1.partB.label'),
      title: t('workouts.event1.partB.title'),
      duration: t('workouts.event1.partB.duration'),
      description: t('workouts.event1.partB.description'),
      score: t('workouts.event1.partB.score'),
      standards: asArray(t('workouts.event1.partB.standards', { returnObjects: true })),
    },
    tieBreakers: asArray(t('workouts.event1.tieBreakers', { returnObjects: true })),
    weights: asArray(t('workouts.event1.weights', { returnObjects: true })),
    rxNote: t('workouts.event1.rxNote'),
  };

  const event2 = {
    number: t('workouts.event2.number'),
    name: t('workouts.event2.name'),
    badge: t('workouts.event2.badge'),
    format: t('workouts.event2.format'),
    timeCap: t('workouts.event2.timeCap'),
    scoring: t('workouts.event2.scoring'),
    summary: t('workouts.event2.summary'),
    partA: {
      label: t('workouts.event2.partA.label'),
      title: t('workouts.event2.partA.title'),
      duration: t('workouts.event2.partA.duration'),
      description: t('workouts.event2.partA.description'),
      score: t('workouts.event2.partA.score'),
    },
    partB: {
      label: t('workouts.event2.partB.label'),
      title: t('workouts.event2.partB.title'),
      duration: t('workouts.event2.partB.duration'),
      description: t('workouts.event2.partB.description'),
      score: t('workouts.event2.partB.score'),
      rounds: asArray(t('workouts.event2.partB.rounds', { returnObjects: true })),
    },
    flow: asArray(t('workouts.event2.flow', { returnObjects: true })),
    tieBreakers: asArray(t('workouts.event2.tieBreakers', { returnObjects: true })),
    fullRules: {
      eyebrow: t('workouts.event2.fullRules.eyebrow'),
      showLabel: t('workouts.event2.fullRules.showLabel'),
      hideLabel: t('workouts.event2.fullRules.hideLabel'),
      showShort: t('workouts.event2.fullRules.showShort'),
      hideShort: t('workouts.event2.fullRules.hideShort'),
      intro: t('workouts.event2.fullRules.intro'),
      sections: {
        weights: t('workouts.event2.fullRules.sections.weights'),
        yoke: t('workouts.event2.fullRules.sections.yoke'),
        jumps: t('workouts.event2.fullRules.sections.jumps'),
        rules: t('workouts.event2.fullRules.sections.rules'),
        scoring: t('workouts.event2.fullRules.sections.scoring'),
      },
      weights: {
        title: t('workouts.event2.fullRules.weights.title'),
        division: t('workouts.event2.fullRules.weights.division'),
        male: t('workouts.event2.fullRules.weights.male'),
        female: t('workouts.event2.fullRules.weights.female'),
        rows: asArray(t('workouts.event2.fullRules.weights.rows', { returnObjects: true })),
      },
      yokeStandard: {
        title: t('workouts.event2.fullRules.yokeStandard.title'),
        subtitle: t('workouts.event2.fullRules.yokeStandard.subtitle'),
        items: asArray(t('workouts.event2.fullRules.yokeStandard.items', { returnObjects: true })),
      },
      jumpsStandard: {
        title: t('workouts.event2.fullRules.jumpsStandard.title'),
        subtitle: t('workouts.event2.fullRules.jumpsStandard.subtitle'),
        items: asArray(t('workouts.event2.fullRules.jumpsStandard.items', { returnObjects: true })),
      },
      teamRules: {
        title: t('workouts.event2.fullRules.teamRules.title'),
        items: asArray(t('workouts.event2.fullRules.teamRules.items', { returnObjects: true })),
      },
      scoringSummary: {
        title: t('workouts.event2.fullRules.scoringSummary.title'),
        partA: {
          label: t('workouts.event2.fullRules.scoringSummary.partA.label'),
          text: t('workouts.event2.fullRules.scoringSummary.partA.text'),
        },
        partB: {
          label: t('workouts.event2.fullRules.scoringSummary.partB.label'),
          text: t('workouts.event2.fullRules.scoringSummary.partB.text'),
        },
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.fade-in-up').forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.replace('#', '');
    const target = document.getElementById(id);
    if (!target) return;
    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex flex-col w-full animate-page-enter motion-reduce:animate-none">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#000000] pt-36 pb-20 md:pt-44 md:pb-28 text-[#FDFAF5]" id="workouts-hero">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#01C9CF]/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#EB459A]/20 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute inset-y-0 right-6 hidden xl:flex items-center pointer-events-none select-none" aria-hidden="true">
          <span className="font-anton text-[22rem] leading-none text-[#FDFAF5]/[0.04] tracking-tighter">GIP4</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="font-bebas text-[#01C9CF] text-2xl md:text-3xl tracking-[0.3em] uppercase block mb-5 fade-in-up visible">
              {t('workouts.hero.eyebrow')}
            </span>
            <h1 className="font-anton uppercase tracking-tighter leading-[0.88] text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-8 fade-in-up visible stagger-1">
              {t('workouts.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-[#FDFAF5]/75 font-medium leading-relaxed max-w-2xl mb-10 fade-in-up visible stagger-2">
              {t('workouts.hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 fade-in-up visible stagger-3">
              <span className="font-bebas tracking-[0.25em] uppercase text-base md:text-lg text-[#EB7A4B] border-l-4 border-[#EB7A4B] pl-4 py-1">
                {t('workouts.hero.line')}
              </span>
            </div>
          </div>

          <nav
            aria-label={t('workouts.quickLinks.label')}
            className="mt-14 md:mt-20 pt-8 border-t border-[#FDFAF5]/10 flex flex-col sm:flex-row sm:items-center gap-4 fade-in-up visible stagger-3"
          >
            <span className="font-bebas tracking-[0.25em] uppercase text-sm text-[#FDFAF5]/50">
              {t('workouts.quickLinks.label')}
            </span>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="#event-01"
                onClick={(event) => scrollToSection(event, 'event-01')}
                className="group inline-flex items-center justify-between sm:justify-start gap-4 min-h-[60px] rounded-xl border-2 border-[#01C9CF] bg-[#01C9CF]/10 px-6 py-3 font-bebas text-2xl tracking-wide uppercase text-[#FDFAF5] hover:bg-[#01C9CF] hover:text-[#000000] transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDFAF5]"
              >
                <span className="flex items-center gap-3">
                  <span className="font-anton text-3xl leading-none text-[#01C9CF] group-hover:text-[#000000]">01</span>
                  {t('workouts.quickLinks.event1')}
                </span>
                <iconify-icon icon="solar:arrow-down-linear" width="22" height="22"></iconify-icon>
              </a>
              <a
                href="#event-02"
                onClick={(event) => scrollToSection(event, 'event-02')}
                className="group inline-flex items-center justify-between sm:justify-start gap-4 min-h-[60px] rounded-xl border-2 border-[#EB459A] bg-[#EB459A]/10 px-6 py-3 font-bebas text-2xl tracking-wide uppercase text-[#FDFAF5] hover:bg-[#EB459A] hover:text-[#FDFAF5] transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDFAF5]"
              >
                <span className="flex items-center gap-3">
                  <span className="font-anton text-3xl leading-none text-[#EB459A] group-hover:text-[#FDFAF5]">02</span>
                  {t('workouts.quickLinks.event2')}
                </span>
                <iconify-icon icon="solar:arrow-down-linear" width="22" height="22"></iconify-icon>
              </a>
            </div>
          </nav>
        </div>
      </section>

      {/* EVENT 01 — LIGHT */}
      <section id="event-01" className="scroll-mt-24 relative overflow-hidden bg-[#FDFAF5] text-[#000000] py-20 md:py-28 border-b border-[#000000]/10">
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#01C9CF]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <header className="lg:col-span-5 lg:sticky lg:top-28 self-start fade-in-up">
              <div className="flex items-end gap-4 mb-4">
                <span className="font-anton leading-[0.8] tracking-tighter text-[7rem] sm:text-[9rem] lg:text-[11rem] text-[#000000]" aria-hidden="true">
                  {event1.number}
                </span>
                <span className="font-bebas tracking-[0.3em] uppercase text-[#01C9CF] text-lg md:text-xl pb-3">
                  {labels.event} {event1.number}
                </span>
              </div>
              <h2 className="font-anton uppercase tracking-tight leading-[0.9] text-4xl sm:text-5xl lg:text-6xl mb-6">
                {event1.name}
              </h2>
              <p className="text-lg md:text-xl text-[#000000]/70 font-medium leading-relaxed mb-8 max-w-xl">
                {event1.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <MetaChip icon="solar:map-point-bold" label={labels.location} value={event1.location} accent="#01C9CF" />
                <MetaChip icon="solar:stopwatch-bold" label={labels.timeCap} value={event1.timeCap} accent="#EB7A4B" />
                <MetaChip icon="solar:medal-ribbons-star-bold" label={labels.scoring} value={event1.scoring} accent="#EB459A" />
              </div>
            </header>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="fade-in-up">
                <PartCard part={event1.partA} accent="#01C9CF" labels={labels} standardsId="event-01-part-a-standards" />
              </div>

              <div className="fade-in-up stagger-1 flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-dashed border-[#EB7A4B]/50 bg-[#EB7A4B]/5 px-6 py-5">
                <div className="flex items-center gap-3 shrink-0">
                  <span className="w-12 h-12 rounded-full bg-[#EB7A4B] text-[#FDFAF5] flex items-center justify-center">
                    <iconify-icon icon="solar:refresh-circle-bold" width="26" height="26"></iconify-icon>
                  </span>
                  <div className="leading-none">
                    <span className="font-bebas tracking-[0.25em] uppercase text-sm text-[#EB7A4B] block mb-1">
                      {event1.transition.label}
                    </span>
                    <span className="font-anton text-2xl uppercase text-[#000000]">{event1.transition.duration}</span>
                  </div>
                </div>
                <p className="text-base md:text-lg text-[#000000]/80 font-medium leading-relaxed">
                  {event1.transition.description}
                </p>
              </div>

              <div className="fade-in-up stagger-1">
                <PartCard part={event1.partB} accent="#EB7A4B" labels={labels} standardsId="event-01-part-b-standards" />
              </div>

              <div className="fade-in-up stagger-2 rounded-2xl border border-[#000000]/10 bg-white overflow-hidden">
                <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex flex-wrap items-end justify-between gap-3">
                  <h4 className="font-bebas text-2xl md:text-3xl tracking-wide uppercase text-[#000000] flex items-center gap-3">
                    <iconify-icon icon="solar:dumbbell-large-bold-duotone" width="28" height="28" className="text-[#01C9CF]"></iconify-icon>
                    {labels.weightsTitle}
                  </h4>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-left">
                    <thead>
                      <tr className="bg-[#000000] text-[#FDFAF5]">
                        <th scope="col" className="w-3/5 px-6 md:px-8 py-4 font-bebas tracking-[0.2em] uppercase text-base font-normal">
                          {labels.division}
                        </th>
                        <th scope="col" className="w-2/5 px-6 md:px-8 py-4 font-bebas tracking-[0.2em] uppercase text-base font-normal text-right">
                          {labels.load}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {event1.weights.map((row, index) => {
                        const isRx = row.division === 'RX';
                        return (
                          <tr
                            key={`${row.division}-${index}`}
                            className={
                              'border-t border-[#000000]/10 ' +
                              (isRx ? 'bg-[#EB459A]/10' : index % 2 === 1 ? 'bg-[#FDFAF5]' : 'bg-white')
                            }
                          >
                            <th scope="row" className="px-6 md:px-8 py-4 font-bebas text-2xl tracking-wide uppercase text-[#000000] font-normal break-words">
                              {row.division}
                            </th>
                            <td className="px-6 md:px-8 py-4 text-right font-anton text-2xl md:text-3xl tracking-tight tabular-nums whitespace-nowrap" style={{ color: isRx ? '#EB459A' : '#000000' }}>
                              {row.load}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 md:px-8 py-5 border-t border-[#000000]/10 space-y-3">
                  <p className="flex items-start gap-3 text-base md:text-lg font-semibold text-[#000000]">
                    <iconify-icon icon="solar:danger-triangle-bold" width="22" height="22" className="text-[#EB459A] shrink-0 mt-0.5"></iconify-icon>
                    <span>{event1.rxNote}</span>
                  </p>
                  <p className="text-sm md:text-base text-[#000000]/60 font-medium leading-relaxed">
                    {labels.weightsNote}
                  </p>
                </div>
              </div>

              <div className="fade-in-up stagger-3">
                <TieBreakers items={event1.tieBreakers} accent="#01C9CF" labels={labels} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENT 02 — DARK */}
      <section id="event-02" className="scroll-mt-24 relative overflow-hidden bg-[#000000] text-[#FDFAF5] py-20 md:py-28">
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[#EB459A]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#EB7A4B]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <header className="lg:col-span-5 lg:sticky lg:top-28 self-start fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EB459A] text-[#FDFAF5] font-bebas tracking-[0.2em] uppercase text-base px-5 py-2 mb-6 shadow-[0_0_20px_rgba(235,69,154,0.4)]">
                <iconify-icon icon="solar:users-group-two-rounded-bold" width="20" height="20"></iconify-icon>
                {event2.badge}
              </span>
              <div className="flex items-end gap-4 mb-4">
                <span className="font-anton leading-[0.8] tracking-tighter text-[7rem] sm:text-[9rem] lg:text-[11rem] text-[#FDFAF5]" aria-hidden="true">
                  {event2.number}
                </span>
                <span className="font-bebas tracking-[0.3em] uppercase text-[#EB459A] text-lg md:text-xl pb-3">
                  {labels.event} {event2.number}
                </span>
              </div>
              <h2 className="font-anton uppercase tracking-tight leading-[0.9] text-4xl sm:text-5xl lg:text-6xl mb-6">
                {event2.name}
              </h2>
              <p className="text-lg md:text-xl text-[#FDFAF5]/70 font-medium leading-relaxed mb-8 max-w-xl">
                {event2.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <MetaChip dark icon="solar:users-group-rounded-bold" label={labels.format} value={event2.format} accent="#EB459A" />
                <MetaChip dark icon="solar:stopwatch-bold" label={labels.timeCap} value={event2.timeCap} accent="#EB7A4B" />
                <MetaChip dark icon="solar:medal-ribbons-star-bold" label={labels.scoring} value={event2.scoring} accent="#01C9CF" />
              </div>
            </header>

            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="fade-in-up">
                <PartCard part={event2.partA} accent="#EB459A" dark labels={labels} standardsId="event-02-part-a-standards" />
              </div>

              <div className="fade-in-up stagger-1">
                <PartCard
                  part={event2.partB}
                  accent="#EB7A4B"
                  dark
                  labels={labels}
                  standardsId="event-02-part-b-standards"
                  extra={
                    event2.partB.rounds.length > 0 && (
                      <ol className="ml-2 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {event2.partB.rounds.map((round, index) => (
                          <li key={`round-${index}`} className="rounded-xl border border-[#EB7A4B]/30 bg-[#EB7A4B]/10 px-5 py-4 flex items-start gap-3">
                            <span className="font-anton text-2xl leading-none text-[#EB7A4B] mt-0.5">{index + 1}</span>
                            <div className="min-w-0">
                              <span className="font-bebas tracking-[0.2em] uppercase text-xs text-[#FDFAF5]/50 block mb-1">{round.label}</span>
                              <span className="font-bebas text-xl md:text-2xl tracking-wide uppercase text-[#FDFAF5] break-words">{round.value}</span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    )
                  }
                />
              </div>

              <div className="fade-in-up stagger-2 rounded-2xl border border-[#FDFAF5]/10 bg-[#FDFAF5]/5 p-6 md:p-8">
                <h4 className="font-bebas text-2xl md:text-3xl tracking-wide uppercase text-[#01C9CF] mb-6 flex items-center gap-3">
                  <iconify-icon icon="solar:route-bold-duotone" width="28" height="28"></iconify-icon>
                  {labels.flow}
                </h4>
                <ol className="relative border-l-2 border-[#FDFAF5]/15 ml-3 space-y-6">
                  {event2.flow.map((step, index) => (
                    <li key={`flow-${index}`} className="pl-8 relative">
                      <span className="absolute -left-[15px] top-0 w-7 h-7 rounded-full bg-[#000000] border-2 border-[#01C9CF] text-[#01C9CF] font-bebas text-sm flex items-center justify-center">
                        {index + 1}
                      </span>
                      <p className="text-base md:text-lg text-[#FDFAF5]/85 font-medium leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="fade-in-up stagger-2">
                <FullRules id="event-02-full-rules" data={event2.fullRules} />
              </div>

              <div className="fade-in-up stagger-3">
                <TieBreakers items={event2.tieBreakers} accent="#EB459A" dark labels={labels} />
              </div>

              <p className="fade-in-up stagger-3 flex items-start gap-3 rounded-xl border border-[#FDFAF5]/15 bg-[#FDFAF5]/5 px-5 py-4 text-sm md:text-base text-[#FDFAF5]/70 font-medium leading-relaxed">
                <iconify-icon icon="solar:info-circle-bold" width="22" height="22" className="text-[#EB7A4B] shrink-0 mt-0.5"></iconify-icon>
                <span>{labels.partialNote}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#01C9CF] py-20 md:py-24">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FDFAF5]/20 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EB459A]/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center fade-in-up">
          <h2 className="font-anton uppercase tracking-tighter leading-[0.9] text-5xl md:text-7xl text-[#FDFAF5] drop-shadow-md mb-5">
            {t('workouts.footer.title')}
          </h2>
          <p className="text-xl md:text-2xl text-[#000000]/80 font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            {t('workouts.footer.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://circle21.events/guayaera-in-paradise?tab=info"
              className="inline-flex items-center justify-center min-h-[64px] w-full sm:w-auto bg-[#000000] text-[#FDFAF5] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-4 rounded-xl hover:bg-[#EB459A] hover:scale-105 transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:scale-100 shadow-xl"
            >
              {t('workouts.footer.registerCta')}
            </a>
            <Link
              to="/schedule"
              className="inline-flex items-center justify-center min-h-[64px] w-full sm:w-auto bg-transparent border-2 border-[#000000] text-[#000000] font-bebas text-2xl md:text-3xl tracking-wide uppercase px-12 py-4 rounded-xl hover:bg-[#000000] hover:text-[#FDFAF5] hover:scale-105 transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:scale-100"
            >
              {t('workouts.footer.scheduleCta')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
