import { useState } from 'react';
import { HelpCircle, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { RulesModal } from './RulesModal';

export function ActionButtons() {
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  const handleSnapshot = async () => {
    const element = document.getElementById('pixel-board-container');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Good enough for quick snapshot
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });
      
      const link = document.createElement('a');
      link.download = `trae-place-snapshot-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error("Snapshot failed", err);
    }
  };

  return (
    <>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => setIsRulesOpen(true)}
          className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-emerald-400 rounded-lg border border-white/10 backdrop-blur-sm transition-all hover:scale-105"
          title="System Protocol"
        >
          <HelpCircle size={20} />
        </button>

        <button
          onClick={handleSnapshot}
          className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-emerald-400 rounded-lg border border-white/10 backdrop-blur-sm transition-all hover:scale-105"
          title="Quick Snapshot"
        >
          <Download size={20} />
        </button>
      </div>

      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </>
  );
}





