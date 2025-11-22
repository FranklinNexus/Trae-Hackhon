import React from 'react';
import { DecoItem } from './DecoItem';
import { clsx } from 'clsx';

// Pixel Art Utilities
const renderPixelArt = (grid: number[][], colorClass: string, scale = 4) => (
  <div 
    className="grid gap-[1px]"
    style={{ 
      gridTemplateColumns: `repeat(${grid[0].length}, ${scale}px)`,
    }}
  >
    {grid.flat().map((cell, i) => (
      <div 
        key={i}
        style={{ width: scale, height: scale }}
        className={clsx(
          cell ? colorClass : 'bg-transparent'
        )}
      />
    ))}
  </div>
);

const DINO_GRID = [
  [0,0,0,0,0,1,1,1,1,1,0],
  [0,0,0,0,1,1,1,1,1,1,1],
  [0,0,0,0,1,1,1,1,1,1,1],
  [0,0,0,0,1,1,1,1,1,0,0],
  [0,0,0,0,1,1,1,1,1,0,0],
  [0,0,0,0,1,1,1,1,1,0,0],
  [1,0,0,1,1,1,1,1,1,0,0],
  [1,1,0,1,1,1,1,1,1,0,0],
  [1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,0,0],
  [0,0,1,1,1,1,1,1,1,0,0],
  [0,0,0,1,1,0,0,1,1,0,0],
  [0,0,0,1,1,0,0,1,1,0,0]
];

const INVADER_GRID = [
  [0,0,1,0,0,0,0,0,1,0,0],
  [0,0,0,1,0,0,0,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,0,0],
  [0,1,1,0,1,1,1,0,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,1],
  [0,0,0,1,1,0,1,1,0,0,0]
];

export function BackgroundLayer() {
  return (
    <>
      {/* 1. Chrome Dino (Bottom Left) */}
      <DecoItem 
        className="bottom-12 left-12"
        opacity="opacity-10"
        size="w-auto"
        rotation="rotate-12"
        floatDelay={0}
      >
        {renderPixelArt(DINO_GRID, 'bg-white', 6)}
      </DecoItem>

      {/* 2. Space Invader (Top Right) */}
      <DecoItem 
        className="top-24 right-12"
        opacity="opacity-10"
        size="w-auto"
        rotation="-rotate-12"
        floatDelay={2}
      >
        {renderPixelArt(INVADER_GRID, 'bg-emerald-400', 6)}
      </DecoItem>

      {/* 3. Example: Large Abstract Shape or Image (Top Left) */}
      {/* If the user adds an image to /public/cloud.png, they can use src="/cloud.png" */}
      {/* Placeholder for now using CSS shape */}
      <DecoItem
        className="top-10 left-10"
        opacity="opacity-5"
        size="w-64"
        floatDelay={4}
      >
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/20 to-transparent blur-3xl" />
      </DecoItem>
    </>
  );
}



