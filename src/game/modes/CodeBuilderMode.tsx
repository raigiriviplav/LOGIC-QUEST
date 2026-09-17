import React, { useState } from 'react';
import { Challenge } from '../../types/game';
import { sounds } from '../../utils/audio';
import { Hammer, Blocks } from 'lucide-react';

interface CodeBuilderModeProps {
  challenge: Challenge;
  onAnswer: (answerId: string) => void;
  isLocked?: boolean;
}

export const CodeBuilderMode: React.FC<CodeBuilderModeProps> = ({
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
    <div id="code-builder-mode" className="flex flex-col gap-4 w-full">
      <div className="parchment-panel p-3.5 rounded-lg border-2 border-[#7a5229] flex items-center justify-between text-xs md:text-sm">
        <div className="flex items-center gap-2 font-cinzel font-bold text-[#3d2212]">
          <Hammer className="w-4 h-4 text-amber-800" />
          <span>CODE BUILDER FORGE</span>
        </div>
        <span className="text-[11px] font-code text-amber-900">Assemble the Spells</span>
      </div>

      <div className="relative rounded-xl p-4 bg-[#140c07] border-3 border-[#633a1e] shadow-xl">
        <div className="flex items-center gap-2 pb-2 mb-2 border-b border-[#361e11] text-xs font-cinzel text-amber-300">
          <Blocks className="w-4 h-4 text-amber-400" />
          <span>ANVIL CODE PREVIEW</span>
        </div>
        <pre className="font-code text-xs md:text-sm text-amber-100 bg-[#090503] p-3 rounded border border-[#2b180d] whitespace-pre-wrap leading-relaxed">
          {challenge.code}
        </pre>
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
            className="p-3 rounded-xl bg-[#25150d] hover:bg-[#381f13] border border-[#55321a] hover:border-amber-400 text-[#f7e6c4] text-left cursor-pointer flex items-center gap-2"
          >
            <div className="font-code text-xs font-bold text-amber-200">{opt.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
