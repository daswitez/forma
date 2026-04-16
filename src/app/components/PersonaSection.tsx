import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

// ─── Pain Scenarios ──────────────────────────────────────────────────────────
const painScenarios = [
  {
    id: 'trust',
    pain: 'You explain it perfectly in person — and then they visit your site.',
    detail: 'Every conversation ends the same way. They\'re nodding, they\'re interested, they ask for your website. You watch them type the URL and something shifts. The energy drops. The follow-up email never comes.',
    visual: 'trust-gap',
    stat: '68%',
    statLabel: 'of prospects judge credibility by website design alone',
    symptoms: [
      'You pre-apologise before sharing the URL',
      'Proposals reference competitors\' design quality',
      'You avoid sending the site to enterprise leads',
    ],
    accentColor: '#EF4444',
    accentBg: 'rgba(239,68,68,0.06)',
    accentGlow: 'rgba(239,68,68,0.15)',
  },
  {
    id: 'traffic',
    pain: 'You\'re paying for traffic that arrives and immediately leaves.',
    detail: 'The ad spend is working. People are clicking. But the moment they land, there\'s nothing to hold them. No signal that says "this is worth your time." You\'re not losing on the product — you\'re losing on the first four seconds.',
    visual: 'bounce',
    stat: '4s',
    statLabel: 'is all you get — most visitors decide to stay or leave in under four seconds',
    symptoms: [
      'High click-through rate, low conversion',
      'Bounce rate above 60% on key pages',
      'Your best content lives in PDFs, not on the site',
    ],
    accentColor: '#FB923C',
    accentBg: 'rgba(251,146,60,0.06)',
    accentGlow: 'rgba(251,146,60,0.15)',
  },
  {
    id: 'perception',
    pain: 'You charge premium prices — but your site says otherwise.',
    detail: 'Your product is exceptional. Your clients love you. But your online presence tells a different story. You look like a small player in a market where perception drives the first conversation. The disconnect between what you deliver and how you appear is costing you deals you\'ll never know you lost.',
    visual: 'disconnect',
    stat: '94%',
    statLabel: 'of first impressions are design-related — not content',
    symptoms: [
      'You lose deals to competitors with better branding',
      'Clients are surprised when they see the team in person',
      'The site hasn\'t kept up with how the business has grown',
    ],
    accentColor: '#C8A97A',
    accentBg: 'rgba(200,169,122,0.06)',
    accentGlow: 'rgba(200,169,122,0.15)',
  },
];

// ─── Visual: Trust Gap ───────────────────────────────────────────────────────
function TrustGapVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* In-person conversation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          background: 'rgba(74,124,111,0.08)',
          border: '1px solid rgba(74,124,111,0.2)',
          borderRadius: 8, padding: '16px 18px',
          width: 140, position: 'relative',
        }}
      >
        <div style={{ fontSize: 8, color: 'rgba(74,124,111,0.6)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 8 }}>IN PERSON</div>
        <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
          {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#4A7C6F', fontSize: 12 }}>★</span>)}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(74,124,111,0.7)', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>
          "This sounds exactly like what we need"
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: '#4A7C6F' }}
        />
      </motion.div>

      {/* Gap arrow */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 16px', gap: 4 }}
      >
        <div style={{ width: 48, height: 1, background: 'linear-gradient(to right, rgba(74,124,111,0.3), rgba(239,68,68,0.3))' }} />
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ fontSize: 7, color: 'rgba(239,68,68,0.6)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
        >THE GAP</motion.span>
        <div style={{ width: 48, height: 1, background: 'linear-gradient(to right, rgba(74,124,111,0.3), rgba(239,68,68,0.3))' }} />
      </motion.div>

      {/* Website experience */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        style={{
          background: 'rgba(239,68,68,0.04)',
          border: '1px solid rgba(239,68,68,0.15)',
          borderRadius: 8, padding: '16px 18px',
          width: 140, position: 'relative',
        }}
      >
        <div style={{ fontSize: 8, color: 'rgba(239,68,68,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', marginBottom: 8 }}>VISITS WEBSITE</div>
        <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
          {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= 2 ? 'rgba(239,68,68,0.4)' : 'rgba(239,68,68,0.1)', fontSize: 12 }}>★</span>)}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(239,68,68,0.5)', fontFamily: 'var(--font-body)', lineHeight: 1.4, fontStyle: 'italic' }}>
          "...I'll get back to you"
        </div>
        <motion.div
          animate={{ opacity: [0.8, 0.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -4, right: -4, width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }}
        />
      </motion.div>
    </div>
  );
}

// ─── Visual: Bounce Rate ─────────────────────────────────────────────────────
function BounceRateVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      {/* Browser window */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          width: 220, borderRadius: 6, overflow: 'hidden',
          border: '1px solid rgba(251,146,60,0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        }}
      >
        {/* Mini browser chrome */}
        <div style={{ background: 'rgba(14,14,14,0.04)', padding: '5px 8px', display: 'flex', gap: 3, alignItems: 'center' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(239,68,68,0.4)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(251,146,60,0.3)' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(74,124,111,0.2)' }} />
          <div style={{ flex: 1, height: 8, background: 'rgba(14,14,14,0.04)', borderRadius: 2, marginLeft: 6 }} />
        </div>
        <div style={{ height: 80, background: 'rgba(14,14,14,0.01)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ width: '70%', height: 5, background: 'rgba(14,14,14,0.06)', borderRadius: 1 }} />
          <div style={{ width: '50%', height: 5, background: 'rgba(14,14,14,0.04)', borderRadius: 1 }} />
          <div style={{ width: '85%', height: 3, background: 'rgba(14,14,14,0.03)', borderRadius: 1, marginTop: 4 }} />
          <div style={{ width: '60%', height: 3, background: 'rgba(14,14,14,0.03)', borderRadius: 1 }} />
        </div>
      </motion.div>

      {/* Visitors bouncing */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [- 10, 0, 0, 20] }}
            transition={{
              delay: 0.5 + i * 0.18,
              duration: 1.8,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
            style={{
              width: 18, height: 18, borderRadius: '50%',
              background: i < 3 ? 'rgba(251,146,60,0.12)' : 'rgba(74,124,111,0.12)',
              border: `1px solid ${i < 3 ? 'rgba(251,146,60,0.25)' : 'rgba(74,124,111,0.25)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8, color: i < 3 ? 'rgba(251,146,60,0.6)' : 'rgba(74,124,111,0.6)',
            }}
          >
            {i < 3 ? '↗' : '→'}
          </motion.div>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ fontSize: 8, color: 'rgba(251,146,60,0.5)', fontFamily: 'var(--font-mono)', marginLeft: 4 }}
        >
          3/5 bounce
        </motion.span>
      </div>
    </div>
  );
}

// ─── Visual: Perception Disconnect ───────────────────────────────────────────
function DisconnectVisual() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      {/* What you deliver */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <div style={{
          width: 80, height: 80, borderRadius: 8,
          background: 'linear-gradient(135deg, rgba(74,124,111,0.1), rgba(200,169,122,0.1))',
          border: '1px solid rgba(200,169,122,0.2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 18, color: '#C8A97A' }}>◆</span>
          <span style={{ fontSize: 7, color: 'rgba(200,169,122,0.6)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>PREMIUM</span>
        </div>
        <span style={{ fontSize: 9, color: 'rgba(14,14,14,0.4)', fontFamily: 'var(--font-headline)', fontWeight: 500 }}>What you deliver</span>
      </motion.div>

      {/* VS indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
      >
        <div style={{ fontSize: 10, color: 'rgba(200,169,122,0.5)', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.1em' }}>≠</div>
      </motion.div>

      {/* What your site shows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <div style={{
          width: 80, height: 80, borderRadius: 8,
          background: 'rgba(14,14,14,0.02)',
          border: '1px dashed rgba(14,14,14,0.12)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 18, color: 'rgba(14,14,14,0.15)' }}>◇</span>
          <span style={{ fontSize: 7, color: 'rgba(14,14,14,0.2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>GENERIC</span>
        </div>
        <span style={{ fontSize: 9, color: 'rgba(14,14,14,0.4)', fontFamily: 'var(--font-headline)', fontWeight: 500 }}>What your site shows</span>
      </motion.div>
    </div>
  );
}

// ─── Visual Renderer ─────────────────────────────────────────────────────────
function PainVisual({ type }: { type: string }) {
  switch (type) {
    case 'trust-gap': return <TrustGapVisual />;
    case 'bounce': return <BounceRateVisual />;
    case 'disconnect': return <DisconnectVisual />;
    default: return null;
  }
}

// ─── Main Section ────────────────────────────────────────────────────────────
export function PersonaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="section section-mist" id="who">
      <div className="container-wide" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 680, marginBottom: 72 }}
        >
          <span className="eyebrow">Sound Familiar?</span>
          <h2 className="section-headline">
            The business is growing.
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-sage)', opacity: 0.85 }}>
              The site isn&apos;t keeping up.
            </em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.65,
            color: 'rgba(14,14,14,0.6)', maxWidth: 560, marginTop: -8,
          }}>
            These are the patterns we see again and again. Not titles on business cards &mdash; just the quiet frustration of watching a good business get held back by its own website.
          </p>
        </motion.div>

        {/* Pain cards */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 24,
          marginBottom: 64,
        }}>
          {painScenarios.map((scenario, i) => {
            const isExpanded = expandedId === scenario.id;
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setExpandedId(isExpanded ? null : scenario.id)}
                style={{
                  background: 'var(--color-warm-white)',
                  border: `1px solid ${isExpanded ? scenario.accentColor + '30' : 'rgba(14,14,14,0.08)'}`,
                  borderRadius: 8,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 300ms ease, box-shadow 300ms ease',
                  boxShadow: isExpanded
                    ? `0 20px 60px ${scenario.accentGlow}, 0 0 0 1px ${scenario.accentColor}15`
                    : '0 2px 12px rgba(0,0,0,0.03)',
                }}
                onMouseEnter={(e) => {
                  if (!isExpanded) {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.06)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExpanded) {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }
                }}
              >
                {/* Main content row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: 0,
                }}>
                  {/* Left: Pain copy */}
                  <div style={{ padding: isMobile ? '32px 28px' : '40px 44px' }}>
                    {/* Accent dot */}
                    <motion.div
                      animate={isExpanded ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ repeat: isExpanded ? Infinity : 0, duration: 2, ease: 'easeInOut' }}
                      style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: scenario.accentColor,
                        opacity: 0.6, marginBottom: 16,
                      }}
                    />

                    {/* Pain headline */}
                    <h3 style={{
                      fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 600,
                      color: 'var(--color-off-black)', lineHeight: 1.35, marginBottom: 14,
                    }}>
                      {scenario.pain}
                    </h3>

                    {/* Detail text */}
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7,
                      color: 'rgba(14,14,14,0.55)', marginBottom: 20,
                    }}>
                      {scenario.detail}
                    </p>

                    {/* Stat callout */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'baseline', gap: 8,
                      background: scenario.accentBg,
                      border: `1px solid ${scenario.accentColor}18`,
                      borderRadius: 4, padding: '10px 16px',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700,
                        color: scenario.accentColor, lineHeight: 1,
                      }}>{scenario.stat}</span>
                      <span style={{
                        fontFamily: 'var(--font-body)', fontSize: 12,
                        color: scenario.accentColor, opacity: 0.7, lineHeight: 1.3,
                        maxWidth: 200,
                      }}>{scenario.statLabel}</span>
                    </div>

                    {/* Expand hint */}
                    <div style={{
                      marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                      <motion.span
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ fontSize: 12, color: scenario.accentColor, opacity: 0.5 }}
                      >→</motion.span>
                      <span style={{
                        fontSize: 11, fontFamily: 'var(--font-headline)',
                        color: scenario.accentColor, opacity: 0.5, letterSpacing: '0.04em',
                      }}>
                        {isExpanded ? 'Click to collapse' : 'See the symptoms'}
                      </span>
                    </div>
                  </div>

                  {/* Right: Visual */}
                  <div style={{
                    background: scenario.accentBg,
                    borderLeft: isMobile ? 'none' : `1px solid ${scenario.accentColor}10`,
                    borderTop: isMobile ? `1px solid ${scenario.accentColor}10` : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px',
                    minHeight: 200,
                  }}>
                    <PainVisual type={scenario.visual} />
                  </div>
                </div>

                {/* Expanded: Symptoms */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        borderTop: `1px solid ${scenario.accentColor}12`,
                        padding: isMobile ? '24px 28px' : '28px 44px',
                        display: 'flex', gap: isMobile ? 16 : 40,
                        flexWrap: 'wrap',
                      }}>
                        <div style={{
                          fontSize: 10, color: scenario.accentColor, fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.1em', opacity: 0.6, marginBottom: 4, width: '100%',
                        }}>
                          // SYMPTOMS WE HEAR
                        </div>
                        {scenario.symptoms.map((symptom, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.08 + 0.1, duration: 0.3 }}
                            style={{
                              display: 'flex', alignItems: 'flex-start', gap: 10,
                              flex: '1 1 250px',
                            }}
                          >
                            <div style={{
                              width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                              background: scenario.accentBg,
                              border: `1px solid ${scenario.accentColor}25`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 8, color: scenario.accentColor,
                              marginTop: 2,
                            }}>✓</div>
                            <p style={{
                              fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55,
                              color: 'rgba(14,14,14,0.6)', margin: 0,
                            }}>
                              {symptom}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Resolution strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'var(--color-off-black)',
            borderRadius: 8, padding: isMobile ? '36px 28px' : '48px 56px',
            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 24 : 56,
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--color-sand)', letterSpacing: '0.12em',
              marginBottom: 12, opacity: 0.7,
            }}>
              THE SHIFT
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700,
              color: 'var(--color-warm-white)', lineHeight: 1.2, marginBottom: 12,
            }}>
              None of this is about your product.
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-sage)' }}>It&apos;s about the container.</em>
            </h3>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
              color: 'rgba(245,242,237,0.55)', maxWidth: 420,
            }}>
              When the site matches the substance, everything changes &mdash; proposals close faster, inbound quality goes up, and you stop losing deals you never knew were on the table.
            </p>
          </div>

          {/* Outcome metrics */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
            minWidth: isMobile ? '100%' : 280,
          }}>
            {[
              { metric: '3.2×', label: 'Higher conversion rate', color: '#4A7C6F' },
              { metric: '−61%', label: 'Lower bounce rate', color: '#28C840' },
              { metric: '4.1×', label: 'Revenue per visitor', color: '#C8A97A' },
              { metric: '+28%', label: 'Average deal size', color: '#4A7C6F' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 6, padding: '16px 18px',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700,
                  color: item.color, lineHeight: 1, marginBottom: 4,
                }}>{item.metric}</div>
                <div style={{
                  fontFamily: 'var(--font-headline)', fontSize: 11,
                  color: 'rgba(245,242,237,0.4)', lineHeight: 1.3,
                }}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}