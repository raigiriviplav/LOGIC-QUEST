import React, { useState } from 'react';
import { Challenge } from '../../types/game';
import { sounds } from '../../utils/audio';
import { Search, Eye, Sparkles } from 'lucide-react';

interface CodeDetectiveModeProps {
  challenge: Challenge;
  onAnswer: (answerId: string) => void;
  isLocked?: boolean;
}

export const CodeDetectiveMode: React.FC<CodeDetectiveModeProps> = ({
  challenge,
  onAnswer,
  isLocked = false,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleLineClick = (lineId: string) => {
    if (isLocked) return;
    sounds.playRuneSelect();
    setSelectedAnswer(lineId);
    onAnswer(lineId);
  };

  return (
    <div id="code-detective-mode" className="flex flex-col gap-4 w-full">
      {/* Detective Briefing Parchment */}
      <div className="parchment-panel p-3.5 rounded-lg border-2 border-[#7a5229] text-xs md:text-sm text-[#2b180d]">
        <div className="flex items-center gap-2 font-cinzel font-bold text-amber-900 mb-1">
          <Search className="w-4 h-4 text-amber-800" />
          <span>CODE DETECTIVE INVESTIGATION</span>
        </div>
        <p className="font-body italic text-[#4a2e16] leading-relaxed">
          {challenge.gameplayContext}
        </p>
      </div>

      {/* Interactive Magnified Investigation Board */}
      <div className="relative rounded-xl p-4 bg-[#140d08] border-3 border-[#663b1e] shadow-xl">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#361e11] text-xs font-cinzel text-amber-300">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>EXAMINE THE INSCRIPTION</span>
          </div>
          <span className="text-[11px] text-stone-400">Click suspicious line or option</span>
        </div>

        {/* If this challenge has clickable lines for direct clue inspection */}
        {challenge.clickableLines && challenge.clickableLines.length > 0 ? (
          <div className="flex flex-col gap-2 py-1">
            {challenge.clickableLines.map((line) => {
              const isSelected = selectedAnswer === `line_${line.lineIndex}`;
              return (
                <button
                  key={line.lineIndex}
                  disabled={isLocked}
                  onClick={() => handleLineClick(`line_${line.lineIndex}`)}
                  className={`p-3 rounded-lg text-left font-code text-xs md:text-sm transition-all border flex items-center justify-between cursor-pointer select-none ${
                    isSelected
                      ? 'bg-[#5c371d] border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                      : 'bg-[#0a0503] hover:bg-[#20120a] border-[#381f12] text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-stone-500 text-xs font-mono select-none">
                      #{line.lineIndex}
                    </span>
                    <span className={line.text.startsWith('#') ? 'text-emerald-400 italic' : ''}>
                      {line.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-400 font-cinzel shrink-0 opacity-70 group-hover:opacity-100">
                    <Search className="w-3 h-3" />
                    <span>INSPECT</span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Standard code viewer with options below */
          <div className="font-code text-xs md:text-sm text-amber-100 bg-[#090503] p-3.5 rounded border border-[#2b180d] whitespace-pre-wrap leading-relaxed">
            {challenge.code}
          </div>
        )}
      </div>

      {/* Detective Query */}
      <div className="wood-panel px-4 py-2.5 rounded-lg border-2 border-[#6d4122] text-center">
        <h3 className="font-cinzel text-xs md:text-sm font-bold text-amber-100">
          {challenge.question}
        </h3>
      </div>

      {/* Options if clickableLines was not used */}
      {(!challenge.clickableLines || challenge.clickableLines.length === 0) && challenge.options && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {challenge.options.map((opt) => {
            const isSelected = selectedAnswer === opt.id;
            return (
              <button
                key={opt.id}
                disabled={isLocked}
                onClick={() => handleLineClick(opt.id)}
                className={`p-3.5 rounded-xl text-left font-body transition-all border-2 cursor-pointer flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-[#5c371d] border-amber-400 shadow-md'
                    : 'bg-[#25150d] hover:bg-[#381f13] border-[#55321a] hover:border-[#8e552d] text-[#f7e6c4]'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#180e08] border border-amber-600/80 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-bold text-xs md:text-sm text-amber-100 font-cinzel">
                    {opt.label}
                  </div>
                  {opt.codeSnippet && (
                    <div className="text-[11px] text-stone-400 mt-1">
                      {opt.codeSnippet}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
