import { LevelTier, PlayerProgress, Subtopic } from '../../types/game';

export class LevelSystem {
  /**
   * Checks whether a specific level tier (1, 2, 3) in a subtopic is unlocked
   */
  public static isLevelUnlocked(subtopicId: string, tier: LevelTier, progress: PlayerProgress): boolean {
    if (tier === 1) return true; // Level 1 is always unlocked within an unlocked subtopic
    const highestCleared = progress.completedSubtopics[subtopicId] || 0;
    return highestCleared >= tier - 1;
  }

  /**
   * Checks whether a specific level tier has been cleared
   */
  public static isLevelCleared(subtopicId: string, tier: LevelTier, progress: PlayerProgress): boolean {
    const highestCleared = progress.completedSubtopics[subtopicId] || 0;
    return highestCleared >= tier;
  }

  /**
   * Checks whether an entire subtopic (all 3 levels) is cleared
   */
  public static isSubtopicComplete(subtopicId: string, progress: PlayerProgress): boolean {
    const highestCleared = progress.completedSubtopics[subtopicId] || 0;
    return highestCleared >= 3;
  }

  /**
   * Checks whether a subtopic is unlocked in sequential progression order
   */
  public static isSubtopicUnlocked(
    subtopic: Subtopic,
    allSubtopics: Subtopic[],
    progress: PlayerProgress
  ): boolean {
    const index = allSubtopics.findIndex((s) => s.id === subtopic.id);
    if (index <= 0) return true; // First subtopic (1.1) is always unlocked
    
    // Previous subtopic must be completed (tier 3 reached)
    const prevSubtopic = allSubtopics[index - 1];
    return this.isSubtopicComplete(prevSubtopic.id, progress);
  }

  /**
   * Counts how many subtopics are fully completed in World 1
   */
  public static getCompletedSubtopicsCount(progress: PlayerProgress, worldPrefix: string = 'sub_1_'): number {
    return Object.entries(progress.completedSubtopics).filter(
      ([id, tier]) => id.startsWith(worldPrefix) && tier >= 3
    ).length;
  }

  /**
   * Checks if the Foundation Guardian boss is unlocked (all 15 subtopics completed)
   */
  public static isWorld1BossUnlocked(progress: PlayerProgress): boolean {
    return this.getCompletedSubtopicsCount(progress, 'sub_1_') >= 15;
  }
}

