import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { HeadlineReveal } from './HeadlineReveal';
import { useIsMobile } from '../hooks/useIsMobile';

interface Step {
  number: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Clarity Sprint',
    duration: '1\u20132 weeks',
    description: 'Map your positioning, audience, and messaging framework. Not a questionnaire \u2014 a working session with the person who builds the solution.',
    deliverables: ['Positioning audit', 'Audience mapping', 'Messaging framework', 'Site architecture'],
  },
  {
    number: '02',
    title: 'Strategic Build',
    duration: '4\u20138 weeks',
    description: 'Design and development as one integrated process. No handoff friction. Built to perform \u2014 not just to look good in a presentation.',
    deliverables: ['Visual system', 'Copywriting', 'Full development', 'Performance tuning'],
  },
  {
    number: '03',
    title: 'Launch & Transition',
    duration: '1\u20132 weeks',
    description: 'Deployed, documented, and handed over. Your team trained. Post-launch support to ensure it holds under real traffic.',
    deliverables: ['Hosting setup', 'CMS training', 'Analytics config', '30-day support'],
  },
];

// Mini visual for each step
function StepVisual({ step, isActive }: { step: number; isActive: boolean }) {
  if (step === 0) {
    // Clarity Sprint - positioning audit visual
    return (
      <div style={{
        background: '#FAFAF8', border: '1px solid rgba(14,14,14,0.08)', borderRadius: 6,
        padding: 16, fontFamily: 'DM Sans, sans-serif', overflow: 'hidden', height: 200,
      }}>
        <div style={{ fontSize: 8, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
          // Positioning audit
        </div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 7, color: '#EF4444', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 4 }}>CURRENT</div>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px dashed rgba(239,68,68,0.25)', borderRadius: 3, padding: '6px 8px', fontSize: 8, color: '#666', lineHeight: 1.4 }}>
              &quot;We provide innovative solutions for businesses worldwide&quot;
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: '#4A7C6F', fontSize: 14 }}>→</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 7, color: '#4A7C6F', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 4 }}>REPOSITIONED</div>
            <div style={{ background: 'rgba(74,124,111,0.06)', border: '1px solid rgba(74,124,111,0.2)', borderRadius: 3, padding: '6px 8px', fontSize: 8, color: '#333', lineHeight: 1.4, fontWeight: 500 }}>
              &quot;Precision automation for aerospace tier-1 supply chains&quot;
            </div>
          </div>
        </div>
        {/* Audience mapping */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {['Decision Makers', 'Technical Buyers', 'End Users'].map((a, i) => (
            <motion.div key={a}
              initial={{ opacity: 0, y: 6 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.3 }}
              style={{
                background: i === 0 ? 'rgba(74,124,111,0.08)' : 'rgba(14,14,14,0.03)',
                border: `1px solid ${i === 0 ? 'rgba(74,124,111,0.2)' : 'rgba(14,14,14,0.06)'}`,
                borderRadius: 3, padding: '6px', textAlign: 'center',
              }}
            >
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                background: i === 0 ? 'rgba(74,124,111,0.15)' : 'rgba(14,14,14,0.06)',
                margin: '0 auto 3px',
              }} />
              <div style={{ fontSize: 7, fontWeight: 600, color: '#333' }}>{a}</div>
              <div style={{ fontSize: 6.5, color: '#999' }}>Mapped</div>
            </motion.div>
          ))}
        </div>
        {/* Message framework bars */}
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[85, 65, 45].map((w, i) => (
            <motion.div key={i}
              initial={{ scaleX: 0 }}
              animate={isActive ? { scaleX: 1 } : {}}
              transition={{ delay: i * 0.08 + 0.5, duration: 0.5 }}
              style={{
                height: 4, borderRadius: 2, transformOrigin: 'left',
                background: `rgba(74,124,111,${0.3 - i * 0.08})`,
                width: `${w}%`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === 1) {
    // Strategic Build - wireframe + design visual
    return (
      <div style={{
        background: '#0E0E0E', borderRadius: 6, overflow: 'hidden', height: 200,
        position: 'relative',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
          {/* Wireframe side */}
          <div style={{ padding: 12, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>
              WIREFRAME
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />
              <div style={{ height: 36, background: 'rgba(255,255,255,0.04)', borderRadius: 2, border: '1px dashed rgba(255,255,255,0.08)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                <div style={{ height: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 2, border: '1px dashed rgba(255,255,255,0.06)' }} />
                <div style={{ height: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 2, border: '1px dashed rgba(255,255,255,0.06)' }} />
              </div>
              <div style={{ height: 26, background: 'rgba(74,124,111,0.12)', borderRadius: 2, border: '1px solid rgba(74,124,111,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 6.5, color: '#4A7C6F', letterSpacing: '0.08em', fontWeight: 600 }}>CTA BLOCK</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{ height: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 2, border: '1px dashed rgba(255,255,255,0.06)' }} />
                ))}
              </div>
            </div>
          </div>
          {/* Design side */}
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 7, color: 'rgba(200,169,122,0.5)', letterSpacing: '0.1em', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>
              HIGH-FIDELITY
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 2, display: 'flex', alignItems: 'center', padding: '0 6px', justifyContent: 'space-between' }}>
                <div style={{ width: 20, height: 4, borderRadius: 2, background: 'rgba(200,169,122,0.3)' }} />
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1,2,3].map(n => <div key={n} style={{ width: 10, height: 3, borderRadius: 1, background: 'rgba(255,255,255,0.1)' }} />)}
                </div>
              </div>
              <div style={{
                height: 36, borderRadius: 2, overflow: 'hidden',
                background: 'linear-gradient(135deg, #2A4A3E 0%, #1A3830 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#F5F2ED', fontFamily: 'Cormorant Garamond, serif' }}>Premium Headline</div>
                  <div style={{ fontSize: 5.5, color: 'rgba(245,242,237,0.5)', marginTop: 2 }}>Conversion-focused subline</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                <div style={{ height: 20, background: 'rgba(200,169,122,0.08)', borderRadius: 2 }} />
                <div style={{ height: 20, background: 'rgba(74,124,111,0.08)', borderRadius: 2 }} />
              </div>
              <div style={{
                height: 26, borderRadius: 2,
                background: 'linear-gradient(135deg, #4A7C6F, #3A6358)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 6.5, color: '#F5F2ED', letterSpacing: '0.04em', fontWeight: 600 }}>Start the conversation</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
                {[1, 2, 3].map(n => (
                  <div key={n} style={{ height: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={isActive ? { width: '100%' } : {}}
          transition={{ duration: 2, ease: 'linear' }}
          style={{
            position: 'absolute', bottom: 0, left: 0, height: 2,
            background: 'linear-gradient(90deg, #4A7C6F, #C8A97A)',
          }}
        />
      </div>
    );
  }

  // Launch - deployment visual
  return (
    <div style={{
      background: '#FAFAF8', border: '1px solid rgba(14,14,14,0.08)', borderRadius: 6,
      padding: 16, height: 200, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ fontSize: 8, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontFamily: 'JetBrains Mono, monospace' }}>
        // Deployment checklist
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'DNS & SSL configured', done: true },
          { label: 'Performance audit passed', done: true },
          { label: 'Analytics & tracking live', done: true },
          { label: 'CMS access granted', done: true },
          { label: 'Team training complete', done: true },
          { label: '30-day support active', done: true },
        ].map((item, i) => (
          <motion.div key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '4px 8px', borderRadius: 3,
              background: item.done ? 'rgba(74,124,111,0.04)' : 'transparent',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isActive ? { scale: 1 } : {}}
              transition={{ delay: i * 0.1 + 0.4, type: 'spring', stiffness: 400 }}
              style={{
                width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                background: '#4A7C6F', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontSize: 8, fontWeight: 700 }}>✓</span>
            </motion.div>
            <span style={{ fontSize: 9, color: '#333', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.0, type: 'spring' }}
        style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(74,124,111,0.1)', border: '1px solid rgba(74,124,111,0.22)',
          borderRadius: 4, padding: '4px 10px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#4A7C6F' }}
        />
        <span style={{ fontSize: 8, color: '#4A7C6F', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' }}>
          // DEPLOYED
        </span>
      </motion.div>
    </div>
  );
}

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section className="section section-light" id="process">
      <div className="container-wide" ref={ref}>
        <div style={{ maxWidth: 640, marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">The Process</span>
            <HeadlineReveal
              as="h2"
              className="section-headline"
              lines={['Three phases. One team.', 'No translation loss.']}
              baseDelay={0.1}
              inView={inView}
            />
          </motion.div>
        </div>

        {/* Interactive process display */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
          {/* Left: Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveStep(i)}
                  style={{
                    padding: '28px 24px', cursor: 'pointer',
                    borderLeft: `2px solid ${isActive ? 'var(--color-sage)' : 'rgba(14,14,14,0.08)'}`,
                    background: isActive ? 'rgba(74,124,111,0.03)' : 'transparent',
                    transition: 'all 300ms ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10 }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                      color: isActive ? 'var(--color-sage)' : 'rgba(14,14,14,0.25)',
                      letterSpacing: '0.1em', transition: 'color 300ms ease',
                    }}>
                      {step.number}
                    </span>
                    <h3 style={{
                      fontFamily: 'var(--font-headline)', fontSize: 22, fontWeight: 600,
                      color: isActive ? 'var(--color-off-black)' : 'rgba(14,14,14,0.4)',
                      transition: 'color 300ms ease',
                    }}>
                      {step.title}
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11,
                      color: 'rgba(14,14,14,0.3)', letterSpacing: '0.04em',
                      background: 'rgba(14,14,14,0.04)', padding: '2px 8px', borderRadius: 3,
                    }}>
                      {step.duration}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{
                          fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
                          color: 'rgba(14,14,14,0.65)', marginBottom: 16, maxWidth: 480,
                        }}>
                          {step.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {step.deliverables.map((d) => (
                            <span key={d} style={{
                              display: 'flex', alignItems: 'center', gap: 5,
                              fontFamily: 'var(--font-headline)', fontSize: 12, fontWeight: 500,
                              color: 'rgba(14,14,14,0.55)', background: 'rgba(74,124,111,0.06)',
                              padding: '4px 10px', borderRadius: 3,
                              border: '1px solid rgba(74,124,111,0.12)',
                            }}>
                              <span style={{ color: 'var(--color-sage)', fontSize: 10 }}>✓</span>
                              {d}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'sticky', top: 140 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <StepVisual step={activeStep} isActive={true} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}