import { useEffect, useState } from 'react';
import { usePixelGrid } from './hooks/usePixelGrid';
import { PixelBoard } from './components/PixelBoard';
import { Palette } from './components/Palette';
import { MerchPreview } from './components/MerchPreview';
import { BackgroundLayer } from './components/BackgroundLayer';
import { Loader2 } from 'lucide-react';

function App() {
  const { grid, paintPixel, selectedColor, setSelectedColor, clearGrid, loading } = usePixelGrid();
  const randomUserCount = () => Math.floor(800 + Math.random() * 400);
  const [liveUsers, setLiveUsers] = useState<number>(() => randomUserCount());

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(randomUserCount());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-emerald-500/30">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50 pointer-events-none"></div>
      
      {/* Cyber Character Decoration (Bottom Left) */}
      <img 
        src="/cyber-char.png" 
        alt="Cyber Character" 
        className="fixed bottom-0 left-0 w-64 z-0 pointer-events-none opacity-90 bg-dino" 
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Trae Logo Decoration (Top Right) */}
      <img 
        src="/trae-color.png" 
        alt="Trae Logo" 
        className="fixed top-6 right-6 w-32 z-0 pointer-events-none opacity-80 bg-cloud" 
      />

      {/* Dino Decoration (Top Left) */}
      <img 
        src="/dino.png" 
        alt="Retro Dino" 
        className="fixed top-24 left-10 w-24 z-0 pointer-events-none opacity-60 bg-dino" 
        style={{ imageRendering: 'pixelated' }}
      />
      
      <BackgroundLayer />

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between pointer-events-none">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-black tracking-tighter font-mono">
              TRAE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">PLACE</span>
            </h1>
            <span className="inline-flex items-center gap-2 text-xs font-semibold font-mono tracking-[0.25em] text-emerald-300 px-4 py-1 rounded-full border border-emerald-400/50 bg-emerald-400/10">
              🟢 LIVE: {liveUsers.toLocaleString()}
            </span>
          </div>
          <p className="text-zinc-500 text-xs font-mono">REAL-TIME COLLABORATIVE CANVAS</p>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="z-10 flex flex-col items-center justify-center gap-8 flex-1 w-full pointer-events-none">
        <div className="pointer-events-auto">
          {loading ? (
            <div className="flex flex-col items-center gap-4 text-zinc-500">
              <Loader2 className="animate-spin w-8 h-8" />
              <span className="font-mono text-sm">CONNECTING TO SATELLITE...</span>
            </div>
          ) : (
            <PixelBoard grid={grid} onPaint={paintPixel} selectedColor={selectedColor} />
          )}
        </div>
      </main>

      {/* Controls */}
      <Palette 
        selectedColor={selectedColor} 
        onSelectColor={setSelectedColor} 
        onClear={clearGrid} 
      />

      {/* Merch Integration */}
      <MerchPreview />
      
    </div>
  );
}

export default App;
