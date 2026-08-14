/**
 * @component RevealKit
 * @description Shared hover/interaction primitives (3D mouse-tilt cards, rotating
 *   gradient borders, magnetic buttons) originally built for the Services page —
 *   pulled out here so the rest of the site can reuse the exact same interactions
 *   instead of re-implementing lookalikes.
 * @author      Nithin K R — https://github.com/NITHINKR06
 * @license     Attribution required — see LICENSE in project root
 * @source      https://github.com/NITHINKR06/Animated_Portfolio
 */
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../hooks';

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.4);
  // The href variant styles the <Link> itself rather than nesting a <button>
  // inside the anchor — nested interactive elements are invalid HTML and read
  // as two separate controls to assistive tech.
  if (href) {
    return (
      <Link
        to={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}

/* ── 3D Tilt Card — real pointer-tracked perspective tilt, not a fixed entrance pose ── */
export function TiltCard({
  children,
  className = '',
  maxTilt = 12,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: -y * maxTilt, y: x * maxTilt });
  };

  const handleLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        // perspective() has to be part of this element's own transform — the
        // `perspective` property only applies to descendants, so setting it
        // here separately would leave the tilt below completely flat.
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated conic-gradient border — spins in on hover, not a static ring ── */
export function GradientBorder({
  children,
  className = '',
  active = false,
  radius = 'rounded-2xl',
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  /** Must match the wrapped card's corner radius, or the glow pokes out at the corners. */
  radius?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      {active && (
        <motion.div
          className={`absolute -inset-[1px] ${radius} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
          style={{
            background:
              'conic-gradient(from 0deg, rgba(255,0,0,0.42), rgba(255,248,240,0.34), rgba(255,255,255,0.28), rgba(255,0,0,0.42))',
            filter: 'blur(1px)',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {children}
    </div>
  );
}
