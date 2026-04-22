import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useIsMobile } from '../hooks/useIsMobile';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'How is this different from working with a full-service agency?',
    a: "Agencies spread work across multiple specialists — a strategist who briefs a designer who hands off to a developer. Each transfer loses nuance. Here, the same person who diagnoses your positioning problem is the one who writes the copy, designs the layouts, and builds the site. No translation loss. No account manager layer. No inflated overhead. The work holds together because it was never handed off.",
  },
  {
    q: 'What does the process actually look like from our side?',
    a: "Light-touch but meaningful. The Clarity Sprint requires 2–3 focused sessions with the right people — typically the founder or marketing lead. After that, most of the work happens on our side, with structured checkpoints at key milestones. No endless revision loops, no daily standups, no wondering what's happening. You'll always know where things are.",
  },
  {
    q: 'How long does a typical project take?',
    a: "The Clarity Sprint takes 1–2 weeks. The full project — from signed brief to live site — typically delivers in 6–12 weeks, depending on scope, platform, and how quickly decisions get made on your end. We've shipped in 5 weeks when the brief was clear and the business was decisive. Timelines stretch when they're made to.",
  },
  {
    q: 'Which platform should we build on — code, WordPress, or Webflow?',
    a: "It depends on how your team works after launch. If you need maximum performance, bespoke interactions, and full technical control — custom code (React / Next.js). If your team manages content themselves and wants something familiar — WordPress with a custom theme. If your marketing team wants visual editing without a developer queue — Webflow. We'll recommend one after understanding your internal capabilities and growth plans.",
  },
  {
    q: 'Who actually does the work?',
    a: "One person — not a team of five, not a white-labelled subcontractor in a different timezone. Positioning, copy, design, and build. The same hand throughout. This is the structural reason the work holds together: there's no point where the strategic insight gets handed to someone who didn't form it.",
  },
  {
    q: 'What if we need changes after launch?',
    a: "Every project includes 30 days of post-launch support for issues and refinements. Beyond that, there are two clean paths: a documented handover so your team can manage updates independently (standard with every delivery), or an ongoing retainer if the site needs regular evolution. Full ownership transfers to you at final payment, regardless of which route you choose.",
  },
  {
    q: 'Do you sign NDAs? Who owns the final work?',
    a: "Yes to NDAs as standard — we sign before any meaningful conversation begins. Full IP ownership transfers to you at final payment: code, design files, copy, everything. There's no ongoing licensing fee, no platform dependency beyond what you've chosen, and no lock-in of any kind. The work is yours outright.",
  },
  {
    q: "What if we're not ready to commit yet?",
    a: "That's exactly what the initial conversation is for. Tell us where you are, what's on the horizon, and what feels misaligned. We'll give you an honest read on whether this is the right moment and what would make the most sense for your situation. There's no pitch, no pressure to decide, and no obligation beyond the conversation.",
  },
];

// ─── Single accordion item ────────────────────────────────────────────────────
function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  inView,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderBottom: '1px solid rgba(14,14,14,0.08)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: 24,
          padding: '24px 0', background: 'none', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
        aria-expanded={isOpen}
      >
        {/* Index + question */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flex: 1 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: isOpen ? 'var(--color-sage)' : 'rgba(14,14,14,0.5)',
            letterSpacing: '0.06em', flexShrink: 0, paddingTop: 3,
            transition: 'color 250ms ease',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{
            fontFamily: 'var(--font-headline)', fontSize: 17, fontWeight: 500,
            color: isOpen ? 'var(--color-off-black)' : 'rgba(14,14,14,0.72)',
            lineHeight: 1.35, transition: 'color 250ms ease',
          }}>
            {item.q}
          </span>
        </div>

        {/* Toggle icon */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            border: `1.5px solid ${isOpen ? 'var(--color-sage)' : 'rgba(14,14,14,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isOpen ? 'rgba(74,124,111,0.06)' : 'transparent',
            transition: 'border-color 250ms ease, background 250ms ease',
            marginTop: 2,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1V9M1 5H9" stroke={isOpen ? 'var(--color-sage)' : 'rgba(14,14,14,0.4)'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              paddingLeft: 44, paddingBottom: 28, paddingRight: 52,
            }}>
              {/* Sage left border */}
              <div style={{
                borderLeft: '2px solid rgba(74,124,111,0.25)',
                paddingLeft: 20,
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 15.5, lineHeight: 1.75,
                  color: 'rgba(14,14,14,0.62)',
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isMobile = useIsMobile();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  // Split into two columns on desktop
  const leftCol = FAQS.slice(0, 4);
  const rightCol = FAQS.slice(4);

  return (
    <section className="section section-light" id="faq">
      <div className="container-wide" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 560, marginBottom: 72 }}
        >
          <span className="eyebrow">Before You Reach Out</span>
          <h2 className="section-headline">
            Questions we hear<br />before every project.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.65,
            color: 'rgba(14,14,14,0.55)', marginTop: 16,
          }}>
            Honest answers. No pitch language.
          </p>
        </motion.div>

        {/* Accordion — 2 columns on desktop, 1 on mobile */}
        {isMobile ? (
          /* Mobile: single column, all 8 */
          <div>
            {FAQS.map((item, i) => (
              <FAQAccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                inView={inView}
              />
            ))}
          </div>
        ) : (
          /* Desktop: two columns */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 72px', alignItems: 'start' }}>
            <div>
              {leftCol.map((item, i) => (
                <FAQAccordionItem
                  key={i}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                  inView={inView}
                />
              ))}
            </div>
            <div>
              {rightCol.map((item, i) => (
                <FAQAccordionItem
                  key={i + 4}
                  item={item}
                  index={i + 4}
                  isOpen={openIndex === i + 4}
                  onToggle={() => toggle(i + 4)}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            marginTop: 64, textAlign: 'center',
            padding: '32px 40px',
            background: 'rgba(74,124,111,0.04)',
            border: '1px solid rgba(74,124,111,0.12)',
            borderRadius: 6,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6,
            color: 'rgba(14,14,14,0.5)', marginBottom: 0,
          }}>
            Something not covered here?{' '}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: 16,
                color: 'var(--color-sage)',
                textDecoration: 'underline', textUnderlineOffset: 3,
                textDecorationColor: 'rgba(74,124,111,0.4)',
                padding: 0,
              }}
            >
              Ask us directly.
            </button>
            {' '}We respond within one business day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
