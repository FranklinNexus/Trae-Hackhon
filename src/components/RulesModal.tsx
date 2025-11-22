import { X } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-black/90 border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(0,223,162,0.1)]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white font-mono tracking-tighter flex items-center gap-2">
          <span className="text-emerald-400">///</span> SYSTEM PROTOCOL
        </h2>

        <ul className="space-y-4 font-mono text-sm text-zinc-300">
          <li className="flex gap-3 items-start">
            <span className="text-emerald-400 font-bold">01.</span>
            <div>
              <strong className="text-white block mb-1">Select a Frequency</strong>
              Pick a color channel from the HUD Color Engine.
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-emerald-400 font-bold">02.</span>
            <div>
              <strong className="text-white block mb-1">Transmit Signal</strong>
              Click any coordinate on the grid to broadcast your mark.
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-emerald-400 font-bold">03.</span>
            <div>
              <strong className="text-white block mb-1">Co-exist</strong>
              Do not destroy existing signals; enhance and collaborate.
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-emerald-400 font-bold">04.</span>
            <div>
              <strong className="text-white block mb-1">Mint Artifact</strong>
              Immortalize your contribution as a physical reality.
            </div>
          </li>
        </ul>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button 
            onClick={onClose}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold py-2 px-6 rounded-lg border border-emerald-500/30 transition-all uppercase text-xs tracking-widest"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}




