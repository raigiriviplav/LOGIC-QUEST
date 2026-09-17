import React from 'react';
import { CurrentRoundState, PlayerProgress, ScoreBreakdown } from '../types/game';
import { calculateFinalScore } from '../utils/scoring';
import { sounds } from '../utils/audio';
import { GameCharacter } from '../components/common/GameCharacter';
import { FantasyButton } from '../components/common/FantasyButton';
import { ParchmentPanel } from '../components/common/ParchmentPanel';
import { DecorativeVines } from '../components/common/DecorativeVines';
import { Trophy, Skull, Sparkles, Brain, RotateCcw, ArrowRight, Map, Star } from 'lucide-react';

interface RoundSummaryScreenProps {
  round: CurrentRoundState;
  progress: PlayerProgress;
  onNextLevel: () => void;
  onRetryLevel: () => void;
  onOpenWorldMap: () => void;
  onOpenAiMentor: () => void;
}

export const RoundSummaryScreen: React.FC<RoundSummaryScreenProps> = ({
  round,
  progress,
  onNextLevel,
  onRetryLevel,
  onOpenWorldMap,
  onOpenAiMentor,
}) => {
  const isVictory = round.status === 'victory';

  // Calculate score breakdown
  const challengesCount =
    round.subtopic.levels.find((l) => l.tier === round.tier)?.challenges.length || 3;
  const breakdown: ScoreBreakdown = isVictory
    ? calculateFinalScore({
        completedCount: challengesCount,
        remainingLives: round.lives,
        remainingTimeSeconds: Math.max(
          0,
          45 - Math.floor((Date.now() - round.challengeStartTime) / 1000)
        ),
        tier: round.tier,
      })
    : {
        baseScore: 0,
        timeBonus: 0,
        lifeBonus: 0,
        difficultyMultiplier: 1.0,
        difficultyBonus: 0,
        flawlessBonus: 0,
        finalScore: round.roundScore,
      };

  return (
    <div
      id="round-summary-screen"
      className="relative w-full min-h-screen bg-[#1c1108] p-4 md:p-8 flex items-center justify-center select-none overflow-x-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#381f10] via-[#201006] to-[#0d0603] pointer-events-none" />

      {/* Main Parchment Quest Dossier */}
      <div className="relative w-full max-w-2xl z-20">
        <ParchmentPanel
          hasPins={true}
          hasSeal={true}
          sealColor={isVictory ? 'gold' : 'red'}
          className="p-6 md:p-8 flex flex-col items-center text-center animate-fade-in"
        >
          {/* Decorative Corner Vines */}
          <DecorativeVines position="top-left" />
          <DecorativeVines position="top-right" />

          {/* Full-Body Adventurer Character celebrating or recovering */}
          <div className="mb-2">
            <GameCharacter
              mood={isVictory ? 'victorious' : 'defeat'}
              size="lg"
              showShadow={true}
            />
          </div>

          {/* Result Header */}
          {isVictory ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-amber-700 mb-1">
                <Trophy className="w-5 h-5 text-amber-600 animate-bounce" />
                <span className="font-adventure text-xs uppercase tracking-widest text-amber-800">
                  Quest Victory
                </span>
                <Trophy className="w-5 h-5 text-amber-600 animate-bounce" />
              </div>
              <h1 className="font-adventure text-2xl md:text-3xl text-carved-gold tracking-wide">
                LEVEL {round.tier} CONQUERED!
              </h1>
              <p className="font-medieval text-sm text-[#5c3716] mt-0.5">
                The runes yielded to your reasoning in Subtopic {round.subtopic.code}.
              </p>

              {/* Subtopic 1.1 Completion Milestone Celebration */}
              {round.tier === 3 && (
                <div className="w-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-amber-600/70 rounded-xl p-3 mt-3 flex items-center justify-center gap-2 shadow-sm animate-pulse">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <div className="text-center">
                    <div className="font-adventure text-xs sm:text-sm text-amber-950 font-bold">
                      SUBTOPIC {round.subtopic.code} FULLY MASTERED: {round.subtopic.title.toUpperCase()}!
                    </div>
                    <div className="text-[11px] font-medieval text-amber-900">
                      All 3 Tiers (Understand, Apply, Master) conquered. Realm path to 1.2 is open!
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-red-700 mb-1">
                <Skull className="w-5 h-5 text-red-600" />
                <span className="font-adventure text-xs uppercase tracking-widest text-red-800">
                  Chamber Collapse
                </span>
              </div>
              <h1 className="font-adventure text-2xl md:text-3xl text-[#59140c] tracking-wide">
                DEFEAT: RUNES UNSTABLE
              </h1>
              <p className="font-medieval text-sm text-[#78281a] mt-0.5">
                All 3 lives were lost to logic misfires. Review your traces and try once more!
              </p>
            </div>
          )}

          {/* Score Ledger Calculation */}
          {isVictory && (
            <div className="w-full bg-[#f4e4c3] rounded-2xl p-4 border-2 border-[#8b5a2b] my-4 text-left text-xs font-chunky shadow-inner">
              <div className="flex items-center justify-between border-b border-[#a1703e] pb-2 mb-2.5">
                <span className="font-adventure text-sm text-[#351a08] flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-700 fill-current" />
                  Score Ledger
                </span>
                <span className="text-[11px] font-adventure text-[#694017]">
                  Tier {round.tier} Mastery
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-[#4a2e16]">
                <div>Base Challenges (3x):</div>
                <div className="text-right font-code font-bold text-[#2a1708]">
                  +{breakdown.baseScore} pts
                </div>

                <div>Life Bonus ({round.lives} lives remaining):</div>
                <div className="text-right font-code font-bold text-emerald-800">
                  +{breakdown.lifeBonus} pts
                </div>

                <div>Time Bonus (speed preservation):</div>
                <div className="text-right font-code font-bold text-[#2a1708]">
                  +{breakdown.timeBonus} pts
                </div>

                <div>Difficulty Multiplier (Tier {round.tier}):</div>
                <div className="text-right font-code font-bold text-[#2a1708]">
                  ×{breakdown.difficultyMultiplier}
                </div>

                {breakdown.flawlessBonus > 0 && (
                  <>
                    <div className="text-amber-800 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Flawless Victory Bonus:</span>
                    </div>
                    <div className="text-right font-code font-bold text-amber-800">
                      +{breakdown.flawlessBonus} pts
                    </div>
                  </>
                )}
              </div>

              <div className="border-t-2 border-[#8b5a2b] mt-3 pt-2 flex items-center justify-between font-adventure text-sm text-[#2a1406]">
                <span>TOTAL ROUND SCORE</span>
                <span className="font-code text-lg text-amber-900">
                  {breakdown.finalScore} PTS
                </span>
              </div>
            </div>
          )}

          {/* Spoils & Rewards */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-2 text-xs font-adventure">
            <div className="flex items-center gap-1.5 bg-[#ebd7af] px-3.5 py-1.5 rounded-xl border border-[#946938] text-[#331c0a] shadow-sm">
              <span>🪙</span>
              <span>+{isVictory ? (breakdown.flawlessBonus > 0 ? 35 : 20) : 5} Coins</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#ebd7af] px-3.5 py-1.5 rounded-xl border border-[#946938] text-[#331c0a] shadow-sm">
              <span>✨</span>
              <span>+{isVictory ? Math.round(breakdown.finalScore / 10) : 15} XP</span>
            </div>
            {breakdown.flawlessBonus > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-200/90 px-3.5 py-1.5 rounded-xl border border-amber-600 text-amber-950 shadow-sm">
                <span>🔥</span>
                <span>Flawless!</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3 mt-4">
            {/* AI Mentor Review Mistakes Option */}
            <FantasyButton
              variant="wood"
              size="md"
              onClick={onOpenAiMentor}
              icon={<Brain className="w-4 h-4 text-amber-300" />}
              className="flex-1"
            >
              Review Mistakes
            </FantasyButton>

            {isVictory ? (
              <FantasyButton
                variant="gold"
                size="md"
                onClick={onNextLevel}
                icon={<ArrowRight className="w-4 h-4 text-amber-950" />}
                className="flex-1"
              >
                Continue
              </FantasyButton>
            ) : (
              <FantasyButton
                variant="gold"
                size="md"
                onClick={onRetryLevel}
                icon={<RotateCcw className="w-4 h-4 text-amber-950" />}
                className="flex-1"
              >
                Retry Level
              </FantasyButton>
            )}
          </div>

          {/* Back to Map button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenWorldMap();
            }}
            className="mt-3 text-xs text-[#784d23] hover:text-[#3d2210] font-adventure flex items-center gap-1.5 cursor-pointer select-none"
          >
            <Map className="w-3.5 h-3.5" />
            <span>Return to World Map</span>
          </button>
        </ParchmentPanel>
      </div>
    </div>
  );
};
