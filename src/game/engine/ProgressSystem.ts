import { PlayerProgress, LevelTier, MistakeRecord } from '../../types/game';

const STORAGE_KEY = 'logicquest_save_data_v1';

export const initialProgress: PlayerProgress = {
  xp: 120,
  coins: 45,
  score: 640,
  currentWorldId: 1,
  currentTopicId: 'top_1_1',
  currentSubtopicId: 'sub_1_1',
  currentLevelTier: 1,
  unlockedWorldMax: 1,
  completedSubtopics: {},
  flawlessStreak: 0,
  totalChallengesAttempted: 0,
  totalChallengesCorrect: 0,
  totalTimeSpentSeconds: 0,
  mistakesHistory: [],
  skills: {
    codeTracing: 50,
    conditions: 10,
    loops: 5,
    debugging: 30,
    problemSolving: 50,
    aiVerification: 10,
  },
};

export class ProgressSystem {
  public static load(): PlayerProgress {
    if (typeof window === 'undefined') return initialProgress;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initialProgress;
      const parsed = JSON.parse(raw);
      return { ...initialProgress, ...parsed };
    } catch {
      return initialProgress;
    }
  }

  public static save(prog: PlayerProgress): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
    } catch {
      // ignore
    }
  }

  public static reset(): PlayerProgress {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    return initialProgress;
  }

  /**
   * Applies reward and stats updates after completing a challenge or level
   */
  public static recordLevelCompletion(params: {
    prevProgress: PlayerProgress;
    subtopicId: string;
    tier: LevelTier;
    scoreEarned: number;
    xpEarned: number;
    coinsEarned: number;
    timeSpentSeconds: number;
    isFlawless: boolean;
    challengesCount: number;
  }): PlayerProgress {
    const {
      prevProgress,
      subtopicId,
      tier,
      scoreEarned,
      xpEarned,
      coinsEarned,
      timeSpentSeconds,
      isFlawless,
      challengesCount,
    } = params;

    const currentTierRecord = prevProgress.completedSubtopics[subtopicId] || 0;
    const updatedCompleted = { ...prevProgress.completedSubtopics };
    if (tier > currentTierRecord) {
      updatedCompleted[subtopicId] = tier;
    }

    const newStreak = isFlawless ? prevProgress.flawlessStreak + 1 : 0;
    const newTracing = Math.min(100, prevProgress.skills.codeTracing + (tier * 3));
    const newProblemSolving = Math.min(100, prevProgress.skills.problemSolving + (tier * 2));

    const updated: PlayerProgress = {
      ...prevProgress,
      score: prevProgress.score + scoreEarned,
      xp: prevProgress.xp + xpEarned,
      coins: prevProgress.coins + coinsEarned,
      completedSubtopics: updatedCompleted,
      flawlessStreak: newStreak,
      totalChallengesAttempted: prevProgress.totalChallengesAttempted + challengesCount,
      totalChallengesCorrect: prevProgress.totalChallengesCorrect + challengesCount,
      totalTimeSpentSeconds: prevProgress.totalTimeSpentSeconds + timeSpentSeconds,
      skills: {
        ...prevProgress.skills,
        codeTracing: newTracing,
        problemSolving: newProblemSolving,
      },
    };

    ProgressSystem.save(updated);
    return updated;
  }

  public static recordMistake(prevProgress: PlayerProgress, mistake: MistakeRecord): PlayerProgress {
    const updated: PlayerProgress = {
      ...prevProgress,
      totalChallengesAttempted: prevProgress.totalChallengesAttempted + 1,
      flawlessStreak: 0,
      mistakesHistory: [mistake, ...prevProgress.mistakesHistory.slice(0, 49)],
    };
    ProgressSystem.save(updated);
    return updated;
  }
}
