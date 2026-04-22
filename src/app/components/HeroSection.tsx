import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { AnimatedNumber } from './AnimatedNumber';
import { useIsMobile } from '../hooks/useIsMobile';
import { InteractiveTilt } from './InteractiveTilt';




// ─── Demo loop phases ─────────────────────────────────────────────────────────
type DemoPhase = 'before' | 'audit' | 'after';

const DEMO_DURATIONS: Record<DemoPhase, number> = {
  before: 3200,
  audit: 2600,
  after: 4200,
};

const PHASE_SEQUENCE: DemoPhase[] = ['before', 'audit', 'after'];

const PHASE_LABELS: Record<DemoPhase, string> = {
  before: 'Current site',
  audit: 'Conversion audit',
  after: 'After repositioning',
};

// ─── Browser chrome ───────────────────────────────────────────────────────────
function HeroBrowserChrome({ phase }: { phase: DemoPhase }) {
  const isAfter = phase === 'after';
  const urlMap: Record<DemoPhase, string> = {
    before: 'www.aegisindustrial.com',
    audit: 'www.aegisindustrial.com',
    after: 'www.vectraindustrial.com',
  };

  return (
    <div>
      {/* Tab strip */}
      <div style={{
        background: '#111113',
        padding: '6px 12px 0',
        display: 'flex', alignItems: 'flex-end', gap: 2,
        borderRadius: '10px 10px 0 0',
      }}>
        <div style={{
          background: '#1D1D1F',
          borderRadius: '6px 6px 0 0',
          padding: '5px 10px 6px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                background: isAfter ? '#4A7C6F' : 'rgba(255,255,255,0.2)',
              }}
            />
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: 9,
                color: isAfter ? 'rgba(245,242,237,0.75)' : 'rgba(245,242,237,0.4)',
                fontFamily: 'DM Sans, system-ui, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              {isAfter ? 'Vectra Industrial' : 'Aegis Industrial Systems'}
            </motion.span>
          </AnimatePresence>
          <span style={{ fontSize: 8, color: 'rgba(245,242,237,0.22)', marginLeft: 4 }}>×</span>
        </div>
        <div style={{ padding: '4px 9px 6px', fontSize: 10, color: 'rgba(245,242,237,0.2)' }}>+</div>
      </div>

      {/* Toolbar */}
      <div style={{
        background: '#1A1A1C', padding: '7px 12px',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840' }} />
        </div>
        {/* Nav icons */}
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 2L3.5 5L7 8" stroke="rgba(245,242,237,0.22)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M3 2L6.5 5L3 8" stroke="rgba(245,242,237,0.14)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Address bar */}
        <div style={{
          flex: 1, background: '#2A2A2C', borderRadius: 4,
          padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5,
          border: isAfter ? '1px solid rgba(40,200,64,0.18)' : '1px solid rgba(255,255,255,0.04)',
          transition: 'border-color 0.4s ease',
        }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <rect x="0.5" y="3.5" width="7" height="4" rx="1" stroke={isAfter ? '#28C840' : 'rgba(245,242,237,0.2)'} strokeWidth="0.8"/>
            <path d="M2 3.5V2.5a2 2 0 0 1 4 0v1" stroke={isAfter ? '#28C840' : 'rgba(245,242,237,0.2)'} strokeWidth="0.8"/>
          </svg>
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5,
                color: isAfter ? 'rgba(245,242,237,0.6)' : 'rgba(245,242,237,0.32)',
                letterSpacing: '0.01em',
              }}
            >
              {urlMap[phase]}
            </motion.span>
          </AnimatePresence>
          {isAfter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginLeft: 'auto' }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut' }}
                style={{ width: 5, height: 5, borderRadius: '50%', background: '#28C840' }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Before site ──────────────────────────────────────────────────────────────
function BeforeSite() {
  return (
    <div style={{ background: '#ECECEA', height: '100%', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>
      {/* Nav — 7 items */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #ddd',
        padding: '0 14px', height: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 10, fontWeight: 900, color: '#222', letterSpacing: '0.1em' }}>AEGIS INDUSTRIAL</div>
        <div style={{ display: 'flex', gap: 10, fontSize: 7.5, color: '#999' }}>
          {['Home', 'About', 'Services', 'Products', 'Team', 'Blog', 'Contact'].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>
      {/* Generic hero */}
      <div style={{
        background: 'linear-gradient(135deg, #2C5F8A 0%, #1A3A5C 100%)',
        height: 104, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 5,
      }}>
        <div style={{ fontSize: 16, fontWeight: 900, color: 'white' }}>Welcome to Aegis Industrial</div>
        <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.55)', maxWidth: 220, textAlign: 'center', lineHeight: 1.4 }}>
          We provide innovative solutions for businesses worldwide.
        </div>
        <div style={{ background: '#F5A623', color: '#222', padding: '4px 14px', fontSize: 8, fontWeight: 700, letterSpacing: '0.07em', marginTop: 2 }}>
          LEARN MORE
        </div>
      </div>
      {/* 3-column boxes */}
      <div style={{ padding: '8px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        {['Our Mission', 'Our Team', 'Our Values'].map(t => (
          <div key={t} style={{ background: '#fff', border: '1px solid #E2E2E2', borderRadius: 2, padding: '8px 6px', textAlign: 'center' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#E8E8E8', margin: '0 auto 4px' }} />
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#333', marginBottom: 2 }}>{t}</div>
            <div style={{ fontSize: 7, color: '#999', lineHeight: 1.3 }}>Lorem ipsum dolor sit amet consectetur.</div>
          </div>
        ))}
      </div>
      {/* No social proof, no CTA prominence */}
      <div style={{ padding: '0 14px' }}>
        <div style={{ height: 6, background: '#E0E0E0', borderRadius: 2, marginBottom: 4 }} />
        <div style={{ height: 6, background: '#E0E0E0', borderRadius: 2, width: '75%', marginBottom: 4 }} />
        <div style={{ height: 6, background: '#E0E0E0', borderRadius: 2, width: '55%' }} />
      </div>
    </div>
  );
}

// ─── Audit overlay ────────────────────────────────────────────────────────────
function AuditOverlay() {
  const annotations = [
    {
      top: '8%', left: '28%', width: '70%', height: '8%',
      border: '1.5px solid #EF4444', bg: 'rgba(239,68,68,0.1)',
      label: '#1 · 7 nav items → decision paralysis', delay: 0.1, pos: 'bottom' as const,
    },
    {
      top: '17%', left: '1%', width: '97%', height: '32%',
      border: '1.5px solid #EF4444', bg: 'rgba(239,68,68,0.07)',
      label: '#2 · "Welcome to" hero → zero differentiation, zero buyer signal', delay: 0.38, pos: 'bottom' as const,
    },
    {
      top: '50%', left: '1%', width: '97%', height: '40%',
      border: '1.5px dashed #FB923C', bg: 'rgba(251,146,60,0.05)',
      label: '#3 · Zero social proof, no trust signals, no outcome messaging', delay: 0.65, pos: 'top' as const,
    },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.06)' }} />

      {annotations.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: a.delay, duration: 0.28 }}
          style={{
            position: 'absolute', top: a.top, left: a.left,
            width: a.width, height: a.height,
            background: a.bg, border: a.border,
            borderRadius: 2,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: a.pos === 'bottom' ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: a.delay + 0.22, duration: 0.2 }}
            style={{
              position: 'absolute',
              [a.pos === 'bottom' ? 'top' : 'bottom']: 'calc(100% + 3px)',
              left: 0,
              background: '#0E0E0E', color: '#F5F2ED',
              fontSize: 7.5, padding: '3px 8px', borderRadius: 2,
              whiteSpace: 'nowrap',
              fontFamily: 'DM Sans, system-ui, sans-serif',
              fontWeight: 500, zIndex: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', gap: 5,
            }}
          >
            <span style={{ color: '#EF4444' }}>⚠</span>
            {a.label}
          </motion.div>
        </motion.div>
      ))}

      {/* CR badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.08, type: 'spring', stiffness: 380, damping: 22 }}
        style={{
          position: 'absolute', top: 8, right: 8,
          background: '#DC2626', color: 'white',
          fontSize: 7, padding: '3px 8px', borderRadius: 3,
          fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
          letterSpacing: '0.04em', boxShadow: '0 2px 12px rgba(220,38,38,0.5)',
        }}
      >
        CR: 0.9% · INDUSTRY AVG: 2.4%
      </motion.div>
    </div>
  );
}

// ─── After site — Vectra Industrial ──────────────────────────────────────────
function AfterSite() {
  return (
    <div style={{ background: '#F8F5F0', height: '100%', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      {/* Nav — minimal */}
      <div style={{
        background: 'rgba(248,245,240,0.96)', borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '0 16px', height: 32,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: 14, fontSize: 8, color: 'rgba(28,28,28,0.45)', fontWeight: 500 }}>
          <span>Capabilities</span>
          <span>Sectors</span>
        </div>
        <span style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 14, fontWeight: 700, color: '#1C1C1C',
          letterSpacing: '0.12em', textTransform: 'uppercase',
        }}>Vectra</span>
        <div style={{
          background: '#1C1C1C', color: '#F8F5F0',
          padding: '3.5px 10px', borderRadius: 2,
          fontSize: 7.5, fontWeight: 700, letterSpacing: '0.07em',
        }}>Request specs →</div>
      </div>

      {/* Hero — split layout */}
      <div style={{
        background: 'linear-gradient(125deg, #F4EDE0 0%, #EAE0D0 60%, #DFD0C0 100%)',
        padding: '14px 16px', display: 'flex', gap: 12, minHeight: 110,
      }}>
        {/* Left content */}
        <div style={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            style={{ fontSize: 7, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 7 }}
          >Aerospace · Tier-1 Manufacturing</motion.div>
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 20, fontWeight: 700, color: '#1C1C1C',
              lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 8,
            }}
          >
            Built to spec.<br />
            <em style={{ fontStyle: 'italic', color: '#4A7C6F' }}>Delivered on time.</em>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ fontSize: 8.5, color: 'rgba(28,28,28,0.5)', lineHeight: 1.45, marginBottom: 10, maxWidth: 170 }}
          >
            Precision components for aerospace supply chains. AS9100D certified.
          </motion.div>
          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }}
            style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          >
            <div style={{
              background: '#1C1C1C', color: '#F8F5F0',
              padding: '5px 12px', borderRadius: 2, fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em',
            }}>Request Engineering Brief</div>
          </motion.div>
        </div>

        {/* Right — specs card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 108, flexShrink: 0,
            background: 'rgba(14,14,14,0.9)',
            borderRadius: 5, padding: '8px 10px',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
        >
          <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 6.5,
            color: 'rgba(200,169,122,0.5)', letterSpacing: '0.1em', marginBottom: 8,
          }}>// CAPABILITIES</div>
          {[
            { label: 'Tolerances', val: '±0.001"' },
            { label: 'Materials', val: '40+ alloys' },
            { label: 'Lead time', val: '48hr quote' },
            { label: 'Cert.', val: 'AS9100D' },
          ].map((item, i) => (
            <div key={item.label} style={{
              padding: '5px 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ fontSize: 6.5, color: 'rgba(245,242,237,0.35)', fontFamily: 'JetBrains Mono, monospace' }}>{item.label}</div>
              <div style={{ fontSize: 8, color: '#4A7C6F', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, marginTop: 1 }}>{item.val}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trust bar */}
      <div style={{
        background: '#1C1C1C', padding: '5px 16px',
        display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
      }}>
        {['→ Tier-1 suppliers', '→ AS9100D certified', '→ 24/7 engineering support'].map(t => (
          <span key={t} style={{ fontSize: 7.5, color: 'rgba(245,242,237,0.5)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{t}</span>
        ))}
      </div>

      {/* Social proof strip */}
      <div style={{ padding: '8px 16px', display: 'flex', gap: 8 }}>
        {[
          { client: 'Aerospace Tier-1', metric: '+67% leads', delta: '90 days' },
          { client: 'Defense Supplier', metric: '−40% misfit inquiries', delta: '3 months' },
          { client: 'Space Systems', metric: '3.2× engagement', delta: '60 days' },
        ].map((item) => (
          <div key={item.client} style={{
            flex: 1, background: 'rgba(74,124,111,0.05)',
            border: '1px solid rgba(74,124,111,0.12)',
            borderRadius: 3, padding: '5px 7px',
          }}>
            <div style={{ fontSize: 6.5, color: 'rgba(28,28,28,0.4)', marginBottom: 2, fontFamily: 'DM Sans, system-ui, sans-serif' }}>{item.client}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#4A7C6F', fontFamily: 'JetBrains Mono, monospace' }}>{item.metric}</div>
            <div style={{ fontSize: 6.5, color: 'rgba(28,28,28,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>{item.delta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Results overlay (floats over after site) ─────────────────────────────────
function ResultsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute', bottom: 12, right: 12,
        background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(16px)',
        borderRadius: 8, padding: '12px 14px',
        border: '1px solid rgba(255,255,255,0.08)',
        width: 186,
        boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        zIndex: 10,
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 8, paddingBottom: 7,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 7.5,
          color: 'rgba(245,242,237,0.3)', letterSpacing: '0.1em',
        }}>60-day results</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#4A7C6F' }}
          />
          <span style={{
            fontSize: 7.5, color: '#4A7C6F',
            fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, letterSpacing: '0.06em',
          }}>STATUS: DEPLOYED</span>
        </div>
      </div>
      {[
        { label: 'Conversion rate', before: '0.9%', after: '3.1%', delta: '+245%' },
        { label: 'Revenue / visitor', before: '$0.41', after: '$1.48', delta: '+3.6×' },
        { label: 'Qualified leads', before: 'baseline', after: '+67%', delta: '90d' },
      ].map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 + 0.15, duration: 0.28 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '4.5px 0',
            borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <span style={{ fontSize: 7.5, color: 'rgba(245,242,237,0.4)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{m.label}</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 7, color: 'rgba(245,242,237,0.18)', textDecoration: 'line-through', fontFamily: 'JetBrains Mono, monospace' }}>{m.before}</span>
            <span style={{ fontSize: 8.5, color: '#4A7C6F', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{m.after}</span>
            <span style={{
              fontSize: 6.5, color: 'var(--color-sage)',
              background: 'rgba(74,124,111,0.15)', padding: '1px 4px', borderRadius: 2,
              fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
            }}>{m.delta}</span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Phase progress indicator ─────────────────────────────────────────────────
function PhaseIndicator({ phase }: { phase: DemoPhase }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      marginTop: 14,
      justifyContent: 'center',
    }}>
      {PHASE_SEQUENCE.map((p) => {
        const isActive = p === phase;
        const isDone = PHASE_SEQUENCE.indexOf(p) < PHASE_SEQUENCE.indexOf(phase);
        return (
          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: isActive ? 20 : 6, height: 6,
              borderRadius: 3,
              background: isActive
                ? 'var(--color-sand)'
                : isDone
                  ? 'rgba(74,124,111,0.5)'
                  : 'rgba(245,242,237,0.15)',
              transition: 'all 0.35s ease',
            }} />
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9.5,
                    color: 'rgba(245,242,237,0.55)', letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {PHASE_LABELS[p]}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Floating browser mockup (hero) ──────────────────────────────────────────
function FloatingBrowserMockup() {
  const [phase, setPhase] = useState<DemoPhase>('before');
  const [showResults, setShowResults] = useState(false);
  const [paused, setPaused] = useState(false);

  // Advance phase on timer
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setPhase(prev => {
        const idx = PHASE_SEQUENCE.indexOf(prev);
        return PHASE_SEQUENCE[(idx + 1) % PHASE_SEQUENCE.length];
      });
    }, DEMO_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase, paused]);

  // Show results card 1.8s into the 'after' phase
  useEffect(() => {
    setShowResults(false);
    if (phase === 'after') {
      const t = setTimeout(() => setShowResults(true), 1800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const showAfter = phase === 'after';
  const showAudit = phase === 'audit';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Outer glow changes with phase */}
      <motion.div
        animate={{
          boxShadow: showAfter
            ? '0 60px 140px rgba(74,124,111,0.25), 0 0 0 1px rgba(74,124,111,0.2)'
            : showAudit
              ? '0 60px 140px rgba(239,68,68,0.15), 0 0 0 1px rgba(239,68,68,0.15)'
              : '0 60px 140px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
        }}
        transition={{ duration: 0.7 }}
        style={{
          width: 420,
          borderRadius: 10,
          overflow: 'hidden',
          transform: 'rotateY(-4deg) rotateX(2deg)',
        }}
      >
        <HeroBrowserChrome phase={phase} />

        {/* Viewport */}
        <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
          {/* Site content — crossfade between before/after */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              {showAfter ? <AfterSite /> : <BeforeSite />}
            </motion.div>
          </AnimatePresence>

          {/* Audit overlay */}
          <AnimatePresence>
            {showAudit && (
              <motion.div
                key="audit-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'absolute', inset: 0, zIndex: 5 }}
              >
                <AuditOverlay />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results card */}
          <AnimatePresence>
            {showResults && <ResultsCard key="results-card" />}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Phase indicator below browser */}
      <PhaseIndicator phase={phase} />
    </motion.div>
  );
}

// ─── Main hero section ────────────────────────────────────────────────────────
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section className="hero" ref={ref} style={{ display: 'flex', alignItems: 'center' }}>
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-bg-accent" aria-hidden="true" />
      <div className="hero-bg-beam" aria-hidden="true" />
      <div className="hero-bg-rings" aria-hidden="true" />

      <motion.div style={{ y, opacity, width: '100%' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 64px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.08fr) minmax(380px, 0.92fr)',
          gap: isMobile ? 32 : 70,
          alignItems: 'center', position: 'relative', zIndex: 1,
        }}>
          {/* Left: Copy */}
          <div className="hero-copy-column">
            <motion.div
              className="hero-eyebrow-row"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero-eyebrow-line" />
              <span className="eyebrow hero-eyebrow-label">Conversion-Focused Digital Repositioning</span>
            </motion.div>

            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(44px, 4.8vw, 72px)' }}
            >
              Your site is the first
              <br />
              impression.{' '}
              <em className="hero-headline-em">Make it convert.</em>
            </motion.h1>

            <motion.p
              className="hero-subline"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ maxWidth: 580 }}
            >
              We close the gap between what your business is and what your website shows.
              Strategy, design, and implementation shipped as one integrated process
              — in code, WordPress, or Webflow.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                className="btn-primary btn-large"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start the conversation
              </button>
              <button
                className="hero-secondary-cta"
                onClick={() => document.getElementById('transformation')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See a live transformation
                <span className="hero-cta-arrow">↓</span>
              </button>
            </motion.div>

            <motion.div
              className="hero-meta-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="hero-meta-item">
                <span className="hero-meta-number">
                  <AnimatedNumber to={90} duration={1400} />
                </span>
                <span className="hero-meta-label">-day delivery</span>
              </div>
              <div className="hero-meta-divider" />
              <div className="hero-meta-item">
                <span className="hero-meta-number">
                  <AnimatedNumber to={3} duration={900} />
                </span>
                <span className="hero-meta-label">Platform options</span>
              </div>
              <div className="hero-meta-divider" />
              <div className="hero-meta-item">
                <span className="hero-meta-number">1</span>
                <span className="hero-meta-label">Integrated team</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Live demo browser */}
          <div className="hero-stage">
            {!isMobile && (
              <InteractiveTilt
                className="hero-browser-tilt"
                disabled={isMobile}
                maxTilt={9}
                lift={12}
                scale={1.01}
                radius={14}
              >
                <div className="hero-browser-shell">
                  <FloatingBrowserMockup />
                </div>
              </InteractiveTilt>
            )}

          </div>
        </div>
      </motion.div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}
