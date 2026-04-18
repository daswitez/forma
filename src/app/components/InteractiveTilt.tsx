"use client";

import { useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface InteractiveTiltProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  maxTilt?: number;
  lift?: number;
  scale?: number;
  radius?: number | string;
}

export function InteractiveTilt({
  children,
  className,
  style,
  disabled = false,
  maxTilt = 10,
  lift = 10,
  scale = 1.012,
  radius = 18,
}: InteractiveTiltProps) {
  const prefersReducedMotion = useReducedMotion();
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const rotateX = useSpring(useMotionValue(0), { stiffness: 170, damping: 18, mass: 0.8 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 170, damping: 18, mass: 0.8 });
  const y = useSpring(useMotionValue(0), { stiffness: 190, damping: 18, mass: 0.8 });
  const activeScale = useSpring(useMotionValue(1), { stiffness: 180, damping: 18, mass: 0.75 });

  const interactive = !disabled && !prefersReducedMotion;

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    y.set(0);
    activeScale.set(1);
    setGlare((current) => ({ ...current, opacity: 0 }));
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;

    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - py) * maxTilt * 2);
    y.set(-lift);
    activeScale.set(scale);
    setGlare({
      x: px * 100,
      y: py * 100,
      opacity: 1,
    });
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        perspective: 1400,
        transformStyle: 'preserve-3d',
        borderRadius: radius,
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      <motion.div
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          borderRadius: radius,
          overflow: 'hidden',
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          y: interactive ? y : 0,
          scale: interactive ? activeScale : 1,
        }}
      >
        {children}

        <motion.div
          aria-hidden="true"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            width: 180,
            height: 180,
            left: `calc(${glare.x}% - 90px)`,
            top: `calc(${glare.y}% - 90px)`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.1) 24%, rgba(255,255,255,0.04) 44%, transparent 72%)',
            opacity: interactive ? glare.opacity : 0,
            filter: 'blur(10px)',
          }}
        />
      </motion.div>
    </div>
  );
}
