export type GameScreen = 
  | 'main-menu' 
  | 'world-map' 
  | 'subtopic-select' 
  | 'gameplay' 
  | 'round-summary' 
  | 'logic-profile' 
  | 'settings'
  | 'MAIN_MENU'
  | 'WORLD_MAP'
  | 'TOPIC_SELECT'
  | 'GAMEPLAY'
  | 'ROUND_SUMMARY'
  | 'LOGIC_PROFILE'
  | 'SETTINGS';

export interface ScoreBreakdown {
  baseScore: number;
  timeBonus: number;
  lifeBonus: number;
  difficultyMultiplier: number;
  difficultyBonus: number;
  flawlessBonus: number;
  finalScore: number;
}

export type GameModeId = 
  | 'WHAT_HAPPENS_NEXT' 
  | 'ESCAPE_ROOM' 
  | 'CODE_DETECTIVE' 
  | 'CODE_TIMER' 
  | 'LAVA_RISING' 
  | 'CODE_BUILDER';

export type LevelTier = 1 | 2 | 3; // 1: UNDERSTAND, 2: APPLY, 3: MASTER

export interface ChallengeOption {
  id: string;
  label: string;
  codeSnippet?: string;
  explanation?: string;
}

export interface InteractiveElement {
  id: string;
  label: string;
  type: 'lever' | 'rune' | 'gem' | 'gate' | 'block';
  state?: string | number | boolean;
  codeMapping?: string;
}

export interface Challenge {
  id: string;
  title: string;
  objective: string;
  gameplayContext: string; // e.g., "The Ancient Sentry requires an incantation executed in proper order..."
  code: string;
  mode: GameModeId;
  tier: LevelTier;
  question: string;
  options?: ChallengeOption[];
  correctAnswerId: string;
  // For detective mode
  clickableLines?: { lineIndex: number; text: string; isTarget: boolean; reason: string }[];
  // For escape room mode
  mechanismState?: {
    requiredAction: string;
    items: InteractiveElement[];
  };
  // For code timer mode
  timeLimitSeconds?: number;
  baseTimeSeconds?: number;
  difficultyModifier?: number;
  concepts?: string[];
  // Game-world reaction when code executes
  gameReaction?: {
    type: 'rune' | 'gate' | 'torch' | 'chest' | 'energy' | 'coins' | 'bridge' | 'crystal' | 'compass' | 'dash';
    initialValue?: string | number;
    finalValue: string | number;
    label: string;
    actionDescription: string;
  };
  // Short feedback for wrong answers (strictly short during gameplay)
  shortFailureFeedback: string;
  successFeedback: string;
  // In-depth mentor breakdown (used in post-game AI Mentor Review)
  mentorExplanation: {
    coreConcept: string;
    whatHappened: string;
    whyPythonBehavesThisWay: string;
    adventurerTip: string;
  };
  baseScore: number;
}

export interface Subtopic {
  id: string;
  code: string; // e.g. "1.1", "1.2"
  title: string;
  summary: string;
  primaryMode: GameModeId;
  levels: {
    tier: LevelTier;
    name: string; // "UNDERSTAND", "APPLY", "MASTER"
    description: string;
    challenges: Challenge[];
  }[];
}

export interface Topic {
  id: string;
  number: number;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

export interface World {
  id: number;
  number: number;
  title: string;
  tagline: string;
  status: 'unlocked' | 'locked' | 'fogged';
  environmentTheme: string;
  topics: Topic[];
}

export interface MistakeRecord {
  timestamp: number;
  challengeId: string;
  challengeTitle: string;
  subtopicCode: string;
  selectedAnswer: string;
  correctAnswer: string;
  code: string;
  mentorExplanation: Challenge['mentorExplanation'];
  shortFeedback: string;
}

export interface PlayerProgress {
  xp: number;
  coins: number;
  score: number;
  currentWorldId: number;
  currentTopicId: string;
  currentSubtopicId: string;
  currentLevelTier: LevelTier;
  unlockedWorldMax: number;
  completedSubtopics: { [subtopicId: string]: number }; // subtopicId -> highest tier beaten (1, 2, 3)
  flawlessStreak: number;
  totalChallengesAttempted: number;
  totalChallengesCorrect: number;
  totalTimeSpentSeconds: number;
  mistakesHistory: MistakeRecord[];
  skills: {
    codeTracing: number; // 0-100
    conditions: number;
    loops: number;
    debugging: number;
    problemSolving: number;
    aiVerification: number;
  };
}

export interface CurrentRoundState {
  subtopic: Subtopic;
  tier: LevelTier;
  challengeIndex: number;
  lives: number;
  maxLives: number;
  roundScore: number;
  roundStartTime: number;
  challengeStartTime: number;
  completedChallenges: number;
  mistakesThisRound: MistakeRecord[];
  isFlawless: boolean;
  status: 'playing' | 'victory' | 'game_over';
  lastShortFeedback: string | null;
  lastAnswerCorrect: boolean | null;
}
