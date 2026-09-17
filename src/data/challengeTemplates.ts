import { Challenge, GameModeId, LevelTier, ChallengeOption } from '../types/game';

export interface BaseChallengeParams {
  id: string;
  title: string;
  objective: string;
  gameplayContext: string;
  code: string;
  mode: GameModeId;
  tier: LevelTier;
  question: string;
  options: ChallengeOption[];
  correctAnswerId: string;
  concepts: string[];
  reactionType: 'rune' | 'gate' | 'torch' | 'chest' | 'energy' | 'coins' | 'bridge' | 'crystal' | 'compass' | 'dash';
  reactionFinalValue: string | number;
  reactionLabel: string;
  reactionAction: string;
  shortFailureFeedback: string;
  successFeedback: string;
  mentorConcept: string;
  mentorWhatHappened: string;
  mentorWhy: string;
  mentorTip: string;
  baseScore?: number;
  baseTimeSeconds?: number;
  difficultyModifier?: number;
  clickableLines?: { lineIndex: number; text: string; isTarget: boolean; reason: string }[];
  mechanismState?: {
    requiredAction: string;
    items: { id: string; label: string; type: 'lever' | 'rune' | 'gem' | 'gate' | 'block'; state?: string | number | boolean }[];
  };
}

export function buildChallenge(p: BaseChallengeParams): Challenge {
  const tierScore = p.baseScore || (p.tier === 1 ? 100 : p.tier === 2 ? 150 : 220);
  const tierTime = p.baseTimeSeconds || (p.tier === 1 ? 28 : p.tier === 2 ? 34 : 42);

  return {
    id: p.id,
    title: p.title,
    objective: p.objective,
    gameplayContext: p.gameplayContext,
    code: p.code,
    mode: p.mode,
    tier: p.tier,
    question: p.question,
    options: p.options,
    correctAnswerId: p.correctAnswerId,
    baseTimeSeconds: tierTime,
    difficultyModifier: p.difficultyModifier || (p.tier === 1 ? 1.0 : p.tier === 2 ? 1.2 : 1.5),
    concepts: p.concepts,
    gameReaction: {
      type: p.reactionType,
      finalValue: p.reactionFinalValue,
      label: p.reactionLabel,
      actionDescription: p.reactionAction,
    },
    shortFailureFeedback: p.shortFailureFeedback,
    successFeedback: p.successFeedback,
    mentorExplanation: {
      coreConcept: p.mentorConcept,
      whatHappened: p.mentorWhatHappened,
      whyPythonBehavesThisWay: p.mentorWhy,
      adventurerTip: p.mentorTip,
    },
    baseScore: tierScore,
    clickableLines: p.clickableLines,
    mechanismState: p.mechanismState,
  };
}
