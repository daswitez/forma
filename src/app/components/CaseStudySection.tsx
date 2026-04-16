import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedNumber } from './AnimatedNumber';
import { useIsMobile } from '../hooks/useIsMobile';

// ─── Case study 1 data ────────────────────────────────────────────────────────
const CASE1_IMAGE = 'https://images.unsplash.com/photo-1762208743487-11a4775c12f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVjaXNpb24lMjBtYW51ZmFjdHVyaW5nJTIwYWVyb3NwYWNlJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzc2MjA2OTYxfDA&ixlib=rb-4.1.0&q=80&w=1080';

const case1Metrics = [
  { numTo: 67, prefix: '', suffix: '%', decimals: 0, label: 'More qualified leads', sub: '90 days post-launch' },
  { numTo: 3.2, prefix: '', suffix: '\u00d7', decimals: 1, label: 'Session duration', sub: 'engineers engaging content' },
  { numTo: 40, prefix: '\u2212', suffix: '%', decimals: 0, label: 'Misfit inquiries', sub: 'better self-qualification' },
];

// ─── Case study 2 data ────────────────────────────────────────────────────────
const CASE2_IMAGE = 'https://images.unsplash.com/photo-1758518727820-28491c194bee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGNvbnN1bHRpbmclMjBmaXJtJTIwcHJvZmVzc2lvbmFsJTIwc2VydmljZXMlMjBtb2Rlcm4lMjBvZmZpY2V8ZW58MXx8fHwxNzc2MjEwNjA4fDA&ixlib=rb-4.1.0&q=80&w=1080';

const case2Metrics = [
  { numTo: 124, prefix: '+', suffix: '%', decimals: 0, label: 'Inbound enquiries', sub: '60 days post-launch' },
  { numTo: 3, prefix: '', suffix: '\u00d7', decimals: 0, label: 'Avg. project value', sub: 'vs. pre-launch baseline' },
  { numTo: 60, prefix: '\u2212', suffix: '%', decimals: 0, label: 'Unqualified leads', sub: 'better self-selection' },
];

// ─── Animated metric number ───────────────────────────────────────────────────
function CaseMetric({
  m, inView, idx, dark = true,
}: {
  m: typeof case1Metrics[number];
  inView: boolean;
  idx: number;
  dark?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
      style={{ textAlign: dark ? 'right' : 'center' }}
    >
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: dark ? 40 : 34, fontWeight: 700,
        color: dark ? '#4A7C6F' : 'var(--color-sage)', lineHeight: 1,
      }}>
        {inView ? (
          <AnimatedNumber
            to={m.numTo}
            prefix={m.prefix}
            suffix={m.suffix}
            decimals={m.decimals}
            duration={1800}
          />
        ) : `${m.prefix}0${m.suffix}`}
      </div>
      <div style={{
        fontFamily: 'var(--font-headline)', fontSize: 12, fontWeight: 600,
        color: dark ? '#F5F2ED' : 'var(--color-off-black)', marginTop: 4,
      }}>
        {m.label}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        color: dark ? 'rgba(245,242,237,0.35)' : 'rgba(14,14,14,0.4)', letterSpacing: '0.03em',
      }}>
        {m.sub}
      </div>
    </motion.div>
  );
}

// ─── Platform badge ───────────────────────────────────────────────────────────
function PlatformBadge({ label, dark = true }: { label: string; dark?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: dark ? 'rgba(74,124,111,0.15)' : 'rgba(74,124,111,0.08)',
      border: `1px solid ${dark ? 'rgba(74,124,111,0.25)' : 'rgba(74,124,111,0.2)'}`,
      borderRadius: 3, padding: '4px 12px',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: dark ? 'rgba(245,242,237,0.5)' : 'rgba(14,14,14,0.45)', letterSpacing: '0.04em',
      }}>Delivered in</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: '#4A7C6F', fontWeight: 600,
      }}>{label}</span>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function CaseStudySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const ref2 = useRef<HTMLDivElement>(null);
  const inView2 = useInView(ref2, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();

  return (
    <section className="section section-light" id="work">
      <div className="container-wide" ref={ref}>

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 48 }}
        >
          <span className="eyebrow">Selected Work</span>
        </motion.div>

        {/* ════════════ CASE STUDY 1 — full-width hero ════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', marginBottom: 32 }}
        >
          <ImageWithFallback
            src={CASE1_IMAGE}
            alt="Precision manufacturing facility"
            style={{ width: '100%', height: isMobile ? 320 : 400, objectFit: 'cover', display: 'block', filter: 'brightness(0.7)' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, transparent 30%, rgba(14,14,14,0.88) 100%)',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '24px 20px' : '40px 48px' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 20 : 0 }}>
              <div style={{ maxWidth: 520 }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'rgba(245,242,237,0.5)', letterSpacing: '0.08em',
                  marginBottom: 10, textTransform: 'uppercase',
                }}>
                  Precision Industrial Automation · Est. 2004
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: isMobile ? 22 : 'clamp(26px, 2.8vw, 38px)',
                  fontWeight: 700, color: '#F5F2ED', lineHeight: 1.1, marginBottom: 14,
                }}>
                  A manufacturer invisible to their best clients.
                  <br />Not anymore.
                </h3>
                <PlatformBadge label="Custom Code (Next.js)" />
              </div>
              <div style={{ display: 'flex', gap: isMobile ? 20 : 32, flexWrap: 'wrap' }}>
                {case1Metrics.map((m, i) => (
                  <CaseMetric key={m.label} m={m} inView={inView} idx={i} dark={true} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Before / After for case 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, maxWidth: 900, margin: '0 auto 96px' }}>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ background: 'white', border: '1px solid rgba(14,14,14,0.08)', borderRadius: 6, padding: 24 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#EF4444', letterSpacing: '0.1em', marginBottom: 12 }}>BEFORE</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'rgba(14,14,14,0.6)' }}>
              Site looked like 2012. Generic &quot;we build things&quot; positioning. Procurement teams couldn&apos;t tell them apart from any job shop in the country.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ background: 'rgba(74,124,111,0.04)', border: '1px solid rgba(74,124,111,0.15)', borderRadius: 6, padding: 24 }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A7C6F', letterSpacing: '0.1em', marginBottom: 12 }}>AFTER</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'rgba(14,14,14,0.7)' }}>
              Repositioned around outcomes for aerospace engineers and tier-1 procurement. Technical depth without jargon. Sales conversations start from credibility.
            </div>
          </motion.div>
        </div>

        {/* ════════════ CASE STUDY 2 — horizontal split ════════════ */}
        <div ref={ref2}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '420px 1fr',
              gap: 0,
              borderRadius: 8, overflow: 'hidden',
              border: '1px solid rgba(14,14,14,0.08)',
            }}
          >
            {/* Left — image (hidden on mobile) */}
            {!isMobile && (
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <ImageWithFallback
                  src={CASE2_IMAGE}
                  alt="Boutique consulting office"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85)' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(74,124,111,0.12) 0%, rgba(14,14,14,0.3) 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                  <PlatformBadge label="Webflow" dark={false} />
                </div>
              </div>
            )}

            {/* Right — content */}
            <div style={{ background: 'white', padding: isMobile ? '32px 20px' : '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Top: eyebrow + headline + before/after */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'rgba(14,14,14,0.4)', letterSpacing: '0.08em',
                  marginBottom: 12, textTransform: 'uppercase',
                }}>
                  Halcyon Strategy Partners · Est. 2017
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.2vw, 32px)',
                  fontWeight: 700, color: 'var(--color-off-black)', lineHeight: 1.1, marginBottom: 20,
                }}>
                  A boutique consultancy mistaken for
                  <br />a freelancer. Not anymore.
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
                  <div style={{
                    background: 'rgba(239,68,68,0.03)',
                    border: '1px solid rgba(239,68,68,0.1)',
                    borderRadius: 5, padding: '14px 16px',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9.5,
                      color: '#EF4444', letterSpacing: '0.1em', marginBottom: 8,
                    }}>BEFORE</div>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55,
                      color: 'rgba(14,14,14,0.55)',
                    }}>
                      Sparse 4-page site. Generic &quot;strategic advisory&quot; copy. Enterprise buyers couldn&apos;t assess methodology, outcomes, or fit before the first call.
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(74,124,111,0.04)',
                    border: '1px solid rgba(74,124,111,0.15)',
                    borderRadius: 5, padding: '14px 16px',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9.5,
                      color: '#4A7C6F', letterSpacing: '0.1em', marginBottom: 8,
                    }}>AFTER</div>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55,
                      color: 'rgba(14,14,14,0.65)',
                    }}>
                      Positioned around a proprietary transformation framework. Case depth, outcomes by sector, and qualification flow built in. Pre-sold by the time they reach out.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom: metrics row */}
              <div>
                <div style={{ height: 1, background: 'rgba(14,14,14,0.07)', marginBottom: 24 }} />
                <div style={{ display: 'flex', gap: isMobile ? 24 : 36, flexWrap: 'wrap' }}>
                  {case2Metrics.map((m, i) => (
                    <CaseMetric key={m.label} m={m} inView={inView2} idx={i} dark={false} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}