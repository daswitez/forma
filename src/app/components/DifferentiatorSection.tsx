import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { HeadlineReveal } from './HeadlineReveal';
import { useIsMobile } from '../hooks/useIsMobile';

// ─── Left column: the bad options ─────────────────────────────────────────────
const badOptions = [
  {
    label: 'Hire a designer',
    issue: 'Positioning nuance lost in handoff',
    icon: (
      // Paintbrush — visual craft without strategy or code
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 3L21 6L8 19L4 20L5 16L18 3Z"
          stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round"
          fill="rgba(239,68,68,0.06)"
        />
        <path d="M15 6L18 9" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <path
          d="M5 16C5 16 4.5 18 4 20"
          stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Hire a developer',
    issue: 'Only as good as the brief they receive',
    icon: (
      // Code brackets — technical depth without design or strategy
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 6L3 12L8 18" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6L21 12L16 18" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 4L10 20" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      </svg>
    ),
  },
  {
    label: 'Hire an agency',
    issue: 'Thread lost across 7 people and 3 tools',
    icon: (
      // Three people — fragmented multi-person chain
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="7" r="2.5" stroke="#EF4444" strokeWidth="1.4" fill="rgba(239,68,68,0.05)" />
        <circle cx="19" cy="7" r="2.5" stroke="#EF4444" strokeWidth="1.4" fill="rgba(239,68,68,0.05)" />
        <circle cx="12" cy="5.5" r="3" stroke="#EF4444" strokeWidth="1.5" fill="rgba(239,68,68,0.05)" />
        <path d="M1 20C1 16.5 2.5 15 5 15" stroke="#EF4444" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
        <path d="M23 20C23 16.5 21.5 15 19 15" stroke="#EF4444" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
        <path d="M6.5 20C6.5 16.8 9 15 12 15C15 15 17.5 16.8 17.5 20" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ─── Right column: the integrated approach ─────────────────────────────────────
const advantages = [
  {
    label: 'No handoff',
    text: 'Same person thinks, designs, writes, and builds.',
    icon: (
      // Unbroken chain: start node → integrated box → end node with checkmark
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="3.5" cy="12" r="2.5" stroke="#4A7C6F" strokeWidth="1.5" fill="rgba(74,124,111,0.08)" />
        <path d="M6 12H9" stroke="#4A7C6F" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="#4A7C6F" strokeWidth="1.5" fill="rgba(74,124,111,0.08)" />
        <path d="M15 12H18" stroke="#4A7C6F" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20.5" cy="12" r="2.5" fill="#4A7C6F" />
        <path d="M19.4 11.5L20.3 12.5L21.7 11" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'No agency overhead',
    text: 'One point of contact who does the actual work.',
    icon: (
      // Single person + direct arrow bypassing crossed-out chain
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="4" cy="12" r="2.5" stroke="#4A7C6F" strokeWidth="1.5" fill="rgba(74,124,111,0.08)" />
        {/* Ghosted intermediate nodes with ✕ */}
        <circle cx="9.5" cy="9" r="1.5" stroke="rgba(239,68,68,0.25)" strokeWidth="1" />
        <path d="M8.7 8.2L10.3 9.8M10.3 8.2L8.7 9.8" stroke="rgba(239,68,68,0.35)" strokeWidth="0.9" strokeLinecap="round" />
        <circle cx="13.5" cy="9" r="1.5" stroke="rgba(239,68,68,0.25)" strokeWidth="1" />
        <path d="M12.7 8.2L14.3 9.8M14.3 8.2L12.7 9.8" stroke="rgba(239,68,68,0.35)" strokeWidth="0.9" strokeLinecap="round" />
        {/* Direct path below the chain */}
        <path d="M6.5 12H18" stroke="#4A7C6F" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15.5 9.5L18 12L15.5 14.5" stroke="#4A7C6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'No platform lock-in',
    text: 'Code, design files, docs — all yours outright.',
    icon: (
      // Open padlock — shackle lifted on one side
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="11" width="14" height="10" rx="2" stroke="#4A7C6F" strokeWidth="1.5" fill="rgba(74,124,111,0.06)" />
        {/* Shackle: left side attached, right side open/lifted */}
        <path d="M8 11V8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8" stroke="#4A7C6F" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="16.5" r="1.5" fill="rgba(74,124,111,0.2)" stroke="#4A7C6F" strokeWidth="1" />
        <path d="M11 18V19.5" stroke="#4A7C6F" strokeWidth="1" strokeLinecap="round" />
        {/* Export arrow — ownership transfers to client */}
        <path d="M18 3L21 3" stroke="rgba(74,124,111,0.7)" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M19.5 1.5L21 3L19.5 4.5" stroke="rgba(74,124,111,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'No generic process',
    text: 'Shaped around your business and challenge.',
    icon: (
      // Fingerprint — uniqueness, bespoke fit
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        {/* Outer ring */}
        <path d="M4.5 9C5.8 5.3 8.7 3 12 3C15.3 3 18.2 5.3 19.5 9" stroke="rgba(74,124,111,0.2)" strokeWidth="1" strokeLinecap="round" />
        {/* Mid ring */}
        <path
          d="M7 21C6 19 5.5 17 5 14.5C4.5 11 6 7.5 12 7.5C18 7.5 19.5 11 19 14.5"
          stroke="rgba(74,124,111,0.25)" strokeWidth="1" strokeLinecap="round"
        />
        {/* Inner ring */}
        <path
          d="M9 20C8.5 18.5 8 16.5 8 14C8 10.7 9.8 9 12 9C14.2 9 16 10.7 16 14C16 16.5 15.5 18.5 15 20"
          stroke="#4A7C6F" strokeWidth="1.5" strokeLinecap="round" fill="none"
        />
        {/* Core */}
        <path d="M12 14V20" stroke="#4A7C6F" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M10 11C10 11 9 12 9 14" stroke="#4A7C6F" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────
export function DifferentiatorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();

  return (
    <section className="section section-dark" id="about">
      <div className="container-wide" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 72px' }}
        >
          <span className="eyebrow">What Makes This Different</span>
          <HeadlineReveal
            as="h2"
            className="section-headline section-headline-light"
            lines={[
              'Not a designer. Not a developer.',
              'Not an agency.',
            ]}
            baseDelay={0.1}
            inView={inView}
          />
        </motion.div>

        {/* Comparison layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 56px 1fr',
          gap: isMobile ? 32 : 0,
          alignItems: 'start',
        }}>
          {/* Left: bad options */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'rgba(239,68,68,0.5)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 20, textAlign: 'right',
            }}>
              The usual options
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {badOptions.map((opt, i) => (
                <motion.div
                  key={opt.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  style={{
                    background: 'rgba(239,68,68,0.04)',
                    border: '1px solid rgba(239,68,68,0.1)',
                    borderRadius: 6, padding: '18px 22px',
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(239,68,68,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {opt.icon}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 600,
                      color: 'rgba(245,242,237,0.8)', marginBottom: 3,
                    }}>
                      {opt.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: 13,
                      color: 'rgba(245,242,237,0.38)',
                    }}>
                      {opt.issue}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center divider — desktop only */}
          {!isMobile && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            paddingTop: 44, gap: 0,
          }}>
            <div style={{
              width: 1, height: 80,
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1))',
            }} />
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(200,169,122,0.1)',
                border: '1px solid rgba(200,169,122,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '8px 0',
              }}
            >
              <span style={{ color: '#C8A97A', fontSize: 16 }}>→</span>
            </motion.div>
            <div style={{
              width: 1, flex: 1,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)',
            }} />
          </div>
          )}

          {/* Right: advantages */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: 'rgba(74,124,111,0.6)', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 20,
            }}>
              How this works instead
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {advantages.map((adv, i) => (
                <motion.div
                  key={adv.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  style={{
                    background: 'rgba(74,124,111,0.04)',
                    border: '1px solid rgba(74,124,111,0.12)',
                    borderRadius: 6, padding: '18px 22px',
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(74,124,111,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {adv.icon}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-headline)', fontSize: 15, fontWeight: 600,
                      color: 'var(--color-warm-white)', marginBottom: 3,
                    }}>
                      {adv.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: 13,
                      color: 'rgba(245,242,237,0.5)',
                    }}>
                      {adv.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom synthesis line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            textAlign: 'center', marginTop: 64,
            maxWidth: 560, margin: '64px auto 0',
            padding: '24px 32px',
            background: 'rgba(200,169,122,0.05)',
            border: '1px solid rgba(200,169,122,0.12)',
            borderRadius: 6,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6,
            color: 'rgba(245,242,237,0.5)', fontStyle: 'italic',
          }}>
            Strategy, design, and development held in one mind from brief to
            launch — with no translation loss between them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}