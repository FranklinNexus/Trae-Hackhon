import { usePixelGrid } from './hooks/usePixelGrid';
import { PixelBoard } from './components/PixelBoard';
import { Palette } from './components/Palette';
import { MerchPreview } from './components/MerchPreview';
import { Loader2 } from 'lucide-react';

function App() {
  const { grid, paintPixel, selectedColor, setSelectedColor, clearGrid, loading } = usePixelGrid();

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50 pointer-events-none"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-center pointer-events-none">
        <div>
          <h1 className="text-4xl font-black tracking-tighter font-mono">
            TRAE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">PLACE</span>
          </h1>
          <p className="text-zinc-500 text-xs font-mono mt-1">REAL-TIME COLLABORATIVE CANVAS</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-zinc-400 font-mono">LIVE SYNC</span>
        </div>
      </header>

      {/* Main Canvas Area */}
      <main className="z-10 flex flex-col items-center gap-8 scale-100 sm:scale-110 transition-transform">
        {loading ? (
          <div className="flex flex-col items-center gap-4 text-zinc-500">
            <Loader2 className="animate-spin w-8 h-8" />
            <span className="font-mono text-sm">CONNECTING TO SATELLITE...</span>
          </div>
        ) : (
          <PixelBoard grid={grid} onPaint={paintPixel} />
        )}
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
