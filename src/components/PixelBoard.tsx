import React, { useRef, useEffect } from 'react';
import { GRID_SIZE } from '../constants';

interface PixelBoardProps {
  grid: string[];
  onPaint: (index: number) => void;
}

export function PixelBoard({ grid, onPaint }: PixelBoardProps) {
  const isDrawing = useRef(false);

  useEffect(() => {
    const handleMouseUp = () => {
      isDrawing.current = false;
    };
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = (index: number) => {
    isDrawing.current = true;
    onPaint(index);
  };

  const handleMouseEnter = (index: number) => {
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
      className="relative shadow-2xl bg-black"
      style={{ width: 'fit-content' }}
    >
      <div 
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: 'min(90vw, 500px)',
          aspectRatio: '1/1',
        }}
        onDragStart={handleDragStart}
      >
        {grid.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            className="w-full h-full cursor-crosshair"
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
          />
        ))}
      </div>
      
      {/* Grid overlay (optional guide, toggleable in future maybe) */}
      {/* Keeping it clean for now as per "bitmap image" requirement */}
    </div>
  );
}


