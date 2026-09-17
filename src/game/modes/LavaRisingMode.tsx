import React, { useState } from 'react';
import { Challenge } from '../../types/game';
import { sounds } from '../../utils/audio';
import { Flame, Shield } from 'lucide-react';

interface LavaRisingModeProps {
  challenge: Challenge;
  onAnswer: (answerId: string) => void;
  isLocked?: boolean;
}

export const LavaRisingMode: React.FC<LavaRisingModeProps> = ({
  challenge,
  onAnswer,
  isLocked = false,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (isLocked) return;
    sounds.playRuneSelect();
    setSelectedId(id);
    onAnswer(id);
  };

  return (
    <div id="lava-rising-mode" className="flex flex-col gap-4 w-full">
      {/* Lava Warning Header */}
      <div className="bg-gradient-to-r from-red-950 via-[#451208] to-red-950 p-3 rounded-lg border-2 border-red-700/80 text-xs md:text-sm text-amber-200 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2 font-cinzel font-bold text-red-300">
          <Flame className="w-4 h-4 text-red-500 animate-bounce" />
          <span>MOLTEN LAVA RISING</span>
        </div>
        <span className="text-[11px] font-code text-amber-300">Ascend with Arithmetic</span>
      </div>

      {/* Code Tablet with Lava Glow */}
      <div className="relative rounded-xl p-4 bg-[#140804] border-3 border-red-900/60 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
        <div className="font-code text-xs md:text-sm text-amber-100 bg-[#0a0301] p-3.5 rounded border border-red-950 whitespace-pre-wrap leading-relaxed">
          {challenge.code}
        </div>
      </div>

      <div className="wood-panel px-4 py-2 rounded-lg border-2 border-[#6d4122] text-center">
        <h3 className="font-cinzel text-xs md:text-sm font-bold text-amber-100">
          {challenge.question}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {challenge.options?.map((opt) => (
          <button
            key={opt.id}
            disabled={isLocked}
            onClick={() => handleSelect(opt.id)}
            className="p-3 rounded-xl bg-[#25150d] hover:bg-[#381f13] border border-[#55321a] hover:border-amber-500 text-[#f7e6c4] text-left cursor-pointer flex items-center gap-2.5"
          >
            <Shield className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <div className="font-bold text-xs font-cinzel text-amber-100">{opt.label}</div>
              {opt.codeSnippet && <div className="text-[10px] text-stone-400">{opt.codeSnippet}</div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
