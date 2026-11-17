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

function StandardGroup({ id, index, standard, color, labels }) {
  const [open, setOpen] = useState(false);
  const buttonId = `${id}-button`;
  const points = asArray(standard.items);

  return (
    <li className="rounded-xl border border-[#000000]/10 bg-[#FDFAF5] overflow-hidden flex flex-col">
      <h5 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((prev) => !prev)}
          className={
            'w-full min-h-[64px] text-left px-5 py-4 flex items-center gap-4 transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#000000] focus-visible:ring-inset ' +
            (open ? 'bg-white border-b border-[#000000]/10' : 'bg-white hover:bg-[#000000]/[0.03]')
          }
        >
          <span
            className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center font-anton text-2xl leading-none"
            style={{ backgroundColor: color, color: '#000000' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1">
            <span className="font-anton uppercase tracking-tight leading-none text-xl md:text-2xl text-[#000000] break-words block">
              {standard.title}
            </span>
            {standard.subtitle && (
              <span className="font-bebas tracking-[0.25em] uppercase text-xs md:text-sm block mt-1.5" style={{ color }}>
                {standard.subtitle}
              </span>
            )}
          </span>
          <span className="flex items-center gap-2 shrink-0 font-bebas tracking-[0.15em] uppercase text-sm" style={{ color }}>
            <span className="hidden sm:inline">{open ? labels.hide : labels.show}</span>
            <iconify-icon
              icon="solar:alt-arrow-down-linear"
              width="22"
              height="22"
              className="transition-transform duration-300 motion-reduce:transition-none"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
            ></iconify-icon>
          </span>
        </button>
      </h5>

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
          <ul className="px-5 py-4 space-y-3">
            {points.map((point, pointIndex) => (
              <li key={`${id}-${pointIndex}`} className="flex items-start gap-3">
                <iconify-icon icon="solar:check-circle-bold" width="22" height="22" className="shrink-0 mt-0.5" style={{ color }}></iconify-icon>
                <p className="text-base md:text-lg font-medium leading-relaxed text-[#000000]/85">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function MovementStandardsGroups({ id, data, accent }) {
  const list = asArray(data.items);
  if (list.length === 0) return null;
  const palette = ['#EB7A4B', '#01C9CF', '#EB459A', '#EB7A4B', '#01C9CF', '#EB459A'];
  const labels = { show: data.show, hide: data.hide };
  return (
    <div className="rounded-2xl border border-[#000000]/10 bg-white overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]">
      <div className="bg-[#000000] text-[#FDFAF5] px-6 md:px-8 py-6 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <span className="font-bebas tracking-[0.3em] uppercase text-xs md:text-sm block mb-1" style={{ color: accent }}>
            {data.eyebrow}
          </span>
          <h4 className="font-anton uppercase tracking-tight leading-none text-2xl md:text-4xl flex items-center gap-3">
            <iconify-icon icon="solar:clipboard-check-bold-duotone" width="30" height="30" style={{ color: accent }}></iconify-icon>
            {data.title}
          </h4>
          <span className="text-sm md:text-base text-[#FDFAF5]/60 font-medium block mt-2">{data.subtitle}</span>
        </div>
        <span className="font-anton text-4xl md:text-5xl leading-none" style={{ color: accent }} aria-hidden="true">
          {String(list.length).padStart(2, '0')}
        </span>
      </div>
      <ol className="grid grid-cols-1 gap-3 p-4 sm:p-6">
        {list.map((standard, index) => (
          <StandardGroup
            key={`${id}-${index}`}
            id={`${id}-${index}`}
            index={index}
            standard={standard}
            color={palette[index % palette.length]}
            labels={labels}
          />
        ))}
      </ol>
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

  const event3 = {
    number: t('workouts.event3.number'),
    eyebrow: t('workouts.event3.eyebrow'),
    name: t('workouts.event3.name'),
    badge: t('workouts.event3.badge'),
    summary: t('workouts.event3.summary'),
    stats: {
      modality: {
        label: t('workouts.event3.stats.modality.label'),
        value: t('workouts.event3.stats.modality.value'),
      },
      format: {
        label: t('workouts.event3.stats.format.label'),
        value: t('workouts.event3.stats.format.value'),
      },
      scheme: {
        label: t('workouts.event3.stats.scheme.label'),
        value: t('workouts.event3.stats.scheme.value'),
      },
    },
    page1: {
      eyebrow: t('workouts.event3.page1.eyebrow'),
      title: t('workouts.event3.page1.title'),
      paragraphs: asArray(t('workouts.event3.page1.paragraphs', { returnObjects: true })),
      flow: {
        title: t('workouts.event3.page1.flow.title'),
        steps: asArray(t('workouts.event3.page1.flow.steps', { returnObjects: true })),
        beginnersNote: t('workouts.event3.page1.flow.beginnersNote'),
      },
      rules: {
        title: t('workouts.event3.page1.rules.title'),
        items: asArray(t('workouts.event3.page1.rules.items', { returnObjects: true })),
      },
      scoring: {
        label: t('workouts.event3.page1.scoring.label'),
        text: t('workouts.event3.page1.scoring.text'),
      },
      tieBreak: {
        label: t('workouts.event3.page1.tieBreak.label'),
        text: t('workouts.event3.page1.tieBreak.text'),
      },
    },
    weights: {
      title: t('workouts.event3.weights.title'),
      division: t('workouts.event3.weights.division'),
      weight: t('workouts.event3.weights.weight'),
      gymnastics: t('workouts.event3.weights.gymnastics'),
      rows: asArray(t('workouts.event3.weights.rows', { returnObjects: true })),
      legend: t('workouts.event3.weights.legend'),
      beginnersNoteLabel: t('workouts.event3.weights.beginnersNoteLabel'),
      beginnersNote: t('workouts.event3.weights.beginnersNote'),
    },
    standards: {
      eyebrow: t('workouts.event3.standards.eyebrow'),
      title: t('workouts.event3.standards.title'),
      subtitle: t('workouts.event3.standards.subtitle'),
      show: t('workouts.event3.standards.show'),
      hide: t('workouts.event3.standards.hide'),
      items: asArray(t('workouts.event3.standards.items', { returnObjects: true })),
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
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 w-full sm:w-auto">
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
              <a
                href="#event-03"
                onClick={(event) => scrollToSection(event, 'event-03')}
                className="group inline-flex items-center justify-between sm:justify-start gap-4 min-h-[60px] rounded-xl border-2 border-[#EB7A4B] bg-[#EB7A4B]/10 px-6 py-3 font-bebas text-2xl tracking-wide uppercase text-[#FDFAF5] hover:bg-[#EB7A4B] hover:text-[#000000] transition-colors duration-300 motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDFAF5]"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="font-anton text-3xl leading-none text-[#EB7A4B] group-hover:text-[#000000] shrink-0">03</span>
                  <span className="hidden sm:inline text-[#EB7A4B] group-hover:text-[#000000]" aria-hidden="true">—</span>
                  <span className="whitespace-normal break-words leading-tight">{t('workouts.quickLinks.event3')}</span>
                </span>
                <iconify-icon icon="solar:arrow-down-linear" width="22" height="22" className="shrink-0"></iconify-icon>
              </a>
              <a href="#event-04" onClick={(event) => scrollToSection(event, 'event-04')} className="group inline-flex items-center justify-between gap-4 min-h-[60px] rounded-xl border-2 border-[#01C9CF] bg-[#01C9CF]/10 px-6 py-3 font-bebas text-2xl tracking-wide uppercase text-[#FDFAF5] hover:bg-[#01C9CF] hover:text-[#000000] transition-colors duration-300 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FDFAF5]">
                <span className="flex items-center gap-3 min-w-0"><span className="font-anton text-3xl text-[#01C9CF] group-hover:text-[#000000] shrink-0">04</span><span className="whitespace-normal break-words leading-tight">PARADISE IN SYNC</span></span>
                <iconify-icon icon="solar:arrow-down-linear" width="22" height="22" className="shrink-0"></iconify-icon>
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

      {/* EVENT 03 — LIGHT */}
      <section id="event-03" className="scroll-mt-24 relative overflow-hidden bg-[#FDFAF5] text-[#000000] py-20 md:py-28 border-b border-[#000000]/10">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#EB7A4B]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#01C9CF]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <header className="lg:col-span-5 lg:sticky lg:top-28 self-start fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EB7A4B] text-[#000000] font-bebas tracking-[0.2em] uppercase text-base px-5 py-2 mb-6 shadow-[0_0_20px_rgba(235,122,75,0.4)]">
                <iconify-icon icon="solar:verified-check-bold" width="20" height="20"></iconify-icon>
                {event3.badge}
              </span>
              <div className="flex items-end gap-4 mb-4">
                <span className="font-anton leading-[0.8] tracking-tighter text-[7rem] sm:text-[9rem] lg:text-[11rem] text-[#000000]" aria-hidden="true">
                  {event3.number}
                </span>
                <span className="font-bebas tracking-[0.3em] uppercase text-[#EB7A4B] text-lg md:text-xl pb-3">
                  {event3.eyebrow}
                </span>
              </div>
              <h2 className="font-anton uppercase tracking-tight leading-[0.9] text-4xl sm:text-5xl lg:text-6xl mb-6">
                {event3.name}
              </h2>
              <p className="text-lg md:text-xl text-[#000000]/70 font-medium leading-relaxed mb-8 max-w-xl">
                {event3.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <MetaChip icon="solar:user-bold" label={event3.stats.modality.label} value={event3.stats.modality.value} accent="#EB7A4B" />
                <MetaChip icon="solar:stopwatch-bold" label={event3.stats.format.label} value={event3.stats.format.value} accent="#01C9CF" />
                <MetaChip icon="solar:list-check-bold" label={event3.stats.scheme.label} value={event3.stats.scheme.value} accent="#EB459A" />
              </div>
            </header>

            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* OFFICIAL PAGE 1 — DESCRIPTION, FLOW, RULES, SCORING, TIE-BREAK */}
              <article className="fade-in-up rounded-2xl border border-[#000000]/10 bg-white p-6 md:p-8 relative overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)]">
                <div className="absolute top-0 left-0 h-full w-1.5 bg-[#EB7A4B]"></div>

                <div className="flex flex-wrap items-start justify-between gap-4 mb-5 pl-2">
                  <div className="min-w-0">
                    <span className="font-bebas tracking-[0.25em] uppercase text-sm md:text-base block mb-1 text-[#EB7A4B]">
                      {event3.page1.eyebrow}
                    </span>
                    <h4 className="font-anton uppercase tracking-tight leading-none text-3xl md:text-5xl text-[#000000]">
                      {event3.page1.title}
                    </h4>
                  </div>
                  <span className="font-bebas text-xl md:text-2xl tracking-wide uppercase rounded-lg px-4 py-2 shrink-0 bg-[#EB7A4B]/[0.12] text-[#EB7A4B]">
                    {event3.stats.scheme.value}
                  </span>
                </div>

                <div className="pl-2 space-y-4 mb-6">
                  {event3.page1.paragraphs.map((paragraph, index) => (
                    <p key={`e3-paragraph-${index}`} className="text-lg md:text-xl font-medium leading-relaxed text-[#000000]/80">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* FLOW */}
                <div className="ml-2 mb-6">
                  <h5 className="font-bebas text-2xl md:text-3xl tracking-wide uppercase text-[#01C9CF] mb-4 flex items-center gap-3">
                    <iconify-icon icon="solar:route-bold-duotone" width="28" height="28"></iconify-icon>
                    {event3.page1.flow.title}
                  </h5>
                  <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event3.page1.flow.steps.map((step, index) => {
                      const isLast = index === event3.page1.flow.steps.length - 1;
                      return (
                        <li
                          key={`e3-flow-${index}`}
                          className={
                            'rounded-xl border px-5 py-4 flex items-start gap-3 ' +
                            (isLast ? 'border-[#01C9CF]/40 bg-[#01C9CF]/10' : 'border-[#EB7A4B]/30 bg-[#EB7A4B]/10')
                          }
                        >
                          <span className="font-anton text-2xl leading-none mt-0.5 shrink-0" style={{ color: isLast ? '#01C9CF' : '#EB7A4B' }}>
                            {step.reps}
                          </span>
                          <span className="font-bebas text-lg md:text-xl tracking-wide uppercase text-[#000000] break-words min-w-0">
                            {step.value}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                  <p className="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-[#EB459A]/50 bg-[#EB459A]/5 px-5 py-4 text-base md:text-lg font-semibold text-[#000000] leading-snug">
                    <iconify-icon icon="solar:refresh-circle-bold" width="22" height="22" className="text-[#EB459A] shrink-0 mt-0.5"></iconify-icon>
                    <span>{event3.page1.flow.beginnersNote}</span>
                  </p>
                </div>

                {/* COURSE RULES */}
                <div className="ml-2 mb-6 rounded-xl border border-[#000000]/10 bg-[#000000]/[0.03] overflow-hidden">
                  <h5 className="font-bebas text-2xl tracking-wide uppercase text-[#000000] px-5 pt-4 pb-2 flex items-center gap-3">
                    <iconify-icon icon="solar:clipboard-list-bold-duotone" width="24" height="24" className="text-[#EB7A4B]"></iconify-icon>
                    {event3.page1.rules.title}
                  </h5>
                  <ul className="px-5 pb-5 pt-1 space-y-3 text-base md:text-lg font-medium leading-relaxed text-[#000000]/80">
                    {event3.page1.rules.items.map((item, index) => (
                      <li key={`e3-rule-${index}`} className="flex items-start gap-3">
                        <iconify-icon icon="solar:check-circle-bold" width="22" height="22" className="shrink-0 mt-0.5 text-[#EB7A4B]"></iconify-icon>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SCORING + TIE-BREAK */}
                <div className="ml-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl px-5 py-4 flex items-start gap-3 bg-[#FDFAF5] border border-[#000000]/10">
                    <iconify-icon icon="solar:cup-first-bold" width="24" height="24" className="shrink-0 mt-0.5 text-[#EB7A4B]"></iconify-icon>
                    <div className="min-w-0">
                      <span className="font-bebas tracking-[0.2em] uppercase text-xs block mb-1 text-[#000000]/50">
                        {event3.page1.scoring.label}
                      </span>
                      <p className="text-base md:text-lg font-semibold leading-snug text-[#000000]">{event3.page1.scoring.text}</p>
                    </div>
                  </div>
                  <div className="rounded-xl px-5 py-4 flex items-start gap-3 bg-[#FDFAF5] border border-[#000000]/10">
                    <iconify-icon icon="solar:scale-bold-duotone" width="24" height="24" className="shrink-0 mt-0.5 text-[#EB459A]"></iconify-icon>
                    <div className="min-w-0">
                      <span className="font-bebas tracking-[0.2em] uppercase text-xs block mb-1 text-[#000000]/50">
                        {event3.page1.tieBreak.label}
                      </span>
                      <p className="text-base md:text-lg font-semibold leading-snug text-[#000000]">{event3.page1.tieBreak.text}</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* WEIGHTS & MOVEMENTS */}
              <div className="fade-in-up stagger-1 rounded-2xl border border-[#000000]/10 bg-white overflow-hidden">
                <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 flex flex-wrap items-end justify-between gap-3">
                  <h4 className="font-bebas text-2xl md:text-3xl tracking-wide uppercase text-[#000000] flex items-center gap-3">
                    <iconify-icon icon="solar:dumbbell-large-bold-duotone" width="28" height="28" className="text-[#EB7A4B]"></iconify-icon>
                    {event3.weights.title}
                  </h4>
                  <span className="font-bebas tracking-[0.2em] uppercase text-sm text-[#000000]/50">{event3.weights.legend}</span>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full table-fixed border-collapse text-left">
                    <thead>
                      <tr className="bg-[#000000] text-[#FDFAF5]">
                        <th scope="col" className="w-[38%] px-4 md:px-8 py-4 font-bebas tracking-[0.2em] uppercase text-sm md:text-base font-normal">
                          {event3.weights.division}
                        </th>
                        <th scope="col" className="w-[24%] px-2 md:px-4 py-4 font-bebas tracking-[0.2em] uppercase text-sm md:text-base font-normal text-center text-[#01C9CF]">
                          {event3.weights.weight}
                        </th>
                        <th scope="col" className="w-[38%] px-4 md:px-8 py-4 font-bebas tracking-[0.2em] uppercase text-sm md:text-base font-normal text-right text-[#EB459A]">
                          {event3.weights.gymnastics}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {event3.weights.rows.map((row, index) => {
                        const isRx = row.division === 'RX';
                        return (
                          <tr
                            key={`e3-weight-${index}`}
                            className={
                              'border-t border-[#000000]/10 ' +
                              (isRx ? 'bg-[#EB7A4B]/10' : index % 2 === 1 ? 'bg-[#FDFAF5]' : 'bg-white')
                            }
                          >
                            <th scope="row" className="px-4 md:px-8 py-4 font-bebas text-xl md:text-2xl tracking-wide uppercase text-[#000000] font-normal break-words leading-tight">
                              <span className="flex items-center gap-2">
                                {isRx && <span className="w-2 h-2 rounded-full bg-[#EB7A4B] shrink-0" aria-hidden="true"></span>}
                                {row.division}
                              </span>
                            </th>
                            <td className="px-2 md:px-4 py-4 text-center font-anton text-2xl md:text-3xl tracking-tight tabular-nums whitespace-nowrap" style={{ color: isRx ? '#EB7A4B' : '#000000' }}>
                              {row.weight}
                            </td>
                            <td className="px-4 md:px-8 py-4 text-right font-bebas text-lg md:text-xl tracking-wide uppercase leading-tight break-words" style={{ color: isRx ? '#EB7A4B' : '#000000' }}>
                              {row.gymnastics}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 md:px-8 py-5 border-t border-[#000000]/10">
                  <p className="flex items-start gap-3 text-base md:text-lg font-semibold text-[#000000] leading-relaxed">
                    <iconify-icon icon="solar:danger-triangle-bold" width="22" height="22" className="text-[#EB459A] shrink-0 mt-0.5"></iconify-icon>
                    <span>
                      <span className="font-bebas tracking-[0.2em] uppercase text-sm text-[#EB459A] block mb-1">{event3.weights.beginnersNoteLabel}</span>
                      {event3.weights.beginnersNote}
                    </span>
                  </p>
                </div>
              </div>

              {/* OFFICIAL PAGE 2 — MOVEMENT STANDARDS */}
              <div className="fade-in-up stagger-2">
                <MovementStandardsGroups id="event-03-standards" data={event3.standards} accent="#EB7A4B" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ParadiseInSync />

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

// Official source: Paradise_in_Sync_Reglamento_Teams.pdf, pages 1–2.
// Scoped to this workout; follows the site's existing i18next language selection.
const paradiseCopy = {
  es: {
    badge: 'EVENTO DE TEAMS', modality: 'MODALIDAD', team: 'Teams · 4 atletas', format: 'Relay + sincronizado',
    summary: 'M/M + F/F · Gimnasia y soga en relay, seguidas de 66 KB goblet squats y 44 box jumps sincronizados por los cuatro atletas.',
    relay: 'GIMNASIA + SOGA', steps: [
      'A la señal de 3, 2, 1... GO, una pareja M/M o F/F, según la estrategia del equipo, se moverá a la barra de gimnasia. La otra pareja esperará su turno.',
      'Atleta 1: Completa 22 toes-to-bar (knee raises en Beginners). Al terminar, permanece en dead hang hold (suspensión en la barra) mientras el atleta 2 completa 4 rope climbs.',
      'Cambio dentro de la pareja: El atleta 2 completa sus 22 repeticiones de gimnasia y permanece en dead hang mientras el atleta 1 realiza sus 4 rope climbs.',
      'Segunda pareja: Al terminar la primera pareja, cambia con la pareja que espera, que repite el mismo proceso en modo relay. Una vez que los cuatro atletas completen su gimnasia y trabajo de soga, el equipo avanzará a los kettlebell goblet squats.'
    ],
    beginner: 'Beginners: El movimiento de gimnasia es knee raise y el trabajo de soga es 8 repeticiones desde el piso, según la tabla de la división.',
    squat: 'Los cuatro integrantes completarán 66 kettlebell goblet squats sincronizados. Se observará la sincronización tanto en la bajada como en la subida, alcanzando juntos la profundidad requerida y la extensión final.',
    box: 'El equipo completará 44 box jumps sincronizados. El despegue del salto deberá ser sincronizado y la repetición contará cuando todos estén al mismo tiempo en extensión completa sobre sus cajones. La bajada no necesita ser sincronizada. Todos deberán regresar al piso antes de iniciar la siguiente repetición.',
    weights: 'PESOS Y MOVIMIENTOS POR DIVISIÓN', headers: ['DIVISIÓN', 'KB · F/M', 'GIMNASIA', 'SOGA', 'BOX · F/M'],
    rows: [['Beginner', '24/35 lb', '22 knee raises', '8 desde el piso', '20/20 in'], ['Scale / Masters', '35/44 lb', '22 toes-to-bar', '12/15 ft', '20/24 in'], ['Intermedio', '44/53 lb', '22 toes-to-bar', '15 ft · todos', '24/24 in'], ['RX', '44/53 lb', '22 toes-to-bar', '12/15 ft · legless', '24/30 in']],
    legend: 'F/M = femenino/masculino. Pesos en libras; altura de soga en pies; altura del cajón en pulgadas.',
    standards: 'ESTÁNDARES DE MOVIMIENTO', source: 'REGLAMENTO OFICIAL · PÁGINA 2', reference: 'Referencia del estándar: iF3, Toes to Bar (7.01).',
    groups: [
      ['ROPE CLIMB', [
        'Inicio: Cada repetición comienza con ambos pies en el suelo. Se permite saltar o alcanzar la soga para agarrarla.',
        'Asistencia de piernas: Se permite usar piernas y pies para sujetar o bloquear la soga en los ascensos regulares. En RX, los ascensos son legless, sin asistencia de piernas.',
        'Final: La repetición cuenta cuando una mano toca claramente la marca objetivo a la altura indicada para la división (12 o 15 pies), o el objeto fijo designado como objetivo.',
        'Beginners: 8 repeticiones de soga desde el piso, según la tabla.'
      ]],
      ['TOES-TO-BAR', [
        'Movimiento: El atleta, colgado de una barra horizontal, eleva ambos pies hasta tocar la barra con los dedos de los pies.',
        'Inicio: Suspensión vertical con los codos y la cadera completamente extendidos y los pies sin tocar el suelo. Ambos talones deberán pasar detrás del plano vertical de la barra antes de cada repetición.',
        'Final: Los dedos de ambos pies deberán tocar la barra simultáneamente, dentro del ancho de las manos.',
        'Estilo: Se permite el movimiento estricto o con balanceo (kipping).',
        'Ciclo: El atleta puede regresar a la posición inicial de cualquier manera controlada, cumpliendo nuevamente la extensión y el paso de los talones detrás de la barra.',
        'No Rep: Contacto con un solo pie, contacto de los pies en momentos distintos, contacto fuera del ancho de las manos, o no cumplir la posición inicial.'
      ]],
      ['KNEE RAISE · BEGINNERS', [
        'Inicio: Brazos y cadera completamente extendidos, pies sin tocar el suelo. Ambos talones deberán pasar detrás de la línea vertical de la barra.',
        'Final: La parte superior de ambas rodillas deberá superar la altura de la cadera.',
        'Estilo: Se permite cualquier agarre, movimiento estricto o con balanceo (kipping).'
      ]],
      ['KB GOBLET SQUAT', [
        'Equipo: La kettlebell deberá sujetarse correctamente por el asa durante todo el movimiento, cerca del torso en posición goblet.',
        'Postura: Pies separados al ancho de caderas u hombros, talones apoyados y puntas ligeramente hacia afuera.',
        'Profundidad: El pliegue de la cadera debe pasar claramente por debajo de la parte superior de la rodilla.',
        'Torso: Abdomen firme, espalda neutral y pecho erguido; codos libres de las rodillas o colocados por dentro de ellas.',
        'Final: Extensión completa de cadera y rodillas en la posición de pie.',
        'Sincronización: Los cuatro atletas deberán bajar juntos por debajo del paralelo y alcanzar juntos la extensión completa de cadera y rodillas en la parte superior.'
      ]],
      ['BOX JUMP', [
        'Inicio: El atleta debe estar de frente al cajón, con ambos pies en el suelo antes de saltar.',
        'Salto: Despegue con los dos pies. No se permite subir caminando, despegar con un solo pie ni realizar un rebote sin establecer la posición inicial.',
        'Sobre el cajón: Aterrizar con ambos pies y alcanzar extensión completa de caderas y rodillas, con hombros sobre las caderas y control en la posición final.',
        'Sincronización: El despegue deberá ser simultáneo. La repetición cuenta cuando los cuatro atletas estén al mismo tiempo en extensión completa sobre sus cajones.',
        'Bajada: Se permite saltar o bajar caminando. La bajada no necesita ser sincronizada; la siguiente repetición comienza cuando todos estén de nuevo en el suelo.'
      ]]
    ]
  },
  en: {
    badge: 'TEAM EVENT', modality: 'MODALITY', team: 'Teams · 4 athletes', format: 'Relay + synchronized',
    summary: 'M/M + F/F · Gymnastics and rope work in relay, followed by 66 KB goblet squats and 44 box jumps synchronized by all four athletes.',
    relay: 'GYMNASTICS + ROPE', steps: [
      'At the signal of 3, 2, 1... GO, one M/M or F/F pair, according to the team’s strategy, moves to the gymnastics bar. The other pair waits for its turn.',
      'Athlete 1: Completes 22 toes-to-bar (knee raises for Beginners). After finishing, remains in a dead hang hold on the bar while athlete 2 completes 4 rope climbs.',
      'Switch within the pair: Athlete 2 completes their 22 gymnastics repetitions and remains in a dead hang while athlete 1 performs their 4 rope climbs.',
      'Second pair: Once the first pair finishes, the waiting pair takes over and repeats the same relay process. After all four athletes have completed their gymnastics and rope work, the team advances to the kettlebell goblet squats.'
    ],
    beginner: 'Beginners: The gymnastics movement is the knee raise, and rope work is 8 repetitions from the floor, as specified in the division table.',
    squat: 'All four team members complete 66 synchronized kettlebell goblet squats. Synchronization is required on both the descent and ascent, reaching the required depth and final extension together.',
    box: 'The team completes 44 synchronized box jumps. Takeoff must be synchronized, and the repetition counts when all athletes are at full extension on their boxes at the same time. The descent does not need to be synchronized. Everyone must return to the floor before starting the next repetition.',
    weights: 'WEIGHTS & MOVEMENTS BY DIVISION', headers: ['DIVISION', 'KB · F/M', 'GYMNASTICS', 'ROPE', 'BOX · F/M'],
    rows: [['Beginner', '24/35 lb', '22 knee raises', '8 from the floor', '20/20 in'], ['Scale / Masters', '35/44 lb', '22 toes-to-bar', '12/15 ft', '20/24 in'], ['Intermediate', '44/53 lb', '22 toes-to-bar', '15 ft · all', '24/24 in'], ['RX', '44/53 lb', '22 toes-to-bar', '12/15 ft · legless', '24/30 in']],
    legend: 'F/M = female/male. Weights in pounds; rope height in feet; box height in inches.',
    standards: 'MOVEMENT STANDARDS', source: 'OFFICIAL RULES · PAGE 2', reference: 'Standard reference: iF3, Toes to Bar (7.01).',
    groups: [
      ['ROPE CLIMB', [
        'Start: Each repetition begins with both feet on the floor. Jumping or reaching to grab the rope is allowed.',
        'Leg assistance: Legs and feet may be used to grip or lock the rope on regular climbs. RX climbs are legless, with no leg assistance.',
        'Finish: The repetition counts when one hand clearly touches the target mark at the height specified for the division (12 or 15 feet), or the fixed object designated as the target.',
        'Beginners: 8 rope repetitions from the floor, as specified in the table.'
      ]],
      ['TOES-TO-BAR', [
        'Movement: Hanging from a horizontal bar, the athlete raises both feet until the toes touch the bar.',
        'Start: A vertical hang with elbows and hips fully extended and feet off the floor. Both heels must pass behind the vertical plane of the bar before each repetition.',
        'Finish: The toes of both feet must touch the bar simultaneously, within the width of the hands.',
        'Style: Strict or kipping movement is allowed.',
        'Cycle: The athlete may return to the starting position in any controlled manner, again meeting the extension requirement and bringing the heels behind the bar.',
        'No Rep: Contact with only one foot, feet touching at different times, contact outside the width of the hands, or failing to meet the starting position.'
      ]],
      ['KNEE RAISE · BEGINNERS', [
        'Start: Arms and hips fully extended, feet off the floor. Both heels must pass behind the vertical line of the bar.',
        'Finish: The top of both knees must rise above hip height.',
        'Style: Any grip, strict movement or kipping is allowed.'
      ]],
      ['KB GOBLET SQUAT', [
        'Equipment: The kettlebell must be held correctly by its handle throughout the movement, close to the torso in the goblet position.',
        'Stance: Feet hip- or shoulder-width apart, heels planted and toes slightly turned out.',
        'Depth: The hip crease must clearly pass below the top of the knee.',
        'Torso: Core braced, back neutral and chest upright; elbows clear of the knees or positioned inside them.',
        'Finish: Full hip and knee extension in the standing position.',
        'Synchronization: All four athletes must descend below parallel together and reach full hip and knee extension together at the top.'
      ]],
      ['BOX JUMP', [
        'Start: The athlete must face the box with both feet on the floor before jumping.',
        'Jump: Take off with both feet. Step-ups, single-foot takeoffs and rebounding without establishing the starting position are not allowed.',
        'On the box: Land with both feet and reach full hip and knee extension, shoulders over hips and control in the final position.',
        'Synchronization: Takeoff must be simultaneous. The repetition counts when all four athletes are at full extension on their boxes at the same time.',
        'Descent: Jumping or stepping down is allowed. The descent does not need to be synchronized; the next repetition begins when everyone is back on the floor.'
      ]]
    ]
  }
};

function ParadiseInSync() {
  const { t, i18n } = useTranslation();
  const copy = paradiseCopy[(i18n.resolvedLanguage || i18n.language || 'en').startsWith('es') ? 'es' : 'en'];
  return (
    <section id="event-04" aria-labelledby="paradise-title" className="scroll-mt-24 relative overflow-hidden bg-[#000000] text-[#FDFAF5] py-20 md:py-28">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#01C9CF]/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="fade-in-up mb-10 md:mb-14">
          <span className="font-bebas text-[#01C9CF] tracking-[0.25em] text-xl block mb-3">{copy.badge} · WORKOUT 04</span>
          <h2 id="paradise-title" className="font-anton uppercase tracking-tighter leading-[0.95] text-5xl sm:text-6xl md:text-8xl mb-6">PARADISE<br /><span className="text-[#01C9CF]">IN SYNC</span></h2>
          <p className="text-lg md:text-xl leading-relaxed text-[#FDFAF5]/80 max-w-3xl">{copy.summary}</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-10 fade-in-up">
          <MetaChip icon="solar:users-group-rounded-bold" label={copy.modality} value={copy.team} dark accent="#01C9CF" />
          <MetaChip icon="solar:stopwatch-bold" label={t('workouts.labels.timeCap')} value="15 MIN" dark accent="#EB459A" />
          <MetaChip icon="solar:refresh-circle-bold" label={t('workouts.labels.format')} value={copy.format} dark accent="#EB7A4B" />
        </div>
        <div className="space-y-6 mb-12">
          <article className="rounded-2xl border border-[#FDFAF5]/15 bg-[#FDFAF5]/5 p-6 md:p-8 fade-in-up">
            <div className="flex flex-wrap justify-between gap-3 mb-6"><h3 className="font-bebas text-3xl md:text-4xl"><span className="text-[#01C9CF]">A · </span>{copy.relay}</h3><span className="font-bebas text-xl text-[#01C9CF]">RELAY</span></div>
            <ol className="space-y-5 text-base md:text-lg leading-relaxed text-[#FDFAF5]/85">{copy.steps.map((step, index) => <li key={index} className="flex gap-4"><span className="font-anton text-[#01C9CF] shrink-0">0{index + 1}</span><span>{step}</span></li>)}</ol>
            <p className="mt-6 border-l-4 border-[#EB459A] bg-[#EB459A]/10 p-4 text-base md:text-lg leading-relaxed">{copy.beginner}</p>
          </article>
          <div className="grid md:grid-cols-2 gap-6">
            {[['B', 'KB GOBLET SQUAT', '66', copy.squat], ['C', 'BOX JUMP', '44', copy.box]].map(([letter, title, reps, description]) => <article key={letter} className="rounded-2xl border border-[#FDFAF5]/15 bg-[#FDFAF5]/5 p-6 md:p-8 fade-in-up"><span className="font-bebas text-[#EB7A4B] text-xl tracking-wider">{reps} REPS · SYNC</span><h3 className="font-bebas text-3xl md:text-4xl my-3"><span className="text-[#EB7A4B]">{letter} · </span>{title}</h3><p className="text-base md:text-lg leading-relaxed text-[#FDFAF5]/85">{description}</p></article>)}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-[#FDFAF5]/15 mb-12 fade-in-up">
          <h3 id="paradise-weights" className="font-bebas text-2xl md:text-3xl p-6 bg-[#EB459A]">{copy.weights}</h3>
          <div className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#01C9CF]" tabIndex={0} role="region" aria-labelledby="paradise-weights">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead className="bg-[#FDFAF5]/10"><tr>{copy.headers.map(header => <th key={header} scope="col" className="px-5 py-4 font-bebas text-lg tracking-wide font-normal">{header}</th>)}</tr></thead>
              <tbody>{copy.rows.map((row, index) => <tr key={row[0]} className={index % 2 ? 'bg-[#FDFAF5]/5 border-t border-[#FDFAF5]/10' : 'border-t border-[#FDFAF5]/10'}><th scope="row" className="px-5 py-5 font-bebas text-xl text-[#01C9CF] font-normal">{row[0]}</th>{row.slice(1).map((cell, col) => <td key={col} className="px-5 py-5 text-base whitespace-nowrap">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="px-6 py-5 text-sm md:text-base leading-relaxed text-[#FDFAF5]/70 border-t border-[#FDFAF5]/15">{copy.legend}</p>
        </div>
        <div className="fade-in-up">
          <span className="font-bebas tracking-wider text-[#01C9CF]">{copy.source}</span>
          <h3 className="font-bebas text-3xl md:text-4xl mt-2 mb-6">{copy.standards}</h3>
          <div className="space-y-3">{copy.groups.map(([title, items], index) => <details key={title} className="group rounded-xl border border-[#FDFAF5]/15 bg-[#FDFAF5]/5"><summary className="cursor-pointer min-h-[64px] px-5 py-5 font-bebas text-xl md:text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#01C9CF]"><span className="text-[#01C9CF] mr-3">0{index + 1}</span>{title}</summary><div className="px-6 pb-6"><ul className="list-disc pl-5 space-y-3 text-base md:text-lg leading-relaxed text-[#FDFAF5]/85">{items.map(item => <li key={item}>{item}</li>)}</ul>{index === 1 && <p className="mt-5 text-sm text-[#FDFAF5]/60">{copy.reference}</p>}</div></details>)}</div>
        </div>
      </div>
    </section>
  );
}
