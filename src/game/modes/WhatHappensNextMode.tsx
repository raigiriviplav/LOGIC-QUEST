import React, { useState } from 'react';
import { Challenge } from '../../types/game';
import { sounds } from '../../utils/audio';
import { Play, Sparkles } from 'lucide-react';

interface WhatHappensNextModeProps {
  challenge: Challenge;
  onAnswer: (answerId: string) => void;
  isLocked?: boolean;
}

export const WhatHappensNextMode: React.FC<WhatHappensNextModeProps> = ({
  challenge,
  onAnswer,
  isLocked = false,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelect = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (isLocked) return;
    sounds.playRuneSelect();
    setSelectedOptionId(id);
    onAnswer(id);
  };

  return (
    <div id="what-happens-next-mode" className="flex flex-col gap-4 w-full">
      {/* Narrative Context Scroll */}
      <div className="parchment-panel p-3.5 rounded-lg border-2 border-[#7a5229] text-xs md:text-sm text-[#2b180d]">
        <div className="flex items-center gap-2 font-cinzel font-bold text-amber-900 mb-1">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>Arcane Mechanism Encountered</span>
        </div>
        <p className="font-body italic text-[#4a2e16] leading-relaxed">
          {challenge.gameplayContext}
        </p>
      </div>

      {/* Carved Code Stone Tablet */}
      <div className="relative rounded-xl p-4 bg-[#140c07] border-3 border-[#5e381f] shadow-[inset_0_2px_12px_rgba(0,0,0,0.9)]">
        {/* Stone Tablet Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3b2314] text-xs font-cinzel text-amber-400/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wider">PYTHON RUNIC SCRIPT</span>
          </div>
          <span className="text-[11px] text-stone-400 font-code">interpreter: active</span>
        </div>

        {/* Code Content with syntax styling */}
        <div className="font-code text-xs md:text-sm leading-relaxed overflow-x-auto p-3 rounded bg-[#0b0603] border border-[#26150a]">
          {challenge.code.split('\n').map((line, idx) => {
            const isComment = line.trim().startsWith('#');
            const hasPrint = line.includes('print(');
            const hasQuotes = line.includes('"') || line.includes("'");

            return (
              <div key={idx} className="flex gap-4 group">
                <span className="text-stone-600 select-none w-6 text-right font-mono text-[11px]">
                  {idx + 1}
                </span>
                <span
                  className={`${
                    isComment
                      ? 'text-emerald-500/80 italic'
                      : hasPrint
                      ? 'text-amber-200'
                      : hasQuotes
                      ? 'text-cyan-300'
                      : 'text-amber-100'
                  }`}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Query Banner */}
      <div className="wood-panel px-4 py-2.5 rounded-lg border-2 border-[#6d4122] text-center">
        <h3 className="font-cinzel text-sm md:text-base font-bold text-amber-200">
          {challenge.question}
        </h3>
      </div>

      {/* Action Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {(challenge.options || []).map((option) => {
          const isChosen = selectedOptionId === option.id;
          return (
            <button
              type="button"
              key={option.id}
              disabled={isLocked}
              onClick={(e) => handleSelect(e, option.id)}
              className={`p-3.5 rounded-xl text-left font-body transition-all border-2 cursor-pointer select-none flex flex-col justify-between ${
                isChosen
                  ? 'bg-[#5c371d] border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-[1.01]'
                  : 'bg-[#29170e] hover:bg-[#381f13] border-[#55321a] hover:border-[#8e552d] text-[#f7e6c4]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#180e08] border border-amber-600/80 flex items-center justify-center shrink-0 mt-0.5 text-xs text-amber-300 font-cinzel">
                  <Play className="w-2.5 h-2.5 fill-current" />
                </div>
                <div>
                  <div className="font-bold text-xs md:text-sm text-amber-100 font-cinzel">
                    {option.label}
                  </div>
                  {option.codeSnippet && (
                    <div className="text-[11px] text-amber-300/70 mt-1 font-body">
                      {option.codeSnippet}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
