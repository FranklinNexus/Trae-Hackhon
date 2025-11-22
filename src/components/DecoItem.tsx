import React from 'react';
import { clsx } from 'clsx';

interface DecoItemProps {
  src?: string; // Optional: If provided, use image. If not, we might support custom children.
  className?: string; // For positioning (top-10, left-10) and sizing
  size?: string; // e.g., 'w-32'
  floatDelay?: number; // Animation delay in seconds
  opacity?: string; // Tailwind class for opacity
  rotation?: string; // Tailwind class for rotation
  children?: React.ReactNode; // Allow rendering custom SVGs/Pixel Grids
}

export function DecoItem({ 
  src, 
  className, 
  size = 'w-32', 
  floatDelay = 0, 
  opacity = 'opacity-20',
  rotation = 'rotate-0',
  children 
}: DecoItemProps) {
  return (
    <div
      className={clsx(
        'fixed z-0 pointer-events-none select-none',
        opacity,
        rotation,
        className
      )}
      style={{
        animation: `floatPulse 6s ease-in-out infinite`,
        animationDelay: `${floatDelay}s`,
      }}
    >
      <div className={clsx(size, 'relative')}>
        {src ? (
          <img 
            src={src} 
            alt="decoration" 
            className="w-full h-auto object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
