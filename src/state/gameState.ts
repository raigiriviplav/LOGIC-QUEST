import { useState, useEffect } from 'react';
import { PlayerProgress, CurrentRoundState, Subtopic, LevelTier, MistakeRecord, GameScreen } from '../types/game';
import { subtopicsWorld1 } from '../data/worlds';
import { calculateChallengeScore } from '../utils/scoring';
import { sounds } from '../utils/audio';

const STORAGE_KEY = 'logicquest_save_data_v1';

const defaultProgress: PlayerProgress = {
  xp: 120,
  coins: 45,
  score: 640,
  currentWorldId: 1,
  currentTopicId: 'top_1_1',
  currentSubtopicId: 'sub_1_1',
  currentLevelTier: 1,
  unlockedWorldMax: 1,
  completedSubtopics: {},
  flawlessStreak: 2,
  totalChallengesAttempted: 14,
  totalChallengesCorrect: 12,
  totalTimeSpentSeconds: 420,
  mistakesHistory: [],
  skills: {
    codeTracing: 68,
    conditions: 15,
    loops: 5,
    debugging: 35,
    problemSolving: 60,
    aiVerification: 10,
  },
};

export function loadProgress(): PlayerProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(prog: PlayerProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prog));
  } catch {
    // ignore
  }
}

export function useGameState() {
  const [progress, setProgress] = useState<PlayerProgress>(loadProgress);
  const [currentRound, setCurrentRound] = useState<CurrentRoundState | null>(null);
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('MAIN_MENU');

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const goToScreen = (screen: GameScreen) => {
    setCurrentScreen(screen);
  };

  const resetAllProgress = () => {
    setProgress(defaultProgress);
    saveProgress(defaultProgress);
  };

  const startRound = (subtopic: Subtopic, tier: LevelTier) => {
    const currentChallenges = subtopic.levels.find(l => l.tier === tier)?.challenges || [];
    if (currentChallenges.length === 0) {
      console.warn('No challenges in this tier');
    }
    const round: CurrentRoundState = {
      subtopic,
      tier,
      challengeIndex: 0,
      lives: 3,
      maxLives: 3,
      roundScore: 0,
      roundStartTime: Date.now(),
      challengeStartTime: Date.now(),
      completedChallenges: 0,
      mistakesThisRound: [],
      isFlawless: true,
      status: 'playing',
      lastShortFeedback: null,
      lastAnswerCorrect: null,
    };
    setCurrentRound(round);
    setCurrentScreen('GAMEPLAY');
    sounds.playMechanismClank();
  };

  const submitAnswer = (selectedId: string): { isCorrect: boolean; feedback: string } => {
    if (!currentRound || currentRound.status !== 'playing') {
      return { isCorrect: false, feedback: '' };
    }

    const currentChallenges = currentRound.subtopic.levels.find(l => l.tier === currentRound.tier)?.challenges || [];
    const activeChallenge = currentChallenges[currentRound.challengeIndex];
    if (!activeChallenge) {
      return { isCorrect: false, feedback: '' };
    }

    const elapsedSeconds = Math.max(1, Math.round((Date.now() - currentRound.challengeStartTime) / 1000));
    const isCorrect = selectedId === activeChallenge.correctAnswerId;

    if (isCorrect) {
      sounds.playCorrect();

      // Score calculation
      const scoreResult = calculateChallengeScore({
        baseScore: activeChallenge.baseScore,
        tier: currentRound.tier,
        elapsedSeconds,
        timeLimitSeconds: activeChallenge.timeLimitSeconds,
        remainingLives: currentRound.lives,
        isFlawlessRoundSoFar: currentRound.isFlawless,
      });

      const nextChallengeIndex = currentRound.challengeIndex + 1;
      const isRoundFinished = nextChallengeIndex >= currentChallenges.length;

      // Update player progress
      setProgress(prev => {
        const newScore = prev.score + scoreResult.totalScore;
        const newXp = prev.xp + 40 + (currentRound.tier * 20);
        const newCoins = prev.coins + 15 + (currentRound.lives * 5);
        const newStreak = prev.flawlessStreak + (currentRound.isFlawless ? 1 : 0);
        
        // Track completed subtopic highest tier
        const updatedCompleted = { ...prev.completedSubtopics };
        const currentTierRecord = updatedCompleted[currentRound.subtopic.id] || 0;
        if (isRoundFinished && currentRound.tier > currentTierRecord) {
          updatedCompleted[currentRound.subtopic.id] = currentRound.tier;
        }

        // Boost code tracing & problem solving skill
        const newTracing = Math.min(100, prev.skills.codeTracing + 2);
        const newProblemSolving = Math.min(100, prev.skills.problemSolving + 2);

        return {
          ...prev,
          score: newScore,
          xp: newXp,
          coins: newCoins,
          flawlessStreak: newStreak,
          completedSubtopics: updatedCompleted,
          totalChallengesAttempted: prev.totalChallengesAttempted + 1,
          totalChallengesCorrect: prev.totalChallengesCorrect + 1,
          totalTimeSpentSeconds: prev.totalTimeSpentSeconds + elapsedSeconds,
          skills: {
            ...prev.skills,
            codeTracing: newTracing,
            problemSolving: newProblemSolving,
          },
        };
      });

      if (isRoundFinished) {
        sounds.playVictoryFanfare();
        setCurrentRound(prev => prev ? ({
          ...prev,
          roundScore: prev.roundScore + scoreResult.totalScore,
          completedChallenges: prev.completedChallenges + 1,
          status: 'victory',
          lastShortFeedback: activeChallenge.successFeedback,
          lastAnswerCorrect: true,
        }) : null);
      } else {
        setCurrentRound(prev => prev ? ({
          ...prev,
          roundScore: prev.roundScore + scoreResult.totalScore,
          completedChallenges: prev.completedChallenges + 1,
          challengeIndex: nextChallengeIndex,
          challengeStartTime: Date.now(),
          lastShortFeedback: activeChallenge.successFeedback,
          lastAnswerCorrect: true,
        }) : null);
      }

      return { isCorrect: true, feedback: activeChallenge.successFeedback };
    } else {
      sounds.playWrong();
      const newLives = currentRound.lives - 1;

      // Log mistake for AI Mentor review
      const mistake: MistakeRecord = {
        timestamp: Date.now(),
        challengeId: activeChallenge.id,
        challengeTitle: activeChallenge.title,
        subtopicCode: currentRound.subtopic.code,
        selectedAnswer: selectedId,
        correctAnswer: activeChallenge.correctAnswerId,
        code: activeChallenge.code,
        mentorExplanation: activeChallenge.mentorExplanation,
        shortFeedback: activeChallenge.shortFailureFeedback,
      };

      setProgress(prev => ({
        ...prev,
        totalChallengesAttempted: prev.totalChallengesAttempted + 1,
        totalTimeSpentSeconds: prev.totalTimeSpentSeconds + elapsedSeconds,
        flawlessStreak: 0,
        mistakesHistory: [mistake, ...prev.mistakesHistory.slice(0, 49)],
      }));

      if (newLives <= 0) {
        setCurrentRound(prev => prev ? ({
          ...prev,
          lives: 0,
          isFlawless: false,
          mistakesThisRound: [...prev.mistakesThisRound, mistake],
          status: 'game_over',
          lastShortFeedback: activeChallenge.shortFailureFeedback,
          lastAnswerCorrect: false,
        }) : null);
      } else {
        setCurrentRound(prev => prev ? ({
          ...prev,
          lives: newLives,
          isFlawless: false,
          mistakesThisRound: [...prev.mistakesThisRound, mistake],
          lastShortFeedback: activeChallenge.shortFailureFeedback,
          lastAnswerCorrect: false,
        }) : null);
      }

      return { isCorrect: false, feedback: activeChallenge.shortFailureFeedback };
    }
  };

  const clearCurrentRound = () => {
    setCurrentRound(null);
  };

  const finishRound = () => {
    setCurrentScreen('ROUND_SUMMARY');
  };

  const recentMistakes = currentRound && currentRound.mistakesThisRound.length > 0
    ? currentRound.mistakesThisRound
    : progress.mistakesHistory.slice(0, 5);

  return {
    progress,
    setProgress,
    currentScreen,
    currentRound,
    recentMistakes,
    goToScreen,
    startRound,
    submitAnswer,
    finishRound,
    clearCurrentRound,
    resetProgress: resetAllProgress,
    resetAllProgress,
  };
}
