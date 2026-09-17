import { LevelTier, ScoreBreakdown } from '../types/game';

export type { ScoreBreakdown };

export function calculateChallengeScore(params: {
  baseScore: number;
  tier: LevelTier;
  elapsedSeconds: number;
  timeLimitSeconds?: number;
  remainingLives: number;
  isFlawlessRoundSoFar: boolean;
}) {
  const {
    baseScore,
    tier,
    elapsedSeconds,
    timeLimitSeconds = 30,
    remainingLives,
    isFlawlessRoundSoFar,
  } = params;

  const base = Math.max(100, baseScore);
  const difficultyMultiplier = tier === 1 ? 0 : tier === 2 ? 60 : 120;
  const timeAllowance = Math.max(10, timeLimitSeconds);
  const timeRatio = Math.max(0, (timeAllowance - elapsedSeconds) / timeAllowance);
  const timeBonus = Math.round(timeRatio * 40);
  const lifeBonus = remainingLives * 25;
  const flawlessBonus = isFlawlessRoundSoFar ? 50 : 0;

  const totalScore = base + difficultyMultiplier + timeBonus + lifeBonus + flawlessBonus;

  return {
    baseScore: base,
    timeBonus,
    lifeBonus,
    difficultyBonus: difficultyMultiplier,
    flawlessBonus,
    totalScore,
  };
}

export function calculateFinalScore(params: {
  completedCount: number;
  remainingLives: number;
  remainingTimeSeconds: number;
  tier: LevelTier;
}): ScoreBreakdown {
  const { completedCount, remainingLives, remainingTimeSeconds, tier } = params;

  // Base Challenge Score: +100 points per challenge
  const baseScore = completedCount * 100;

  // Time Bonus: remaining_time × 2 points
  const timeBonus = Math.max(0, remainingTimeSeconds * 2);

  // Life Bonus: 3 lives: +150, 2 lives: +75, 1 life: +25
  let lifeBonus = 0;
  if (remainingLives >= 3) lifeBonus = 150;
  else if (remainingLives === 2) lifeBonus = 75;
  else if (remainingLives === 1) lifeBonus = 25;

  // Difficulty multiplier: Level 1: x1.0, Level 2: x1.2, Level 3: x1.5
  const multiplier = tier === 3 ? 1.5 : tier === 2 ? 1.2 : 1.0;
  const preDifficultyTotal = baseScore + timeBonus + lifeBonus;
  const difficultyBonus = Math.round(preDifficultyTotal * (multiplier - 1.0));

  // Flawless Bonus: If player finishes with all 3 lives: +200 bonus
  const flawlessBonus = remainingLives >= 3 ? 200 : 0;

  const finalScore = preDifficultyTotal + difficultyBonus + flawlessBonus;

  return {
    baseScore,
    timeBonus,
    lifeBonus,
    difficultyMultiplier: multiplier,
    difficultyBonus,
    flawlessBonus,
    finalScore,
  };
}
