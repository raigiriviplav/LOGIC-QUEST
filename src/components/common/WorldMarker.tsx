import React from 'react';
import { World } from '../../types/game';
import { GameCharacter } from './GameCharacter';
import { Lock, Sparkles, Compass } from 'lucide-react';

interface WorldMarkerProps {
  world: World;
  isSelected?: boolean;
  isPlayerHere?: boolean;
  onClick: (world: World) => void;
  className?: string;
}

export const WorldMarker: React.FC<WorldMarkerProps> = ({
  world,
  isSelected = false,
  isPlayerHere = false,
  onClick,
  className = '',
}) => {
  const isUnlocked = world.status === 'unlocked';
  const isLocked = world.status === 'locked';
  const isUndiscovered = world.status === 'fogged';

  // Landmark visual icons/illustrations corresponding directly to the 10 Physical Regions
  const renderLandmarkIllustration = () => {
    switch (world.number) {
      case 1:
        // World 1: Ancient Runestone Gateway & Mossy Beginner Village
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            {/* Soft campsite campfire glow */}
            <div className="absolute -bottom-1 w-12 h-4 rounded-full bg-amber-500/40 blur-sm animate-pulse" />
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              {/* Thatched hut in background */}
              <polygon points="12,45 28,26 44,45" fill="#a16207" stroke="#451a03" strokeWidth="1.5" />
              <rect x="18" y="45" width="20" height="18" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
              <rect x="24" y="52" width="8" height="11" fill="#fef08a" />
              {/* Ancient Stone Gateway Arch */}
              <path
                d="M34 65 L34 24 Q52 14 70 24 L70 65 L60 65 L60 34 Q52 28 44 34 L44 65 Z"
                fill="#64748b"
                stroke="#1e293b"
                strokeWidth="2"
              />
              {/* Python Green Runes glowing on arch */}
              <circle cx="52" cy="22" r="3.5" fill="#34d399" className="animate-pulse" />
              <rect x="37" y="38" width="4" height="2" fill="#6ee7b7" />
              <rect x="63" y="38" width="4" height="2" fill="#6ee7b7" />
              {/* Moss patches */}
              <ellipse cx="44" cy="28" rx="4" ry="2" fill="#4d7c0f" />
              <ellipse cx="64" cy="48" rx="3" ry="1.5" fill="#4d7c0f" />
            </svg>
          </div>
        );

      case 2:
        // World 2: High Mountain Gorge & Fortress Gate with Iron Portcullis
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              {/* Jagged Cliff Rocks */}
              <polygon points="5,68 18,25 35,68" fill="#57534e" stroke="#292524" strokeWidth="1.5" />
              <polygon points="50,68 66,28 78,68" fill="#44403c" stroke="#1c1917" strokeWidth="1.5" />
              {/* Stone Fortress Wall & Watchtower */}
              <rect x="25" y="30" width="30" height="38" fill="#78716c" stroke="#292524" strokeWidth="2" />
              {/* Wooden Iron-Studded Fortress Gate */}
              <path d="M30 68 L30 46 Q40 40 50 46 L50 68 Z" fill="#451a03" stroke="#1c1917" strokeWidth="1.5" />
              {/* Iron Portcullis Bars */}
              <line x1="36" y1="44" x2="36" y2="68" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="44" y1="44" x2="44" y2="68" stroke="#0f172a" strokeWidth="1.5" />
              <line x1="30" y1="56" x2="50" y2="56" stroke="#0f172a" strokeWidth="1.5" />
              {/* Watchtower parapet crenellations */}
              <polygon points="25,30 25,22 30,22 30,26 35,26 35,22 40,22 40,26 45,26 45,22 50,22 50,26 55,26 55,22 55,30" fill="#a8a29e" stroke="#292524" strokeWidth="1" />
            </svg>
            {/* Physical Padlock over gate */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#78350f] p-1 rounded-full border border-amber-400 shadow-md">
              <Lock className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
        );

      case 3:
        // World 3: Deep Jungle Stepped Ruins & Looping River
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              {/* Stepped Jungle Temple */}
              <rect x="15" y="55" width="50" height="14" fill="#3f6212" stroke="#142804" strokeWidth="1.5" />
              <rect x="22" y="42" width="36" height="13" fill="#4d7c0f" stroke="#142804" strokeWidth="1.5" />
              <rect x="29" y="30" width="22" height="12" fill="#65a30d" stroke="#142804" strokeWidth="1.5" />
              <polygon points="40,18 34,30 46,30" fill="#a16207" stroke="#142804" strokeWidth="1.5" />
              {/* Flowing Turquoise Waterfall */}
              <path d="M38 42 L38 68 Q40 70 42 68 L42 42 Z" fill="#38bdf8" />
              {/* Creeping Jungle Vines */}
              <path d="M18 55 Q24 45 20 38" stroke="#15803d" strokeWidth="1.5" fill="none" />
              <path d="M60 55 Q56 42 62 36" stroke="#15803d" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
        );

      case 4:
        // World 4: Central Valley Crossroads & Starlight Obelisk
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              {/* Stone Arch Bridge */}
              <path d="M10 65 Q40 50 70 65 L70 70 L10 70 Z" fill="#78716c" stroke="#292524" strokeWidth="1.5" />
              {/* Central Starlight Obelisk Monolith */}
              <polygon points="40,16 34,56 46,56" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
              <polygon points="40,16 46,56 43,56" fill="#0284c7" />
              <circle cx="40" cy="14" r="3" fill="#fef08a" />
            </svg>
          </div>
        );

      case 5:
        // World 5: Fortified Fantasy City & Clockwork Spire
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              <rect x="12" y="44" width="56" height="24" fill="#64748b" stroke="#1e293b" strokeWidth="1.5" />
              <rect x="22" y="28" width="16" height="30" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
              <polygon points="30,14 20,28 40,28" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.5" />
              <rect x="42" y="22" width="18" height="36" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
              <polygon points="51,10 40,22 62,22" fill="#ca8a04" stroke="#78350f" strokeWidth="1.5" />
              {/* Brass Clockwork Gear */}
              <circle cx="51" cy="34" r="4.5" fill="#facc15" stroke="#854d0e" strokeWidth="1" />
            </svg>
          </div>
        );

      case 6:
        // World 6: Ancient Castle Kingdom
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              {/* Castle Main Keep & Towers */}
              <rect x="18" y="32" width="44" height="36" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
              <rect x="12" y="22" width="14" height="46" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
              <polygon points="19,8 10,22 28,22" fill="#991b1b" stroke="#450a0a" strokeWidth="1.5" />
              <rect x="54" y="22" width="14" height="46" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
              <polygon points="61,8 52,22 70,22" fill="#991b1b" stroke="#450a0a" strokeWidth="1.5" />
              {/* High Spire with Royal Banner */}
              <polygon points="40,16 32,32 48,32" fill="#1e3a8a" stroke="#172554" strokeWidth="1" />
              <line x1="40" y1="16" x2="40" y2="4" stroke="#78350f" strokeWidth="1.5" />
              <polygon points="40,5 47,8 40,11" fill="#facc15" />
            </svg>
          </div>
        );

      case 7:
        // World 7: Archipelago Port & Sailing Galleon
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              {/* Pier & Harbor Lighthouse */}
              <path d="M10 66 L45 66 L50 69 L10 69 Z" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              <polygon points="20,66 22,25 28,25 30,66" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
              <rect x="22" y="21" width="6" height="4" fill="#facc15" stroke="#854d0e" strokeWidth="0.8" />
              {/* Galleon Ship */}
              <path d="M42 64 Q55 68 68 64 L70 56 L40 56 Z" fill="#78350f" stroke="#291507" strokeWidth="1.5" />
              <line x1="55" y1="56" x2="55" y2="28" stroke="#451a03" strokeWidth="1.5" />
              {/* White Canvas Sails */}
              <path d="M55 30 Q65 36 55 42 Z" fill="#fef9c3" stroke="#ca8a04" strokeWidth="0.8" />
              <path d="M55 43 Q67 48 55 54 Z" fill="#fef9c3" stroke="#ca8a04" strokeWidth="0.8" />
            </svg>
          </div>
        );

      case 8:
        // World 8: Corrupted Wasteland & Purple Void Crystal
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              <polygon points="10,68 25,35 38,68" fill="#262626" stroke="#0a0a0a" strokeWidth="1.5" />
              <polygon points="45,68 58,38 72,68" fill="#171717" stroke="#0a0a0a" strokeWidth="1.5" />
              {/* Glowing Purple Void Crystal Spike */}
              <polygon points="40,12 32,54 48,54" fill="#a855f7" stroke="#581c87" strokeWidth="1.5" />
              <polygon points="40,12 48,54 45,54" fill="#7e22ce" />
              <circle cx="40" cy="12" r="3" fill="#f0abfc" className="animate-pulse" />
            </svg>
          </div>
        );

      case 9:
        // World 9: Celestial Astrolabe & Floating Monoliths
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              {/* Observatory High Dome */}
              <rect x="25" y="44" width="30" height="24" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
              <path d="M25 44 Q40 26 55 44 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
              {/* Brass Astrolabe Rings */}
              <circle cx="40" cy="30" r="14" stroke="#facc15" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
              {/* Floating Monolith Crystals */}
              <polygon points="16,28 12,40 20,40" fill="#67e8f9" stroke="#0891b2" strokeWidth="1" />
              <polygon points="64,26 60,38 68,38" fill="#67e8f9" stroke="#0891b2" strokeWidth="1" />
            </svg>
          </div>
        );

      case 10:
      default:
        // World 10: The Titan Mountain Citadel & Storm Clouds
        return (
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
              {/* Giant Peak */}
              <polygon points="40,8 10,68 70,68" fill="#334155" stroke="#0f172a" strokeWidth="2" />
              {/* Snowcap on Peak */}
              <polygon points="40,8 30,30 36,26 40,32 44,26 50,30" fill="#f8fafc" />
              {/* High Ancient Sky Citadel */}
              <rect x="34" y="24" width="12" height="12" fill="#fef08a" stroke="#854d0e" strokeWidth="1.2" />
              <polygon points="40,16 33,24 47,24" fill="#eab308" />
              {/* Storm Cloud Ring */}
              <ellipse cx="40" cy="46" rx="28" ry="6" fill="#94a3b8" opacity="0.6" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      onClick={() => onClick(world)}
      className={`group relative flex flex-col items-center cursor-pointer select-none transition-all duration-300 ${
        isSelected ? 'scale-110 z-40' : 'hover:scale-105 z-20'
      } ${className}`}
    >
      {/* 1. Pulsing Quest Aura for Active / Player Location */}
      {isUnlocked && (
        <div className="absolute top-2 w-20 h-20 rounded-full bg-emerald-400/25 animate-ping pointer-events-none" />
      )}

      {/* 2. THE ACTUAL FANTASY ADVENTURER: Standing right at World 1 */}
      {isPlayerHere && (
        <div className="absolute -top-16 sm:-top-20 z-30 pointer-events-none flex flex-col items-center animate-bounce duration-1000">
          <div className="bg-gradient-to-r from-amber-400 to-amber-200 text-amber-950 font-adventure text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full border-2 border-amber-800 shadow-[0_4px_10px_rgba(0,0,0,0.7)] flex items-center gap-1 mb-1">
            <Compass className="w-3 h-3 text-amber-900 fill-current" />
            <span>YOU ARE HERE</span>
          </div>
          <GameCharacter mood="victorious" size="sm" showShadow={true} />
        </div>
      )}

      {/* 3. The Physical Hand-Crafted Landmark */}
      <div
        className={`relative transition-all duration-300 ${
          isUndiscovered ? 'filter brightness-75 contrast-75' : ''
        }`}
      >
        {renderLandmarkIllustration()}
      </div>

      {/* 4. Carved Wooden Road Signpost / Nameplate */}
      <div
        className={`-mt-1 px-3 py-1 rounded-xl border-2 shadow-[0_4px_12px_rgba(0,0,0,0.85)] flex items-center gap-1.5 transition-all whitespace-nowrap ${
          isUnlocked
            ? 'bg-gradient-to-b from-[#2e5d16] via-[#1e3e0d] to-[#122606] text-[#ecfdf5] border-[#4ade80] ring-2 ring-emerald-400/30'
            : isLocked
            ? 'bg-gradient-to-b from-[#783e15] via-[#54280b] to-[#341604] text-[#fef08a] border-[#d97706]'
            : 'bg-gradient-to-b from-[#334155] via-[#1e293b] to-[#0f172a] text-[#94a3b8] border-[#475569]'
        }`}
      >
        {/* World Number Badge */}
        <span
          className={`w-5 h-5 rounded-full flex items-center justify-center font-adventure text-[10px] shadow-inner ${
            isUnlocked
              ? 'bg-[#10b981] text-emerald-950 font-bold'
              : isLocked
              ? 'bg-[#b45309] text-amber-100'
              : 'bg-[#475569] text-slate-300'
          }`}
        >
          {isUnlocked ? '1' : isLocked ? <Lock className="w-2.5 h-2.5" /> : world.number}
        </span>

        {/* World Title Inscription */}
        <div className="flex flex-col text-left">
          <span className="font-adventure text-[11px] sm:text-xs tracking-wide leading-tight">
            {world.title}
          </span>
          <span className="font-medieval text-[9px] text-[#fef08a]/80 leading-tight max-w-[140px] truncate">
            {world.tagline}
          </span>
        </div>
      </div>
    </div>
  );
};
