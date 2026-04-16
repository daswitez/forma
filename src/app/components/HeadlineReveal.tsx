import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

// ─── Single word with mask-reveal clip ───────────────────────────────────────
function RevealWord({ word, delay, active }: { word: string; delay: number; active: boolean }) {
  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        paddingBottom: '0.06em', // room for descenders
      }}
    >
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '108%' }}
        animate={active ? { y: 0 } : {}}
        transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    </span>
  );
}

interface HeadlineRevealProps {
  /** HTML tag to render */
  as?: 'h1' | 'h2' | 'h3';
  /**
   * Pass each visual line as a separate array item.
   * Strings are split word-by-word; ReactNodes animate as a whole line.
   */
  lines: React.ReactNode[];
  /** Delay before the first word starts (seconds) */
  baseDelay?: number;
  /** Additional delay added per line (seconds) */
  lineDelay?: number;
  /** Additional delay added per word within a line (seconds) */
  wordDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Optionally pass the parent's useInView result to sync animations */
  inView?: boolean;
}

export function HeadlineReveal({
  as: Tag = 'h2',
  lines,
  baseDelay = 0,
  lineDelay = 0.14,
  wordDelay = 0.046,
  className,
  style,
  inView: externalInView,
}: HeadlineRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const ownInView = useInView(ref, { once: true, margin: '-50px' });
  const active = externalInView !== undefined ? externalInView : ownInView;

  // Track cumulative word count to offset delays consistently across lines
  let cumulativeWords = 0;

  return (
    // @ts-ignore – polymorphic ref is fine here
    <Tag ref={ref} className={className} style={style}>
      {lines.map((line, lineIdx) => {
        if (typeof line === 'string') {
          const words = line.split(' ').filter(Boolean);
          const lineStart = baseDelay + lineIdx * lineDelay;

          const wordEls = words.map((word, wIdx) => {
            const delay = lineStart + (cumulativeWords + wIdx) * wordDelay;
            return (
              <span key={wIdx}>
                <RevealWord word={word} delay={delay} active={active} />
                {wIdx < words.length - 1 && (
                  <span style={{ display: 'inline-block', width: '0.26em' }} aria-hidden="true" />
                )}
              </span>
            );
          });

          cumulativeWords += words.length;

          return (
            <span key={lineIdx} style={{ display: 'block' }}>
              {wordEls}
            </span>
          );
        }

        // JSX line (e.g. with <em> or other elements) — slide up as a whole line
        const delay = baseDelay + lineIdx * lineDelay + cumulativeWords * wordDelay;
        return (
          <span
            key={lineIdx}
            style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.06em' }}
          >
            <motion.span
              style={{ display: 'block' }}
              initial={{ y: '108%' }}
              animate={active ? { y: 0 } : {}}
              transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
