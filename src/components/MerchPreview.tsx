import { useState } from 'react';
import html2canvas from 'html2canvas';
import { X, ShoppingBag, Loader2 } from 'lucide-react';

export function MerchPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const element = document.getElementById('pixel-board-container');
    if (!element) return;

    try {
      // Capture high res for print quality simulation
      const canvas = await html2canvas(element, {
        scale: 4, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: null, // Transparent background if possible
      });
      
      setPreviewImage(canvas.toDataURL('image/png'));
      setIsOpen(true);
    } catch (err) {
      console.error("Failed to generate preview", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="fixed top-6 right-6 bg-zinc-900 border border-zinc-700 hover:border-indigo-500 text-white px-6 py-3 rounded-none font-mono text-sm shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center gap-2 z-50 group"
      >
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <ShoppingBag className="w-4 h-4 group-hover:text-indigo-400" />}
        <span className="tracking-widest">MINT ARTIFACT</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-950 border border-zinc-800 p-8 max-w-lg w-full relative flex flex-col items-center shadow-2xl">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-2 text-white font-mono tracking-tighter">ARTIFACT PREVIEW</h2>
        <p className="text-zinc-500 mb-10 text-center text-xs font-mono uppercase tracking-widest">
          Trae Place Official Commemorative Patch
        </p>

        {/* The Patch Visualization */}
        <div className="relative group perspective-1000 mb-10">
          <div 
            className="relative transition-transform duration-500 ease-out group-hover:rotate-0 group-hover:scale-105"
            style={{
              transform: 'rotate(-2deg) rotateX(10deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Shadow / Depth */}
            <div className="absolute inset-0 bg-indigo-500/20 blur-2xl transform translate-y-4 translate-x-4 -z-10" />
            
            {/* The Patch itself */}
            {previewImage && (
              <div 
                className="relative overflow-hidden"
                style={{
                  width: '280px',
                  height: '280px',
                  // Embroidered Edge Effect
                  border: '4px solid #222',
                  boxShadow: `
                    0 0 0 2px #4f46e5, 
                    0 0 0 4px #111,
                    0 10px 30px rgba(0,0,0,0.8)
                  `,
                  borderRadius: '4px',
                }}
              >
                {/* The Art */}
                <img 
                  src={previewImage} 
                  alt="Pixel Art" 
                  className="w-full h-full object-cover"
                  style={{ imageRendering: 'pixelated' }}
                />
                
                {/* Thread Texture Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, #000 3px, transparent 4px)`,
                    backgroundSize: '4px 4px'
                  }}
                />
                
                {/* Glossy Sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-zinc-900 p-4 border border-zinc-800 w-full flex justify-between items-center">
           <div className="flex flex-col">
             <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Batch</span>
             <span className="text-indigo-400 font-bold font-mono">GENESIS-01</span>
           </div>
           <div className="text-right">
             <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Price</span>
             <span className="text-white font-bold font-mono">0.00 ETH</span>
           </div>
        </div>
        
        <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 text-sm font-mono tracking-widest uppercase transition-colors">
          Confirm Mint
        </button>
      </div>
    </div>
  );
}
