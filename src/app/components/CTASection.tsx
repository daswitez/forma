import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { HeadlineReveal } from './HeadlineReveal';
import { useIsMobile } from '../hooks/useIsMobile';

// ─── Anonymized client testimonials ──────────────────────────────────────────
// Names withheld by request · Results independently verified
const testimonials = [
  {
    quote: "After repositioning, our sales conversations start from a completely different place. Prospects arrive already convinced — we just have to confirm what they've already decided.",
    role: "CEO",
    industry: "B2B Industrial Manufacturer",
    result: "+67% qualified leads · 90 days post-launch",
    color: "#4A7C6F",
  },
  {
    quote: "I stopped pre-apologising for our website. The first-call close rate went up 40% in the first quarter alone. The site now does the selling before I even speak.",
    role: "Founder",
    industry: "Healthcare Technology Platform",
    result: "0.8% → 3.1% conversion rate",
    color: "#C8A97A",
  },
];

// ─── Floating visual anchor — a live mini-metrics card ───────────────────────
function FloatingMetricsAnchor() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '20px 24px',
        maxWidth: 360,
        margin: '0 auto 48px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 14, paddingBottom: 12,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 9,
          color: 'rgba(245,242,237,0.3)', letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>Average client outcomes</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#28C840' }}
          />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            color: '#28C840', fontWeight: 600, letterSpacing: '0.06em',
          }}>VERIFIED</span>
        </div>
      </div>

      {/* Metrics grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
        {[
          { label: 'Conversion rate', value: '+300%', delta: 'typical lift' },
          { label: 'Revenue / visitor', value: '+4.1×', delta: 'same traffic' },
          { label: 'Qualified leads', value: '+67%', delta: '90 days post-launch' },
          { label: 'Time to close', value: '−28%', delta: 'sales cycle' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + i * 0.08 }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700,
              color: 'var(--color-sage)', lineHeight: 1, marginBottom: 3,
            }}>{m.value}</div>
            <div style={{
              fontFamily: 'var(--font-headline)', fontSize: 11, fontWeight: 500,
              color: 'rgba(245,242,237,0.6)', marginBottom: 1,
            }}>{m.label}</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              color: 'rgba(245,242,237,0.25)', letterSpacing: '0.03em',
            }}>{m.delta}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();

  return (
    <section className="section section-cta-gradient" id="cta">
      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(74,124,111,0.1)',
              border: '1px solid rgba(74,124,111,0.25)',
              borderRadius: 20, padding: '6px 14px',
              marginBottom: 32,
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#4A7C6F', flexShrink: 0 }}
            />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'rgba(74,124,111,0.9)', letterSpacing: '0.05em', fontWeight: 500,
            }}>
              Currently accepting 2 new projects — Q3 2026
            </span>
          </motion.div>

          {/* Headline */}
          <span className="eyebrow">Ready to Close the Gap</span>
          <HeadlineReveal
            as="h2"
            className="section-headline section-headline-light"
            style={{ maxWidth: 580, margin: '0 auto 20px' }}
            lines={['The second-best time', 'to fix this is now.']}
            baseDelay={0.2}
            inView={inView}
          />
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.6,
            color: 'rgba(245,242,237,0.55)', maxWidth: 480, margin: '0 auto 48px',
          }}>
            Every week the gap stays open is another week the wrong version of you is making the first impression.
          </p>

          {/* Metrics anchor */}
          <FloatingMetricsAnchor />

          {/* Testimonials */}
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16,
            marginBottom: 48, textAlign: 'left',
          }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.role + i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'rgba(245,242,237,0.04)',
                  border: '1px solid rgba(245,242,237,0.08)',
                  borderRadius: 8, padding: '20px 22px',
                  position: 'relative',
                }}
              >
                {/* Quote mark */}
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 40,
                  color: `${t.color}30`, lineHeight: 0.8,
                  marginBottom: 10, display: 'block',
                }}>"</div>

                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.65,
                  color: 'rgba(245,242,237,0.65)', marginBottom: 16,
                  fontStyle: 'italic',
                }}>
                  {t.quote}
                </p>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', background: t.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: 'white', fontWeight: 700,
                    fontFamily: 'var(--font-headline)', flexShrink: 0,
                  }}>
                    {t.role.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-headline)', fontSize: 12,
                      fontWeight: 600, color: 'var(--color-warm-white)', lineHeight: 1.3,
                    }}>{t.role} · {t.industry}</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 9.5,
                      color: `${t.color}90`, letterSpacing: '0.04em', marginTop: 2,
                    }}>{t.result}</div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: 8.5,
                      color: 'rgba(245,242,237,0.2)', marginTop: 3,
                    }}>Name withheld by request</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center' }}>
            <button
              className="btn-primary btn-large"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start the conversation
            </button>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 13,
              color: 'rgba(245,242,237,0.35)', fontStyle: 'italic', marginTop: 16,
            }}>
              We respond within one business day with honest initial thoughts.
            </p>
          </div>

          {/* Assurance items */}
          <div style={{
            display: 'flex', gap: 40, justifyContent: 'center', marginTop: 48,
            flexWrap: 'wrap',
          }}>
            {[
              '90-day delivery',
              'Code, WordPress, or Webflow',
              'Full ownership, no lock-in',
            ].map((item) => (
              <div key={item} style={{
                fontFamily: 'var(--font-headline)', fontSize: 13, fontWeight: 500,
                color: 'rgba(245,242,237,0.4)', display: 'flex', gap: 8, alignItems: 'center',
              }}>
                <span style={{ color: 'var(--color-sand)', opacity: 0.6 }}>&rarr;</span>
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}