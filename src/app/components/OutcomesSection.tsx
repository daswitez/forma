import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { AnimatedNumber } from './AnimatedNumber';
import { HeadlineReveal } from './HeadlineReveal';
import { useIsMobile } from '../hooks/useIsMobile';

// ─── Visual 1: Clarity — attention window diagram ─────────────────────────────
function ClarityVisual({ inView }: { inView: boolean }) {
  return (
    <div style={{
      background: 'rgba(245,242,237,0.03)',
      border: '1px solid rgba(245,242,237,0.07)',
      borderRadius: 8,
      padding: '16px',
      marginBottom: 28,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9,
        color: 'rgba(245,242,237,0.25)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 14,
      }}>// Attention capture window</div>

      {/* Two-column: before / after mini pages */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
        {/* Bad site */}
        <div style={{
          flex: 1, background: 'rgba(239,68,68,0.05)',
          border: '1px solid rgba(239,68,68,0.18)',
          borderRadius: 5, padding: 8, position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>
            {[1,2,3,4,5,6,7].map(i => (
              <div key={i} style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 1 }} />
            ))}
          </div>
          <div style={{
            height: 30, background: 'rgba(239,68,68,0.08)',
            border: '1px dashed rgba(239,68,68,0.2)',
            borderRadius: 3, marginBottom: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ height: 3, width: 52, background: 'rgba(255,255,255,0.12)', borderRadius: 1, marginBottom: 2, margin: '0 auto' }} />
              <div style={{ height: 2, width: 38, background: 'rgba(255,255,255,0.06)', borderRadius: 1, margin: '0 auto' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ height: 16, background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: 2 }} />
            ))}
          </div>
          <div style={{
            marginTop: 6, textAlign: 'center',
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: 3, padding: '2px 0',
          }}>
            <span style={{ fontSize: 7.5, fontFamily: 'var(--font-mono)', color: '#EF4444', letterSpacing: '0.04em', fontWeight: 600 }}>✗ NO SIGNAL</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(245,242,237,0.2)', fontSize: 16, flexShrink: 0 }}>→</div>

        {/* Good site */}
        <div style={{
          flex: 1, background: 'rgba(74,124,111,0.06)',
          border: '1px solid rgba(74,124,111,0.25)',
          borderRadius: 5, padding: 8, position: 'relative',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ width: 24, height: 3, background: 'rgba(200,169,122,0.4)', borderRadius: 1 }} />
            <div style={{ width: 18, height: 5, background: 'rgba(74,124,111,0.5)', borderRadius: 2 }} />
          </div>
          <div style={{
            height: 30, background: 'rgba(74,124,111,0.1)',
            border: '1px solid rgba(74,124,111,0.2)',
            borderRadius: 3, marginBottom: 3,
            display: 'flex', alignItems: 'center', padding: '0 8px',
          }}>
            <div>
              <div style={{ height: 3, width: 42, background: 'rgba(245,242,237,0.35)', borderRadius: 1, marginBottom: 2 }} />
              <div style={{ height: 2, width: 30, background: 'rgba(245,242,237,0.16)', borderRadius: 1 }} />
            </div>
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 3 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {[1,2].map(i => (
              <div key={i} style={{ height: 16, background: 'rgba(74,124,111,0.08)', borderRadius: 2 }} />
            ))}
          </div>
          <div style={{
            marginTop: 6, textAlign: 'center',
            background: 'rgba(74,124,111,0.14)', border: '1px solid rgba(74,124,111,0.35)',
            borderRadius: 3, padding: '2px 0',
          }}>
            <span style={{ fontSize: 7.5, fontFamily: 'var(--font-mono)', color: '#4A7C6F', letterSpacing: '0.04em', fontWeight: 600 }}>✓ IMPRESSION FORMED</span>
          </div>
        </div>
      </div>

      {/* 3-second timeline strip */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          {['0s','1s','2s','3s','4s','5s'].map((t, i) => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: 8,
              color: i === 3 ? 'rgba(200,169,122,0.8)' : 'rgba(245,242,237,0.2)',
              fontWeight: i === 3 ? 700 : 400,
            }}>{t}</span>
          ))}
        </div>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '50%' } : {}}
            transition={{ delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, rgba(74,124,111,0.8), var(--color-sand))',
              borderRadius: 3,
            }}
          />
          {/* Decision marker */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={inView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ delay: 1.8, duration: 0.3 }}
            style={{
              position: 'absolute', top: -4, bottom: -4,
              left: 'calc(50% - 1px)', width: 2,
              background: 'var(--color-sand)',
              borderRadius: 1, transformOrigin: 'center',
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.2 }}
          style={{
            marginTop: 6, display: 'flex', justifyContent: 'center',
          }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'rgba(200,169,122,0.1)', border: '1px solid rgba(200,169,122,0.2)',
            borderRadius: 3, padding: '3px 9px',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-sand)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--color-sand)', fontWeight: 600, letterSpacing: '0.06em' }}>
              DECISION ALREADY MADE
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Visual 2: Credibility — trust signal accumulation ────────────────────────
function CredibilityVisual({ inView }: { inView: boolean }) {
  const signals = [
    { icon: '★★★★★', label: '4.9 · 2,847 verified reviews', color: '#C8A97A', delay: 0.3 },
    { icon: '✓', label: '142 B2B engagements · 8 sectors', color: '#4A7C6F', delay: 0.55 },
    { icon: '✓', label: 'Delivered on time · every project', color: '#4A7C6F', delay: 0.8 },
    { icon: '✓', label: 'Full code ownership. No lock-in.', color: '#4A7C6F', delay: 1.05 },
  ];

  return (
    <div style={{
      background: 'rgba(245,242,237,0.03)',
      border: '1px solid rgba(245,242,237,0.07)',
      borderRadius: 8,
      padding: '16px',
      marginBottom: 28,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9,
        color: 'rgba(245,242,237,0.25)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 14,
      }}>// Trust signal accumulation</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
        {signals.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -14 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: s.delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: `rgba(${i === 0 ? '200,169,122' : '74,124,111'},0.05)`,
              border: `1px solid rgba(${i === 0 ? '200,169,122' : '74,124,111'},0.14)`,
              borderRadius: 5, padding: '7px 10px',
            }}
          >
            <span style={{
              fontSize: i === 0 ? 10 : 11,
              color: s.color,
              letterSpacing: i === 0 ? '0.02em' : 0,
              flexShrink: 0,
            }}>{s.icon}</span>
            <span style={{
              fontFamily: 'var(--font-headline)', fontSize: 11.5, fontWeight: 500,
              color: 'rgba(245,242,237,0.65)',
            }}>{s.label}</span>
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: s.delay + 0.3, type: 'spring', stiffness: 500 }}
              style={{
                marginLeft: 'auto', width: 14, height: 14,
                borderRadius: '50%',
                background: `rgba(${i === 0 ? '200,169,122' : '74,124,111'},0.2)`,
                border: `1px solid rgba(${i === 0 ? '200,169,122' : '74,124,111'},0.4)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 7, color: i === 0 ? '#C8A97A' : '#4A7C6F', fontWeight: 700 }}>✓</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Trust score bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(245,242,237,0.3)', letterSpacing: '0.06em' }}>TRUST SCORE</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.6 }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-sage)', fontWeight: 700 }}
          >94 / 100</motion.span>
        </div>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '94%' } : {}}
            transition={{ delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-sage), rgba(74,124,111,0.6))',
              borderRadius: 3,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Visual 3: Conversion — 3D retention funnel ──────────────────────────────
function ConversionVisual({ inView }: { inView: boolean }) {
  const funnelStages = [
    { label: 'VISITORS', before: 100, after: 100, unit: '%' },
    { label: 'ENGAGED', before: 27, after: 64, unit: '%' },
    { label: 'QUALIFIED', before: 8, after: 31, unit: '%' },
    { label: 'CONVERTED', before: 0.8, after: 3.2, unit: '%' },
  ];

  return (
    <div style={{
      background: 'rgba(245,242,237,0.03)',
      border: '1px solid rgba(245,242,237,0.07)',
      borderRadius: 8,
      padding: '16px',
      marginBottom: 28,
      perspective: 800,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 9,
        color: 'rgba(245,242,237,0.25)', letterSpacing: '0.1em',
        textTransform: 'uppercase', marginBottom: 14,
      }}>// Retention funnel — before vs after</div>

      {/* 3D Funnel Container */}
      <motion.div
        initial={{ rotateX: 0, opacity: 0 }}
        animate={inView ? { rotateX: 18, opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center bottom',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          marginBottom: 14,
        }}
      >
        {funnelStages.map((stage, i) => {
          const widthBefore = `${(stage.before / 100) * 100}%`;
          const widthAfter = `${(stage.after / 100) * 100}%`;
          const maxWidth = `${100 - i * 12}%`;

          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                maxWidth,
                margin: '0 auto',
                width: '100%',
              }}
            >
              {/* Stage label */}
              <div style={{
                width: 58, flexShrink: 0,
                fontFamily: 'var(--font-mono)', fontSize: 7.5,
                color: i === 3 ? 'rgba(74,124,111,0.7)' : 'rgba(245,242,237,0.3)',
                letterSpacing: '0.08em',
                textAlign: 'right',
                fontWeight: i === 3 ? 700 : 400,
              }}>{stage.label}</div>

              {/* Dual bars container */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Before bar */}
                <div style={{ position: 'relative', height: 10, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 3,
                  }} />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: widthBefore } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute', top: 0, left: 0, bottom: 0,
                      background: i === 3 ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.2)',
                      borderRadius: 3,
                    }}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    style={{
                      position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
                      fontFamily: 'var(--font-mono)', fontSize: 7,
                      color: 'rgba(239,68,68,0.7)', fontWeight: 600,
                    }}
                  >{stage.before}{stage.unit}</motion.span>
                </div>

                {/* After bar */}
                <div style={{ position: 'relative', height: 10, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 3,
                  }} />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: widthAfter } : {}}
                    transition={{ delay: 0.7 + i * 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute', top: 0, left: 0, bottom: 0,
                      background: i === 3
                        ? 'linear-gradient(90deg, var(--color-sage), rgba(74,124,111,0.8))'
                        : 'rgba(74,124,111,0.4)',
                      borderRadius: 3,
                      boxShadow: i === 3 ? '0 0 12px rgba(74,124,111,0.3)' : 'none',
                    }}
                  />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    style={{
                      position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
                      fontFamily: 'var(--font-mono)', fontSize: 7,
                      color: '#4A7C6F', fontWeight: 700,
                    }}
                  >{stage.after}{stage.unit}</motion.span>
                </div>
              </div>

              {/* Delta indicator */}
              {i > 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.4 + i * 0.12, type: 'spring', stiffness: 400, damping: 20 }}
                  style={{
                    width: 36, flexShrink: 0,
                    background: 'rgba(40,200,64,0.08)',
                    border: '1px solid rgba(40,200,64,0.2)',
                    borderRadius: 3, padding: '2px 0',
                    textAlign: 'center',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 7,
                    color: '#28C840', fontWeight: 700,
                  }}>+{Math.round(((stage.after - stage.before) / Math.max(stage.before, 0.01)) * 100)}%</span>
                </motion.div>
              ) : (
                <div style={{ width: 36, flexShrink: 0 }} />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Flowing particle trail */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 4,
        marginBottom: 10,
      }}>
        {[0,1,2,3,4,5,6].map(i => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: [0, 0.6, 0] } : {}}
            transition={{ delay: 1.8 + i * 0.08, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            style={{
              width: 3, height: 3, borderRadius: '50%',
              background: '#4A7C6F',
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 12, height: 5, borderRadius: 2, background: 'rgba(239,68,68,0.35)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(245,242,237,0.3)' }}>Before</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 12, height: 5, borderRadius: 2, background: 'rgba(74,124,111,0.6)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(245,242,237,0.3)' }}>After</span>
          </div>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'rgba(245,242,237,0.2)' }}>Same traffic · 60-day data</span>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function OutcomesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();

  const cards = [
    {
      number: '01',
      accentColor: 'var(--color-sand)',
      metric: null, // using AnimatedNumber
      metricEl: (
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--color-warm-white)', lineHeight: 1, marginBottom: 4 }}>
          <AnimatedNumber to={3} duration={1200} suffix=" sec" />
        </div>
      ),
      metricLabel: 'to form the right impression',
      title: 'Clarity',
      body: 'Visitors understand what you do, who you serve, and why — before they scroll.',
      visual: ClarityVisual,
    },
    {
      number: '02',
      accentColor: 'var(--color-sage)',
      metricEl: (
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--color-warm-white)', lineHeight: 1, marginBottom: 4 }}>
          Pre-earned
        </div>
      ),
      metricLabel: 'trust before the first call',
      title: 'Credibility',
      body: 'The right site does qualifying work so conversations start where they should.',
      visual: CredibilityVisual,
    },
    {
      number: '03',
      accentColor: 'var(--color-sage)',
      metricEl: (
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 700, color: 'var(--color-warm-white)', lineHeight: 1, marginBottom: 4 }}>
          <AnimatedNumber to={300} duration={1800} prefix="+" suffix="%" />
        </div>
      ),
      metricLabel: 'typical conversion lift',
      title: 'Conversion',
      body: 'Better-fit leads, fewer wasted proposals, higher-value mandates. The effect compounds.',
      visual: ConversionVisual,
    },
  ];

  return (
    <section className="section section-dark" id="outcomes">
      <div className="container-wide" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72, maxWidth: 640 }}
        >
          <span className="eyebrow">What Changes</span>
          <HeadlineReveal
            as="h2"
            className="section-headline section-headline-light"
            lines={['Three things happen when', 'the gap closes.']}
            baseDelay={0.1}
            inView={inView}
          />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24 }}>
          {cards.map((card, i) => {
            const Visual = card.visual;
            return (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'rgba(245,242,237,0.03)',
                  border: '1px solid rgba(245,242,237,0.07)',
                  borderRadius: 8,
                  padding: '36px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 250ms ease, background 250ms ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(245,242,237,0.055)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(245,242,237,0.03)';
                }}
              >
                {/* Top accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12 + 0.3 }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: card.accentColor,
                    transformOrigin: 'left', opacity: 0.6,
                  }}
                />

                {/* Number */}
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: `${card.accentColor === 'var(--color-sand)' ? 'rgba(200,169,122,0.45)' : 'rgba(74,124,111,0.45)'}`,
                  letterSpacing: '0.12em', marginBottom: 24,
                }}>{card.number}</div>

                {/* Visual area */}
                <Visual inView={inView} />

                {/* Metric */}
                <div style={{ marginBottom: 16 }}>
                  {card.metricEl}
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'rgba(245,242,237,0.35)', letterSpacing: '0.04em',
                  }}>
                    {card.metricLabel}
                  </div>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 600,
                  color: 'var(--color-warm-white)', marginBottom: 10,
                }}>
                  {card.title}
                </h3>

                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6,
                  color: 'rgba(245,242,237,0.6)',
                }}>
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}