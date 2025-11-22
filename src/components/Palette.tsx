import { COLORS, DEFAULT_COLOR } from '../constants';
import { Eraser, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';

interface PaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  onClear: () => void;
}

export function Palette({ selectedColor, onSelectColor, onClear }: PaletteProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md p-4 rounded-xl border border-zinc-800 shadow-xl flex flex-col gap-4 max-w-[95vw]">
      
      {/* Tools */}
      <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tools</span>
        <div className="flex gap-2">
           <button
            onClick={() => onSelectColor(DEFAULT_COLOR)}
            className={clsx(
              "p-2 rounded-lg transition-all",
              selectedColor === DEFAULT_COLOR 
                ? "bg-zinc-700 text-white" 
                : "text-zinc-400 hover:bg-zinc-800"
            )}
            title="Eraser"
          >
            <Eraser size={20} />
          </button>
          <button
            onClick={onClear}
            className="p-2 rounded-lg text-red-400 hover:bg-red-900/20 transition-all"
            title="Nuke (Clear All)"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-wrap gap-2 justify-center w-full max-w-[300px]">
        {COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            className={clsx(
              "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
              selectedColor === color ? "border-white scale-110" : "border-transparent"
            )}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
    </div>
  );
}


