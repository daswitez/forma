import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useInView } from 'motion/react';

type PhaseId = 'before' | 'audit' | 'architecture' | 'design' | 'after';

interface Phase {
  id: PhaseId;
  number: string;
  label: string;
  sublabel: string;
  headline: string;
  description: string;
}

const PHASE_DURATION = 5800;

const phases: Phase[] = [
  {
    id: 'before',
    number: '—',
    label: 'Current State',
    sublabel: 'Before the work begins',
    headline: 'Traffic arriving. Revenue not following.',
    description:
      '28,000 monthly visitors. 0.8% conversion rate. The site existed — it just wasn\'t built to sell.',
  },
  {
    id: 'audit',
    number: '01',
    label: 'Conversion Audit',
    sublabel: 'Problems mapped to revenue',
    headline: 'Every friction point named and costed.',
    description:
      'Six critical conversion failures above the fold. Mobile checkout leaking 74% of carts at step two. Every problem documented with a revenue cost.',
  },
  {
    id: 'architecture',
    number: '02',
    label: 'Wireframing',
    sublabel: 'Structure and flow',
    headline: 'Every section earns its place.',
    description:
      'Information architecture rebuilt from scratch. Navigation collapsed from seven items to three. Hero reframed around one conversion claim. Every section has one job — and nothing competes with the buying decision.',
  },
  {
    id: 'design',
    number: '03',
    label: 'Component Design',
    sublabel: 'Visual system applied',
    headline: 'A brand that looks like what it charges.',
    description:
      'Colour palette, typography system, and component library — all built in service of conversion. Cormorant Garamond for editorial weight. DM Sans for clarity. Every pixel communicating premium before a single product description is read.',
  },
  {
    id: 'after',
    number: '—',
    label: 'Results',
    sublabel: '60-day performance data',
    headline: 'Shipped in 6 weeks. Revenue compounding.',
    description:
      '0.8% → 3.2% conversion rate. Revenue per visitor up 4.1x. Mobile abandonment down 61%. Average order value up 28%.',
  },
];

const PHASE_IDS: PhaseId[] = phases.map((p) => p.id);

// ─── Bottle CSS Art ────────────────────────────────────────────────────────────
function BottleArt({ scale = 1 }: { scale?: number }) {
  const s = scale;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* Pump head */}
      <div style={{
        width: 20 * s, height: 7 * s,
        background: 'linear-gradient(135deg,#EAD9C2,#F2E6D4,#E4D2BC)',
        borderRadius: `${4 * s}px ${4 * s}px 0 0`,
        border: `${1.5 * s}px solid rgba(255,255,255,0.65)`,
        borderBottom: 'none',
      }} />
      {/* Pump neck */}
      <div style={{
        width: 7 * s, height: 10 * s,
        background: 'linear-gradient(to right,#D8C8AE,#ECDDC8,#D4C4AA)',
        border: `${1 * s}px solid rgba(255,255,255,0.5)`,
        borderTop: 'none', borderBottom: 'none',
      }} />
      {/* Collar */}
      <div style={{
        width: 50 * s, height: 7 * s,
        background: 'linear-gradient(to bottom,#E8D8C0,#D8C8AC)',
        borderRadius: `${3 * s}px ${3 * s}px 0 0`,
        border: `${1.5 * s}px solid rgba(255,255,255,0.55)`,
        borderBottom: 'none',
      }} />
      {/* Bottle body */}
      <div style={{
        width: 50 * s, height: 90 * s,
        background: 'linear-gradient(160deg,#F4EAD8 0%,#EAD9C4 25%,#DCCAB4 65%,#C8B49E 100%)',
        borderRadius: `0 0 ${5 * s}px ${5 * s}px`,
        border: `${1.5 * s}px solid rgba(255,255,255,0.5)`,
        position: 'relative',
        boxShadow: `${3 * s}px ${6 * s}px ${20 * s}px rgba(0,0,0,0.14), inset ${3 * s}px 0 ${8 * s}px rgba(255,255,255,0.38)`,
        overflow: 'hidden',
      }}>
        {/* Highlight strip */}
        <div style={{
          position: 'absolute', top: 0, left: `${6 * s}px`,
          width: `${8 * s}px`, height: '80%',
          background: 'linear-gradient(to bottom,rgba(255,255,255,0.42),rgba(255,255,255,0))',
          borderRadius: `${4 * s}px`,
        }} />
        {/* Label area */}
        <div style={{
          position: 'absolute', inset: `${10 * s}px ${7 * s}px`,
          background: 'rgba(253,248,242,0.32)',
          borderRadius: `${3 * s}px`,
          border: `${0.5 * s}px solid rgba(255,255,255,0.5)`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: `${4 * s}px`,
        }}>
          {/* Leaf icon */}
          <div style={{
            width: 18 * s, height: 18 * s,
            borderRadius: `50% 50% 50% 0`,
            background: 'rgba(74,124,111,0.22)',
            border: `${0.5 * s}px solid rgba(74,124,111,0.3)`,
            transform: 'rotate(-45deg)',
          }} />
          <div style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 7 * s,
            fontStyle: 'italic',
            color: '#3D2F1E',
            letterSpacing: '0.12em',
            fontWeight: 500,
          }}>Solène</div>
          <div style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: 4.5 * s,
            color: '#6B5040',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 1.4,
          }}>Vitamin C<br />Serum</div>
          <div style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: 4 * s,
            color: 'rgba(61,47,30,0.45)',
            letterSpacing: '0.06em',
          }}>30 ml</div>
        </div>
      </div>
      {/* Shadow */}
      <div style={{
        width: 44 * s, height: 9 * s, marginTop: `${3 * s}px`,
        background: 'radial-gradient(ellipse,rgba(0,0,0,0.16) 0%,transparent 72%)',
      }} />
    </div>
  );
}

// ─── Large Bottle Art (for modal) ────────────────────────────────────────────
function LargeBottleArt() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Pump head */}
      <div style={{
        width: 44, height: 18,
        background: 'linear-gradient(135deg,#EAD9C2,#F5EAD8,#E2D0BA)',
        borderRadius: '10px 10px 0 0',
        border: '2px solid rgba(255,255,255,0.65)',
        borderBottom: 'none',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.08)',
      }} />
      {/* Pump neck */}
      <div style={{
        width: 14, height: 22,
        background: 'linear-gradient(to right,#D4C4A8,#EAD9C4,#D0C0A4)',
        border: '1.5px solid rgba(255,255,255,0.5)',
        borderTop: 'none', borderBottom: 'none',
      }} />
      {/* Collar */}
      <div style={{
        width: 110, height: 16,
        background: 'linear-gradient(to bottom,#ECD8C2,#D8C8AE)',
        borderRadius: '6px 6px 0 0',
        border: '2px solid rgba(255,255,255,0.6)',
        borderBottom: 'none',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.06)',
      }} />
      {/* Bottle body */}
      <div style={{
        width: 110, height: 200,
        background: 'linear-gradient(165deg,#F6EEE0 0%,#EAD8C4 20%,#DCCBB6 55%,#C8B49C 100%)',
        borderRadius: '0 0 12px 12px',
        border: '2px solid rgba(255,255,255,0.5)',
        position: 'relative',
        boxShadow: '6px 14px 44px rgba(0,0,0,0.16), inset 6px 0 18px rgba(255,255,255,0.36)',
        overflow: 'hidden',
      }}>
        {/* Highlights */}
        <div style={{
          position: 'absolute', top: 0, left: 14,
          width: 18, height: '85%',
          background: 'linear-gradient(to bottom,rgba(255,255,255,0.44),rgba(255,255,255,0))',
          borderRadius: 10,
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 14,
          width: 8, height: '60%',
          background: 'linear-gradient(to bottom,rgba(255,255,255,0.22),rgba(255,255,255,0))',
          borderRadius: 6,
        }} />
        {/* Label */}
        <div style={{
          position: 'absolute', inset: '18px 14px 16px',
          background: 'rgba(253,249,244,0.34)',
          borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.5)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 10,
        }}>
          {/* Botanical circle mark */}
          <div style={{ position: 'relative', width: 44, height: 44 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(74,124,111,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 24, height: 24,
                borderRadius: '50% 50% 50% 0',
                background: 'rgba(74,124,111,0.2)',
                border: '1px solid rgba(74,124,111,0.3)',
                transform: 'rotate(-45deg)',
              }} />
            </div>
          </div>
          <div style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 20, fontStyle: 'italic',
            color: '#2C2018', letterSpacing: '0.12em', fontWeight: 500,
          }}>Solène</div>
          <div style={{
            width: 28, height: 1,
            background: 'rgba(74,124,111,0.35)',
          }} />
          <div style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: 9, color: '#6B5040',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            textAlign: 'center', lineHeight: 1.6,
          }}>Vitamin C<br />Brightening<br />Serum</div>
          <div style={{
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontSize: 8, color: 'rgba(61,47,30,0.42)',
            letterSpacing: '0.08em',
          }}>30 ml · 1.0 fl oz</div>
        </div>
      </div>
      {/* Shadow */}
      <div style={{
        width: 90, height: 22, marginTop: 6,
        background: 'radial-gradient(ellipse,rgba(0,0,0,0.14) 0%,transparent 70%)',
      }} />
    </div>
  );
}

// ─── Browser Chrome (Small) ───────────────────────────────────────────────────
function BrowserChrome({ phase, clickable }: { phase: PhaseId; clickable?: boolean }) {
  const isLive = phase === 'after';
  return (
    <div>
      {/* Tab strip */}
      <div style={{
        background: '#111113',
        padding: '7px 14px 0',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        borderRadius: '10px 10px 0 0',
      }}>
        <div style={{
          background: '#1E1E20',
          borderRadius: '6px 6px 0 0',
          padding: '6px 12px 7px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          maxWidth: 160,
        }}>
          {isLive && (
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'linear-gradient(135deg,#4CAF72,#28C840)',
              flexShrink: 0,
            }} />
          )}
          {!isLive && (
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#4A7C6F',
              flexShrink: 0,
            }} />
          )}
          <span style={{
            fontSize: 9,
            color: isLive ? 'rgba(245,242,237,0.78)' : 'rgba(245,242,237,0.44)',
            fontFamily: 'DM Sans, system-ui, sans-serif',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>Solène Botanics</span>
          <span style={{ fontSize: 8, color: 'rgba(245,242,237,0.24)', marginLeft: 4 }}>×</span>
        </div>
        <div style={{
          padding: '4px 10px 7px',
          fontSize: 10,
          color: 'rgba(245,242,237,0.22)',
        }}>+</div>
      </div>

      {/* Nav bar */}
      <div style={{
        background: '#1A1A1C',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
        </div>
        {/* Arrow + refresh */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M7 2L4 5.5L7 9" stroke="rgba(245,242,237,0.25)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M4 2L7 5.5L4 9" stroke="rgba(245,242,237,0.16)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M9 5.5A3.5 3.5 0 1 1 5.5 2M5.5 2L7.5 4M5.5 2L7.5 0" stroke={isLive ? 'rgba(40,200,64,0.4)' : 'rgba(245,242,237,0.18)'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Address bar */}
        <div style={{
          flex: 1,
          background: '#2C2C2E',
          borderRadius: 5,
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          border: isLive ? '1px solid rgba(40,200,64,0.15)' : '1px solid rgba(255,255,255,0.04)',
        }}>
          {isLive ? (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="0.5" y="3.5" width="7" height="4" rx="1" stroke="#28C840" strokeWidth="0.8"/>
              <path d="M2 3.5V2.5a2 2 0 0 1 4 0v1" stroke="#28C840" strokeWidth="0.8"/>
            </svg>
          ) : (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <rect x="0.5" y="3.5" width="7" height="4" rx="1" stroke="rgba(245,242,237,0.22)" strokeWidth="0.8"/>
              <path d="M2 3.5V2.5a2 2 0 0 1 4 0v1" stroke="rgba(245,242,237,0.22)" strokeWidth="0.8"/>
            </svg>
          )}
          <span style={{
            fontSize: 10,
            fontFamily: 'JetBrains Mono, monospace',
            color: isLive ? 'rgba(245,242,237,0.65)' : 'rgba(245,242,237,0.35)',
            letterSpacing: '0.01em',
            transition: 'color 0.4s ease',
          }}>
            www.solenebotanics.com
          </span>
          {isLive && (
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              style={{
                marginLeft: 'auto',
                width: 5, height: 5,
                borderRadius: '50%',
                background: '#28C840',
                flexShrink: 0,
              }}
            />
          )}
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1L6.8 4.1H10L7.6 6.1L8.5 9.2L5.5 7.4L2.5 9.2L3.4 6.1L1 4.1H4.2L5.5 1Z" stroke="rgba(245,242,237,0.18)" strokeWidth="0.9" strokeLinejoin="round"/>
          </svg>
          {clickable && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{
                fontSize: 7.5, color: '#4A7C6F',
                fontFamily: 'DM Sans, system-ui, sans-serif',
                letterSpacing: '0.04em',
                fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 3,
              }}
            >
              <span>↗</span>
              <span>Expand</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Modal Browser Chrome ─────────────────────────────────────────────────────
function ModalBrowserChrome({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ flexShrink: 0 }}>
      {/* Tab strip */}
      <div style={{
        background: '#0F0F11',
        padding: '8px 16px 0',
        display: 'flex', alignItems: 'flex-end', gap: 2,
      }}>
        <div style={{
          background: '#1C1C1E',
          borderRadius: '8px 8px 0 0',
          padding: '8px 16px 9px',
          display: 'flex', alignItems: 'center', gap: 7,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: 'linear-gradient(135deg,#4CAF72,#28C840)',
          }} />
          <span style={{
            fontSize: 12,
            color: 'rgba(245,242,237,0.82)',
            fontFamily: 'DM Sans, system-ui, sans-serif',
            fontWeight: 500,
          }}>Solène Botanics — Live Site</span>
          <span style={{ fontSize: 10, color: 'rgba(245,242,237,0.28)', marginLeft: 6, cursor: 'pointer' }} onClick={onClose}>×</span>
        </div>
        <div style={{ padding: '5px 12px 9px', fontSize: 13, color: 'rgba(245,242,237,0.2)' }}>+</div>
      </div>

      {/* Nav bar */}
      <div style={{
        background: '#1C1C1E',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ display: 'flex', gap: 7, flexShrink: 0 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57', cursor: 'pointer' }} onClick={onClose} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 6 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7L9 11" stroke="rgba(245,242,237,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L9 7L5 11" stroke="rgba(245,242,237,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 7A5 5 0 1 1 7 2M7 2L9.5 4.5M7 2L4.5 4.5" stroke="rgba(245,242,237,0.3)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Address bar */}
        <div style={{
          flex: 1, background: '#2A2A2E',
          borderRadius: 7, padding: '7px 14px',
          display: 'flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(40,200,64,0.18)',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="0.5" y="4" width="9" height="5.5" rx="1.2" stroke="#28C840" strokeWidth="0.9"/>
            <path d="M2.5 4V3A2.5 2.5 0 0 1 7.5 3v1" stroke="#28C840" strokeWidth="0.9"/>
          </svg>
          <span style={{
            fontSize: 12, fontFamily: 'JetBrains Mono, monospace',
            color: 'rgba(245,242,237,0.7)', letterSpacing: '0.01em',
          }}>www.solenebotanics.com</span>
          <motion.div
            animate={{ opacity: [1, 0.35, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{
              marginLeft: 'auto',
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(40,200,64,0.1)', border: '1px solid rgba(40,200,64,0.22)',
              borderRadius: 4, padding: '2px 7px',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#28C840' }} />
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: '#28C840', fontWeight: 600, letterSpacing: '0.06em' }}>LIVE</span>
          </motion.div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 6, padding: '6px 14px',
            color: 'rgba(245,242,237,0.55)',
            fontSize: 11, fontFamily: 'DM Sans, system-ui, sans-serif',
            cursor: 'pointer', letterSpacing: '0.04em',
            display: 'flex', alignItems: 'center', gap: 5,
            flexShrink: 0,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M8 2L2 8M2 2L8 8" stroke="rgba(245,242,237,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Close
        </button>
      </div>
    </div>
  );
}

// ─── Full Solène Website (modal) ──────────────────────────────────────────────
function FullSoleneWebsite() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#FDFAF6', minHeight: 1600 }}>
      {/* Announcement bar */}
      <div style={{
        background: '#111',
        color: 'rgba(245,242,237,0.65)',
        textAlign: 'center',
        fontSize: 11,
        padding: '9px 20px',
        letterSpacing: '0.08em',
        display: 'flex', justifyContent: 'center', gap: 20,
      }}>
        <span>Free shipping over $65</span>
        <span style={{ color: 'rgba(245,242,237,0.28)' }}>·</span>
        <span>★ 4.9 · 2,847 reviews</span>
        <span style={{ color: 'rgba(245,242,237,0.28)' }}>·</span>
        <span>30-day returns</span>
        <span style={{ color: 'rgba(245,242,237,0.28)' }}>·</span>
        <span>Clinically tested</span>
      </div>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0,
        background: 'rgba(253,250,246,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '0 48px', height: 66,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', gap: 28, fontSize: 13, color: 'rgba(28,28,28,0.5)', letterSpacing: '0.02em' }}>
          <span style={{ cursor: 'pointer' }}>Shop</span>
          <span style={{ cursor: 'pointer' }}>Collections</span>
          <span style={{ cursor: 'pointer' }}>Our Story</span>
        </div>
        <span style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 30, fontStyle: 'italic', color: '#1C1C1C', fontWeight: 500,
          letterSpacing: '0.06em',
        }}>Solène</span>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'rgba(28,28,28,0.4)', cursor: 'pointer' }}>Search</span>
          <div style={{ display: 'flex', gap: 1 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C8A97A', fontSize: 11 }}>★</span>)}
          </div>
          <span style={{ fontSize: 12, color: 'rgba(28,28,28,0.45)' }}>4.9</span>
          <div style={{
            background: '#1C1C1C', color: '#FDFAF6',
            padding: '11px 22px', borderRadius: 3,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            cursor: 'pointer',
          }}>SHOP NOW</div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg,#F8F1E4 0%,#EDE0CC 55%,#E0D0BC 100%)',
        padding: '72px 48px 56px',
        display: 'flex', gap: 64, alignItems: 'center',
        minHeight: 460,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 11, color: '#8B6E4E',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            fontWeight: 700, marginBottom: 20,
            fontFamily: 'DM Sans, system-ui, sans-serif',
          }}>Botanical Skincare · Est. 2019</div>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 68, lineHeight: 0.94,
            fontWeight: 700, color: '#1C1C1C',
            letterSpacing: '-0.025em', marginBottom: 24,
          }}>
            Skin that<br />actually<br />
            <em style={{ fontStyle: 'italic', color: '#4A7C6F' }}>changes.</em>
          </h1>

          <p style={{
            fontSize: 15, color: 'rgba(28,28,28,0.55)',
            lineHeight: 1.65, marginBottom: 28, maxWidth: 380,
            fontFamily: 'system-ui, sans-serif',
          }}>
            Results-driven botanical formulations. No fillers, no false promises.
            Visible results in 14 days — guaranteed.
          </p>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C8A97A', fontSize: 16 }}>★</span>)}
            </div>
            <span style={{ fontSize: 14, color: 'rgba(28,28,28,0.5)' }}>
              <strong style={{ color: '#1C1C1C' }}>4.9</strong> · 2,847 verified reviews
            </span>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 32 }}>
            <div style={{
              background: '#1C1C1C', color: '#FDFAF6',
              padding: '14px 28px', borderRadius: 3,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
            }}>SHOP BESTSELLERS</div>
            <div style={{
              border: '1px solid rgba(28,28,28,0.2)',
              color: 'rgba(28,28,28,0.6)',
              padding: '13px 22px', borderRadius: 3,
              fontSize: 12, letterSpacing: '0.06em', cursor: 'pointer',
            }}>Take the skin quiz →</div>
          </div>

          {/* Social avatars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex' }}>
              {['#C8A97A','#4A7C6F','#8B9E7C','#C4956A'].map((bg, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: bg, border: '2px solid #F8F1E4',
                  marginLeft: i === 0 ? 0 : -8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, color: 'white', fontWeight: 700,
                }}>
                  {['S','M','A','L'][i]}
                </div>
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(28,28,28,0.45)' }}>Join 14,000+ customers</span>
          </div>
        </div>

        {/* Product hero */}
        <div style={{
          flexShrink: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative',
        }}>
          {/* Glow behind bottle */}
          <div style={{
            position: 'absolute', top: '10%', left: '50%',
            transform: 'translateX(-50%)',
            width: 180, height: 200,
            background: 'radial-gradient(ellipse,rgba(200,169,122,0.25) 0%,transparent 70%)',
            pointerEvents: 'none',
          }} />
          <LargeBottleArt />
          {/* Floating badge */}
          <div style={{
            position: 'absolute', top: 20, right: -24,
            background: 'rgba(10,10,10,0.92)',
            backdropFilter: 'blur(12px)',
            borderRadius: 8, padding: '8px 12px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontSize: 9, color: 'rgba(245,242,237,0.4)', marginBottom: 2, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>#1 SELLER</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#4A7C6F', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>4.9 ★</div>
            <div style={{ fontSize: 9, color: 'rgba(245,242,237,0.38)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>1,240 reviews</div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{
        background: '#1C1C1C', padding: '16px 48px',
        display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
      }}>
        {[
          { icon: '✦', text: 'Free shipping over $65' },
          { icon: '✦', text: '30-day money-back guarantee' },
          { icon: '✦', text: 'Clinically tested formulas' },
          { icon: '✦', text: 'Cruelty-free · Vegan' },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 10, color: '#C8A97A' }}>{item.icon}</span>
            <span style={{ fontSize: 12, color: 'rgba(245,242,237,0.58)', fontFamily: 'DM Sans, system-ui, sans-serif', letterSpacing: '0.02em' }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Featured Collection */}
      <div style={{ padding: '72px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 11, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8, fontFamily: 'DM Sans, system-ui, sans-serif' }}>Bestsellers</div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 44, fontWeight: 700, color: '#1C1C1C', lineHeight: 1.0, letterSpacing: '-0.02em' }}>
              Our most-loved<br />formulas
            </h2>
          </div>
          <div style={{ fontSize: 13, color: '#4A7C6F', borderBottom: '1px solid #4A7C6F', paddingBottom: 1, cursor: 'pointer', letterSpacing: '0.03em' }}>View all products →</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            {
              name: 'Vitamin C Brightening Serum',
              desc: 'Visibly fades dark spots in 14 days',
              price: '$48',
              rating: '4.9', reviews: '1,240',
              badge: '#1 Bestseller',
              badgeColor: '#4A7C6F',
              bottleColor: ['#F5EAD8','#DCCAB4','#C8B49C'],
            },
            {
              name: 'Deep Renewal Face Cream',
              desc: '72-hour hydration. Clinically proven.',
              price: '$52',
              rating: '4.8', reviews: '876',
              badge: 'New Formula',
              badgeColor: '#8B6E4E',
              bottleColor: ['#E8D4C4','#D4C0B0','#C0AC9C'],
            },
            {
              name: 'Botanical Clarifying Mask',
              desc: 'Draws out impurities without stripping',
              price: '$36',
              rating: '4.9', reviews: '632',
              badge: null,
              badgeColor: '',
              bottleColor: ['#D8E8D4','#C4D4C0','#B0C0AC'],
            },
          ].map((p) => (
            <div key={p.name} style={{
              background: 'white',
              borderRadius: 6, overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              cursor: 'pointer',
            }}>
              {/* Product image area */}
              <div style={{
                height: 200,
                background: `linear-gradient(145deg,${p.bottleColor[0]} 0%,${p.bottleColor[1]} 60%,${p.bottleColor[2]} 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {p.badge && (
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    background: p.badgeColor, color: 'white',
                    fontSize: 9, padding: '4px 8px', borderRadius: 3,
                    fontWeight: 700, letterSpacing: '0.06em',
                    fontFamily: 'DM Sans, system-ui, sans-serif',
                  }}>{p.badge}</div>
                )}
                {/* Mini bottle */}
                <BottleArt scale={0.8} />
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{
                  fontSize: 14, fontWeight: 500, color: '#1C1C1C',
                  marginBottom: 4, fontFamily: 'DM Sans, system-ui, sans-serif',
                }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(28,28,28,0.45)', marginBottom: 10, lineHeight: 1.4 }}>{p.desc}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ fontSize: 11.5, color: '#8B6E4E' }}>
                    ★ {p.rating} <span style={{ color: 'rgba(28,28,28,0.35)' }}>({p.reviews})</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1C', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{p.price}</div>
                </div>
                <div style={{
                  background: '#1C1C1C', color: '#FDFAF6',
                  textAlign: 'center', padding: '11px',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  borderRadius: 3, cursor: 'pointer',
                  fontFamily: 'DM Sans, system-ui, sans-serif',
                }}>ADD TO CART</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding: '72px 48px', background: '#F5F0E8' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'DM Sans, system-ui, sans-serif' }}>Social Proof</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 44, fontWeight: 700, color: '#1C1C1C', letterSpacing: '-0.02em' }}>
            Real results, real customers
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 14 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C8A97A', fontSize: 18 }}>★</span>)}
            <span style={{ marginLeft: 10, fontSize: 14, color: 'rgba(28,28,28,0.5)' }}>4.9 average from 2,847 reviews</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {[
            {
              name: 'Sarah M.', location: 'New York, NY',
              initials: 'SM', color: '#C8A97A',
              text: '"I have struggled with hyperpigmentation for 6 years. Within 3 weeks of using the Vitamin C Serum, my dark spots faded noticeably. This is the first product that has actually delivered on its promises."',
              product: 'Vitamin C Brightening Serum',
              date: '2 weeks ago',
            },
            {
              name: 'Alexandra K.', location: 'Los Angeles, CA',
              initials: 'AK', color: '#4A7C6F',
              text: '"The texture of my skin has completely transformed. The renewal cream absorbs instantly and my skin holds moisture all day — something I couldn\'t say about products 3× the price."',
              product: 'Deep Renewal Face Cream',
              date: '1 month ago',
            },
            {
              name: 'Michelle T.', location: 'London, UK',
              initials: 'MT', color: '#8B9E7C',
              text: '"As someone with sensitive skin, I am usually cautious about new products. Solène\'s botanical mask is incredibly gentle yet genuinely effective. My pores look visibly smaller after just 4 uses."',
              product: 'Botanical Clarifying Mask',
              date: '3 weeks ago',
            },
          ].map((r) => (
            <div key={r.name} style={{
              background: 'white', borderRadius: 6, padding: '24px',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', gap: 1, marginBottom: 14 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C8A97A', fontSize: 13 }}>★</span>)}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(28,28,28,0.7)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>{r.text}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: r.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, color: 'white', fontWeight: 700,
                  }}>{r.initials}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#1C1C1C', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{r.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(28,28,28,0.38)' }}>{r.location}</div>
                  </div>
                </div>
                <div style={{
                  background: 'rgba(74,124,111,0.08)', color: '#4A7C6F',
                  fontSize: 9, padding: '3px 7px', borderRadius: 3,
                  fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 600,
                  letterSpacing: '0.04em',
                }}>✓ Verified</div>
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: 10, color: 'rgba(28,28,28,0.35)' }}>{r.product} · {r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Ingredients / The Science ─── */}
      <div style={{ padding: '72px 48px', background: '#FDFAF6' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'DM Sans, system-ui, sans-serif' }}>The Science</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 44, fontWeight: 700, color: '#1C1C1C', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Ingredients that<br /><em style={{ fontStyle: 'italic', color: '#4A7C6F' }}>actually work</em>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(28,28,28,0.5)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            Every formula is backed by peer-reviewed research. No fillers. No fragrance. Just active botanicals at clinical concentrations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[
            {
              name: 'Vitamin C (L-Ascorbic Acid)',
              concentration: '15%',
              benefit: 'Brightens skin, fades dark spots, stimulates collagen synthesis. Visible results in 14 days.',
              icon: '◉',
              color: '#C8A97A',
              bgGrad: 'linear-gradient(145deg,#FDF6EC,#F5E8D4)',
            },
            {
              name: 'Hyaluronic Acid',
              concentration: '2%',
              benefit: 'Holds 1000× its weight in water. Plumps skin and fills fine lines. Multi-molecular for deep penetration.',
              icon: '◈',
              color: '#4A7C6F',
              bgGrad: 'linear-gradient(145deg,#EDF6F3,#D8EBE6)',
            },
            {
              name: 'Niacinamide (B3)',
              concentration: '10%',
              benefit: 'Minimises pores, strengthens skin barrier, reduces redness. Works at any age, any skin type.',
              icon: '◇',
              color: '#8B9E7C',
              bgGrad: 'linear-gradient(145deg,#F2F6ED,#E2EBD8)',
            },
            {
              name: 'Bakuchiol',
              concentration: '1%',
              benefit: 'Plant-based retinol alternative. Boosts cell turnover without irritation. Safe during pregnancy.',
              icon: '❋',
              color: '#C4956A',
              bgGrad: 'linear-gradient(145deg,#F8F0E8,#EEDDC8)',
            },
          ].map(ing => (
            <div key={ing.name} style={{
              background: 'white',
              borderRadius: 8, overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                background: ing.bgGrad,
                height: 100,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{ fontSize: 36, color: ing.color, opacity: 0.5 }}>{ing.icon}</span>
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)',
                  borderRadius: 4, padding: '4px 8px',
                  fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
                  color: ing.color, fontWeight: 700,
                }}>{ing.concentration}</div>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{
                  fontSize: 14, fontWeight: 600, color: '#1C1C1C',
                  marginBottom: 6, fontFamily: 'DM Sans, system-ui, sans-serif',
                }}>{ing.name}</div>
                <p style={{
                  fontSize: 12, color: 'rgba(28,28,28,0.5)',
                  lineHeight: 1.55, margin: 0,
                }}>{ing.benefit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 40, alignItems: 'center' }}>
          {['Dermatologist Tested', 'Cruelty-Free Certified', 'EWG Verified', 'Climate Neutral'].map(cert => (
            <div key={cert} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(74,124,111,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, color: '#4A7C6F' }}>✓</span>
              </div>
              <span style={{ fontSize: 12, color: 'rgba(28,28,28,0.55)', fontFamily: 'DM Sans, system-ui, sans-serif', letterSpacing: '0.02em' }}>{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Before & After Results ─── */}
      <div style={{ padding: '72px 48px', background: '#F5F0E8' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'DM Sans, system-ui, sans-serif' }}>Clinical Results</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 44, fontWeight: 700, color: '#1C1C1C', letterSpacing: '-0.02em' }}>
            Real skin. Real results.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            {
              name: 'Jessica R.',
              age: '34',
              concern: 'Hyperpigmentation',
              product: 'Vitamin C Serum',
              duration: '6 weeks',
              result: '72% reduction in dark spots',
              beforeGrad: 'linear-gradient(135deg,#D4B8A0,#C4A48C,#B89478)',
              afterGrad: 'linear-gradient(135deg,#F0DEC8,#E8D4BC,#E0C8B0)',
            },
            {
              name: 'Amanda L.',
              age: '28',
              concern: 'Dehydration & fine lines',
              product: 'Deep Renewal Cream',
              duration: '4 weeks',
              result: '89% improvement in hydration',
              beforeGrad: 'linear-gradient(135deg,#D8C4B4,#C8B0A0,#BCA490)',
              afterGrad: 'linear-gradient(135deg,#F5E8DA,#EEE0D0,#E8D8C8)',
            },
            {
              name: 'Priya M.',
              age: '41',
              concern: 'Enlarged pores',
              product: 'Botanical Mask',
              duration: '8 weeks',
              result: '58% visible pore reduction',
              beforeGrad: 'linear-gradient(135deg,#D0BCA8,#C0A894,#B49C88)',
              afterGrad: 'linear-gradient(135deg,#F2E4D4,#ECDCC8,#E6D4BC)',
            },
          ].map(item => (
            <div key={item.name} style={{
              background: 'white', borderRadius: 8, overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
            }}>
              {/* Before/After visual */}
              <div style={{ display: 'flex', height: 120 }}>
                <div style={{ flex: 1, background: item.beforeGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: 10, fontFamily: 'DM Sans, system-ui, sans-serif', color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.08em' }}>BEFORE</span>
                </div>
                <div style={{ width: 2, background: 'white' }} />
                <div style={{ flex: 1, background: item.afterGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: 10, fontFamily: 'DM Sans, system-ui, sans-serif', color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: '0.08em' }}>AFTER</span>
                </div>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1C', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{item.name}, {item.age}</div>
                    <div style={{ fontSize: 11, color: 'rgba(28,28,28,0.4)', marginTop: 2 }}>Concern: {item.concern}</div>
                  </div>
                  <div style={{ background: 'rgba(74,124,111,0.08)', color: '#4A7C6F', fontSize: 9, padding: '3px 8px', borderRadius: 3, fontWeight: 600, fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                    {item.duration}
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#4A7C6F', fontFamily: 'Cormorant Garamond, Georgia, serif', marginBottom: 4 }}>
                  {item.result}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(28,28,28,0.4)' }}>
                  Using: {item.product}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32, fontSize: 12, color: 'rgba(28,28,28,0.4)', fontStyle: 'italic' }}>
          Individual results may vary. Clinical study conducted with 120 participants over 8 weeks.
        </div>
      </div>

      {/* ─── Brand Philosophy ─── */}
      <div style={{
        padding: '72px 48px',
        background: '#0E0E0E',
        display: 'flex', gap: 64, alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'rgba(200,169,122,0.6)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, fontFamily: 'DM Sans, system-ui, sans-serif' }}>Our Philosophy</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 48, fontWeight: 700, color: '#F5F2ED', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 24 }}>
            Botanical.<br />Sustainable.<br /><em style={{ fontStyle: 'italic', color: '#4A7C6F' }}>Effective.</em>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(245,242,237,0.5)', lineHeight: 1.65, marginBottom: 24, maxWidth: 420 }}>
            We believe skincare should be honest. Every ingredient earns its place through clinical evidence, not marketing trends. We source from regenerative farms, use 100% recyclable packaging, and never test on animals.
          </p>
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { number: '40+', label: 'Botanical\ningredients' },
              { number: '100%', label: 'Recyclable\npackaging' },
              { number: '0', label: 'Synthetic\nfragrances' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 32, fontWeight: 700, color: '#C8A97A', lineHeight: 1 }}>{stat.number}</div>
                <div style={{ fontSize: 11, color: 'rgba(245,242,237,0.35)', lineHeight: 1.4, marginTop: 4, whiteSpace: 'pre-line', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Visual - botanical art */}
        <div style={{
          width: 320, height: 320, flexShrink: 0,
          borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(74,124,111,0.15) 0%, rgba(200,169,122,0.1) 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative botanical circles */}
          <div style={{ position: 'absolute', top: 30, left: 30, width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(74,124,111,0.2)' }} />
          <div style={{ position: 'absolute', bottom: 40, right: 40, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(200,169,122,0.15)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 60, borderRadius: '50% 50% 50% 0', background: 'rgba(74,124,111,0.12)', border: '1px solid rgba(74,124,111,0.2)', rotate: '-45deg' }} />
          <LargeBottleArt />
        </div>
      </div>

      {/* ─── Instagram / Community ─── */}
      <div style={{ padding: '72px 48px', background: '#FDFAF6' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 11, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: 'DM Sans, system-ui, sans-serif' }}>Community</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 44, fontWeight: 700, color: '#1C1C1C', letterSpacing: '-0.02em', marginBottom: 8 }}>
            #MySoleneGlow
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(28,28,28,0.5)', maxWidth: 400, margin: '0 auto' }}>
            Join 14,000+ customers sharing their skin transformation journey.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 4, borderRadius: 8, overflow: 'hidden' }}>
          {[
            { grad: 'linear-gradient(135deg,#F5E8D4,#E8D4BC)', icon: '🌿', label: '@sarah.m' },
            { grad: 'linear-gradient(145deg,#E8DCD0,#D8C8B8)', icon: '✨', label: '@alexandra.k' },
            { grad: 'linear-gradient(155deg,#F0E4D4,#E0D0C0)', icon: '🪴', label: '@priya.m' },
            { grad: 'linear-gradient(125deg,#EAE0D0,#DAD0C0)', icon: '💧', label: '@jessica.r' },
            { grad: 'linear-gradient(135deg,#F2E6D8,#E4D6C4)', icon: '🌸', label: '@amanda.l' },
            { grad: 'linear-gradient(140deg,#E6DCD0,#D6C8B8)', icon: '🧴', label: '@michelle.t' },
            { grad: 'linear-gradient(130deg,#F0E2D2,#E2D2C0)', icon: '✦', label: '@emma.w' },
            { grad: 'linear-gradient(150deg,#ECD8C8,#DCC8B4)', icon: '🍃', label: '@nina.c' },
            { grad: 'linear-gradient(145deg,#F4EAD8,#E6DAC4)', icon: '💛', label: '@lisa.h' },
            { grad: 'linear-gradient(135deg,#E8E0D4,#DAD0C0)', icon: '🌱', label: '@rachel.p' },
          ].map((post, i) => (
            <div key={i} style={{
              height: 110, background: post.grad,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 6, cursor: 'pointer',
              position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ fontSize: 24, filter: 'grayscale(0.2)' }}>{post.icon}</span>
              <span style={{ fontSize: 10, color: 'rgba(28,28,28,0.4)', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 500 }}>{post.label}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(28,28,28,0.15)',
            padding: '11px 24px', borderRadius: 3,
            fontSize: 12, color: 'rgba(28,28,28,0.6)',
            letterSpacing: '0.04em', cursor: 'pointer',
            fontFamily: 'DM Sans, system-ui, sans-serif',
          }}>
            Follow @solenebotanics on Instagram →
          </div>
        </div>
      </div>

      {/* Email capture */}
      <div style={{
        padding: '72px 48px',
        background: 'linear-gradient(135deg,#F5F0E8 0%,#EDE8DE 100%)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12, fontFamily: 'DM Sans, system-ui, sans-serif' }}>Personalised Skincare</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 44, fontWeight: 700, color: '#1C1C1C', letterSpacing: '-0.02em', marginBottom: 14 }}>
          Find your perfect routine
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(28,28,28,0.5)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
          Answer 5 questions. Get a personalised botanical skincare routine built around your skin.
        </p>
        <div style={{
          background: '#1C1C1C', color: '#FDFAF6',
          display: 'inline-block',
          padding: '14px 32px', borderRadius: 3,
          fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer',
          fontFamily: 'DM Sans, system-ui, sans-serif',
        }}>TAKE THE SKIN QUIZ →</div>
        <div style={{ marginTop: 14, fontSize: 11, color: 'rgba(28,28,28,0.35)' }}>2 minutes · No email required to start</div>
      </div>

      {/* ─── Footer ─── */}
      <footer style={{
        padding: '56px 48px 32px',
        background: '#111111',
        color: 'rgba(245,242,237,0.5)',
        fontFamily: 'DM Sans, system-ui, sans-serif',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 28, fontStyle: 'italic', color: '#F5F2ED', fontWeight: 500, marginBottom: 14, letterSpacing: '0.06em' }}>Solène</div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(245,242,237,0.4)', maxWidth: 260, marginBottom: 20 }}>
              Results-driven botanical skincare. Clinically tested formulations that deliver visible change.
            </p>
            <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C8A97A', fontSize: 13 }}>★</span>)}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(245,242,237,0.35)' }}>4.9 average · 2,847 reviews</div>
          </div>
          {/* Shop */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(245,242,237,0.6)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Shop</div>
            {['Bestsellers', 'New Arrivals', 'Serums & Treatments', 'Moisturisers', 'Masks & Exfoliants', 'Gift Sets', 'Bundles & Save'].map(link => (
              <div key={link} style={{ fontSize: 13, color: 'rgba(245,242,237,0.35)', padding: '5px 0', cursor: 'pointer' }}>{link}</div>
            ))}
          </div>
          {/* Company */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(245,242,237,0.6)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Company</div>
            {['Our Story', 'Ingredients Glossary', 'Sustainability', 'Clinical Studies', 'Press', 'Careers', 'Contact Us'].map(link => (
              <div key={link} style={{ fontSize: 13, color: 'rgba(245,242,237,0.35)', padding: '5px 0', cursor: 'pointer' }}>{link}</div>
            ))}
          </div>
          {/* Support */}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(245,242,237,0.6)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Support</div>
            {['Shipping & Returns', 'Track Your Order', 'Skin Quiz', 'FAQ', 'Rewards Programme'].map(link => (
              <div key={link} style={{ fontSize: 13, color: 'rgba(245,242,237,0.35)', padding: '5px 0', cursor: 'pointer' }}>{link}</div>
            ))}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, color: 'rgba(245,242,237,0.6)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Newsletter</div>
              <div style={{ display: 'flex', gap: 0 }}>
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', borderRadius: '3px 0 0 3px', padding: '8px 12px', fontSize: 12, color: 'rgba(245,242,237,0.3)' }}>
                  Your email
                </div>
                <div style={{ background: '#4A7C6F', color: 'white', padding: '8px 14px', borderRadius: '0 3px 3px 0', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer' }}>
                  JOIN
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: 'rgba(245,242,237,0.25)' }}>© 2024 Solène Botanics. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Do Not Sell My Info'].map(link => (
              <span key={link} style={{ fontSize: 11, color: 'rgba(245,242,237,0.2)', cursor: 'pointer' }}>{link}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {['Visa', 'MC', 'Amex', 'PayPal'].map(card => (
              <div key={card} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2, padding: '2px 6px',
                fontSize: 9, color: 'rgba(245,242,237,0.3)', fontFamily: 'JetBrains Mono, monospace',
              }}>{card}</div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Expanded Design Modal ────────────────────────────────────────────────────
function ExpandedDesignModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(10px)',
        }}
      />

      {/* Browser window */}
      <motion.div
        initial={{ scale: 0.7, y: 60, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.85, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.9 }}
        style={{
          position: 'relative',
          width: '100%', maxWidth: 1100,
          height: 'calc(100vh - 40px)',
          maxHeight: 820,
          background: '#1C1C1E',
          borderRadius: 12,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)',
        }}
      >
        {/* Glow effect on top */}
        <div style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
          background: 'linear-gradient(to right,transparent,rgba(74,124,111,0.6),transparent)',
          pointerEvents: 'none', zIndex: 2,
        }} />

        <ModalBrowserChrome onClose={onClose} />

        {/* Website content */}
        <div style={{ flex: 1, overflow: 'auto', background: '#FDFAF6' }}>
          <FullSoleneWebsite />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Phase: Before ───────────────────────────────────────────────────────────
function PhaseBefore() {
  return (
    <div style={{
      background: '#F0F0EE', fontFamily: 'system-ui, -apple-system, sans-serif',
      height: '100%', overflow: 'hidden',
    }}>
      {/* Cookie banner */}
      <div style={{
        background: 'rgba(20,20,20,0.93)', color: 'white',
        padding: '7px 14px 7px 10px',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 7.5, borderBottom: '1px solid #333',
      }}>
        <span style={{ flex: 1, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3 }}>🍪 We use cookies to enhance your experience. By continuing you agree to our cookie policy.</span>
        <div style={{ background: '#4A7C6F', color: 'white', padding: '3px 8px', borderRadius: 2, fontSize: 7, flexShrink: 0, fontWeight: 700 }}>ACCEPT</div>
        <div style={{ border: '1px solid #444', color: '#999', padding: '3px 8px', borderRadius: 2, fontSize: 7, flexShrink: 0 }}>Decline</div>
      </div>

      {/* Announcement bar */}
      <div style={{
        background: '#1D3D1D', color: 'rgba(255,255,255,0.76)',
        textAlign: 'center', fontSize: 7.5, padding: '5px 0',
        letterSpacing: '0.07em', fontWeight: 500,
      }}>
        FREE SHIPPING ON ORDERS OVER $75 &nbsp;·&nbsp; USE CODE: NATURAL10
      </div>

      {/* Nav - too many items */}
      <div style={{
        background: 'white', borderBottom: '1px solid #E2E2E2',
        padding: '0 14px', height: 38,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', gap: 10, color: '#999', fontSize: 8 }}>
          {['Collections', 'Bestsellers', 'About', 'Blog', 'FAQ', 'Contact', 'Press'].map(l => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontWeight: 900, color: '#1D3D1D', fontSize: 11,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>SOLÈNE BOTANICS</div>
        <div style={{ display: 'flex', gap: 8, color: '#999', fontSize: 8 }}>
          <span>Search</span><span>|</span><span>Account</span><span>|</span><span>Cart (0)</span>
        </div>
      </div>

      {/* Hero — generic, weak */}
      <div style={{
        background: 'linear-gradient(175deg,#D2EAC8 0%,#BDDAB2 100%)',
        height: 132, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 6, textAlign: 'center', padding: '0 28px',
        borderBottom: '1px solid #B4D0AA',
        position: 'relative',
      }}>
        {/* Stock photo placeholder */}
        <div style={{
          position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
          width: 48, height: 64,
          background: 'linear-gradient(145deg,#A8C8A0,#90B488)',
          borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.4)',
          opacity: 0.6,
        }}>
          <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)' }}>PHOTO</span>
        </div>
        <div style={{ fontSize: 17, fontWeight: 900, color: '#163216', letterSpacing: '-0.01em' }}>
          Welcome to Solène Botanics
        </div>
        <div style={{ fontSize: 9, color: '#3D5E3D', lineHeight: 1.45, maxWidth: 265 }}>
          Discover our range of natural botanical skincare products, crafted with the finest ingredients from around the world.
        </div>
        <div style={{ background: '#163216', color: 'white', padding: '5px 18px', fontSize: 8.5, letterSpacing: '0.08em', fontWeight: 700, marginTop: 2 }}>
          SHOP ALL PRODUCTS
        </div>
      </div>

      {/* Product grid — no trust signals, no reviews */}
      <div style={{ padding: '10px 14px', background: '#F0F0EE' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#163216', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Featured Products</span>
          <span style={{ fontSize: 8, color: '#999', textDecoration: 'underline' }}>View all →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
          {[
            { name: 'Vitamin C Brightening Serum', price: '$48.00', tag: 'BEST SELLER' },
            { name: 'Deep Cleansing Botanical Mask', price: '$36.00', tag: null },
            { name: 'Daily Renewal Face Cream', price: '$52.00', tag: 'NEW' },
            { name: 'Rose Water Toner', price: '$29.00', tag: null },
          ].map(p => (
            <div key={p.name} style={{ background: 'white', border: '1px solid #DEDEDE', borderRadius: 1 }}>
              <div style={{
                background: '#C6D8BF', height: 56,
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
              }}>
                {p.tag && (
                  <div style={{ position: 'absolute', top: 3, left: 3, background: '#163216', color: 'white', fontSize: 6, padding: '2px 4px', fontWeight: 700 }}>{p.tag}</div>
                )}
                <span style={{ color: '#8AA685', fontSize: 7 }}>[ Image ]</span>
              </div>
              <div style={{ padding: '4px 6px' }}>
                <div style={{ fontSize: 7.5, color: '#222', lineHeight: 1.3, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 8, fontWeight: 600, color: '#163216', marginBottom: 3 }}>{p.price}</div>
                <div style={{ background: '#F5F5F5', border: '1px solid #D0D0D0', textAlign: 'center', padding: '2.5px 0', fontSize: 6.5, color: '#444', letterSpacing: '0.04em', fontWeight: 600 }}>ADD TO CART</div>
              </div>
            </div>
          ))}
        </div>

        {/* No social proof at all — generic about block */}
        <div style={{ marginTop: 10, padding: '8px 10px', background: '#EBEBEB', borderRadius: 2, fontSize: 8, color: '#888', textAlign: 'center', lineHeight: 1.4 }}>
          About Us · We are a passionate team of skincare experts dedicated to bringing you the finest botanical ingredients sourced from sustainable farms worldwide...
        </div>
      </div>
    </div>
  );
}

// ─── Phase: Audit ─────────────────────────────────────────────────────────
function PhaseAudit() {
  const annotations = [
    {
      top: '0%', left: '0%', width: '100%', height: '6.5%',
      color: 'rgba(168,85,247,0.1)', border: '1.5px solid #A855F7',
      label: 'Cookie banner on load → blocks 14% of viewport on mobile',
      labelColor: '#A855F7', pos: 'bottom' as const, impact: '−4% CR',
    },
    {
      top: '12%', left: '0%', width: '70%', height: '6.5%',
      color: 'rgba(239,68,68,0.1)', border: '1.5px solid #EF4444',
      label: '7 nav items → decision paralysis, no clear primary action',
      labelColor: '#EF4444', pos: 'bottom' as const, impact: '−8% CR',
    },
    {
      top: '19%', left: '0%', width: '100%', height: '26%',
      color: 'rgba(239,68,68,0.08)', border: '1.5px solid #EF4444',
      label: '"Welcome to" hero → zero differentiation, no outcome promise, no buyer signal',
      labelColor: '#EF4444', pos: 'bottom' as const, impact: '−22% CR',
    },
    {
      top: '46%', left: '0%', width: '100%', height: '48%',
      color: 'rgba(251,146,60,0.06)', border: '1.5px dashed #FB923C',
      label: 'Zero social proof anywhere — no reviews, no ratings, no testimonials',
      labelColor: '#FB923C', pos: 'top' as const, impact: '−14% CR',
    },
  ];

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
      <PhaseBefore />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.04)', pointerEvents: 'none' }} />

      {annotations.map((ann, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', top: ann.top, left: ann.left,
            width: ann.width, height: ann.height,
            background: ann.color, border: ann.border, borderRadius: 2,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.28 + 0.15, duration: 0.28 }}
        >
          <motion.div
            style={{
              position: 'absolute',
              [ann.pos === 'bottom' ? 'top' : 'bottom']: 'calc(100% + 4px)',
              left: 0,
              background: '#0E0E0E', color: '#F5F2ED',
              fontSize: 7.5, padding: '3px 8px', borderRadius: 2,
              whiteSpace: 'nowrap', fontFamily: 'DM Sans, system-ui, sans-serif',
              fontWeight: 500, zIndex: 10,
              boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
            initial={{ opacity: 0, y: ann.pos === 'bottom' ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.28 + 0.38, duration: 0.2 }}
          >
            <span style={{ color: ann.labelColor }}>⚠</span>
            <span>{ann.label}</span>
            <span style={{ background: 'rgba(239,68,68,0.18)', color: '#EF4444', padding: '1px 5px', borderRadius: 2, fontSize: 6.5, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, flexShrink: 0 }}>{ann.impact}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* CR badge */}
      <motion.div
        style={{
          position: 'absolute', top: 7, right: 7,
          background: '#DC2626', color: 'white',
          fontSize: 7, padding: '3px 8px', borderRadius: 3,
          fontFamily: 'JetBrains Mono, monospace', fontWeight: 600,
          letterSpacing: '0.04em', boxShadow: '0 2px 12px rgba(220,38,38,0.5)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12, type: 'spring', stiffness: 400, damping: 20 }}
      >
        CR: 0.8% · INDUSTRY: 2.5% · POTENTIAL LOSS: ~$44K/mo
      </motion.div>

      {/* Mobile callout */}
      <motion.div
        style={{
          position: 'absolute', bottom: 8, right: 7,
          background: 'rgba(14,14,14,0.94)', color: '#FB923C',
          fontSize: 7.5, padding: '6px 9px', borderRadius: 4,
          fontFamily: 'JetBrains Mono, monospace', fontWeight: 500,
          letterSpacing: '0.02em', lineHeight: 1.5,
          border: '1px solid rgba(251,146,60,0.18)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      >
        📱 Mobile checkout: 4 steps<br />
        <span style={{ color: '#EF4444' }}>74% abandon at step 2</span><br />
        <span style={{ color: 'rgba(251,146,60,0.5)', fontSize: 6.5 }}>Est. revenue leak: $12,400/mo</span>
      </motion.div>

      {/* Issues summary */}
      <motion.div
        style={{
          position: 'absolute', top: 7, left: 7,
          background: 'rgba(14,14,14,0.92)', color: '#F5F2ED',
          fontSize: 7.5, padding: '6px 9px', borderRadius: 4,
          fontFamily: 'JetBrains Mono, monospace',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.3 }}
      >
        <div style={{ color: 'rgba(245,242,237,0.4)', fontSize: 6.5, marginBottom: 3, letterSpacing: '0.08em' }}>// AUDIT SUMMARY</div>
        <div style={{ color: '#EF4444' }}>CRITICAL: 4 issues found</div>
        <div style={{ color: '#FB923C' }}>HIGH: 2 further friction points</div>
        <div style={{ color: '#FEBC2E' }}>MEDIUM: 6 UX improvements</div>
      </motion.div>
    </div>
  );
}

// ─── Phase: Architecture (Wireframe) ──────────────────────────────────────
function PhaseArchitecture() {
  return (
    <div style={{
      background: '#FAFAF8', padding: '8px 12px',
      height: '100%', overflow: 'hidden',
      fontFamily: 'DM Sans, system-ui, sans-serif',
    }}>
      {/* Tool header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 6, paddingBottom: 5,
        borderBottom: '1px solid #EBEBEB',
      }}>
        <span style={{ fontSize: 6.5, color: '#B0B0AC', letterSpacing: '0.08em', fontFamily: 'JetBrains Mono, monospace' }}>
          // WIREFRAME v2 · solène botanics
        </span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4A7C6F' }} />
          <span style={{ fontSize: 6, fontFamily: 'JetBrains Mono, monospace', color: '#4A7C6F', letterSpacing: '0.06em' }}>REVISED</span>
        </div>
      </div>

      {/* Nav wireframe */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: 22, border: '1px dashed #D4D4D0', borderRadius: 2,
          display: 'flex', alignItems: 'center', padding: '0 8px', gap: 6,
          background: 'rgba(0,0,0,0.012)',
          position: 'relative',
        }}
      >
        <div style={{ width: 30, height: 8, background: '#D8D8D4', borderRadius: 1 }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 18, height: 3.5, background: '#E2E2DE', borderRadius: 1 }} />
        <div style={{ width: 22, height: 3.5, background: '#E2E2DE', borderRadius: 1 }} />
        <div style={{ width: 36, height: 11, background: '#2A2A2A', borderRadius: 2 }} />
        {/* Annotation */}
        <motion.div
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          style={{
            position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%) translateX(100%)',
            fontSize: 5.5, color: '#4A7C6F', fontFamily: 'JetBrains Mono, monospace',
            whiteSpace: 'nowrap', letterSpacing: '0.04em',
          }}
        >
          ← 3 items max
        </motion.div>
      </motion.div>

      {/* Hero wireframe */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: 3,
          height: 110, border: '1px dashed #D4D4D0', borderRadius: 2,
          padding: '8px 10px', display: 'flex', gap: 10,
          background: 'rgba(74,124,111,0.02)',
          position: 'relative',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Eyebrow */}
          <div style={{ width: 44, height: 3, background: '#C8A97A', borderRadius: 1, marginBottom: 7, opacity: 0.5 }} />
          {/* H1 lines */}
          <div style={{ width: '88%', height: 7, background: '#C8C8C4', borderRadius: 1, marginBottom: 4 }} />
          <div style={{ width: '55%', height: 7, background: '#C8C8C4', borderRadius: 1, marginBottom: 8 }} />
          {/* Body text */}
          <div style={{ width: '78%', height: 3, background: '#DCDCD8', borderRadius: 1, marginBottom: 2.5 }} />
          <div style={{ width: '62%', height: 3, background: '#DCDCD8', borderRadius: 1, marginBottom: 7 }} />
          {/* Stars */}
          <div style={{ display: 'flex', gap: 1.5, marginBottom: 6, alignItems: 'center' }}>
            {[...Array(5)].map((_, i) => <div key={i} style={{ width: 5, height: 5, background: '#C8A97A', borderRadius: 1, opacity: 0.6 }} />)}
            <div style={{ width: 40, height: 3, background: '#DCDCD8', borderRadius: 1, marginLeft: 4 }} />
          </div>
          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 56, height: 13, background: '#2A2A2A', borderRadius: 2 }} />
            <div style={{ width: 42, height: 13, border: '1px solid #C8C8C4', borderRadius: 2 }} />
          </div>
        </div>
        {/* Product placeholder */}
        <div style={{
          width: 48, alignSelf: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        }}>
          <div style={{ width: 10, height: 4, background: '#D8D8D4', borderRadius: 1 }} />
          <div style={{ width: 4, height: 6, background: '#D8D8D4' }} />
          <div style={{ width: 26, height: 4, background: '#D0D0CC', borderRadius: 1 }} />
          <div style={{ width: 26, height: 54, background: '#E6E4DE', borderRadius: 2, border: '1px dashed #D0D0CC' }} />
        </div>
        {/* Section label */}
        <div style={{ position: 'absolute', top: 3, left: 4, fontSize: 5, color: '#B0B0AC', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          HERO — conversion claim + social proof
        </div>
      </motion.div>

      {/* Trust bar wireframe */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: 3,
          height: 16, background: '#2A2A2A', borderRadius: 1,
          display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
        }}
      >
        {[1,2,3,4].map(i => (
          <div key={i} style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <div style={{ width: 4, height: 4, background: 'rgba(200,169,122,0.35)', borderRadius: 1 }} />
            <div style={{ width: 26, height: 2.5, background: 'rgba(255,255,255,0.12)', borderRadius: 1 }} />
          </div>
        ))}
      </motion.div>

      {/* Products wireframe - 3 cards */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: 4, position: 'relative' }}
      >
        <div style={{ position: 'absolute', top: -1, left: 0, fontSize: 5, color: '#B0B0AC', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          PRODUCTS — image + benefits + CTA
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginTop: 8 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ border: '1px dashed #D4D4D0', borderRadius: 2, overflow: 'hidden' }}>
              {/* Product image area */}
              <div style={{ height: 38, background: '#EAEAE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 14, height: 30, background: '#DCDBDA', borderRadius: 1.5, border: '1px dashed #CDCDCA' }} />
              </div>
              {/* Details */}
              <div style={{ padding: '4px 5px' }}>
                <div style={{ width: '82%', height: 3, background: '#D4D4D0', borderRadius: 1, marginBottom: 3 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', gap: 1 }}>
                    {[...Array(5)].map((_, j) => <div key={j} style={{ width: 3.5, height: 3.5, background: '#C8A97A', borderRadius: 0.5, opacity: 0.5 }} />)}
                  </div>
                  <div style={{ width: 14, height: 3, background: '#BBBBB6', borderRadius: 1 }} />
                </div>
                <div style={{ height: 10, background: '#2A2A2A', borderRadius: 1.5 }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Social proof wireframe */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: 6, position: 'relative' }}
      >
        <div style={{ position: 'absolute', top: -1, left: 0, fontSize: 5, color: '#B0B0AC', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          SOCIAL PROOF — verified reviews
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, marginTop: 8 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ border: '1px dashed #D4D4D0', borderRadius: 2, padding: '5px 6px', background: 'rgba(0,0,0,0.008)' }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: 1, marginBottom: 4 }}>
                {[...Array(5)].map((_, j) => <div key={j} style={{ width: 3.5, height: 3.5, background: '#C8A97A', borderRadius: 0.5, opacity: 0.5 }} />)}
              </div>
              {/* Review text lines */}
              <div style={{ width: '100%', height: 2.5, background: '#E0E0DC', borderRadius: 1, marginBottom: 2 }} />
              <div style={{ width: '90%', height: 2.5, background: '#E0E0DC', borderRadius: 1, marginBottom: 2 }} />
              <div style={{ width: '65%', height: 2.5, background: '#E0E0DC', borderRadius: 1, marginBottom: 4 }} />
              {/* Reviewer */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#D8D8D4' }} />
                <div>
                  <div style={{ width: 22, height: 2.5, background: '#CCCCC8', borderRadius: 1, marginBottom: 2 }} />
                  <div style={{ width: 16, height: 2, background: '#E0E0DC', borderRadius: 1 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Email capture wireframe */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: 6,
          border: '1px dashed #D4D4D0', borderRadius: 2,
          padding: '6px 8px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          background: 'rgba(0,0,0,0.008)',
        }}
      >
        <div style={{ width: 50, height: 3, background: '#D4D4D0', borderRadius: 1 }} />
        <div style={{ width: 70, height: 4, background: '#C8C8C4', borderRadius: 1 }} />
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 60, height: 12, border: '1px solid #D4D4D0', borderRadius: 2 }} />
          <div style={{ width: 40, height: 12, background: '#2A2A2A', borderRadius: 2 }} />
        </div>
      </motion.div>

      {/* Flow arrows on the left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        style={{
          position: 'absolute', top: 32, left: 3, bottom: 10,
          width: 1, background: 'rgba(74,124,111,0.15)',
        }}
      />
    </div>
  );
}

// ─── Phase: Design (Component Design) ────────────────────────────────────
function PhaseDesign() {
  return (
    <div style={{ background: '#FDFAF6', height: '100%', overflow: 'hidden', position: 'relative' }}>
      {/* Nav — styled */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.06 }}
        style={{
          padding: '0 18px', height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0,0,0,0.05)', background: '#FDFAF6',
        }}
      >
        <div style={{ display: 'flex', gap: 16, fontSize: 9, color: 'rgba(28,28,28,0.4)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>
          <span>Shop</span><span>Our Story</span>
        </div>
        <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 17, color: '#1C1C1C', fontWeight: 500, letterSpacing: '0.07em', fontStyle: 'italic' }}>Solène</span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: 'rgba(28,28,28,0.4)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>Search</span>
          <div style={{ background: '#1C1C1C', color: '#FDFAF6', padding: '4px 11px', borderRadius: 2, fontSize: 7.5, letterSpacing: '0.07em', fontWeight: 700, fontFamily: 'DM Sans, system-ui, sans-serif' }}>SHOP</div>
        </div>
      </motion.div>

      {/* Hero — styled */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }}
        style={{
          background: 'linear-gradient(128deg,#F6EEE1 0%,#EDE0CF 55%,#E4D3BC 100%)',
          padding: '16px 18px 13px', display: 'flex', gap: 14, alignItems: 'center',
        }}
      >
        <div style={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }}
            style={{ fontSize: 7, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 7, fontFamily: 'DM Sans, system-ui, sans-serif' }}
          >Botanical Skincare · Est. 2019</motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 25, color: '#1C1C1C', lineHeight: 1.0, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 9 }}
          >
            Skin that actually<br />
            <em style={{ fontStyle: 'italic', color: '#4A7C6F' }}>changes.</em>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
            style={{ fontSize: 8.5, color: 'rgba(28,28,28,0.5)', lineHeight: 1.5, marginBottom: 10, maxWidth: 180, fontFamily: 'system-ui, sans-serif' }}
          >Results-driven formulations. No fillers. No promises we cannot keep.</motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }}
            style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10 }}
          >
            <div style={{ display: 'flex', gap: 1 }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C8A97A', fontSize: 10 }}>★</span>)}
            </div>
            <span style={{ fontSize: 8, color: 'rgba(28,28,28,0.46)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>4.9 · 2,847 verified reviews</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}
            style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          >
            <div style={{ background: '#1C1C1C', color: '#FDFAF6', padding: '6px 14px', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 2, fontFamily: 'DM Sans, system-ui, sans-serif' }}>SHOP BESTSELLERS</div>
            <div style={{ border: '1px solid rgba(28,28,28,0.18)', color: 'rgba(28,28,28,0.5)', padding: '5px 10px', fontSize: 7.5, borderRadius: 2, fontFamily: 'DM Sans, system-ui, sans-serif' }}>Skin quiz →</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.26, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 88, flexShrink: 0 }}
        >
          <BottleArt scale={1} />
        </motion.div>
      </motion.div>

      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ background: '#1C1C1C', padding: '6px 18px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}
      >
        {['✓ Free shipping $65+', '✓ 30-day returns', '✓ Clinically tested'].map(t => (
          <div key={t} style={{ fontSize: 7.5, color: 'rgba(245,242,237,0.55)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{t}</div>
        ))}
      </motion.div>

      {/* Products */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}
        style={{ padding: '10px 18px' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 7 }}>
          {[
            { name: 'Vitamin C Serum', rating: '4.9', reviews: '1,240', price: '$48', badge: '#1 Seller', bg: ['#F5EAD8','#DCCAB4'] },
            { name: 'Renewal Face Cream', rating: '4.8', reviews: '876', price: '$52', badge: null, bg: ['#E8D4C4','#D4C0B0'] },
            { name: 'Botanical Mask', rating: '4.9', reviews: '632', price: '$36', badge: null, bg: ['#D8E8D4','#C4D4C0'] },
          ].map(p => (
            <div key={p.name} style={{ background: 'white', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ background: `linear-gradient(145deg,${p.bg[0]},${p.bg[1]})`, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                {p.badge && <div style={{ position: 'absolute', top: 3, left: 3, background: '#4A7C6F', color: 'white', fontSize: 6, padding: '2px 4px', borderRadius: 2, fontWeight: 700, fontFamily: 'DM Sans, system-ui, sans-serif' }}>{p.badge}</div>}
                <BottleArt scale={0.4} />
              </div>
              <div style={{ padding: '5px 7px' }}>
                <div style={{ fontSize: 8, color: '#1C1C1C', fontWeight: 500, marginBottom: 2, fontFamily: 'DM Sans, system-ui, sans-serif' }}>{p.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                  <div style={{ fontSize: 7, color: '#8B6E4E' }}>★ {p.rating} ({p.reviews})</div>
                  <div style={{ fontSize: 8, fontWeight: 700, color: '#1C1C1C', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{p.price}</div>
                </div>
                <div style={{ background: '#1C1C1C', color: '#FDFAF6', textAlign: 'center', padding: '3px 0', fontSize: 7, letterSpacing: '0.07em', fontWeight: 600, borderRadius: 2, fontFamily: 'DM Sans, system-ui, sans-serif' }}>ADD TO CART</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ─── Floating Design System Panel ─── */}
      <motion.div
        initial={{ opacity: 0, x: 16, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 8, right: 8,
          background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(16px)',
          borderRadius: 7, padding: '9px 11px',
          width: 130,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.55)',
          zIndex: 20,
        }}
      >
        {/* Header */}
        <div style={{ fontSize: 6, color: 'rgba(245,242,237,0.3)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', marginBottom: 7, textTransform: 'uppercase' }}>Design System</div>

        {/* Colors */}
        <div style={{ fontSize: 6, color: 'rgba(245,242,237,0.25)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', marginBottom: 4 }}>COLOURS</div>
        <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
          {[
            { color: '#1C1C1C', label: 'Ink' },
            { color: '#4A7C6F', label: 'Sage' },
            { color: '#C8A97A', label: 'Gold' },
            { color: '#8B6E4E', label: 'Walnut' },
            { color: '#FDFAF6', label: 'Cream' },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.55 + i * 0.06, type: 'spring', stiffness: 400, damping: 18 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
            >
              <div style={{
                width: 16, height: 16, borderRadius: 3,
                background: c.color,
                border: c.color === '#FDFAF6' ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
              }} />
              <span style={{ fontSize: 4.5, color: 'rgba(245,242,237,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>{c.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Typography */}
        <div style={{ fontSize: 6, color: 'rgba(245,242,237,0.25)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', marginBottom: 4 }}>TYPOGRAPHY</div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ marginBottom: 3 }}
        >
          <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 10, color: '#F5F2ED', fontStyle: 'italic', fontWeight: 500 }}>Cormorant</span>
          <span style={{ fontSize: 5, color: 'rgba(245,242,237,0.2)', fontFamily: 'JetBrains Mono, monospace', marginLeft: 4 }}>Display</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.98 }}
          style={{ marginBottom: 8 }}
        >
          <span style={{ fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: 8, color: 'rgba(245,242,237,0.7)', fontWeight: 500 }}>DM Sans</span>
          <span style={{ fontSize: 5, color: 'rgba(245,242,237,0.2)', fontFamily: 'JetBrains Mono, monospace', marginLeft: 4 }}>Body</span>
        </motion.div>

        {/* Components */}
        <div style={{ fontSize: 6, color: 'rgba(245,242,237,0.25)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', marginBottom: 4 }}>COMPONENTS</div>
        {[
          { name: 'Navigation', done: true },
          { name: 'Hero module', done: true },
          { name: 'Trust bar', done: true },
          { name: 'Product cards', done: true },
          { name: 'Social proof', done: false },
          { name: 'CTA sections', done: false },
        ].map((comp, i) => (
          <motion.div
            key={comp.name}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05 + i * 0.07, duration: 0.25 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '2px 0',
              fontSize: 6.5, fontFamily: 'DM Sans, system-ui, sans-serif',
              color: comp.done ? 'rgba(245,242,237,0.5)' : 'rgba(245,242,237,0.2)',
            }}
          >
            <span style={{ color: comp.done ? '#4A7C6F' : 'rgba(245,242,237,0.15)', fontSize: 7 }}>{comp.done ? '✓' : '○'}</span>
            <span>{comp.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}


// ─── Phase: After ─────────────────────────────────────────────────────────────
function PhaseAfter({ onOpenModal }: { onOpenModal: () => void }) {
  const metrics = [
    { label: 'Conversion rate', before: '0.8%', after: '3.2%', delta: '+300%' },
    { label: 'Revenue / visitor', before: '$0.38', after: '$1.56', delta: '+4.1×' },
    { label: 'Mobile abandon', before: '74%', after: '29%', delta: '−61%' },
    { label: 'Avg. order value', before: '$47', after: '$60', delta: '+28%' },
  ];

  return (
    <div
      style={{ background: '#FDFAF6', height: '100%', overflow: 'hidden', position: 'relative', cursor: 'zoom-in' }}
      onClick={onOpenModal}
    >
      {/* Nav */}
      <div style={{ padding: '0 18px', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: 16, fontSize: 9, color: 'rgba(28,28,28,0.4)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>
          <span>Shop</span><span>Our Story</span>
        </div>
        <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 17, color: '#1C1C1C', fontWeight: 500, letterSpacing: '0.07em', fontStyle: 'italic' }}>Solène</span>
        <div style={{ background: '#1C1C1C', color: '#FDFAF6', padding: '4px 11px', borderRadius: 2, fontSize: 7.5, letterSpacing: '0.07em', fontWeight: 700, fontFamily: 'DM Sans, system-ui, sans-serif' }}>SHOP</div>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(128deg,#F6EEE1 0%,#EDE0CF 55%,#E4D3BC 100%)', padding: '14px 18px 11px', display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 7, color: '#8B6E4E', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 7, fontFamily: 'DM Sans, system-ui, sans-serif' }}>Botanical Skincare</div>
          <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 22, color: '#1C1C1C', lineHeight: 1.0, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
            Skin that actually<br />
            <em style={{ fontStyle: 'italic', color: '#4A7C6F' }}>changes.</em>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
            <div style={{ display: 'flex' }}>{[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C8A97A', fontSize: 9 }}>★</span>)}</div>
            <span style={{ fontSize: 7.5, color: 'rgba(28,28,28,0.46)', fontFamily: 'system-ui, sans-serif' }}>4.9 · 2,847 reviews</span>
          </div>
          <div style={{ background: '#1C1C1C', color: '#FDFAF6', padding: '5.5px 13px', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 2, display: 'inline-block', fontFamily: 'DM Sans, system-ui, sans-serif' }}>SHOP BESTSELLERS</div>
        </div>
        <div style={{ width: 72, flexShrink: 0 }}>
          <BottleArt scale={0.84} />
        </div>
      </div>

      {/* Trust bar */}
      <div style={{ background: '#1C1C1C', padding: '5.5px 18px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
        {['✓ Free shipping', '✓ 30-day returns', '✓ Clinically tested'].map(t => (
          <div key={t} style={{ fontSize: 7, color: 'rgba(245,242,237,0.5)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{t}</div>
        ))}
      </div>

      {/* Products strip */}
      <div style={{ padding: '8px 18px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {[
            { name: 'Vitamin C Serum', price: '$48', bg: ['#F5EAD8','#DCCAB4'] },
            { name: 'Renewal Cream', price: '$52', bg: ['#E8D4C4','#D4C0B0'] },
            { name: 'Botanical Mask', price: '$36', bg: ['#D8E8D4','#C4D4C0'] },
          ].map(p => (
            <div key={p.name} style={{ background: 'white', borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ background: `linear-gradient(145deg,${p.bg[0]},${p.bg[1]})`, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BottleArt scale={0.34} />
              </div>
              <div style={{ padding: '4px 6px' }}>
                <div style={{ fontSize: 7.5, color: '#1C1C1C', fontWeight: 500, marginBottom: 3, fontFamily: 'DM Sans, system-ui, sans-serif' }}>{p.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 6.5, color: '#8B6E4E' }}>★ 4.9</span>
                  <span style={{ fontSize: 7.5, fontWeight: 700, color: '#1C1C1C', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{p.price}</span>
                </div>
                <div style={{ background: '#1C1C1C', color: '#FDFAF6', textAlign: 'center', padding: '2.5px', fontSize: 6.5, fontWeight: 700, letterSpacing: '0.06em', borderRadius: 2, fontFamily: 'DM Sans, system-ui, sans-serif' }}>ADD TO CART</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics panel */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', bottom: 10, right: 10,
          background: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(16px)',
          borderRadius: 7, padding: '10px 12px',
          border: '1px solid rgba(255,255,255,0.07)',
          width: 192,
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7, paddingBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: 7, color: 'rgba(245,242,237,0.32)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>60-day results</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#28C840' }}
            />
            <span style={{ fontSize: 7, color: '#28C840', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, letterSpacing: '0.06em' }}>LIVE</span>
          </div>
        </div>
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09 + 0.5, duration: 0.3 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4.5px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}
          >
            <span style={{ fontSize: 7.5, color: 'rgba(245,242,237,0.4)', fontFamily: 'DM Sans, system-ui, sans-serif' }}>{m.label}</span>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <span style={{ fontSize: 7, color: 'rgba(245,242,237,0.16)', textDecoration: 'line-through', fontFamily: 'JetBrains Mono, monospace' }}>{m.before}</span>
              <span style={{ fontSize: 8.5, color: '#4A7C6F', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{m.after}</span>
              <span style={{ fontSize: 6.5, color: '#28C840', background: 'rgba(40,200,64,0.1)', padding: '1px 3.5px', borderRadius: 2, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{m.delta}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Click to expand hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          position: 'absolute', bottom: 10, left: 10,
          background: 'rgba(74,124,111,0.14)',
          border: '1px solid rgba(74,124,111,0.35)',
          borderRadius: 5, padding: '5px 9px',
          display: 'flex', alignItems: 'center', gap: 5,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#4A7C6F' }}
        />
        <span style={{ fontSize: 7.5, color: '#4A7C6F', fontFamily: 'DM Sans, system-ui, sans-serif', fontWeight: 600, letterSpacing: '0.04em' }}>Click to view full site ↗</span>
      </motion.div>

      {/* Live badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          position: 'absolute', top: 44, right: 9,
          background: 'rgba(40,200,64,0.09)',
          border: '1px solid rgba(40,200,64,0.22)',
          color: '#28C840', fontSize: 7, padding: '3px 7px', borderRadius: 3,
          fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, letterSpacing: '0.06em',
          display: 'flex', alignItems: 'center', gap: 4,
        }}
      >
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#28C840' }} />
        LIVE · SHOPIFY
      </motion.div>
    </div>
  );
}

// ─── Mockup Content ───────────────────────────────────────────────────────────
function MockupContent({ phase, onOpenModal }: { phase: PhaseId; onOpenModal: () => void }) {
  const map: Record<PhaseId, React.ReactElement> = {
    before: <PhaseBefore />,
    audit: <PhaseAudit />,
    architecture: <PhaseArchitecture />,
    design: <PhaseDesign />,
    after: <PhaseAfter onOpenModal={onOpenModal} />,
  };
  return <>{map[phase]}</>;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ animKey, isPaused }: { animKey: number; isPaused: boolean }) {
  return (
    <div className="transformation-progress-track">
      <div
        key={animKey}
        className="transformation-progress-fill"
        style={{ animation: isPaused ? 'none' : `progressFill ${PHASE_DURATION}ms linear forwards` }}
      />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function TransformationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activePhase = PHASE_IDS[activeIndex];
  const activeData = phases[activeIndex];

  const goToIndex = (idx: number) => {
    setActiveIndex(idx);
    setAnimKey((k) => k + 1);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (!inView || isPaused || isModalOpen) return;
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % PHASE_IDS.length);
      setAnimKey((k) => k + 1);
    }, PHASE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [inView, isPaused, activeIndex, isModalOpen]);

  return (
    <>
      <section
        className="section section-dark transformation-section"
        id="transformation"
        ref={sectionRef}
      >
        <div className="container-wide">
          {/* Header */}
          <div className="transformation-header">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow">A Real Transformation</span>
              <h2 className="section-headline section-headline-light transformation-headline">
                From traffic that doesn&apos;t convert —{' '}
                <em style={{ fontStyle: 'italic', color: 'var(--color-sand)' }}>
                  to a site that finally earns it
                </em>
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.65, color: 'rgba(245,242,237,0.55)', maxWidth: 640, marginTop: -8 }}>
                Solène Botanics. 28,000 monthly visitors. 0.8% converting. The traffic was there — the site was not earning it. Here is what changed, and what the numbers looked like 60 days later.
              </p>
            </motion.div>
          </div>

          {/* Main layout */}
          <div className="transformation-layout">
            {/* Phase tabs */}
            <motion.div
              className="transformation-phases"
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {phases.map((phase, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={phase.id}
                    className={`transformation-phase-tab ${isActive ? 'active' : ''}`}
                    onClick={() => goToIndex(idx)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <span className="phase-tab-number">{phase.number}</span>
                    <div>
                      <div className="phase-tab-label">{phase.label}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: isActive ? 'rgba(200,169,122,0.6)' : 'rgba(245,242,237,0.24)', letterSpacing: '0.05em', marginTop: 2, transition: 'color 200ms ease' }}>
                        {phase.sublabel}
                      </div>
                    </div>
                    {isActive && (
                      <motion.div
                        className="phase-tab-indicator"
                        layoutId="phaseIndicator"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* Browser mockup */}
            <motion.div
              className="transformation-browser-wrap"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{
                boxShadow: activePhase === 'after'
                  ? '0 0 0 1.5px rgba(74,124,111,0.3), 0 32px 80px rgba(0,0,0,0.5)'
                  : '0 32px 80px rgba(0,0,0,0.4)',
                transition: 'box-shadow 0.5s ease',
              }}
            >
              <ProgressBar animKey={animKey} isPaused={isPaused} />
              <BrowserChrome phase={activePhase} clickable={activePhase === 'after'} />

              <div
                className="transformation-browser-content"
                style={{ height: 506 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase}
                    style={{ position: 'absolute', inset: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MockupContent phase={activePhase} onOpenModal={() => setIsModalOpen(true)} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Description panel */}
            <motion.div
              className="transformation-description"
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="transformation-desc-number">{activeData.number}</div>
                  <h3 className="transformation-desc-headline">{activeData.headline}</h3>
                  <p className="transformation-desc-body">{activeData.description}</p>

                  {activePhase === 'after' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                    >
                      <div style={{ marginTop: 20, padding: '16px 18px', background: 'rgba(74,124,111,0.08)', border: '1px solid rgba(74,124,111,0.2)', borderRadius: 4 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: 'var(--color-sage)', lineHeight: 1, marginBottom: 4 }}>4.1×</div>
                        <div style={{ fontFamily: 'var(--font-headline)', fontSize: 13, color: 'rgba(245,242,237,0.6)', lineHeight: 1.4 }}>revenue per visitor — same traffic, same ad spend, different site.</div>
                      </div>

                      <motion.button
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.35 }}
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          marginTop: 14,
                          width: '100%',
                          background: 'transparent',
                          border: '1px solid rgba(74,124,111,0.4)',
                          borderRadius: 4, padding: '11px 18px',
                          color: '#4A7C6F',
                          fontSize: 12, fontFamily: 'var(--font-headline)',
                          fontWeight: 600, letterSpacing: '0.06em',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          gap: 8, transition: 'background 0.2s ease, border-color 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(74,124,111,0.08)';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(74,124,111,0.7)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(74,124,111,0.4)';
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <rect x="0.5" y="0.5" width="8" height="8" rx="1.5" stroke="#4A7C6F" strokeWidth="1"/>
                          <path d="M9 4h3.5M12.5 4L12.5 12.5H4" stroke="#4A7C6F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        View the full live site →
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="transformation-dots">
                {phases.map((_, idx) => (
                  <button
                    key={idx}
                    className={`transformation-dot ${idx === activeIndex ? 'active' : ''}`}
                    onClick={() => goToIndex(idx)}
                    aria-label={`Go to phase ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modal — rendered via portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <ExpandedDesignModal onClose={() => setIsModalOpen(false)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
