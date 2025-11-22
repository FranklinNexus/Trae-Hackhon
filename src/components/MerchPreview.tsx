import { useState } from 'react';
import html2canvas from 'html2canvas';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { ActionButtons } from './ActionButtons';

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
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        {/* Secondary Action Buttons */}
        <ActionButtons />

        {/* Primary CTA */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="neon-cta flex items-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          <span>{loading ? 'Rendering' : 'Mint Artifact'}</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-[10px] flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-[#05060f]/95 border border-white/10 rounded-[32px] p-8 max-w-2xl w-full text-white shadow-[0_40px_120px_rgba(2,6,23,0.95)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.8em] text-emerald-400">
            Drop 2025 · Trae Place Lab
          </p>
          <h2 className="text-3xl font-black tracking-tight">
            Limited Edition Trae Artifact #2025
          </h2>
          <p className="text-zinc-400 text-sm">
            Microfiber lens cloth / hand-stitched holographic edge
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 justify-between text-sm font-mono text-zinc-400">
          <div>
            <p className="uppercase tracking-[0.6em] text-[10px] text-zinc-500">
              Price
            </p>
            <p className="text-2xl font-bold text-emerald-300">$19.99 USD</p>
          </div>
          <div>
            <p className="uppercase tracking-[0.6em] text-[10px] text-zinc-500">
              Edition
            </p>
            <p className="text-xl font-semibold text-white">Genesis Batch</p>
          </div>
          <div>
            <p className="uppercase tracking-[0.6em] text-[10px] text-zinc-500">
              Lead Time
            </p>
            <p className="text-xl font-semibold text-white">2 Weeks</p>
          </div>
        </div>

        <div className="mt-10 cloth-scene">
          <div className="cloth-mockup">
            {previewImage && (
              <>
                <img src={previewImage} alt="Pixel Art" />
                <div className="cloth-glare" />
                <div className="absolute top-4 left-4 bg-black/70 text-emerald-200 text-xs font-mono tracking-[0.5em] px-3 py-1 rounded-full border border-white/20">
                  TRAE
                </div>
                <div className="absolute bottom-4 right-4 text-right text-white/80 font-mono text-xs">
                  <p className="uppercase tracking-[0.6em] text-[9px] text-zinc-300">
                    Artifact
                  </p>
                  <p className="text-lg font-bold">#2025</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.4em] text-zinc-500">
          <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10">
            <p>Weave Density</p>
            <p className="text-base text-white tracking-normal font-semibold mt-2">
              400 GSM
            </p>
          </div>
          <div className="glass-panel px-4 py-3 rounded-2xl border border-white/10">
            <p>Color Fidelity</p>
            <p className="text-base text-white tracking-normal font-semibold mt-2">
              98% sRGB
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="glow-button w-full mt-8 flex items-center justify-center gap-3 text-xs"
        >
          Pre-Order Now
        </button>
      </div>
    </div>
  );
}
