import { LevelTier } from '../../types/game';

export interface RewardResult {
  xp: number;
  coins: number;
  isFlawless: boolean;
  breakdown: {
    baseXp: number;
    baseCoins: number;
    lifeBonusXp: number;
    lifeBonusCoins: number;
    flawlessXp: number;
    flawlessCoins: number;
  };
}

export class RewardSystem {
  public static calculateLevelRewards(params: {
    tier: LevelTier;
    remainingLives: number;
    isFlawless: boolean;
    isVictory: boolean;
  }): RewardResult {
    const { tier, remainingLives, isFlawless, isVictory } = params;

    if (!isVictory) {
      // Partial consolation for defeat
      return {
        xp: 15,
        coins: 5,
        isFlawless: false,
        breakdown: {
          baseXp: 15,
          baseCoins: 5,
          lifeBonusXp: 0,
          lifeBonusCoins: 0,
          flawlessXp: 0,
          flawlessCoins: 0,
        },
      };
    }

    const baseXpByTier = { 1: 50, 2: 75, 3: 100 };
    const baseCoinsByTier = { 1: 20, 2: 30, 3: 40 };

    const baseXp = baseXpByTier[tier];
    const baseCoins = baseCoinsByTier[tier];

    const lifeBonusXp = remainingLives * 10;
    const lifeBonusCoins = remainingLives * 5;

    const flawlessXp = isFlawless ? 50 : 0;
    const flawlessCoins = isFlawless ? 25 : 0;

    const totalXp = baseXp + lifeBonusXp + flawlessXp;
    const totalCoins = baseCoins + lifeBonusCoins + flawlessCoins;

    return {
      xp: totalXp,
      coins: totalCoins,
      isFlawless,
      breakdown: {
        baseXp,
        baseCoins,
        lifeBonusXp,
        lifeBonusCoins,
        flawlessXp,
        flawlessCoins,
      },
    };
  }

  public static calculateSubtopicClearBonus(isAllFlawless: boolean): { bonusXp: number; bonusCoins: number } {
    return {
      bonusXp: isAllFlawless ? 250 : 150,
      bonusCoins: isAllFlawless ? 80 : 50,
    };
  }
}
