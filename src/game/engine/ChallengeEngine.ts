import { Challenge, MistakeRecord } from '../../types/game';

export interface EvaluationResult {
  isCorrect: boolean;
  feedback: string;
  gameReaction?: Challenge['gameReaction'];
  mistake?: MistakeRecord;
}

export class ChallengeEngine {
  /**
   * Deterministically validates the player's selected option against the challenge definition.
   */
  public static evaluateAnswer(
    challenge: Challenge,
    selectedOptionId: string,
    subtopicCode: string
  ): EvaluationResult {
    const isCorrect = selectedOptionId === challenge.correctAnswerId;

    if (isCorrect) {
      return {
        isCorrect: true,
        feedback: challenge.successFeedback,
        gameReaction: challenge.gameReaction,
      };
    } else {
      const mistake: MistakeRecord = {
        timestamp: Date.now(),
        challengeId: challenge.id,
        challengeTitle: challenge.title,
        subtopicCode,
        selectedAnswer: selectedOptionId,
        correctAnswer: challenge.correctAnswerId,
        code: challenge.code,
        mentorExplanation: challenge.mentorExplanation,
        shortFeedback: challenge.shortFailureFeedback,
      };

      return {
        isCorrect: false,
        feedback: challenge.shortFailureFeedback,
        mistake,
      };
    }
  }
}
