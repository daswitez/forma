import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface AnimatedNumberProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function AnimatedNumber({
  to,
  from = 0,
  duration = 1800,
  prefix = '',
  suffix = '',
  decimals = 0,
  style,
  className,
}: AnimatedNumberProps) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const raw = Math.min(elapsed / duration, 1);
      // ease out quart — fast start, graceful deceleration
      const eased = 1 - Math.pow(1 - raw, 4);
      setValue(from + (to - from) * eased);
      if (raw < 1) rafRef.current = requestAnimationFrame(tick);
    };

    // slight delay so element is visible before counting
    const delay = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, 120);

    return () => {
      clearTimeout(delay);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, to, from, duration]);

  const display = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString();

  return (
    <span ref={ref} style={style} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
