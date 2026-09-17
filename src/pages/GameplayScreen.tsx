import React, { useState, useEffect, useRef } from 'react';
import { CurrentRoundState, Challenge } from '../types/game';
import { LifeHearts } from '../components/common/LifeHearts';
import { ChallengeDungeon } from '../components/environment/ChallengeDungeon';
import { FantasyButton } from '../components/common/FantasyButton';
import { WhatHappensNextMode } from '../game/modes/WhatHappensNextMode';
import { EscapeRoomMode } from '../game/modes/EscapeRoomMode';
import { CodeDetectiveMode } from '../game/modes/CodeDetectiveMode';
import { CodeTimerMode } from '../game/modes/CodeTimerMode';
import { LavaRisingMode } from '../game/modes/LavaRisingMode';
import { CodeBuilderMode } from '../game/modes/CodeBuilderMode';
import { ArrowLeft, Clock, Award, AlertCircle, CheckCircle } from 'lucide-react';
import { TimerSystem } from '../game/engine/TimerSystem';
import { sounds } from '../utils/audio';

interface GameplayScreenProps {
  round: CurrentRoundState;
  onSubmitAnswer: (answerId: string) => { isCorrect: boolean; feedback: string };
  onAbortRound: () => void;
  onRoundFinish: () => void;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  round,
  onSubmitAnswer,
  onAbortRound,
  onRoundFinish,
}) => {
  const currentChallenges =
    round.subtopic.levels.find((l) => l.tier === round.tier)?.challenges || [];
  const activeChallenge: Challenge | undefined = currentChallenges[round.challengeIndex];

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ text: string; isSuccess: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const timedOutRef = useRef<boolean>(false);

  // Dynamic allowed time for current challenge
  const allowedSeconds = activeChallenge
    ? TimerSystem.calculateAllowedSeconds({
        baseTimeSeconds: activeChallenge.baseTimeSeconds || 30,
        code: activeChallenge.code,
        tier: round.tier,
        mode: activeChallenge.mode,
        difficultyModifier: activeChallenge.difficultyModifier,
      })
    : 30;

  const remainingSeconds = Math.max(0, allowedSeconds - elapsedSeconds);
  const timeProgressPercent = Math.max(0, Math.min(100, (remainingSeconds / allowedSeconds) * 100));

  // Reset timer on challenge change
  useEffect(() => {
    setElapsedSeconds(0);
    timedOutRef.current = false;
  }, [round.challengeIndex, round.challengeStartTime]);

  // Challenge dynamic timer ticking
  useEffect(() => {
    if (round.status !== 'playing' || isProcessing) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        const next = prev + 1;
        if (next >= allowedSeconds && !timedOutRef.current) {
          timedOutRef.current = true;
          // Handle timeout: deduct life with timeout feedback
          sounds.playWrong();
          const result = onSubmitAnswer('__TIMEOUT__');
          setFeedback({
            text: 'Time ran out! The mechanism shifted and cost 1 life. Study the code and re-evaluate!',
            isSuccess: false,
          });
          setTimeout(() => {
            setFeedback(null);
            timedOutRef.current = false;
          }, 2000);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [round.status, isProcessing, allowedSeconds, onSubmitAnswer]);

  // Check for round termination (victory or game over)
  useEffect(() => {
    if (round.status === 'victory' || round.status === 'game_over') {
      const timeout = setTimeout(() => {
        onRoundFinish();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [round.status, onRoundFinish]);

  const handleAnswer = (answerId: string) => {
    if (isProcessing || !activeChallenge) return;
    setIsProcessing(true);

    const result = onSubmitAnswer(answerId);
    setFeedback({
      text: result.feedback,
      isSuccess: result.isCorrect,
    });

    setTimeout(() => {
      setFeedback(null);
      setIsProcessing(false);
    }, 1900);
  };

  if (!activeChallenge) {
    return (
      <div className="w-full min-h-screen bg-[#140b06] flex items-center justify-center font-adventure text-amber-200">
        Loading dungeon challenge...
      </div>
    );
  }

  const tierNames = { 1: 'UNDERSTAND', 2: 'APPLY', 3: 'MASTER' };

  return (
    <div
      id="gameplay-screen"
      className="relative w-full min-h-screen bg-[#150d08] p-3 md:p-6 flex flex-col items-center select-none overflow-x-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-[#2e190d] via-[#1a0f07] to-[#0c0603] pointer-events-none" />

      {/* Top Gameplay HUD (Tactile Wood & Stone Bars) */}
      <header className="relative z-30 w-full max-w-5xl flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Retreat Button & Subtopic Label */}
        <div className="flex items-center gap-2 sm:gap-3">
          <FantasyButton
            variant="stone"
            size="sm"
            onClick={onAbortRound}
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Retreat
          </FantasyButton>

          <div className="bg-gradient-to-b from-[#4a2812] to-[#2b160a] px-3 py-1.5 rounded-2xl border-2 border-[#783e15] shadow flex items-center gap-2">
            <span className="font-code text-xs text-amber-300 font-bold">
              {round.subtopic.code}
            </span>
            <span className="text-xs font-adventure text-[#fef08a] hidden sm:inline">
              {round.subtopic.title}
            </span>
            <span className="text-[10px] bg-[#653609] text-amber-200 font-adventure px-2 py-0.5 rounded-full border border-amber-500/40">
              Level {round.tier}: {tierNames[round.tier]}
            </span>
          </div>
        </div>

        {/* HUD Center: Lives (3 hearts) & Dynamic Timer */}
        <div className="flex items-center gap-3 sm:gap-4">
          <LifeHearts lives={round.lives} maxLives={round.maxLives} />

          <div className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 text-xs font-code shadow transition-colors ${
            remainingSeconds <= 10
              ? 'bg-[#3d120a] border-red-500 text-red-300 animate-pulse'
              : 'bg-[#1f1107] border-[#653609] text-amber-300'
          }`}>
            <Clock className={`w-3.5 h-3.5 ${remainingSeconds <= 10 ? 'text-red-400' : 'text-amber-400'}`} />
            <span>{remainingSeconds}s</span>
          </div>
        </div>

        {/* HUD Right: Score & Challenge Progress Dots */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-gradient-to-b from-[#5c3315] to-[#341a08] px-3.5 py-1.5 rounded-2xl border-2 border-[#8b5a2b] flex items-center gap-1.5 text-xs font-adventure text-amber-300 shadow">
            <Award className="w-4 h-4 text-amber-400" />
            <span>{round.roundScore} Pts</span>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5 bg-[#1f1107] border-2 border-[#5c371d] px-2.5 py-2 rounded-xl">
            {currentChallenges.map((_, i) => (
              <div
                key={i}
                title={`Challenge ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i < round.challengeIndex
                    ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]'
                    : i === round.challengeIndex
                    ? 'bg-amber-400 scale-125 shadow-[0_0_8px_#f59e0b]'
                    : 'bg-[#422a1b]'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Dynamic Timer Countdown Bar */}
      <div className="relative z-30 w-full max-w-5xl h-1.5 bg-[#1a0f07] rounded-full overflow-hidden border border-[#4a2b13] mb-3">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            remainingSeconds <= 10
              ? 'bg-gradient-to-r from-red-600 to-amber-500'
              : 'bg-gradient-to-r from-emerald-500 to-amber-400'
          }`}
          style={{ width: `${timeProgressPercent}%` }}
        />
      </div>

      {/* Main Play Area Container */}
      <main className="relative z-30 w-full max-w-5xl flex flex-col gap-3">
        {/* 2D Fantasy Game Environment (Dungeon Arch, Portcullis, Hand-drawn Adventurer) */}
        <ChallengeDungeon
          mode={activeChallenge.mode}
          gateOpen={feedback?.isSuccess || round.status === 'victory'}
          isErrorState={feedback !== null && !feedback.isSuccess}
          objectiveText={`Challenge ${round.challengeIndex + 1} of ${currentChallenges.length}: ${activeChallenge.objective}`}
          reaction={feedback?.isSuccess ? activeChallenge.gameReaction : undefined}
        />

        {/* Short Feedback Banner (Immediate deterministic gameplay reaction) */}
        {feedback && (
          <div
            className={`w-full p-3 rounded-2xl border-3 shadow-2xl flex items-center gap-3 transition-all animate-fade-in ${
              feedback.isSuccess
                ? 'bg-[#15341f] border-emerald-500 text-emerald-100'
                : 'bg-[#3b120f] border-red-500 text-red-100'
            }`}
          >
            {feedback.isSuccess ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <div className="font-medieval text-xs md:text-sm leading-relaxed">
              {feedback.text}
            </div>
          </div>
        )}

        {/* Interactive Mode Interface (What Happens Next, Escape Room, etc.) */}
        <div className="w-full">
          {activeChallenge.mode === 'WHAT_HAPPENS_NEXT' && (
            <WhatHappensNextMode
              challenge={activeChallenge}
              onAnswer={handleAnswer}
              isLocked={isProcessing}
            />
          )}

          {activeChallenge.mode === 'ESCAPE_ROOM' && (
            <EscapeRoomMode
              challenge={activeChallenge}
              onAnswer={handleAnswer}
              isLocked={isProcessing}
            />
          )}

          {activeChallenge.mode === 'CODE_DETECTIVE' && (
            <CodeDetectiveMode
              challenge={activeChallenge}
              onAnswer={handleAnswer}
              isLocked={isProcessing}
            />
          )}

          {activeChallenge.mode === 'CODE_TIMER' && (
            <CodeTimerMode
              challenge={activeChallenge}
              onAnswer={handleAnswer}
              isLocked={isProcessing}
            />
          )}

          {activeChallenge.mode === 'LAVA_RISING' && (
            <LavaRisingMode
              challenge={activeChallenge}
              onAnswer={handleAnswer}
              isLocked={isProcessing}
            />
          )}

          {activeChallenge.mode === 'CODE_BUILDER' && (
            <CodeBuilderMode
              challenge={activeChallenge}
              onAnswer={handleAnswer}
              isLocked={isProcessing}
            />
          )}
        </div>
      </main>
    </div>
  );
};
