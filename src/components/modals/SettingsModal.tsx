import React, { useState } from 'react';
import { sounds } from '../../utils/audio';
import { Settings, Volume2, VolumeX, RotateCcw, X, Check, ShieldAlert } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onResetProgress,
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(sounds.isEnabled());
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  if (!isOpen) return null;

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sounds.setSoundEnabled(next);
    if (next) sounds.playCorrect();
  };

  const handleReset = () => {
    onResetProgress();
    setConfirmReset(false);
    sounds.playMechanismClank();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-md parchment-panel rounded-2xl border-4 border-[#7a5229] shadow-2xl overflow-hidden flex flex-col">
        {/* Ornaments */}
        <div className="corner-ornament corner-tl" />
        <div className="corner-ornament corner-tr" />
        <div className="corner-ornament corner-bl" />
        <div className="corner-ornament corner-br" />

        {/* Header */}
        <div className="wood-panel px-6 py-4 border-b-3 border-[#5e381f] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-amber-400" />
            <h2 className="font-cinzel text-lg font-bold text-amber-100">
              SETTINGS & PREFERENCES
            </h2>
          </div>
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="w-8 h-8 rounded-lg bg-[#27140a] hover:bg-[#3d2010] border border-[#7a5229] text-amber-200 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 text-[#2b180d] font-body text-xs md:text-sm">
          {/* Sound Toggle */}
          <div className="bg-[#ebd7af] p-3.5 rounded-xl border border-[#9d7445] flex items-center justify-between">
            <div className="flex items-center gap-3">
              {soundOn ? (
                <Volume2 className="w-5 h-5 text-amber-800" />
              ) : (
                <VolumeX className="w-5 h-5 text-stone-500" />
              )}
              <div>
                <span className="font-cinzel font-bold text-sm text-[#3b200d] block">
                  Arcane Audio & SFX
                </span>
                <span className="text-[11px] text-[#694017]">
                  Chimes, lever clicks, runes & fanfare
                </span>
              </div>
            </div>

            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold border transition-all cursor-pointer ${
                soundOn
                  ? 'bg-amber-600 hover:bg-amber-500 text-white border-amber-800 shadow'
                  : 'bg-stone-700 hover:bg-stone-600 text-stone-300 border-stone-800'
              }`}
            >
              {soundOn ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* Reset Save Data */}
          <div className="bg-[#ebd7af] p-3.5 rounded-xl border border-[#9d7445] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-cinzel font-bold text-sm text-[#3b200d] block">
                  Reset Adventure Progress
                </span>
                <span className="text-[11px] text-[#694017]">
                  Clear localStorage save state and restart from scratch
                </span>
              </div>

              {!confirmReset ? (
                <button
                  onClick={() => { sounds.playClick(); setConfirmReset(true); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold bg-[#842017] hover:bg-[#a1281c] text-white border border-[#58150f] cursor-pointer"
                >
                  RESET
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleReset}
                    className="px-2.5 py-1 rounded bg-red-700 text-white text-xs font-cinzel font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3 h-3" /> Yes
                  </button>
                  <button
                    onClick={() => setConfirmReset(false)}
                    className="px-2.5 py-1 rounded bg-stone-700 text-white text-xs font-cinzel cursor-pointer"
                  >
                    No
                  </button>
                </div>
              )}
            </div>

            {confirmReset && (
              <div className="flex items-center gap-2 text-[11px] text-red-900 bg-red-200/70 p-2 rounded border border-red-400">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-700" />
                <span>Warning: This will permanently reset XP, coins, streak, and unlocked subtopics!</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="wood-panel px-6 py-3 border-t-3 border-[#5e381f] flex justify-end">
          <button
            onClick={() => { sounds.playClick(); onClose(); }}
            className="btn-fantasy-wood px-6 py-2 rounded-lg text-xs font-cinzel cursor-pointer"
          >
            Save & Exit
          </button>
        </div>
      </div>
    </div>
  );
};
