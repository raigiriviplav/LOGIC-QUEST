import React from 'react';
import { PlayerProgress } from '../../types/game';
import { sounds } from '../../utils/audio';
import { GameCharacter } from '../common/GameCharacter';
import { FantasyButton } from '../common/FantasyButton';
import { Award, Zap, X, Brain, Flame } from 'lucide-react';

interface LogicProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: PlayerProgress;
}

export const LogicProfileModal: React.FC<LogicProfileModalProps> = ({
  isOpen,
  onClose,
  progress,
}) => {
  if (!isOpen) return null;

  // Compute metrics
  const accuracy =
    progress.totalChallengesAttempted > 0
      ? Math.round((progress.totalChallengesCorrect / progress.totalChallengesAttempted) * 100)
      : 100;

  const avgTime =
    progress.totalChallengesAttempted > 0
      ? Math.round(progress.totalTimeSpentSeconds / progress.totalChallengesAttempted)
      : 12;

  // Logic rating formula: based on score, accuracy, and streak
  const logicRating = Math.round(
    400 + progress.score / 5 + accuracy * 3 + progress.flawlessStreak * 15
  );

  // Adventurer Title
  const getAdventurerTitle = () => {
    if (logicRating > 900) return 'Archmage of Computation';
    if (logicRating > 750) return 'Senior Logic Adept';
    if (logicRating > 600) return 'Journeyman Code-Ranger';
    return 'Apprentice Python Initiate';
  };

  const skillsList = [
    {
      name: 'Code Tracing',
      value: progress.skills.codeTracing,
      isLive: true,
      desc: 'Tracking variable mutations & sequential order',
    },
    {
      name: 'Problem Solving',
      value: progress.skills.problemSolving,
      isLive: true,
      desc: 'Decomposing dungeon puzzle mechanisms',
    },
    {
      name: 'Debugging',
      value: progress.skills.debugging,
      isLive: false,
      desc: 'Identifying syntax & runtime exceptions',
    },
    {
      name: 'Conditions',
      value: progress.skills.conditions,
      isLive: false,
      desc: 'World 2: Branching if / elif / else paths',
    },
    {
      name: 'Loops',
      value: progress.skills.loops,
      isLive: false,
      desc: 'World 3: Iteration with for & while gears',
    },
    {
      name: 'AI Verification',
      value: progress.skills.aiVerification,
      isLive: false,
      desc: 'World 9: Verifying synthetic code scrolls',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-radial from-[#faf2df] via-[#ebd9b4] to-[#cbb082] rounded-3xl border-4 border-[#783e15] shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#4d2811] via-[#381a07] to-[#251004] px-6 py-4 border-b-4 border-[#6b3815] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-7 h-7 text-amber-400" />
            <div>
              <h2 className="font-adventure text-lg md:text-xl text-[#fef08a] tracking-wide">
                ADVENTURER LOGIC PROFILE
              </h2>
              <p className="text-xs text-amber-200/80 font-medieval italic">
                Folio of Computational Aptitude & Mastery
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-[#27140a] hover:bg-[#3d2010] border border-[#7a5229] text-amber-200 flex items-center justify-center cursor-pointer shadow"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dossier Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-5 text-[#2b180d]">
          {/* Character Identity Card */}
          <div className="bg-[#f5e7c8] p-4 rounded-2xl border-2 border-[#8b5a2b] flex flex-col sm:flex-row items-center gap-5 shadow-sm">
            {/* Illustrated 2D Adventurer */}
            <div className="w-28 h-32 bg-[#1f130b] rounded-2xl border-2 border-[#caa359] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              <GameCharacter mood="adventuring" size="sm" showShadow={false} />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-adventure text-lg text-[#351b0a]">
                  Pip the Explorer
                </h3>
                <span className="bg-[#5c371d] text-amber-200 text-[10px] font-adventure px-2 py-0.5 rounded-full border border-amber-600/50">
                  World 1 Explorer
                </span>
              </div>
              <div className="text-xs font-adventure text-amber-900 mt-0.5">
                {getAdventurerTitle()}
              </div>

              {/* XP & Coin indicators */}
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 text-xs font-adventure">
                <div className="flex items-center gap-1.5 bg-[#fdfaf3] px-3 py-1 rounded-xl border border-[#c19f6a] shadow-xs">
                  <Zap className="w-3.5 h-3.5 text-blue-700" />
                  <span className="text-[#2a1708]">{progress.xp} XP</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#fdfaf3] px-3 py-1 rounded-xl border border-[#c19f6a] shadow-xs">
                  <span className="text-amber-600">🪙</span>
                  <span className="text-[#2a1708]">{progress.coins} Coins</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#fdfaf3] px-3 py-1 rounded-xl border border-[#c19f6a] shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-orange-600" />
                  <span className="text-[#2a1708]">{progress.flawlessStreak} Streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Analytics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#f5e7c8] p-3 rounded-2xl border border-[#9d7445] text-center shadow-sm">
              <span className="text-[10px] uppercase font-adventure text-[#694017] block">
                Logic Rating
              </span>
              <span className="font-adventure text-xl text-[#3d2212] mt-0.5 block">
                {logicRating}
              </span>
              <span className="text-[10px] text-[#7d5225] font-medieval italic">Top 15% Adventurer</span>
            </div>

            <div className="bg-[#f5e7c8] p-3 rounded-2xl border border-[#9d7445] text-center shadow-sm">
              <span className="text-[10px] uppercase font-adventure text-[#694017] block">
                Accuracy
              </span>
              <span className="font-adventure text-xl text-emerald-800 mt-0.5 block">
                {accuracy}%
              </span>
              <span className="text-[10px] text-[#7d5225] font-chunky">
                {progress.totalChallengesCorrect} / {progress.totalChallengesAttempted} Solved
              </span>
            </div>

            <div className="bg-[#f5e7c8] p-3 rounded-2xl border border-[#9d7445] text-center shadow-sm">
              <span className="text-[10px] uppercase font-adventure text-[#694017] block">
                Average Time
              </span>
              <span className="font-adventure text-xl text-amber-900 mt-0.5 block">
                {avgTime}s
              </span>
              <span className="text-[10px] text-[#7d5225] font-medieval italic">Cautious Tracing</span>
            </div>

            <div className="bg-[#f5e7c8] p-3 rounded-2xl border border-[#9d7445] text-center shadow-sm">
              <span className="text-[10px] uppercase font-adventure text-[#694017] block">
                World Progress
              </span>
              <span className="font-adventure text-xl text-blue-900 mt-0.5 block">
                1 / 10
              </span>
              <span className="text-[10px] text-[#7d5225] font-medieval italic">World 1: Active</span>
            </div>
          </div>

          {/* Skill Mastery Section */}
          <div className="bg-[#f5e7c8] p-4 rounded-2xl border-2 border-[#8b5a2b] shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#ba9a6f] pb-2">
              <div className="flex items-center gap-2 font-adventure text-sm text-[#3b200d]">
                <Brain className="w-4 h-4 text-amber-800" />
                <span>Skill Mastery Index</span>
              </div>
              <span className="text-[11px] text-[#694017] font-medieval italic">
                Live Diagnostic vs Locked
              </span>
            </div>

            <div className="flex flex-col gap-3 pt-1">
              {skillsList.map((skill, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-adventure text-[#381e0a]">
                        {skill.name}
                      </span>
                      {skill.isLive ? (
                        <span className="text-[9px] bg-emerald-800 text-emerald-100 font-adventure px-1.5 py-0.5 rounded-full">
                          Active Data
                        </span>
                      ) : (
                        <span className="text-[9px] bg-[#664b38] text-stone-300 font-adventure px-1.5 py-0.5 rounded-full">
                          Unlocks Later
                        </span>
                      )}
                    </div>
                    <span className="font-code font-bold text-xs text-[#4a2e12]">
                      {skill.value}%
                    </span>
                  </div>

                  {/* Meter Bar */}
                  <div className="w-full h-3 rounded-full bg-[#382113] border border-[#5e381f] p-0.5 overflow-hidden shadow-inner">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        skill.isLive
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.5)]'
                          : 'bg-stone-500/40'
                      }`}
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-[#6b4724] font-medieval italic">
                    {skill.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#4d2811] to-[#251004] px-6 py-3 border-t-4 border-[#6b3815] flex justify-end">
          <FantasyButton
            variant="wood"
            size="sm"
            onClick={onClose}
          >
            Close Folio
          </FantasyButton>
        </div>
      </div>
    </div>
  );
};
