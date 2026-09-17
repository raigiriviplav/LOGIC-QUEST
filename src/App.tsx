import React, { useState, useEffect } from 'react';
import { useGameState } from './state/gameState';
import { worldsData } from './data/worlds';
import { World, Subtopic, LevelTier } from './types/game';
import { sounds } from './utils/audio';

import { MainMenu } from './pages/MainMenu';
import { WorldMapPage } from './pages/WorldMapPage';
import { TopicSubtopicSelect } from './pages/TopicSubtopicSelect';
import { GameplayScreen } from './pages/GameplayScreen';
import { RoundSummaryScreen } from './pages/RoundSummaryScreen';

import { AiMentorModal } from './components/modals/AiMentorModal';
import { LogicProfileModal } from './components/modals/LogicProfileModal';
import { SettingsModal } from './components/modals/SettingsModal';

export default function App() {
  const {
    progress,
    currentScreen,
    currentRound,
    recentMistakes,
    goToScreen,
    startRound,
    submitAnswer,
    finishRound,
    resetProgress,
  } = useGameState();

  const [selectedWorld, setSelectedWorld] = useState<World>(worldsData[0]);
  const [isAiMentorOpen, setIsAiMentorOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Resume Web Audio Context on first click
  useEffect(() => {
    const handleFirstGesture = () => {
      sounds.init();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);
    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  // Continue Adventure helper: finds the first uncompleted subtopic or launches 1.1
  const handleContinueAdventure = () => {
    sounds.playRuneSelect();
    const world1 = worldsData[0];
    setSelectedWorld(world1);

    // Find next playable subtopic
    for (const topic of world1.topics) {
      for (const sub of topic.subtopics) {
        if (sub.levels.length > 0) {
          const completedTier = progress.completedSubtopics[sub.id] || 0;
          if (completedTier < 3) {
            const nextTier = (completedTier + 1) as LevelTier;
            startRound(sub, nextTier);
            return;
          }
        }
      }
    }

    // Default to first subtopic Level 1
    const firstSub = world1.topics[0]?.subtopics[0];
    if (firstSub) {
      startRound(firstSub, 1);
    } else {
      goToScreen('TOPIC_SELECT');
    }
  };

  // Next Level progression from Round Summary
  const handleNextLevel = () => {
    if (!currentRound) {
      goToScreen('TOPIC_SELECT');
      return;
    }

    const currentSub = currentRound.subtopic;
    const nextTier = (currentRound.tier + 1) as LevelTier;

    // If current subtopic has next tier, advance tier
    if (currentSub.levels.some(l => l.tier === nextTier)) {
      startRound(currentSub, nextTier);
      return;
    }

    // Otherwise find the next subtopic across all topics in the selected world
    const allWorldSubtopics = selectedWorld.topics.flatMap(t => t.subtopics);
    const currentIndex = allWorldSubtopics.findIndex(s => s.id === currentSub.id);

    if (currentIndex !== -1 && currentIndex + 1 < allWorldSubtopics.length) {
      const nextSub = allWorldSubtopics[currentIndex + 1];
      if (nextSub.levels.length > 0) {
        startRound(nextSub, 1);
        return;
      }
    }

    // Otherwise return to subtopic selector
    goToScreen('TOPIC_SELECT');
  };

  const handleRetryLevel = () => {
    if (currentRound) {
      startRound(currentRound.subtopic, currentRound.tier);
    } else {
      goToScreen('TOPIC_SELECT');
    }
  };

  return (
    <div id="logic-quest-app" className="relative w-full min-h-screen bg-[#110904] text-stone-100 overflow-x-hidden">
      {/* SCREEN ROUTER */}
      {currentScreen === 'MAIN_MENU' && (
        <MainMenu
          progress={progress}
          onContinue={handleContinueAdventure}
          onOpenWorldMap={() => goToScreen('WORLD_MAP')}
          onOpenLogicProfile={() => setIsProfileOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      )}

      {currentScreen === 'WORLD_MAP' && (
        <WorldMapPage
          progress={progress}
          onSelectWorld={(world) => {
            setSelectedWorld(world);
            goToScreen('TOPIC_SELECT');
          }}
          onBackToMenu={() => goToScreen('MAIN_MENU')}
        />
      )}

      {currentScreen === 'TOPIC_SELECT' && (
        <TopicSubtopicSelect
          world={selectedWorld}
          progress={progress}
          onBackToWorldMap={() => goToScreen('WORLD_MAP')}
          onStartLevel={(subtopic, tier) => startRound(subtopic, tier)}
        />
      )}

      {currentScreen === 'GAMEPLAY' && currentRound && (
        <GameplayScreen
          round={currentRound}
          onSubmitAnswer={submitAnswer}
          onAbortRound={() => goToScreen('TOPIC_SELECT')}
          onRoundFinish={finishRound}
        />
      )}

      {currentScreen === 'ROUND_SUMMARY' && currentRound && (
        <RoundSummaryScreen
          round={currentRound}
          progress={progress}
          onNextLevel={handleNextLevel}
          onRetryLevel={handleRetryLevel}
          onOpenWorldMap={() => goToScreen('WORLD_MAP')}
          onOpenAiMentor={() => setIsAiMentorOpen(true)}
        />
      )}

      {/* GLOBAL MODALS */}
      <AiMentorModal
        isOpen={isAiMentorOpen}
        onClose={() => setIsAiMentorOpen(false)}
        mistakes={recentMistakes}
        progress={progress}
        activeSubtopicTitle={currentRound?.subtopic.title}
      />

      <LogicProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        progress={progress}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetProgress={resetProgress}
      />
    </div>
  );
}
