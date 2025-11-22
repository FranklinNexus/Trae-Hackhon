import { COLORS, DEFAULT_COLOR } from '../constants';
import { Eraser, GripHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import Draggable from 'react-draggable';
import { useRef, useEffect } from 'react';

interface PaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  onClear: () => void;
}

export function Palette({ selectedColor, onSelectColor }: PaletteProps) {
  const nodeRef = useRef(null);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toLowerCase();

      if (/^[0-9]$/.test(key)) {
        const index = key === '0' ? 9 : parseInt(key) - 1;
        if (index < COLORS.length) {
          onSelectColor(COLORS[index]);
        }
      }

      if (key === 'e') {
        onSelectColor(DEFAULT_COLOR);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectColor]);

  return (
    <Draggable nodeRef={nodeRef} handle=".drag-handle" defaultPosition={{x: 0, y: 0}}>
      <div 
        ref={nodeRef} 
        className="!fixed !bottom-8 !right-8 z-[9999] glass-panel palette-panel px-3 py-3 flex flex-col gap-3 text-sm text-zinc-200 w-[160px] cursor-auto shadow-2xl bg-black/80 backdrop-blur-md border border-white/10 rounded-xl"
      >
        {/* Header / Drag Handle */}
        <div className="drag-handle flex items-center justify-between cursor-move active:cursor-grabbing group border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <GripHorizontal size={14} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
            <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-400/80 font-bold select-none">
              TOOLS
            </p>
          </div>
        </div>
          
        {/* Tools (Eraser Only) */}
        <div className="w-full">
          <button
            onClick={() => onSelectColor(DEFAULT_COLOR)}
            className={clsx(
              'w-full flex items-center justify-center gap-2 p-1.5 rounded-md border transition-all duration-200 font-bold uppercase text-[8px] tracking-wider hover:scale-105 relative overflow-hidden h-10 cursor-pointer',
              selectedColor === DEFAULT_COLOR
                ? 'border-white bg-white text-black'
                : 'border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-500 hover:text-white'
            )}
            title="Eraser (E)"
          >
            <Eraser size={14} />
            <span>Erase Signal</span>
            <span className="absolute bottom-0.5 right-1 opacity-40 font-mono text-[7px]">E</span>
          </button>
        </div>

        {/* Color Swatches - Grid Layout */}
        <div className="grid grid-cols-4 gap-1.5">
          {COLORS.map((color, index) => (
            <button
              key={color}
              onClick={(e) => {
                e.stopPropagation(); // Prevent drag events from interfering
                onSelectColor(color);
              }}
              className={clsx(
                'w-full aspect-square rounded-md transition-all duration-200 shadow-md relative group cursor-pointer',
                selectedColor === color
                  ? 'scale-110 ring-2 ring-white z-10'
                  : 'scale-100 hover:scale-110 hover:ring-1 hover:ring-white/30 opacity-90 hover:opacity-100'
              )}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            >
              {index < 10 && (
                <span className={clsx(
                  "absolute bottom-0.5 right-0.5 text-[7px] font-mono font-bold transition-colors opacity-0 group-hover:opacity-60 pointer-events-none", // Crucial: pointer-events-none
                  selectedColor === color ? "text-white opacity-80" : "text-black/50 mix-blend-difference"
                )}>
                  {index + 1 === 10 ? 0 : index + 1}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </Draggable>
  );
}
