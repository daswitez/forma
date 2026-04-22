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
  radius = 18,
}: InteractiveTiltProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        borderRadius: radius,
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
