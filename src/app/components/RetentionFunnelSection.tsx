import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { HeadlineReveal } from './HeadlineReveal';
import { useIsMobile } from '../hooks/useIsMobile';

// ─── Funnel stage data ────────────────────────────────────────────────────────
const FUNNEL_STAGES = [
  {
    label: 'Total Visitors',
    before: { value: 10000, display: '10,000' },
    after: { value: 10000, display: '10,000' },
    description: 'Same traffic, same ad spend',
    widthPct: 100,
  },
  {
    label: 'Stayed Past 3s',
    before: { value: 2700, display: '2,700' },
    after: { value: 6400, display: '6,400' },
    description: 'First impression retention',
    widthPct: 82,
  },
  {
    label: 'Engaged (Scrolled)',
    before: { value: 1100, display: '1,100' },
    after: { value: 4200, display: '4,200' },
    description: 'Read past the fold',
    widthPct: 64,
  },
  {
    label: 'Explored Services',
    before: { value: 340, display: '340' },
    after: { value: 2100, display: '2,100' },
    description: 'Visited 2+ pages',
    widthPct: 48,
  },
  {
    label: 'Converted',
    before: { value: 80, display: '80' },
    after: { value: 320, display: '320' },
    description: 'Inquiry or purchase',
    widthPct: 32,
  },
];

const MOBILE_STAGE_WIDTHS = [100, 96, 92, 88, 84];

// ─── Floating particle component ──────────────────────────────────────────────
function FlowParticle({ delay, x, duration, color }: { delay: number; x: number; duration: number; color: string }) {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0, x }}
      animate={{ y: 320, opacity: [0, 0.8, 0.8, 0] }}
      transition={{ delay, duration, repeat: Infinity, repeatDelay: duration * 0.3, ease: 'linear' }}
      style={{
        position: 'absolute', top: 0,
        width: 4, height: 4, borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px ${color}`,
        zIndex: 5,
      }}
    />
  );
}

// ─── Single funnel stage row ──────────────────────────────────────────────────
function FunnelStageRow({
  stage,
  index,
  showAfter,
  inView,
  isMobile,
}: {
  stage: typeof FUNNEL_STAGES[0];
  index: number;
  showAfter: boolean;
  inView: boolean;
  isMobile: boolean;
}) {
  const isFirst = index === 0;
  const isLast = index === FUNNEL_STAGES.length - 1;
  const dropoffBefore = isFirst ? 0 : Math.round((1 - stage.before.value / FUNNEL_STAGES[index - 1].before.value) * 100);
  const dropoffAfter = isFirst ? 0 : Math.round((1 - stage.after.value / FUNNEL_STAGES[index - 1].after.value) * 100);
  const currentDropoff = showAfter ? dropoffAfter : dropoffBefore;
  const currentValue = showAfter ? stage.after : stage.before;
  const stageWidth = isMobile ? MOBILE_STAGE_WIDTHS[index] : stage.widthPct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        width: `${stageWidth}%`,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Stage bar */}
      <motion.div
        layout={!isMobile}
        style={{
          flex: 1,
          height: isMobile ? (isLast ? 78 : 74) : (isLast ? 66 : 62),
          borderRadius: isFirst ? '14px 14px 6px 6px' : isLast ? '6px 6px 14px 14px' : 6,
          overflow: 'hidden',
          position: 'relative',
          border: isLast
            ? `2px solid ${showAfter ? 'rgba(74,124,111,0.75)' : 'rgba(239,68,68,0.55)'}`
            : isMobile
              ? '1px solid rgba(245,242,237,0.16)'
              : '1px solid rgba(245,242,237,0.08)',
          transition: 'border-color 0.6s ease',
          background: isMobile ? 'rgba(22, 22, 28, 0.94)' : undefined,
          boxShadow: isMobile ? '0 10px 28px rgba(0,0,0,0.22)' : undefined,
        }}
      >
        {/* Background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isLast
            ? (showAfter
              ? (isMobile ? 'rgba(74,124,111,0.22)' : 'rgba(74,124,111,0.12)')
              : (isMobile ? 'rgba(239,68,68,0.14)' : 'rgba(239,68,68,0.06)'))
            : (isMobile ? 'rgba(245,242,237,0.08)' : 'rgba(245,242,237,0.03)'),
          transition: 'background 0.6s ease',
        }} />

        {/* Fill bar */}
        <motion.div
          animate={{
            width: showAfter
              ? `${(stage.after.value / 10000) * 100}%`
              : `${(stage.before.value / 10000) * 100}%`,
          }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            background: showAfter
              ? (isLast
                ? (isMobile
                  ? 'linear-gradient(90deg, rgba(74,124,111,0.72), rgba(74,124,111,0.42))'
                  : 'linear-gradient(90deg, rgba(74,124,111,0.5), rgba(74,124,111,0.3))')
                : (isMobile ? 'rgba(74,124,111,0.28)' : 'rgba(74,124,111,0.15)'))
              : (isLast
                ? (isMobile
                  ? 'linear-gradient(90deg, rgba(239,68,68,0.48), rgba(239,68,68,0.24))'
                  : 'linear-gradient(90deg, rgba(239,68,68,0.3), rgba(239,68,68,0.15))')
                : (isMobile ? 'rgba(239,68,68,0.18)' : 'rgba(239,68,68,0.08)')),
            transition: 'background 0.6s ease',
          }}
        />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          height: '100%', padding: isMobile ? '0 14px' : '0 18px',
        }}>
          {/* Left: label + description */}
          <div style={{ minWidth: 0, paddingRight: 10 }}>
            <div style={{
              fontFamily: 'var(--font-headline)', fontSize: isMobile ? (isLast ? 15 : 13) : (isLast ? 17 : 15), fontWeight: 600,
              color: isLast
                ? (showAfter ? '#4A7C6F' : 'rgba(239,68,68,0.8)')
                : isMobile ? 'rgba(245,242,237,0.92)' : 'rgba(245,242,237,0.8)',
              transition: 'color 0.4s ease',
              marginBottom: 3,
              lineHeight: 1.15,
            }}>{stage.label}</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: isMobile ? 9.5 : 10,
              color: isMobile ? 'rgba(245,242,237,0.56)' : 'rgba(245,242,237,0.38)', letterSpacing: '0.04em',
              lineHeight: 1.35,
            }}>{stage.description}</div>
          </div>

          {/* Right: value */}
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
            <motion.div
              key={currentValue.display}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: isMobile ? (isLast ? 26 : 22) : (isLast ? 32 : 24), fontWeight: 700,
                color: isLast
                  ? (showAfter ? '#4A7C6F' : 'rgba(239,68,68,0.7)')
                  : isMobile ? 'rgba(255,255,255,0.96)' : 'var(--color-warm-white)',
                lineHeight: 1,
                transition: 'color 0.4s ease',
              }}
            >{currentValue.display}</motion.div>

            {!isFirst && (
              <motion.div
                key={`${stage.label}-${currentDropoff}-${showAfter ? 'after' : 'before'}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: showAfter ? 'rgba(74,124,111,0.12)' : 'rgba(239,68,68,0.1)',
                  border: `1px solid ${showAfter ? 'rgba(74,124,111,0.24)' : 'rgba(239,68,68,0.2)'}`,
                  borderRadius: 999,
                  padding: isMobile ? '3px 7px' : '4px 8px',
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: showAfter ? '#4A7C6F' : '#EF4444',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? 9 : 9.5,
                    fontWeight: 600,
                    color: showAfter ? 'rgba(148, 217, 195, 0.92)' : 'rgba(255, 158, 158, 0.88)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  -{currentDropoff}% drop-off
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Glow on last row */}
        {isLast && showAfter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute', inset: -1,
              borderRadius: '6px 6px 14px 14px',
              boxShadow: '0 0 30px rgba(74,124,111,0.2), inset 0 0 20px rgba(74,124,111,0.05)',
              pointerEvents: 'none',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function RetentionFunnelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();
  const [showAfter, setShowAfter] = useState(false);

  // Auto-toggle after first view
  useEffect(() => {
    if (!inView || isMobile) return;
    const timer = setTimeout(() => setShowAfter(true), 2800);
    return () => clearTimeout(timer);
  }, [inView, isMobile]);

  return (
    <section
      className="section section-dark"
      id="retention"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle background grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: `
          linear-gradient(rgba(245,242,237,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,242,237,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div className="container-wide" ref={ref} style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 32 : 80,
          alignItems: 'end',
          marginBottom: 80,
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">The Improvement</span>
            <HeadlineReveal
              as="h2"
              className="section-headline section-headline-light"
              lines={['Where visitors go —', 'before and after.']}
              baseDelay={0.1}
              inView={inView}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 420 }}
          >
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.65,
              color: 'rgba(245,242,237,0.55)',
            }}>
              Same traffic. Same ad spend. The only variable is the site itself. 
              Watch what happens to retention at every stage when the digital presence 
              actually matches the business.
            </p>
          </motion.div>
        </div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            display: 'flex', justifyContent: 'center', marginBottom: 40,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'rgba(245,242,237,0.3)',
                letterSpacing: '0.08em',
                marginBottom: 10,
                textTransform: 'uppercase',
              }}
            >
              Compare states
            </div>
            <div style={{
              display: 'inline-flex',
              background: 'rgba(245,242,237,0.05)',
              border: '1px solid rgba(245,242,237,0.1)',
              borderRadius: 10, padding: 4,
              position: 'relative',
            }}>
            {/* Sliding indicator */}
            <motion.div
              layout
              style={{
                position: 'absolute', top: 4, bottom: 4,
                width: 'calc(50% - 4px)',
                borderRadius: 8,
                background: showAfter ? 'rgba(74,124,111,0.2)' : 'rgba(239,68,68,0.12)',
                border: `1px solid ${showAfter ? 'rgba(74,124,111,0.4)' : 'rgba(239,68,68,0.25)'}`,
                left: showAfter ? 'calc(50% + 2px)' : 4,
                transition: 'left 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s ease, border-color 0.35s ease',
              }}
            />
            <button
              type="button"
              onClick={() => setShowAfter(false)}
              style={{
                position: 'relative', zIndex: 1,
                padding: isMobile ? '12px 26px' : '12px 34px', border: 'none', background: 'transparent',
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: !showAfter ? 'rgba(239,68,68,0.8)' : 'rgba(245,242,237,0.35)',
                cursor: 'pointer', transition: 'color 0.3s ease',
              }}
            >
              Before
            </button>
            <button
              type="button"
              onClick={() => setShowAfter(true)}
              style={{
                position: 'relative', zIndex: 1,
                padding: isMobile ? '12px 26px' : '12px 34px', border: 'none', background: 'transparent',
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: showAfter ? '#4A7C6F' : 'rgba(245,242,237,0.35)',
                cursor: 'pointer', transition: 'color 0.3s ease',
              }}
            >
              After
            </button>
          </div>
          </div>
        </motion.div>

        {/* ════════════ 3D FUNNEL ════════════ */}
        <div style={{
          perspective: isMobile ? 'none' : 1200,
          maxWidth: 700,
          margin: '0 auto',
          position: 'relative',
          width: '100%',
        }}>
          {/* Floating particles */}
          {!isMobile && inView && (
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
              {Array.from({ length: showAfter ? 14 : 5 }, (_, i) => (
                <FlowParticle
                  key={`p-${i}-${showAfter}`}
                  delay={i * 0.4}
                  x={180 + Math.sin(i * 1.3) * 140}
                  duration={3 + (i % 4) * 0.35}
                  color={showAfter ? 'rgba(74,124,111,0.6)' : 'rgba(239,68,68,0.4)'}
                />
              ))}
            </div>
          )}

          {/* The isometric funnel */}
          <motion.div
            initial={{ rotateX: 0, opacity: 0 }}
            animate={inView ? { rotateX: isMobile ? 0 : 10, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center top',
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? 10 : 8,
              paddingRight: 0,
              opacity: isMobile ? 1 : undefined,
            }}
          >
            {FUNNEL_STAGES.map((stage, i) => (
              <FunnelStageRow
                key={stage.label}
                stage={stage}
                index={i}
                showAfter={showAfter}
                inView={inView}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </div>

        {/* ════════════ SUMMARY METRICS ════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: 24,
            maxWidth: 700,
            margin: '64px auto 0',
          }}
        >
          {/* Retention lift */}
          <div style={{
            background: 'rgba(245,242,237,0.03)',
            border: '1px solid rgba(245,242,237,0.07)',
            borderRadius: 8, padding: '24px 20px',
            textAlign: 'center',
          }}>
            <motion.div
              key={showAfter ? 'after-ret' : 'before-ret'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700,
                color: showAfter ? '#4A7C6F' : 'rgba(239,68,68,0.7)',
                lineHeight: 1, marginBottom: 6,
                transition: 'color 0.4s ease',
              }}
            >{showAfter ? '64%' : '27%'}</motion.div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'rgba(245,242,237,0.35)', letterSpacing: '0.06em',
            }}>3-SECOND RETENTION</div>
          </div>

          {/* Conversion rate */}
          <div style={{
            background: showAfter ? 'rgba(74,124,111,0.06)' : 'rgba(245,242,237,0.03)',
            border: `1px solid ${showAfter ? 'rgba(74,124,111,0.2)' : 'rgba(245,242,237,0.07)'}`,
            borderRadius: 8, padding: '24px 20px',
            textAlign: 'center',
            transition: 'all 0.5s ease',
          }}>
            <motion.div
              key={showAfter ? 'after-conv' : 'before-conv'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700,
                color: showAfter ? '#4A7C6F' : 'rgba(239,68,68,0.7)',
                lineHeight: 1, marginBottom: 6,
                transition: 'color 0.4s ease',
              }}
            >{showAfter ? '3.2%' : '0.8%'}</motion.div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'rgba(245,242,237,0.35)', letterSpacing: '0.06em',
            }}>CONVERSION RATE</div>
          </div>

          {/* Revenue impact */}
          <div style={{
            background: 'rgba(245,242,237,0.03)',
            border: '1px solid rgba(245,242,237,0.07)',
            borderRadius: 8, padding: '24px 20px',
            textAlign: 'center',
          }}>
            <motion.div
              key={showAfter ? 'after-rev' : 'before-rev'}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700,
                color: showAfter ? '#28C840' : 'rgba(245,242,237,0.5)',
                lineHeight: 1, marginBottom: 6,
                transition: 'color 0.4s ease',
              }}
            >{showAfter ? '+300%' : 'Baseline'}</motion.div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'rgba(245,242,237,0.35)', letterSpacing: '0.06em',
            }}>REVENUE IMPACT</div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            textAlign: 'center', marginTop: 40,
            fontFamily: 'var(--font-body)', fontSize: 15, fontStyle: 'italic',
            color: 'rgba(245,242,237,0.35)', maxWidth: 500, margin: '40px auto 0',
          }}
        >
          The site didn't generate more traffic.
          It stopped wasting the traffic it already had.
        </motion.p>
      </div>
    </section>
  );
}
