import React, { useState, useEffect } from 'react';
import { Challenge } from '../../types/game';
import { sounds } from '../../utils/audio';
import { Clock, Zap, Hourglass } from 'lucide-react';

interface CodeTimerModeProps {
  challenge: Challenge;
  onAnswer: (answerId: string) => void;
  isLocked?: boolean;
}

export const CodeTimerMode: React.FC<CodeTimerModeProps> = ({
  challenge,
  onAnswer,
  isLocked = false,
}) => {
  const timeLimit = challenge.timeLimitSeconds || 25;
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [challenge, timeLimit]);

  useEffect(() => {
    if (isLocked) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Time expired
          onAnswer('TIMEOUT_EXPIRED');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [challenge, isLocked, onAnswer]);

  const handleSelect = (id: string) => {
    if (isLocked || timeLeft <= 0) return;
    sounds.playRuneSelect();
    setSelectedId(id);
    onAnswer(id);
  };

  const percentage = Math.max(0, Math.min(100, (timeLeft / timeLimit) * 100));
  const isUrgent = timeLeft <= 7;

  return (
    <div id="code-timer-mode" className="flex flex-col gap-4 w-full">
      {/* Brass Sandglass Countdown Bar */}
      <div className="parchment-panel p-3 rounded-xl border-2 border-[#7a5229] shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-cinzel font-bold text-[#3d2212]">
          <div className="flex items-center gap-1.5">
            <Hourglass className={`w-4 h-4 ${isUrgent ? 'text-red-700 animate-spin' : 'text-amber-800'}`} />
            <span>RAPID RUNE RELAY</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-900" />
            <span className={`font-code text-sm ${isUrgent ? 'text-red-700 animate-pulse font-extrabold' : 'text-amber-950'}`}>
              {timeLeft}s REMAINING
            </span>
          </div>
        </div>

        {/* Sand Timer Track */}
        <div className="w-full h-3 rounded-full bg-[#3d2212] border border-[#6d4122] overflow-hidden p-0.5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              isUrgent
                ? 'bg-gradient-to-r from-red-600 to-amber-500'
                : 'bg-gradient-to-r from-amber-500 to-yellow-300'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Code Tablet Area */}
      <div className="relative rounded-xl p-4 bg-[#140c07] border-3 border-[#633a1e] shadow-xl">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#361e11] text-xs font-cinzel text-amber-300">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>print() INVOCATION CHAMBER</span>
          </div>
          <span className="text-[11px] text-stone-400 font-code">Speed Bonus Active</span>
        </div>

        <pre className="font-code text-xs md:text-sm text-amber-100 bg-[#090503] p-3 rounded border border-[#2b180d] whitespace-pre-wrap leading-relaxed">
          {challenge.code}
        </pre>
      </div>

      {/* Timer Question Prompt */}
      <div className="wood-panel px-4 py-2.5 rounded-lg border-2 border-[#6d4122] text-center">
        <h3 className="font-cinzel text-xs md:text-sm font-bold text-amber-100">
          {challenge.question}
        </h3>
      </div>

      {/* Rapid Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {challenge.options?.map((opt) => {
          const isChosen = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              disabled={isLocked || timeLeft <= 0}
              onClick={() => handleSelect(opt.id)}
              className={`p-3.5 rounded-xl text-left font-body transition-all border-2 cursor-pointer select-none flex items-start gap-2.5 ${
                isChosen
                  ? 'bg-[#5c371d] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#25150d] hover:bg-[#381f13] border-[#55321a] hover:border-[#8e552d] text-[#f7e6c4]'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-[#160d07] border border-amber-600 flex items-center justify-center shrink-0 mt-0.5 text-xs text-amber-300 font-code">
                ⚡
              </div>
              <div>
                <div className="font-bold text-xs md:text-sm text-amber-100 font-cinzel">
                  {opt.label}
                </div>
                {opt.codeSnippet && (
                  <div className="text-[11px] text-stone-400 mt-0.5 font-body">
                    {opt.codeSnippet}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
