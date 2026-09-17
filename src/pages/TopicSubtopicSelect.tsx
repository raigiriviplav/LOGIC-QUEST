import React, { useState } from 'react';
import { World, Topic, Subtopic, PlayerProgress } from '../types/game';
import { ArrowLeft, Play, Lock, Star, Compass, Sparkles, ChevronRight, ShieldAlert, Swords, Trophy, Skull } from 'lucide-react';
import { sounds } from '../utils/audio';
import { WoodenPanel } from '../components/common/WoodenPanel';
import { ParchmentPanel } from '../components/common/ParchmentPanel';
import { FantasyButton } from '../components/common/FantasyButton';
import { LevelSystem } from '../game/engine/LevelSystem';
import { foundationGuardianSubtopic } from '../data/bossChallenges';

interface TopicSubtopicSelectProps {
  world: World;
  progress: PlayerProgress;
  onBackToWorldMap: () => void;
  onStartLevel: (subtopic: Subtopic, levelTier: 1 | 2 | 3) => void;
}

export const TopicSubtopicSelect: React.FC<TopicSubtopicSelectProps> = ({
  world,
  progress,
  onBackToWorldMap,
  onStartLevel,
}) => {
  const allWorldSubtopics = world.topics.flatMap((t) => t.subtopics);
  const completedSubtopicsCount = LevelSystem.getCompletedSubtopicsCount(progress, 'sub_1_');
  const isBossUnlocked = LevelSystem.isWorld1BossUnlocked(progress);

  const [isBossSelected, setIsBossSelected] = useState<boolean>(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(world.topics[0]?.id || '');
  const activeTopic = world.topics.find((t) => t.id === selectedTopicId) || world.topics[0];

  const [selectedSubtopicId, setSelectedSubtopicId] = useState<string>(
    activeTopic?.subtopics[0]?.id || ''
  );
  const selectedSubtopic =
    activeTopic?.subtopics.find((s) => s.id === selectedSubtopicId) || activeTopic?.subtopics[0];

  const handleTopicSelect = (topic: Topic) => {
    sounds.playRuneSelect();
    setIsBossSelected(false);
    setSelectedTopicId(topic.id);
    if (topic.subtopics.length > 0) {
      // Pick first unlocked or first in topic
      const firstUnlocked = topic.subtopics.find(s => LevelSystem.isSubtopicUnlocked(s, allWorldSubtopics, progress)) || topic.subtopics[0];
      setSelectedSubtopicId(firstUnlocked.id);
    }
  };

  const handleSubtopicClick = (sub: Subtopic, isUnlocked: boolean) => {
    if (!isUnlocked) {
      sounds.playWrong();
      return;
    }
    sounds.playClick();
    setIsBossSelected(false);
    setSelectedSubtopicId(sub.id);
  };

  const handleSelectBoss = () => {
    sounds.playMechanismClank();
    setIsBossSelected(true);
  };

  return (
    <div
      id="topic-subtopic-select"
      className="relative w-full min-h-screen bg-[#1c1108] p-3 sm:p-6 md:p-8 flex flex-col items-center select-none overflow-x-hidden"
    >
      {/* Background ambient forest mist & warm lighting */}
      <div className="absolute inset-0 bg-radial from-[#3f2514] via-[#241309] to-[#120804] pointer-events-none" />

      {/* Top Banner Navigation & Resources */}
      <header className="relative z-30 w-full max-w-6xl flex items-center justify-between mb-4 gap-2">
        <FantasyButton
          variant="wood"
          size="sm"
          onClick={onBackToWorldMap}
          icon={<ArrowLeft className="w-4 h-4 text-amber-300" />}
        >
          World Map
        </FantasyButton>

        {/* World Header Carved Plaque */}
        <div className="bg-gradient-to-b from-[#783e15] to-[#432009] px-6 py-2 rounded-2xl border-3 border-[#a15e26] shadow-lg text-center">
          <span className="text-[10px] sm:text-xs tracking-wider text-[#fed7aa] font-medieval italic uppercase block">
            WORLD {world.number} REALM HUB
          </span>
          <h1 className="font-adventure text-base sm:text-xl text-[#fef08a] tracking-wide">
            {world.title}
          </h1>
        </div>

        {/* Player Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-gradient-to-b from-[#5c3315] to-[#341a08] px-3 py-1.5 rounded-xl border border-[#8b5a2b] text-xs font-adventure text-amber-300 shadow">
            🪙 {progress.coins}
          </div>
          <div className="bg-gradient-to-b from-[#5c3315] to-[#341a08] px-3 py-1.5 rounded-xl border border-[#8b5a2b] text-xs font-adventure text-cyan-300 shadow">
            ✨ {progress.xp} XP
          </div>
        </div>
      </header>

      {/* Main Container Layout: Topics on Left, Subtopics & Levels on Right */}
      <div className="relative z-30 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
        {/* Left Column: Topic Curriculum List & Boss Entry */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="bg-gradient-to-r from-[#4d2811] to-[#381a07] p-3 rounded-2xl border-2 border-[#783e15] shadow flex items-center justify-between">
            <div className="flex items-center gap-2 font-adventure text-xs text-amber-200 uppercase tracking-wide">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>CURRICULUM TOPICS</span>
            </div>
            <span className="text-[11px] font-medieval text-[#fde68a] italic">World 1</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {world.topics.map((topic) => {
              const isSelected = !isBossSelected && topic.id === selectedTopicId;
              const hasPlayable = topic.subtopics.some((s) => s.levels.length > 0);
              const completedInTopic = topic.subtopics.filter(s => (progress.completedSubtopics[s.id] || 0) >= 3).length;

              return (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className={`p-3.5 rounded-2xl text-left transition-all border-2 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#854d0e] via-[#653609] to-[#452204] border-amber-400 shadow-[0_6px_16px_rgba(0,0,0,0.6)] scale-[1.02]'
                      : 'bg-gradient-to-b from-[#341d0e] to-[#201006] hover:bg-[#432410] border-[#59341b] text-[#fed7aa]'
                  }`}
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-adventure text-amber-300 uppercase">
                          Topic {topic.number}
                        </span>
                        {hasPlayable && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        )}
                      </div>
                      <span className="text-[10px] text-amber-400/80 font-adventure">
                        {completedInTopic}/{topic.subtopics.length} Mastered
                      </span>
                    </div>
                    <div className="font-adventure text-sm font-bold text-[#fef08a] mt-0.5 tracking-wide truncate">
                      {topic.title}
                    </div>
                    <div className="text-[11px] text-[#fcd34d]/80 font-chunky line-clamp-1 mt-0.5">
                      {topic.description}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-300 shrink-0" />
                </button>
              );
            })}
          </div>

          {/* FOUNDATION GUARDIAN BOSS ENTRY BUTTON */}
          <div className="mt-1 pt-2 border-t border-[#5c371d]/60">
            <button
              id="btn-foundation-guardian-boss"
              onClick={handleSelectBoss}
              className={`w-full p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between group ${
                isBossSelected
                  ? 'bg-gradient-to-b from-[#831843] via-[#701a75] to-[#4a044e] border-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] scale-[1.02]'
                  : isBossUnlocked
                  ? 'bg-gradient-to-b from-[#581c87] to-[#3b0764] border-purple-400 hover:border-pink-300 shadow-md'
                  : 'bg-gradient-to-b from-[#2d121c] to-[#1a0b12] border-[#5c2337] hover:border-[#831843]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow ${
                  isBossUnlocked
                    ? 'bg-gradient-to-br from-amber-500 to-rose-600 border-amber-300 text-amber-100 animate-pulse'
                    : 'bg-[#1e0a13] border-[#4a1727] text-rose-300/60'
                }`}>
                  <Skull className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-adventure tracking-wider uppercase text-rose-300">
                      WORLD 1 APEX TRIAL
                    </span>
                    {!isBossUnlocked && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-stone-900/80 text-stone-400 border border-stone-700 rounded font-adventure">
                        LOCKED
                      </span>
                    )}
                  </div>
                  <div className="font-adventure text-sm font-bold text-rose-100 tracking-wide truncate">
                    Foundation Guardian
                  </div>
                  <div className="text-[10px] text-rose-200/70 font-chunky">
                    {completedSubtopicsCount}/15 Subtopics Mastered
                  </div>
                </div>
              </div>
              <div className="shrink-0 ml-2">
                {isBossUnlocked ? (
                  <Swords className="w-5 h-5 text-amber-300 animate-bounce" />
                ) : (
                  <Lock className="w-4 h-4 text-rose-400/60" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Right Column: Subtopics & The 3 Levels OR Foundation Guardian Boss Chamber */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {isBossSelected ? (
            /* ============================================================ */
            /* FOUNDATION GUARDIAN BOSS CHAMBER VIEW                        */
            /* ============================================================ */
            <div id="foundation-guardian-view" className="flex flex-col gap-4">
              <WoodenPanel
                hasVines={true}
                title="APEX TRIAL • WORLD 1 BOSS"
                subtitle="The Foundation Guardian"
                className="p-1"
              >
                <div className="p-4 flex flex-col gap-4">
                  {/* Boss Header Banner */}
                  <div className="relative rounded-2xl overflow-hidden p-6 border-2 border-rose-700/80 bg-gradient-to-b from-[#3b0d1a] via-[#240810] to-[#120408] shadow-2xl flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-[#6b1426] to-[#2d0810] border-2 border-rose-500/80 flex items-center justify-center shadow-inner shrink-0">
                      <div className="text-5xl">🗿</div>
                      <div className="absolute inset-0 rounded-2xl border border-amber-400/30 animate-pulse pointer-events-none" />
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                        <span className="text-[10px] font-adventure uppercase px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-700">
                          Sentinel of Spirehaven
                        </span>
                        <span className={`text-[10px] font-adventure px-2 py-0.5 rounded-full border ${
                          isBossUnlocked
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                            : 'bg-stone-900 text-stone-400 border-stone-700'
                        }`}>
                          {isBossUnlocked ? 'AWAKENED' : 'LOCKED IN STASIS'}
                        </span>
                      </div>

                      <h2 className="font-adventure text-xl sm:text-2xl text-rose-100 tracking-wide">
                        The Foundation Guardian
                      </h2>
                      <p className="text-xs text-rose-200/80 font-medieval leading-relaxed mt-1">
                        An ancient basalt colossus etched with crystalline logic circuits. It slumbers until a seeker proves total mastery across all 15 foundational tenets of Python.
                      </p>
                    </div>
                  </div>

                  {/* Boss Unlock Criteria & Progress */}
                  <div className="p-4 rounded-2xl bg-[#200c14] border border-[#521c2c] shadow flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-adventure text-rose-200 uppercase flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        Guardian Runic Seal Status
                      </span>
                      <span className="text-xs font-adventure text-amber-300">
                        {completedSubtopicsCount} / 15 Subtopics Cleared
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3.5 bg-[#12050b] rounded-full overflow-hidden border border-[#5c2132] p-0.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.round((completedSubtopicsCount / 15) * 100))}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-rose-200/70 font-medieval italic">
                      {isBossUnlocked
                        ? '✨ All 15 foundational disciplines mastered! The Guardian’s runic stasis is broken!'
                        : `🔒 Requires complete mastery (Tier 3) across all 15 subtopics in World 1 to awaken. (${15 - completedSubtopicsCount} remaining)`}
                    </p>
                  </div>

                  {/* 3 Phases of the Trial */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#2a101a] border border-[#541f2f] text-left">
                      <div className="text-[10px] font-adventure text-rose-300">PHASE I</div>
                      <div className="font-adventure text-xs text-amber-200 mt-0.5">Runic Awakening</div>
                      <p className="text-[10px] text-rose-100/70 font-medieval mt-1 leading-snug">
                        Sequential instruction flow, top-level indentation wards, and floating-point type deflection.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#2a101a] border border-[#541f2f] text-left">
                      <div className="text-[10px] font-adventure text-rose-300">PHASE II</div>
                      <div className="font-adventure text-xs text-amber-200 mt-0.5">Elemental Shield</div>
                      <p className="text-[10px] text-rose-100/70 font-medieval mt-1 leading-snug">
                        Multi-variable capacitor swaps and rapid PEMDAS arithmetic to avert the rising lava purge.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#2a101a] border border-[#541f2f] text-left">
                      <div className="text-[10px] font-adventure text-rose-300">PHASE III</div>
                      <div className="font-adventure text-xs text-amber-200 mt-0.5">Core Overload</div>
                      <p className="text-[10px] text-rose-100/70 font-medieval mt-1 leading-snug">
                        The ultimate composite incantation: string repetition, modulo arithmetic, and type coercion.
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2 flex justify-center">
                    {isBossUnlocked ? (
                      <FantasyButton
                        variant="gold"
                        size="lg"
                        onClick={() => onStartLevel(foundationGuardianSubtopic, 1)}
                        icon={<Swords className="w-5 h-5 text-amber-950" />}
                        className="w-full sm:w-auto px-8"
                      >
                        Awaken & Challenge the Guardian
                      </FantasyButton>
                    ) : (
                      <div className="w-full sm:w-auto px-8 py-3 bg-[#1e0b13] border-2 border-[#4d1927] rounded-2xl text-center text-xs font-adventure text-rose-300/60 flex items-center justify-center gap-2 cursor-not-allowed">
                        <Lock className="w-4 h-4" />
                        <span>Guardian Slumbers in Stasis • Complete All 15 Subtopics</span>
                      </div>
                    )}
                  </div>
                </div>
              </WoodenPanel>
            </div>
          ) : (
            /* ============================================================ */
            /* STANDARD TOPIC SUBTOPICS & 3-LEVEL CARDS VIEW                */
            /* ============================================================ */
            <>
              {/* Active Topic Header Parchment */}
              <ParchmentPanel hasPins={true} className="p-4 rounded-2xl shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-adventure uppercase tracking-wider text-[#78350f]">
                      Selected Topic {activeTopic?.number}
                    </span>
                    <h2 className="font-adventure text-lg md:text-xl text-[#3b1a03] tracking-wide">
                      {activeTopic?.title}
                    </h2>
                    <p className="text-xs text-[#5c3716] font-medieval mt-0.5">
                      {activeTopic?.description}
                    </p>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-xs font-adventure text-[#452712]">
                      {activeTopic?.subtopics.length} Subtopics
                    </span>
                    <span className="text-[10px] text-[#78350f] font-medieval italic">
                      3 Tiers per Subtopic
                    </span>
                  </div>
                </div>
              </ParchmentPanel>

              {/* Subtopics Grid Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {activeTopic?.subtopics.map((sub) => {
                  const isSelected = selectedSubtopic?.id === sub.id;
                  const isUnlocked = LevelSystem.isSubtopicUnlocked(sub, allWorldSubtopics, progress);
                  const completedTier = progress.completedSubtopics[sub.id] || 0;
                  const subIndex = allWorldSubtopics.findIndex(s => s.id === sub.id);
                  const prevSub = subIndex > 0 ? allWorldSubtopics[subIndex - 1] : null;

                  return (
                    <button
                      key={sub.id}
                      onClick={() => handleSubtopicClick(sub, isUnlocked)}
                      className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between select-none ${
                        !isUnlocked
                          ? 'bg-[#180e08]/90 border-[#381f12] opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'bg-gradient-to-b from-[#854d0e] to-[#452204] border-amber-300 shadow-xl cursor-pointer'
                          : 'bg-gradient-to-b from-[#2e190e] to-[#1c0f07] hover:bg-[#3d2012] border-[#59341b] cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-adventure text-amber-300">
                          {sub.code}
                        </span>
                        {completedTier >= 3 ? (
                          <div className="flex items-center text-amber-300 text-[10px] font-adventure">
                            <Star className="w-3 h-3 fill-current" />
                            <span>Mastered</span>
                          </div>
                        ) : completedTier > 0 ? (
                          <div className="flex items-center text-amber-300 text-[10px] font-adventure">
                            <Star className="w-3 h-3 fill-current" />
                            <span>T{completedTier}</span>
                          </div>
                        ) : isUnlocked ? (
                          <span className="text-[9px] bg-emerald-900 text-emerald-300 font-adventure px-1.5 py-0.5 rounded border border-emerald-600">
                            Playable
                          </span>
                        ) : (
                          <div className="flex items-center gap-1 text-[9px] text-stone-400 font-adventure">
                            <Lock className="w-3 h-3" />
                            <span>Locked</span>
                          </div>
                        )}
                      </div>
                      <div className="font-adventure text-xs md:text-sm text-[#fef08a] line-clamp-1">
                        {sub.title}
                      </div>
                      <div className="text-[10px] text-amber-200/70 font-chunky uppercase mt-1">
                        {isUnlocked
                          ? `Mode: ${sub.primaryMode.replace(/_/g, ' ')}`
                          : `Req: Subtopic ${prevSub?.code || ''}`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Subtopic Level Selection (The 3 Levels: UNDERSTAND, APPLY, MASTER) */}
              {selectedSubtopic && (
                <WoodenPanel
                  hasVines={true}
                  title={`SUBTOPIC ${selectedSubtopic.code}`}
                  subtitle={selectedSubtopic.title}
                  className="mt-2"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-[#5c371d] gap-2">
                      <p className="text-xs text-amber-100 font-medieval leading-relaxed">
                        {selectedSubtopic.summary}
                      </p>
                      <div className="bg-[#2a160b] px-3 py-1 rounded-xl border border-[#783e15] text-xs font-chunky text-amber-300 shrink-0">
                        Mode: <span className="font-bold text-amber-200">{selectedSubtopic.primaryMode.replace(/_/g, ' ')}</span>
                      </div>
                    </div>

                    {/* The 3 Levels Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedSubtopic.levels.map((level) => {
                        const completedTier = progress.completedSubtopics[selectedSubtopic.id] || 0;
                        const isCompleted = completedTier >= level.tier;
                        const isSubUnlocked = LevelSystem.isSubtopicUnlocked(selectedSubtopic, allWorldSubtopics, progress);
                        const isUnlocked = isSubUnlocked && (level.tier === 1 || completedTier >= level.tier - 1);

                        return (
                          <div
                            key={level.tier}
                            className={`rounded-2xl p-4 border-2 flex flex-col justify-between shadow-lg transition-all group ${
                              !isUnlocked
                                ? 'bg-[#180e08]/90 border-[#3d2012] opacity-60'
                                : 'bg-gradient-to-b from-[#2e190e] to-[#1c0f07] border-[#6b3e1f] hover:border-amber-400'
                            }`}
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-adventure px-2 py-0.5 rounded-full border ${
                                  !isUnlocked
                                    ? 'bg-[#2a170d] text-stone-400 border-[#4a2817]'
                                    : 'bg-amber-950 text-amber-300 border-amber-600'
                                }`}>
                                  LEVEL {level.tier}
                                </span>
                                {isCompleted ? (
                                  <span className="text-xs text-amber-300 font-adventure flex items-center gap-1">
                                    <Star className="w-3.5 h-3.5 fill-current" /> Cleared
                                  </span>
                                ) : !isUnlocked ? (
                                  <span className="text-xs text-stone-400 font-adventure flex items-center gap-1">
                                    <Lock className="w-3.5 h-3.5 text-stone-500" /> Locked
                                  </span>
                                ) : null}
                              </div>

                              <h4 className={`font-adventure text-sm sm:text-base tracking-wide ${
                                isUnlocked ? 'text-[#fef08a] group-hover:text-amber-200' : 'text-stone-400'
                              }`}>
                                {level.name}
                              </h4>

                              <p className="text-xs text-[#fed7aa]/80 font-medieval leading-relaxed">
                                {level.description}
                              </p>

                              <div className="text-[11px] text-amber-400/90 font-chunky pt-1">
                                {level.challenges.length} Challenges • 3 Lives
                              </div>
                            </div>

                            {isUnlocked ? (
                              <FantasyButton
                                variant="gold"
                                size="sm"
                                onClick={() => onStartLevel(selectedSubtopic, level.tier)}
                                icon={<Play className="w-3.5 h-3.5 fill-current text-amber-950" />}
                                className="mt-4 w-full"
                              >
                                Embark
                              </FantasyButton>
                            ) : (
                              <div className="mt-4 w-full py-2 bg-[#201108] border border-[#3d2012] rounded-xl text-center text-xs font-adventure text-stone-500 flex items-center justify-center gap-1.5 cursor-not-allowed">
                                <Lock className="w-3.5 h-3.5" />
                                <span>{!isSubUnlocked ? 'Unlock Subtopic First' : `Complete Level ${level.tier - 1} First`}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </WoodenPanel>
              )}

              {/* Persistent Boss Progress Seal Banner at bottom of standard view */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#2c121b] via-[#1c0c13] to-[#2c121b] border border-[#5c2436] shadow flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3b1220] border border-[#6b233a] flex items-center justify-center text-rose-300 shrink-0">
                    <Skull className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-adventure text-xs text-rose-200 flex items-center gap-2">
                      <span>Apex Boss: Foundation Guardian</span>
                      <span className="text-[10px] text-amber-400">
                        ({completedSubtopicsCount}/15 Mastered)
                      </span>
                    </div>
                    <div className="text-[11px] text-rose-300/70 font-medieval">
                      {isBossUnlocked
                        ? 'The ancient seal has shattered! Challenge the Guardian now!'
                        : `Master all 15 subtopics in World 1 to break the Guardian's stasis seal.`}
                    </div>
                  </div>
                </div>

                <FantasyButton
                  variant={isBossUnlocked ? 'gold' : 'wood'}
                  size="sm"
                  onClick={handleSelectBoss}
                  icon={isBossUnlocked ? <Swords className="w-3.5 h-3.5 text-amber-950" /> : <Lock className="w-3.5 h-3.5 text-stone-400" />}
                  className="shrink-0 text-xs"
                >
                  {isBossUnlocked ? 'Challenge Boss' : 'Inspect Boss'}
                </FantasyButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
