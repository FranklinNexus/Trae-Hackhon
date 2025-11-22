import React, { useRef, useEffect, useState } from 'react';
import { GRID_SIZE } from '../constants';
import clsx from 'clsx';

interface PixelCellProps {
  color: string;
  selectedColor: string;
  index: number;
  onPaint: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  isHovered: boolean;
}

// 1. Extract & Memoize PixelCell
const PixelCell = React.memo(({ color, selectedColor, index, onPaint, onMouseEnter, onMouseLeave, isHovered }: PixelCellProps) => {
  return (
    <div
      className="relative w-full h-full cursor-crosshair pixel-cell overflow-hidden hover:ring-1 hover:ring-white/30 hover:z-10"
      onMouseDown={() => onPaint(index)}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
    >
      <div className="absolute inset-0" style={{ backgroundColor: color }} />
      <div
        className={clsx(
          'absolute inset-0 pointer-events-none transition-opacity duration-75 mix-blend-screen',
          isHovered ? 'opacity-80' : 'opacity-0'
        )}
        style={{ backgroundColor: selectedColor }}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for maximum performance
  // Only re-render if:
  // 1. The cell's own color changed
  // 2. This specific cell is being hovered or was hovered
  return (
    prevProps.color === nextProps.color &&
    prevProps.isHovered === nextProps.isHovered &&
    // Optimization: If hover state changed elsewhere, we only care if WE are the target
    // But since isHovered is passed as boolean, the above check is sufficient.
    // However, we also need to update if selectedColor changes BUT ONLY if we are hovered (for preview)
    (prevProps.isHovered ? prevProps.selectedColor === nextProps.selectedColor : true)
  );
});

interface PixelBoardProps {
  grid: string[];
  onPaint: (index: number) => void;
  selectedColor: string;
}

export function PixelBoard({ grid, onPaint, selectedColor }: PixelBoardProps) {
  const isDrawing = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      isDrawing.current = false;
      setHoveredIndex(null);
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = (index: number) => {
    isDrawing.current = true;
    onPaint(index);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    if (isDrawing.current) {
      onPaint(index);
    }
  };

  // Crucial: Prevent drag behavior on the image-like grid
  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      id="pixel-board-container"
      className="relative neon-frame shadow-2xl"
      style={{ width: 'fit-content' }}
    >
      <div
        className="grid pixel-grid bg-black"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(95vw, 80vh)', // Scale up significantly
          aspectRatio: '1/1',
        }}
        onDragStart={handleDragStart}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {grid.map((color, index) => (
          <PixelCell
            key={index}
            index={index}
            color={color}
            selectedColor={selectedColor}
            onPaint={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setHoveredIndex(null)}
            isHovered={hoveredIndex === index}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-3 rounded-2xl border border-white/5" />
    </div>
  );
}
