import { LevelTier, GameModeId } from '../../types/game';

export interface TimerCalculationParams {
  baseTimeSeconds?: number;
  code: string;
  tier: LevelTier;
  mode: GameModeId;
  difficultyModifier?: number;
}

export class TimerSystem {
  /**
   * Calculates the dynamic challenge time allowance based on:
   * Base Time x Code Complexity x Difficulty Modifier x Mode Modifier
   */
  public static calculateAllowedSeconds(params: TimerCalculationParams): number {
    const { baseTimeSeconds = 30, code, tier, mode, difficultyModifier } = params;

    // 1. Code Complexity factor: lines of code
    const lines = code.trim().split('\n').filter(l => l.trim().length > 0).length;
    let complexityFactor = 1.0;
    if (lines <= 2) {
      complexityFactor = 1.0;
    } else if (lines <= 4) {
      complexityFactor = 1.15;
    } else {
      complexityFactor = 1.35;
    }

    // 2. Difficulty Modifier based on tier
    let diffFactor = difficultyModifier ?? (tier === 1 ? 1.0 : tier === 2 ? 1.25 : 1.5);

    // 3. Mode Modifier
    let modeFactor = 1.0;
    if (mode === 'WHAT_HAPPENS_NEXT') modeFactor = 1.0;
    else if (mode === 'ESCAPE_ROOM') modeFactor = 1.1;
    else if (mode === 'CODE_DETECTIVE') modeFactor = 1.05;

    const totalSeconds = Math.round(baseTimeSeconds * complexityFactor * diffFactor * modeFactor);
    // Guarantee minimum 25s, maximum 90s
    return Math.max(25, Math.min(90, totalSeconds));
  }

  /**
   * Formats remaining seconds into mm:ss
   */
  public static formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
