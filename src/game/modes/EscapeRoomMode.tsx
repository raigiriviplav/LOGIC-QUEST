import React, { useState } from 'react';
import { Challenge } from '../../types/game';
import { sounds } from '../../utils/audio';
import { Key, Unlock, ShieldAlert, Cpu } from 'lucide-react';

interface EscapeRoomModeProps {
  challenge: Challenge;
  onAnswer: (answerId: string) => void;
  isLocked?: boolean;
}

export const EscapeRoomMode: React.FC<EscapeRoomModeProps> = ({
  challenge,
  onAnswer,
  isLocked = false,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (isLocked) return;
    sounds.playMechanismClank();
    setSelectedId(id);
    onAnswer(id);
  };

  return (
    <div id="escape-room-mode" className="flex flex-col gap-4 w-full">
      {/* Vault Mechanism Status Board */}
      <div className="parchment-panel p-3.5 rounded-lg border-2 border-[#7a5229] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-center gap-2 font-cinzel font-bold text-[#3d2212]">
          <Key className="w-4 h-4 text-amber-800" />
          <span>VAULT SECURITY PROTOCOL</span>
        </div>
        {challenge.mechanismState && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-950 font-cinzel">Target:</span>
            <span className="bg-[#4a2e12] text-amber-200 px-2 py-0.5 rounded text-xs font-cinzel border border-amber-600/50">
              {challenge.mechanismState.requiredAction}
            </span>
          </div>
        )}
      </div>

      {/* Mechanism Item Status Badges */}
      {challenge.mechanismState && challenge.mechanismState.items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {challenge.mechanismState.items.map((item) => (
            <div
              key={item.id}
              className="bg-[#1c1109] border border-[#5c371d] p-2 rounded-lg flex items-center gap-2 shadow"
            >
              <Cpu className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-stone-400 block truncate">{item.label}</span>
                <span className="text-xs font-bold text-amber-300 font-code">{String(item.state)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Chamber Code Slate */}
      <div className="relative rounded-xl p-4 bg-[#120a06] border-3 border-[#633a1e] shadow-xl">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3b2314] text-xs font-cinzel text-amber-400">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>DISARM MECHANISM SLATE</span>
          </div>
          <span className="text-[11px] text-amber-200/60 font-code">Indentation & Structure</span>
        </div>

        <pre className="font-code text-xs md:text-sm text-amber-100 bg-[#080402] p-3 rounded border border-[#2e190d] overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {challenge.code}
        </pre>
      </div>

      {/* Challenge Question */}
      <div className="wood-panel px-4 py-2.5 rounded-lg border-2 border-[#6d4122] text-center">
        <h3 className="font-cinzel text-xs md:text-sm font-bold text-amber-100">
          {challenge.question}
        </h3>
      </div>

      {/* Mechanism Solvers / Sequences */}
      <div className="grid grid-cols-1 gap-2.5">
        {challenge.options?.map((opt) => {
          const isChosen = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              disabled={isLocked}
              onClick={() => handleSelect(opt.id)}
              className={`p-3 rounded-xl text-left font-body transition-all border-2 cursor-pointer flex items-center justify-between ${
                isChosen
                  ? 'bg-[#5c371d] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-[#25150d] hover:bg-[#381f13] border-[#55321a] hover:border-[#8e552d] text-[#f7e6c4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#150c07] border border-[#6d4122] flex items-center justify-center shrink-0 text-amber-400">
                  <Unlock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <pre className="text-xs font-code font-bold text-amber-200 whitespace-pre">
                    {opt.label}
                  </pre>
                  {opt.codeSnippet && (
                    <span className="text-[11px] text-stone-400 block mt-0.5">
                      {opt.codeSnippet}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-amber-400 font-cinzel font-bold shrink-0 ml-2">
                ENGAGE →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
