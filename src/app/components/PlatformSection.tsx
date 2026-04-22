import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

const platforms = [
  {
    name: 'Custom Code',
    tag: 'React \u00b7 Next.js \u00b7 TypeScript',
    accent: '#4A7C6F',
    forWho: 'Maximum performance, pixel-perfect control, scales with the business.',
    capabilities: [
      'Sub-second load times',
      'Bespoke interactions',
      'API integrations',
      'Total design freedom',
    ],
    visual: (
      <div style={{
        background: '#0E0E0E', borderRadius: 6, padding: 14, height: 180,
        fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#28C840' }} />
        </div>
        <div style={{ fontSize: 8, lineHeight: 1.8, color: 'rgba(245,242,237,0.5)' }}>
          <span style={{ color: '#C792EA' }}>import</span>{' '}
          <span style={{ color: '#82AAFF' }}>{'{ Hero }'}</span>{' '}
          <span style={{ color: '#C792EA' }}>from</span>{' '}
          <span style={{ color: '#C3E88D' }}>&apos;@/components&apos;</span>
          <br />
          <span style={{ color: '#C792EA' }}>import</span>{' '}
          <span style={{ color: '#82AAFF' }}>{'{ Analytics }'}</span>{' '}
          <span style={{ color: '#C792EA' }}>from</span>{' '}
          <span style={{ color: '#C3E88D' }}>&apos;@/lib/tracking&apos;</span>
          <br /><br />
          <span style={{ color: '#C792EA' }}>export default</span>{' '}
          <span style={{ color: '#82AAFF' }}>function</span>{' '}
          <span style={{ color: '#FFCB6B' }}>Page</span>
          <span style={{ color: 'rgba(245,242,237,0.3)' }}>() {'{'}</span>
          <br />
          {'  '}<span style={{ color: '#C792EA' }}>return</span>{' '}
          <span style={{ color: 'rgba(245,242,237,0.3)' }}>{'('}</span>
          <br />
          {'    '}<span style={{ color: '#89DDFF' }}>{'<'}</span>
          <span style={{ color: '#F07178' }}>Hero</span>
          <br />
          {'      '}<span style={{ color: '#C792EA' }}>conversion</span>
          <span style={{ color: 'rgba(245,242,237,0.3)' }}>=</span>
          <span style={{ color: '#C3E88D' }}>&quot;optimized&quot;</span>
          <br />
          {'      '}<span style={{ color: '#C792EA' }}>tracking</span>
          <span style={{ color: 'rgba(245,242,237,0.3)' }}>=</span>
          <span style={{ color: '#89DDFF' }}>{'{'}</span>
          <span style={{ color: '#82AAFF' }}>Analytics</span>
          <span style={{ color: '#89DDFF' }}>{'}'}</span>
          <br />
          {'    '}<span style={{ color: '#89DDFF' }}>{'/>'}</span>
        </div>
      </div>
    ),
  },
  {
    name: 'WordPress',
    tag: 'Custom theme \u00b7 ACF \u00b7 Block editor',
    accent: '#21759B',
    forWho: 'Teams who manage their own content \u2014 blogs, pages, case studies \u2014 without code.',
    capabilities: [
      'Full CMS from day one',
      'Familiar editing interface',
      'Proven integrations',
      'Owned infrastructure',
    ],
    visual: (
      <div style={{
        background: '#0E0E0E', borderRadius: 6, padding: '24px 20px', height: 180,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14,
        fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden',
      }}>
        <div style={{ fontSize: 9, color: '#21759B', letterSpacing: '0.1em' }}>
          // ARCHITECTURE: WORDPRESS
        </div>
        <div style={{ fontSize: 13, color: 'rgba(245,242,237,0.9)', fontFamily: 'var(--font-headline)' }}>
          Headless / Decoupled CMS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ borderLeft: '2px solid rgba(33,117,155,0.4)', paddingLeft: 10 }}>
            <div style={{ fontSize: 7, color: 'rgba(245,242,237,0.4)', marginBottom: 4, letterSpacing: '0.06em' }}>DATA LAYER</div>
            <div style={{ fontSize: 9, color: 'rgba(245,242,237,0.7)' }}>ACF PRO + Block Editor</div>
          </div>
          <div style={{ borderLeft: '2px solid rgba(33,117,155,0.4)', paddingLeft: 10 }}>
            <div style={{ fontSize: 7, color: 'rgba(245,242,237,0.4)', marginBottom: 4, letterSpacing: '0.06em' }}>API ROUTES</div>
            <div style={{ fontSize: 9, color: 'rgba(245,242,237,0.7)' }}>Next.js Static Export</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Webflow',
    tag: 'Visual dev \u00b7 CMS \u00b7 Hosting',
    accent: '#4353FF',
    forWho: 'Marketing teams who want visual editing power \u2014 no developer queue.',
    capabilities: [
      'Visual editing on live site',
      'Powerful CMS collections',
      'Native animations',
      'Global CDN hosting',
    ],
    visual: (
      <div style={{
        background: '#0E0E0E', borderRadius: 6, padding: '24px 20px', height: 180,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14,
        fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden',
      }}>
        <div style={{ fontSize: 9, color: '#4353FF', letterSpacing: '0.1em' }}>
          // PLATFORM: WEBFLOW
        </div>
        <div style={{ fontSize: 13, color: 'rgba(245,242,237,0.9)', fontFamily: 'var(--font-headline)' }}>
          Visual Native Engine
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ borderLeft: '2px solid rgba(67,83,255,0.4)', paddingLeft: 10 }}>
            <div style={{ fontSize: 7, color: 'rgba(245,242,237,0.4)', marginBottom: 4, letterSpacing: '0.06em' }}>DOM / STYLES</div>
            <div style={{ fontSize: 9, color: 'rgba(245,242,237,0.7)' }}>Semantic HTML5 + CSS</div>
          </div>
          <div style={{ borderLeft: '2px solid rgba(67,83,255,0.4)', paddingLeft: 10 }}>
            <div style={{ fontSize: 7, color: 'rgba(245,242,237,0.4)', marginBottom: 4, letterSpacing: '0.06em' }}>HOSTING</div>
            <div style={{ fontSize: 9, color: 'rgba(245,242,237,0.7)' }}>AWS / Fastly CDN</div>
          </div>
        </div>
      </div>
    ),
  },
];

export function PlatformSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section className="section section-mist" id="platforms">
      <div className="container-wide" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 640, marginBottom: 72 }}
        >
          <span className="eyebrow">Implementation</span>
          <h2 className="section-headline">
            Built in the platform
            <br />
            your team will use.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24, marginBottom: 48 }}>
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: 'var(--color-warm-white)',
                border: '1px solid rgba(14,14,14,0.08)',
                borderRadius: 6, overflow: 'hidden',
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                transform: hoveredIdx === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hoveredIdx === i ? '0 24px 64px rgba(0,0,0,0.08)' : 'none',
                position: 'relative',
              }}
            >
              {/* Visual mockup */}
              <div style={{ padding: 12, paddingBottom: 0 }}>
                {platform.visual}
              </div>

              {/* Content */}
              <div style={{ padding: '24px 28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-headline)', fontSize: 20, fontWeight: 600,
                    color: 'var(--color-off-black)',
                  }}>
                    {platform.name}
                  </h3>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: 'rgba(14,14,14,0.35)', letterSpacing: '0.04em',
                  }}>
                    {platform.tag}
                  </span>
                </div>

                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55,
                  color: 'rgba(14,14,14,0.6)', marginBottom: 16,
                }}>
                  {platform.forWho}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {platform.capabilities.map(cap => (
                    <div key={cap} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M20 6L9 17L4 12" stroke={platform.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{
                        fontFamily: 'var(--font-headline)', fontSize: 13, fontWeight: 500,
                        color: 'rgba(14,14,14,0.7)',
                      }}>
                        {cap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
                background: platform.accent, opacity: 0.6,
              }} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 15,
            color: 'rgba(14,14,14,0.45)', textAlign: 'center',
          }}
        >
          Not sure which is right?{' '}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontSize: 15,
              color: 'var(--color-sage)', textDecoration: 'underline',
              textUnderlineOffset: 3, textDecorationColor: 'rgba(74,124,111,0.4)',
            }}
          >
            We&apos;ll recommend one based on your team.
          </button>
        </motion.p>
      </div>
    </section>
  );
}