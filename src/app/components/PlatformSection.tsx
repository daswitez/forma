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
        background: '#F0F0F0', borderRadius: 6, overflow: 'hidden', height: 180,
        fontFamily: 'DM Sans, sans-serif',
      }}>
        {/* WP admin bar */}
        <div style={{
          background: '#23282D', padding: '5px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)' }}>Dashboard</span>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Pages</span>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Posts</span>
          </div>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>Howdy, Admin</span>
        </div>
        {/* Editor area */}
        <div style={{ padding: 10, display: 'flex', gap: 8, height: 'calc(100% - 28px)' }}>
          {/* Sidebar */}
          <div style={{ width: 50, background: '#fff', borderRadius: 3, padding: '6px 4px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Pages', 'Posts', 'Media', 'Forms'].map(item => (
              <div key={item} style={{
                fontSize: 7, padding: '3px 4px', borderRadius: 2,
                background: item === 'Pages' ? 'rgba(33,117,155,0.08)' : 'transparent',
                fontWeight: item === 'Pages' ? 600 : 400,
                color: item === 'Pages' ? '#21759B' : '#666',
              }}>
                {item}
              </div>
            ))}
          </div>
          {/* Content area */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 3, padding: 8 }}>
            <div style={{ fontSize: 7, color: '#999', letterSpacing: '0.05em', marginBottom: 4 }}>EDITING: HOMEPAGE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ height: 24, borderRadius: 2, background: '#E8F4FD', border: '1px dashed #21759B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 7, color: '#21759B' }}>Hero Block</span>
              </div>
              <div style={{ height: 16, borderRadius: 2, background: '#F5F5F5', border: '1px dashed #DDD' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                <div style={{ height: 14, borderRadius: 2, background: '#F5F5F5', border: '1px dashed #DDD' }} />
                <div style={{ height: 14, borderRadius: 2, background: '#F5F5F5', border: '1px dashed #DDD' }} />
              </div>
              <div style={{
                height: 18, borderRadius: 2, background: '#21759B', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 6.5, color: 'white', fontWeight: 600 }}>UPDATE</span>
              </div>
            </div>
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
        background: '#1E1E1E', borderRadius: 6, overflow: 'hidden', height: 180,
        fontFamily: 'DM Sans, sans-serif',
      }}>
        {/* Webflow toolbar */}
        <div style={{
          background: '#2C2C2C', padding: '5px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 16, height: 16, borderRadius: 3, background: '#4353FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontSize: 8, fontWeight: 700 }}>W</span>
            </div>
            <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>Designer</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['960', '768', '480'].map(bp => (
              <div key={bp} style={{
                fontSize: 7, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)',
                padding: '2px 5px', borderRadius: 2,
              }}>{bp}</div>
            ))}
          </div>
          <div style={{
            background: '#4353FF', color: 'white', fontSize: 7, padding: '3px 8px',
            borderRadius: 3, fontWeight: 600,
          }}>Publish</div>
        </div>
        {/* Canvas */}
        <div style={{ padding: 8, display: 'flex', gap: 6 }}>
          {/* Layers panel */}
          <div style={{ width: 55, padding: '4px' }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Layers</div>
            {['Section', '  Container', '    Heading', '    Grid', '      Card 1', '      Card 2'].map((l, i) => (
              <div key={i} style={{
                fontSize: 6.5, color: i === 2 ? '#4353FF' : 'rgba(255,255,255,0.35)',
                padding: '2px 0', fontFamily: 'JetBrains Mono, monospace',
                background: i === 2 ? 'rgba(67,83,255,0.1)' : 'transparent',
                borderRadius: 2,
              }}>{l}</div>
            ))}
          </div>
          {/* Visual canvas */}
          <div style={{ flex: 1, background: '#FAFAFA', borderRadius: 3, padding: 6 }}>
            <div style={{ height: 28, borderRadius: 2, background: 'linear-gradient(135deg, #4353FF22, #4353FF08)', border: '2px solid #4353FF', marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 8, color: '#333', fontWeight: 600 }}>Hero Section</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              {[1, 2].map(n => (
                <div key={n} style={{ height: 32, background: '#F0F0F0', borderRadius: 2, border: '1px dashed #DDD' }} />
              ))}
            </div>
          </div>
          {/* Style panel */}
          <div style={{ width: 55, padding: '4px' }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Styles</div>
            {['Font', 'Color', 'Spacing', 'Layout'].map(s => (
              <div key={s} style={{
                fontSize: 6.5, color: 'rgba(255,255,255,0.3)', padding: '2px 0',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>{s}</span>
                <div style={{ width: 16, height: 6, borderRadius: 2, background: 'rgba(255,255,255,0.08)' }} />
              </div>
            ))}
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