import React from 'react';
import { FantasyLandscape } from '../components/environment/FantasyLandscape';
import { FantasySign } from '../components/common/FantasySign';
import { FantasyButton } from '../components/common/FantasyButton';
import { PlayerProgress } from '../types/game';
import { Map, User, Settings, Play, Compass, Star, Award, Sparkles } from 'lucide-react';

interface MainMenuProps {
  progress: PlayerProgress;
  onContinue: () => void;
  onOpenWorldMap: () => void;
  onOpenLogicProfile: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  progress,
  onContinue,
  onOpenWorldMap,
  onOpenLogicProfile,
  onOpenSettings,
}) => {
  return (
    <div
      id="main-menu-container"
      className="relative w-full h-full min-h-screen flex flex-col justify-between items-center p-3 sm:p-6 select-none overflow-hidden"
    >
      {/* 1. Rich Illustrated Hand-Painted 2D Adventure Environment with Character */}
      <FantasyLandscape showCharacter={true} characterMood="idle" />

      {/* 2. Top Adventurer Status Badges (Physical carved wooden / parchment HUD) */}
      <header className="relative z-40 w-full max-w-6xl flex items-center justify-between">
        {/* Current Realm Parchment Tag */}
        <div className="bg-gradient-to-r from-[#faf2df] to-[#eedab1] border-2 border-[#8b5a2b] px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-adventure text-xs md:text-sm text-[#451a03] tracking-wide">
            WORLD 1: UNDERSTAND PYTHON
          </span>
        </div>

        {/* Tactile Wood Resources Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Gold Coins Badge */}
          <div className="bg-gradient-to-b from-[#6b3e15] to-[#422208] border-2 border-[#945826] px-3.5 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5">
            <span className="text-sm">🪙</span>
            <span className="font-adventure text-xs sm:text-sm text-amber-300">
              {progress.coins}
            </span>
          </div>

          {/* XP Badge */}
          <div className="bg-gradient-to-b from-[#6b3e15] to-[#422208] border-2 border-[#945826] px-3.5 py-1.5 rounded-2xl shadow-lg flex items-center gap-1.5">
            <span className="text-sm">✨</span>
            <span className="font-adventure text-xs sm:text-sm text-cyan-300">
              {progress.xp} XP
            </span>
          </div>
        </div>
      </header>

      {/* 3. Title Hanging Wooden Sign (LOGIC QUEST) - Compact In-World Sign */}
      <div className="relative z-40 mt-1 sm:mt-2">
        <FantasySign
          title="LOGIC QUEST"
          subtitle="Learn to think through code."
          hasRopes={true}
          hasVines={true}
        />
      </div>

      {/* Spacer to guarantee the center world and adventurer on the trail remain hero */}
      <div className="flex-1 w-full min-h-[140px] pointer-events-none" />

      {/* 4. Natural Adventure Actions (Tucked into bottom corners so center world shines) */}
      <div className="relative z-40 w-full max-w-6xl flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3 sm:gap-4 mb-2 sm:mb-4 px-2 sm:px-4">
        {/* Left Corner: Compact Quest Parchment Scroll */}
        <div className="w-full sm:max-w-[270px] bg-radial from-[#fef8e7] via-[#eedab2] to-[#cbb082] border-2 border-[#8b5a2b] p-3 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-1.5 mb-1 text-[#653609] border-b border-[#8b5a2b]/30 pb-1">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-adventure text-[11px] uppercase tracking-wider text-[#653609]">
              Active Quest
            </span>
          </div>
          <p className="font-medieval text-xs text-[#2a1405] leading-snug">
            Master the flow of sequential Python runes and decipher the valley mechanisms!
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-chunky text-[#78350f]">
            <span>Cleared: {Object.keys(progress.completedSubtopics).length} / 15</span>
            <span className="text-amber-800 font-bold">★ Score {progress.score}</span>
          </div>
        </div>

        {/* Right Corner: Tactile Wooden Menu Stack & Carved Stone Buttons */}
        <div className="flex flex-col items-center sm:items-end gap-2.5 w-full sm:w-auto">
          {/* Main Primary Action: Chunky Carved Gold/Wood Plank "CONTINUE ADVENTURE" */}
          <FantasyButton
            variant="gold"
            size="hero"
            onClick={onContinue}
            icon={<Play className="w-5 h-5 fill-current text-amber-950" />}
            starBadge="NEW"
            className="w-full sm:w-72 py-3.5 text-sm sm:text-base"
          >
            Continue Adventure
          </FantasyButton>

          {/* Secondary Action: Chunky Carved Wood Plank "WORLD MAP" */}
          <FantasyButton
            variant="wood"
            size="lg"
            onClick={onOpenWorldMap}
            icon={<Map className="w-4 h-4 text-amber-300" />}
            className="w-full sm:w-72 py-2.5 text-xs sm:text-sm"
          >
            World Map
          </FantasyButton>

          {/* Bottom Row of Carved Stone Icon Cubes */}
          <div className="flex items-center gap-2.5 mt-0.5">
            {/* Logic Profile Stone Button */}
            <FantasyButton
              variant="stone"
              size="icon"
              onClick={onOpenLogicProfile}
              title="Logic Profile"
              aria-label="Logic Profile"
            >
              <Award className="w-4 h-4 text-amber-300" />
            </FantasyButton>

            {/* Settings Stone Button */}
            <FantasyButton
              variant="stone"
              size="icon"
              onClick={onOpenSettings}
              title="Game Settings"
              aria-label="Game Settings"
            >
              <Settings className="w-4 h-4 text-slate-200" />
            </FantasyButton>
          </div>
        </div>
      </div>
    </div>
  );
};
