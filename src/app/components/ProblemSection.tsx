import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { AnimatedNumber } from './AnimatedNumber';
import { HeadlineReveal } from './HeadlineReveal';
import { useIsMobile } from '../hooks/useIsMobile';

// ─── Card 1: Visitor exit-rate dot grid ───────────────────────────────────────
function ExitRateVisual({ active }: { active: boolean }) {
  const total = 20;
  const lost = 15; // ≈73%

  return (
    <div style={{
      background: 'rgba(14,14,14,0.02)',
      border: '1px solid rgba(14,14,14,0.06)',
      borderRadius: 6, padding: '14px 16px',
      marginBottom: 4,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 8.5,
        color: 'rgba(14,14,14,0.3)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 10,
      }}>
        // 100 visitors arrive
      </div>

      {/* Dot grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
        {Array.from({ length: total }, (_, i) => (
          <motion.div
            key={i}
            initial={{
              background: 'rgba(14,14,14,0.12)',
              borderColor: 'rgba(14,14,14,0.15)',
            }}
            animate={active ? {
              background: i < lost ? 'rgba(239,68,68,0.25)' : '#4A7C6F',
              borderColor: i < lost ? 'rgba(239,68,68,0.55)' : '#4A7C6F',
            } : {}}
            transition={{ delay: 0.5 + i * 0.045, duration: 0.28 }}
            style={{
              width: 18, height: 18, borderRadius: '50%',
              border: '1.5px solid transparent',
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'rgba(239,68,68,0.3)', border: '1px solid rgba(239,68,68,0.6)',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            color: 'rgba(14,14,14,0.4)',
          }}>Left (73%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4A7C6F' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5,
            color: 'rgba(14,14,14,0.4)',
          }}>Stayed (27%)</span>
        </div>
      </div>
    </div>
  );
}

// ─── Card 2: Business vs website timeline divergence ──────────────────────────
function TimelineDivergenceVisual({ active }: { active: boolean }) {
  return (
    <div style={{
      background: 'rgba(14,14,14,0.02)',
      border: '1px solid rgba(14,14,14,0.06)',
      borderRadius: 6, padding: '14px 18px',
      marginBottom: 4,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 8.5,
        color: 'rgba(14,14,14,0.3)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 14,
      }}>
        // Positioning timeline
      </div>

      {/* Business row */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            color: '#4A7C6F', letterSpacing: '0.06em', fontWeight: 600,
          }}>BUSINESS</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 8,
              color: '#4A7C6F', letterSpacing: '0.04em',
            }}
          >NOW →</motion.span>
        </div>
        <div style={{ position: 'relative', height: 8 }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(14,14,14,0.06)', borderRadius: 4,
          }} />
          <motion.div
            initial={{ width: 0 }}
            animate={active ? { width: '100%' } : {}}
            transition={{ delay: 0.35, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', height: '100%',
              background: 'linear-gradient(90deg, rgba(74,124,111,0.5), var(--color-sage))',
              borderRadius: 4,
            }}
          />
          {/* Milestone dots */}
          {[20, 42, 65, 84, 100].map((pct, idx) => (
            <motion.div
              key={pct}
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : {}}
              transition={{ delay: 0.6 + idx * 0.1, type: 'spring', stiffness: 440, damping: 20 }}
              style={{
                position: 'absolute', top: '50%',
                left: `${pct}%`,
                transform: 'translate(-50%, -50%)',
                width: 9, height: 9, borderRadius: '50%',
                background: '#F5F2ED',
                border: '2px solid var(--color-sage)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Website row */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            color: 'rgba(239,68,68,0.65)', letterSpacing: '0.06em', fontWeight: 600,
          }}>WEBSITE</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 1.6 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 8,
              color: 'rgba(239,68,68,0.6)',
            }}
          >2–3 yrs behind</motion.span>
        </div>
        <div style={{ position: 'relative', height: 8 }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(14,14,14,0.06)', borderRadius: 4,
          }} />
          <motion.div
            initial={{ width: 0 }}
            animate={active ? { width: '58%' } : {}}
            transition={{ delay: 0.45, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', height: '100%',
              background: 'rgba(239,68,68,0.45)', borderRadius: 4,
            }}
          />
          {/* Stop marker */}
          <motion.div
            initial={{ scale: 0 }}
            animate={active ? { scale: 1 } : {}}
            transition={{ delay: 1.3, type: 'spring', stiffness: 400 }}
            style={{
              position: 'absolute', left: '58%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 11, height: 11, borderRadius: '50%',
              background: '#EF4444', border: '2px solid white',
            }}
          />
        </div>

        {/* Gap callout */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.55 }}
          style={{
            marginTop: 10,
            background: 'rgba(239,68,68,0.04)',
            border: '1px dashed rgba(239,68,68,0.2)',
            borderRadius: 3, padding: '4px 10px',
            display: 'flex', justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'rgba(239,68,68,0.55)' }}>
            ↕ credibility gap
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 8.5,
            color: 'rgba(239,68,68,0.65)', fontWeight: 700,
          }}>open</span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Card 3: Iceberg — visible vs invisible losses ────────────────────────────
function SilentLossesVisual({ active }: { active: boolean }) {
  return (
    <div style={{
      background: 'rgba(14,14,14,0.02)',
      border: '1px solid rgba(14,14,14,0.06)',
      borderRadius: 6, padding: '14px 16px',
      marginBottom: 4, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 8.5,
        color: 'rgba(14,14,14,0.3)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 12,
      }}>
        // Loss visibility map
      </div>

      {/* Above line: analytics (visible) */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={active ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(200,169,122,0.12)',
          border: '1px solid rgba(200,169,122,0.3)',
          borderRadius: 4, padding: '7px 12px',
          marginBottom: 6, transformOrigin: 'bottom',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(200,169,122,0.7)', fontWeight: 600 }}>
          WHAT ANALYTICS SHOWS
        </span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: '#C8A97A', fontWeight: 700 }}>
          ~5%
        </span>
      </motion.div>

      {/* Divider — waterline */}
      <div style={{
        height: 1, margin: '2px 0 6px',
        background: 'repeating-linear-gradient(90deg, rgba(14,14,14,0.2) 0px, rgba(14,14,14,0.2) 6px, transparent 6px, transparent 12px)',
      }} />

      {/* Below line: invisible losses */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={active ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(239,68,68,0.05)',
          border: '1px dashed rgba(239,68,68,0.28)',
          borderRadius: 4, padding: '9px 12px',
          transformOrigin: 'top',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(239,68,68,0.6)', fontWeight: 600 }}>
            SILENT LOSSES
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'rgba(239,68,68,0.7)', fontWeight: 700 }}>
            ~95%
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[
            'Prospects who never reached out',
            'Proposals that went cold',
            'Investors who formed the wrong impression',
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -8 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.1 + i * 0.14 }}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <div style={{
                width: 3, height: 3, borderRadius: '50%',
                background: 'rgba(239,68,68,0.45)', flexShrink: 0,
              }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: 10.5,
                color: 'rgba(14,14,14,0.42)',
              }}>{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
const ACCENT_COLORS = ['#EF4444', '#FB923C', '#C8A97A'];

const CARDS = [
  {
    stat: 73,
    statSuffix: '%',
    statLabel: 'of visitors leave in <3 seconds',
    heading: "Traffic arrives. Revenue doesn\u2019t follow.",
    body: "Qualified prospects land on your site, have the right problem, but see the wrong company. They leave \u2014 to a competitor who simply looks more current.",
    Visual: ExitRateVisual,
  },
  {
    stat: null,
    statDisplay: '2\u20133 years',
    statLabel: 'behind what the business actually is',
    heading: "Your site introduces who you used to be.",
    body: "The business evolved. The positioning sharpened. The clients changed. The website didn\u2019t keep up \u2014 and it\u2019s making the first impression you can\u2019t control.",
    Visual: TimelineDivergenceVisual,
  },
  {
    stat: null,
    statDisplay: 'Silent',
    statLabel: 'losses that never show up in analytics',
    heading: "The gap compounds invisibly.",
    body: "Clients who didn\u2019t reach out. Proposals that went cold. Investors who formed the wrong impression in four seconds. These losses compound \u2014 you just never see them itemised.",
    Visual: SilentLossesVisual,
  },
];

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();

  return (
    <section className="section section-light" id="problem">
      <div className="container-wide" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 640, marginBottom: 72 }}
        >
          <span className="eyebrow">The Credibility Gap</span>
          <HeadlineReveal
            as="h2"
            className="section-headline"
            lines={['Your website is working', 'against you.']}
            baseDelay={0.1}
            inView={inView}
          />
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 28 }}>
          {CARDS.map((card, i) => {
            const { Visual } = card;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12 + 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'white',
                  border: '1px solid rgba(14,14,14,0.08)',
                  borderRadius: 8, padding: '28px 28px 36px',
                  display: 'flex', flexDirection: 'column', gap: 18,
                  transition: 'transform 200ms ease, box-shadow 200ms ease',
                  cursor: 'default', position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 64px rgba(0,0,0,0.07)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Visual illustration */}
                <Visual active={inView} />

                {/* Stat */}
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700,
                    color: 'var(--color-off-black)', lineHeight: 1, marginBottom: 4,
                  }}>
                    {card.stat !== null ? (
                      <AnimatedNumber to={card.stat} suffix={card.statSuffix} duration={1600} />
                    ) : (
                      card.statDisplay
                    )}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'rgba(14,14,14,0.4)', letterSpacing: '0.04em',
                  }}>
                    {card.statLabel}
                  </div>
                </div>

                {/* Copy */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-headline)', fontSize: 18, fontWeight: 600,
                    color: 'var(--color-off-black)', marginBottom: 10, lineHeight: 1.35,
                  }}>
                    {card.heading}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
                    color: 'rgba(14,14,14,0.6)',
                  }}>
                    {card.body}
                  </p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.9, delay: i * 0.12 + 0.5 }}
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                    background: ACCENT_COLORS[i],
                    transformOrigin: 'left', opacity: 0.55,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{ maxWidth: 680, margin: '64px auto 0', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 19, fontStyle: 'italic',
            lineHeight: 1.55, color: 'rgba(14,14,14,0.5)',
          }}>
            The gap between what your business is and what your website shows
            creates a credibility deficit that compounds silently.
          </p>
        </motion.div>
      </div>
    </section>
  );
}