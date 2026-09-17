import React from 'react';
import { GameCharacter } from '../common/GameCharacter';
import { GameModeId, Challenge } from '../../types/game';
import { DecorativeVines } from '../common/DecorativeVines';
import paintedDungeonUrl from '../../assets/images/painted_dungeon_chamber_1789666843653.jpg';

interface ChallengeDungeonProps {
  mode: GameModeId;
  gateOpen?: boolean;
  isErrorState?: boolean;
  objectiveText: string;
  reaction?: Challenge['gameReaction'];
}

export const ChallengeDungeon: React.FC<ChallengeDungeonProps> = ({
  mode,
  gateOpen = false,
  isErrorState = false,
  objectiveText,
  reaction,
}) => {
  return (
    <div
      id="challenge-dungeon-arena"
      className={`relative w-full h-56 md:h-64 rounded-3xl overflow-hidden border-4 border-[#5c371d] shadow-[0_12px_36px_rgba(0,0,0,0.85)] select-none transition-all duration-300 ${
        isErrorState ? 'animate-[shake_0.4s_ease-in-out]' : ''
      }`}
    >
      {/* 1. Master Hand-Painted Ancient Dungeon Chamber Background */}
      <img
        src={paintedDungeonUrl}
        alt="Hand-painted dungeon chamber"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.08]"
      />

      {/* Atmospheric Torchlight Glows on Left and Right Walls */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#140a04]/85 via-transparent to-[#140a04]/40 pointer-events-none" />

      {/* Decorative Vines hanging along upper stone frame */}
      <DecorativeVines position="top-bar" />

      {/* Torch Flame Flicker Effects */}
      <div className="absolute top-6 left-8 md:left-20 flex flex-col items-center pointer-events-none">
        <div className={`w-10 h-10 rounded-full blur-lg transition-all ${
          reaction?.type === 'torch' ? 'bg-orange-500/70 scale-150 animate-pulse' : 'bg-amber-400/35 animate-pulse'
        }`} />
        <div className={`rounded-full blur-[1px] torch-flicker -mt-7 transition-all ${
          reaction?.type === 'torch' ? 'w-6 h-10 bg-gradient-to-t from-red-600 via-amber-500 to-yellow-200' : 'w-4 h-6 bg-gradient-to-t from-amber-600 to-amber-300'
        }`} />
      </div>

      <div className="absolute top-6 right-8 md:right-20 flex flex-col items-center pointer-events-none">
        <div className={`w-10 h-10 rounded-full blur-lg transition-all ${
          reaction?.type === 'torch' ? 'bg-orange-500/70 scale-150 animate-pulse' : 'bg-amber-400/35 animate-pulse'
        }`} />
        <div className={`rounded-full blur-[1px] torch-flicker -mt-7 transition-all ${
          reaction?.type === 'torch' ? 'w-6 h-10 bg-gradient-to-t from-red-600 via-amber-500 to-yellow-200' : 'w-4 h-6 bg-gradient-to-t from-amber-600 to-amber-300'
        }`} />
      </div>

      {/* 2. Central Ancient Chamber Portal / Rune Mechanism Gate */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-64 md:w-84 h-full flex flex-col items-center justify-end">
          {/* Heavy Stone Arch Keystones */}
          <div className="absolute top-3 w-56 md:w-76 h-14 rounded-t-full border-t-6 border-x-6 border-[#4d2d14] bg-[#120a06]/90 shadow-2xl flex items-center justify-center">
            {/* Glowing Python Core Keystone */}
            <div
              className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                gateOpen
                  ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_24px_#34d399]'
                  : 'bg-[#2b170c] border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
              }`}
            >
              <span className="text-sm font-bold">🐍</span>
            </div>
          </div>

          {/* Portcullis Iron Grate (Lifts when code logic is correct) */}
          <div
            className={`w-48 md:w-64 h-44 border-4 border-[#331d10] bg-[#0c0704]/90 transition-all duration-700 ease-out overflow-hidden relative ${
              gateOpen ? '-translate-y-36 opacity-30' : 'translate-y-0 opacity-95'
            }`}
          >
            {/* Portcullis Iron Bars */}
            <div className="w-full h-full flex justify-around">
              {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                <div
                  key={bar}
                  className="w-2 h-full bg-gradient-to-b from-[#6b472e] via-[#452712] to-[#1f1006] border-x border-[#140b04]"
                />
              ))}
            </div>
            <div className="absolute top-10 left-0 right-0 h-2.5 bg-[#4a2e12] border-y border-[#1a0f08]" />
            <div className="absolute top-24 left-0 right-0 h-2.5 bg-[#4a2e12] border-y border-[#1a0f08]" />
          </div>

          {/* Magical Sunlight Spill through open archway */}
          {gateOpen && (
            <div className="absolute bottom-6 w-56 h-40 bg-gradient-to-t from-emerald-400/50 via-amber-300/40 to-transparent blur-lg animate-pulse" />
          )}

          {/* IN-WORLD MECHANISM OVERLAYS */}
          {/* A. Rune Tablet */}
          {reaction?.type === 'rune' && (
            <div className="absolute bottom-10 z-30 flex flex-col items-center animate-bounce">
              <div className="bg-[#1f160e] border-2 border-emerald-400 px-5 py-2 rounded-xl shadow-[0_0_20px_#10b981] flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-bold tracking-widest text-lg animate-pulse">
                  {reaction.finalValue}
                </span>
                <span className="text-xs text-emerald-200">✨ RUNIC GLYPH</span>
              </div>
            </div>
          )}

          {/* B. Treasure Vault / Chest */}
          {reaction?.type === 'chest' && (
            <div className="absolute bottom-10 z-30 flex flex-col items-center">
              <div className="bg-gradient-to-r from-amber-950 to-[#2c1404] border-2 border-amber-400 px-4 py-1.5 rounded-xl shadow-[0_0_18px_rgba(245,158,11,0.8)] flex items-center gap-2">
                <span className="text-2xl">🗝️</span>
                <span className="text-amber-200 font-bold font-adventure tracking-wide">
                  {reaction.finalValue} KEYS UNLOCKED
                </span>
              </div>
            </div>
          )}

          {/* C. Coin Balance Scale */}
          {reaction?.type === 'coins' && (
            <div className="absolute bottom-10 z-30 flex flex-col items-center">
              <div className="bg-[#1b1208] border-2 border-amber-300 px-4 py-1.5 rounded-xl shadow-[0_0_16px_rgba(251,191,36,0.9)] flex items-center gap-2">
                <span className="text-xl">🪙</span>
                <span className="text-amber-100 font-mono font-bold text-lg">
                  {reaction.finalValue} GOLD
                </span>
                <span className="text-[10px] text-amber-300/80 uppercase tracking-wider">BALANCE</span>
              </div>
            </div>
          )}

          {/* D. Arcane Energy Core */}
          {reaction?.type === 'energy' && (
            <div className="absolute bottom-12 z-30 flex flex-col items-center">
              <div className="bg-[#0b1720] border-2 border-cyan-400 px-4 py-1.5 rounded-xl shadow-[0_0_20px_#06b6d4] flex items-center gap-2 animate-pulse">
                <span className="text-xl">⚡</span>
                <span className="text-cyan-200 font-mono font-bold text-lg">
                  {reaction.finalValue} CHARGE
                </span>
              </div>
            </div>
          )}

          {/* E. Mana Crystal */}
          {reaction?.type === 'crystal' && (
            <div className="absolute bottom-12 z-30 flex flex-col items-center">
              <div className="bg-[#190924] border-2 border-purple-400 px-4 py-1.5 rounded-xl shadow-[0_0_20px_#a855f7] flex items-center gap-2 animate-pulse">
                <span className="text-xl">💎</span>
                <span className="text-purple-200 font-mono font-bold text-lg">
                  {reaction.finalValue} MANA
                </span>
              </div>
            </div>
          )}

          {/* F. Arcane Compass */}
          {reaction?.type === 'compass' && (
            <div className="absolute bottom-10 z-30 flex flex-col items-center">
              <div className="bg-[#181109] border-2 border-amber-400 px-4 py-1.5 rounded-xl shadow-[0_0_16px_#f59e0b] flex items-center gap-2">
                <span className="text-xl">🧭</span>
                <span className="text-amber-300 font-adventure font-bold text-base tracking-widest">
                  BEARING: {reaction.finalValue}
                </span>
              </div>
            </div>
          )}

          {/* G. Drawbridge Elevation */}
          {reaction?.type === 'bridge' && (
            <div className="absolute bottom-10 z-30 flex flex-col items-center">
              <div className="bg-[#1a120b] border-2 border-stone-300 px-4 py-1.5 rounded-xl shadow-lg flex items-center gap-2">
                <span className="text-xl">⛓️</span>
                <span className="text-stone-200 font-adventure font-bold text-sm tracking-wide">
                  DRAWBRIDGE ELEVATION: {reaction.finalValue}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Dungeon Flagstone Ground Shadow & Overlap for Character */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0e0703]/90 via-[#1f1006]/60 to-transparent pointer-events-none" />

      {/* 4. The Adventurer Hero (Standing on the stone floor, reacting dynamically) */}
      <div
        className={`absolute bottom-2 left-8 md:left-20 z-20 transition-all duration-500 ${
          reaction?.type === 'dash' || gateOpen ? 'translate-x-16 md:translate-x-28' : 'translate-x-0'
        }`}
      >
        <GameCharacter
          mood={gateOpen ? 'victorious' : isErrorState ? 'shocked' : 'thinking'}
          size="md"
          showShadow={true}
        />
      </div>

      {/* 5. Dungeon Objective Parchment Ribbon at Top */}
      <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none z-20 px-4">
        <div className="bg-gradient-to-r from-[#faf2df] via-[#ebd9b4] to-[#cbb082] text-[#2c1708] border-2 border-[#8b5a2b] px-4 py-1 rounded-full shadow-lg flex items-center gap-2 max-w-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-ping shrink-0" />
          <span className="text-xs font-adventure text-[#3b1a03] truncate tracking-wide">
            {objectiveText}
          </span>
        </div>
      </div>

      {/* 6. Dynamic Reaction Action Banner (When code takes effect) */}
      {reaction && (
        <div className="absolute bottom-2 right-4 md:right-8 z-30 pointer-events-none max-w-xs animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[#120904]/95 border-2 border-amber-500/80 rounded-xl px-3 py-1.5 shadow-xl text-left backdrop-blur-sm">
            <div className="text-[10px] font-adventure text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>⚡</span>
              <span>{reaction.label}</span>
            </div>
            <p className="text-xs text-amber-100/90 font-serif leading-tight mt-0.5">
              {reaction.actionDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

