import { LevelTier, ScoreBreakdown } from '../../types/game';

export interface ChallengeScoreParams {
  baseScore: number;
  tier: LevelTier;
  elapsedSeconds: number;
  allowedSeconds: number;
  remainingLives: number;
  isFlawlessRoundSoFar: boolean;
}

export class ScoreSystem {
  /**
   * Calculates score for an individual challenge
   */
  public static calculateChallengeScore(params: ChallengeScoreParams) {
    const {
      baseScore,
      tier,
      elapsedSeconds,
      allowedSeconds,
      remainingLives,
      isFlawlessRoundSoFar,
    } = params;

    const base = Math.max(100, baseScore);
    const difficultyMultiplier = tier === 1 ? 0 : tier === 2 ? 60 : 120;
    const remainingTime = Math.max(0, allowedSeconds - elapsedSeconds);
    const timeBonus = Math.round((remainingTime / allowedSeconds) * 50);
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

  /**
   * Calculates overall round score breakdown for victory screen
   */
  public static calculateRoundSummary(params: {
    completedCount: number;
    remainingLives: number;
    totalTimeSpentSeconds: number;
    tier: LevelTier;
    isFlawless: boolean;
  }): ScoreBreakdown {
    const { completedCount, remainingLives, totalTimeSpentSeconds, tier, isFlawless } = params;

    const baseScore = completedCount * 120;
    // Speed preservation: quicker average answer gives higher bonus
    const averageTimePerChallenge = completedCount > 0 ? totalTimeSpentSeconds / completedCount : 30;
    const timeBonus = Math.max(20, Math.round((45 - Math.min(40, averageTimePerChallenge)) * 4));

    let lifeBonus = 0;
    if (remainingLives >= 3) lifeBonus = 150;
    else if (remainingLives === 2) lifeBonus = 75;
    else if (remainingLives === 1) lifeBonus = 25;

    const multiplier = tier === 3 ? 1.5 : tier === 2 ? 1.2 : 1.0;
    const preDifficulty = baseScore + timeBonus + lifeBonus;
    const difficultyBonus = Math.round(preDifficulty * (multiplier - 1.0));
    const flawlessBonus = isFlawless && remainingLives >= 3 ? 200 : 0;

    const finalScore = preDifficulty + difficultyBonus + flawlessBonus;

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
}
