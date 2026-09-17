import React, { useState } from 'react';
import { MistakeRecord, PlayerProgress } from '../../types/game';
import { sounds } from '../../utils/audio';
import { Sparkles, Brain, BookOpen, Target, Award, X, AlertTriangle, Lightbulb } from 'lucide-react';

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  mistakes: MistakeRecord[];
  progress: PlayerProgress;
  activeSubtopicTitle?: string;
}

export const AiMentorModal: React.FC<AiMentorModalProps> = ({
  isOpen,
  onClose,
  mistakes,
  progress,
  activeSubtopicTitle,
}) => {
  const [activeTab, setActiveTab] = useState<'review' | 'concepts' | 'practice' | 'summary'>('review');

  if (!isOpen) return null;

  // Calculate weak concept identification from mistakes
  const conceptCounts: { [concept: string]: number } = {};
  mistakes.forEach(m => {
    const concept = m.mentorExplanation?.coreConcept || 'Sequential Tracing';
    conceptCounts[concept] = (conceptCounts[concept] || 0) + 1;
  });

  const topWeakConcepts = Object.entries(conceptCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([concept, count]) => ({ concept, count }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col parchment-panel rounded-2xl border-4 border-[#7a5229] shadow-2xl overflow-hidden">
        {/* Ornate Brass Brackets */}
        <div className="corner-ornament corner-tl" />
        <div className="corner-ornament corner-tr" />
        <div className="corner-ornament corner-bl" />
        <div className="corner-ornament corner-br" />

        {/* Modal Header */}
        <div className="wood-panel px-6 py-4 border-b-3 border-[#5e381f] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Pytha the Wise Avatar Icon */}
            <div className="w-12 h-12 rounded-full bg-[#1e130a] border-2 border-amber-400/80 flex items-center justify-center shadow-lg relative">
              <span className="text-2xl">🦉</span>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[9px] text-white">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg md:text-xl font-bold text-amber-100">
                  PYTHA THE WISE
                </h2>
                <span className="bg-[#4a2e12] text-amber-300 text-[10px] font-cinzel px-2 py-0.5 rounded border border-amber-600/60">
                  Arcane Python Mentor
                </span>
              </div>
              <p className="text-xs text-amber-200/80 font-medieval">
                "Code is merely logic woven into runes. Let us examine your path."
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-9 h-9 rounded-lg bg-[#27140a] hover:bg-[#3d2010] border border-[#7a5229] text-amber-200 flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#926839] bg-[#dfcca5] px-4 gap-2 pt-2 text-xs font-cinzel font-bold">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('review'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'review'
                ? 'bg-[#f7edd4] text-[#331c0a] border-t-2 border-x-2 border-[#7a5229]'
                : 'text-[#694017] hover:text-[#331c0a]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Review Mistakes ({mistakes.length})</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('concepts'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'concepts'
                ? 'bg-[#f7edd4] text-[#331c0a] border-t-2 border-x-2 border-[#7a5229]'
                : 'text-[#694017] hover:text-[#331c0a]'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Concept Analysis</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('practice'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'practice'
                ? 'bg-[#f7edd4] text-[#331c0a] border-t-2 border-x-2 border-[#7a5229]'
                : 'text-[#694017] hover:text-[#331c0a]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Recommended Practice</span>
          </button>

          <button
            onClick={() => { sounds.playClick(); setActiveTab('summary'); }}
            className={`px-4 py-2 rounded-t-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'summary'
                ? 'bg-[#f7edd4] text-[#331c0a] border-t-2 border-x-2 border-[#7a5229]'
                : 'text-[#694017] hover:text-[#331c0a]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Performance Summary</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto flex-1 text-[#2b180d] font-body text-xs md:text-sm">
          {/* TAB 1: REVIEW MISTAKES */}
          {activeTab === 'review' && (
            <div className="flex flex-col gap-4">
              {mistakes.length === 0 ? (
                <div className="p-8 text-center bg-[#ebd7b1] rounded-xl border border-[#9d7445]">
                  <Sparkles className="w-10 h-10 text-amber-700 mx-auto mb-2 animate-bounce" />
                  <h3 className="font-cinzel font-bold text-base text-[#3d2212]">
                    A Flawless Venture!
                  </h3>
                  <p className="text-xs text-[#6a441e] mt-1 max-w-md mx-auto">
                    You made zero errors in this round. The Python runes obeyed your every thought with pristine mathematical precision!
                  </p>
                </div>
              ) : (
                mistakes.map((mistake, index) => (
                  <div
                    key={index}
                    className="bg-[#ebd9b5] rounded-xl p-4 border-2 border-[#9d7445] shadow-sm flex flex-col gap-3"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#baa07c] pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-red-800 text-white font-cinzel font-bold flex items-center justify-center text-[10px]">
                          {index + 1}
                        </span>
                        <span className="font-cinzel font-bold text-sm text-[#3b200d]">
                          {mistake.challengeTitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-[#caa359]/40 px-2 py-0.5 rounded text-[#422710]">
                        Subtopic {mistake.subtopicCode}
                      </span>
                    </div>

                    {/* Code Slate Snippet */}
                    <div className="bg-[#180e08] p-3 rounded-lg font-code text-xs text-amber-200 overflow-x-auto border border-[#4a2e12]">
                      {mistake.code}
                    </div>

                    {/* Mentor Deep Explanation Box */}
                    <div className="bg-[#fcf7ec] rounded-lg p-3.5 border border-[#8d6232] flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-900">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>Core Concept: {mistake.mentorExplanation?.coreConcept}</span>
                      </div>

                      <p className="text-xs text-[#412713] leading-relaxed">
                        <strong>What Happened: </strong>
                        {mistake.mentorExplanation?.whatHappened}
                      </p>

                      <p className="text-xs text-[#412713] leading-relaxed">
                        <strong>Why Python Behaves This Way: </strong>
                        {mistake.mentorExplanation?.whyPythonBehavesThisWay}
                      </p>

                      <div className="mt-1 bg-amber-100/80 p-2 rounded border-l-3 border-amber-600 text-[11px] italic text-[#593414]">
                        💡 Adventurer Tip: {mistake.mentorExplanation?.adventurerTip}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: CONCEPT ANALYSIS */}
          {activeTab === 'concepts' && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#ebd9b5] p-4 rounded-xl border border-[#9d7445]">
                <h3 className="font-cinzel font-bold text-sm text-[#3b200d] mb-1">
                  Identified Weak Logic Areas
                </h3>
                <p className="text-xs text-[#5c3716]">
                  Based on your tracebacks and missteps, Pytha has isolated concepts requiring reinforcement:
                </p>

                <div className="mt-4 flex flex-col gap-2.5">
                  {topWeakConcepts.length > 0 ? (
                    topWeakConcepts.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#fbf4e4] p-3 rounded-lg border border-[#8e6538] flex items-center justify-between"
                      >
                        <div>
                          <div className="font-cinzel font-bold text-xs text-[#3d2212]">
                            {item.concept}
                          </div>
                          <div className="text-[11px] text-[#694017]">
                            Frequency: {item.count} misconception{item.count > 1 ? 's' : ''} logged
                          </div>
                        </div>
                        <span className="text-[11px] font-cinzel bg-amber-200 text-amber-900 px-2.5 py-1 rounded font-bold border border-amber-400">
                          Needs Practice
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs text-stone-600 italic">
                      No significant concept weaknesses recorded in your journey yet!
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RECOMMENDED PRACTICE */}
          {activeTab === 'practice' && (
            <div className="flex flex-col gap-3">
              <div className="bg-[#ebd9b5] p-3.5 rounded-xl border border-[#9d7445]">
                <h3 className="font-cinzel font-bold text-sm text-[#3b200d] mb-1">
                  Pytha’s Prescribed Quests
                </h3>
                <p className="text-xs text-[#5c3716]">
                  Targeted drills to reinforce mental tracing models before advancing to World 2.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#fcf7ec] p-3.5 rounded-xl border border-[#9d7445] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-cinzel font-bold text-amber-800">
                      Drill 1
                    </span>
                    <h4 className="font-cinzel font-bold text-sm text-[#3b200d] mt-0.5">
                      The Finger-Tracing Rite
                    </h4>
                    <p className="text-xs text-[#5c3716] mt-1">
                      Trace sequential assignments on paper before picking answers in Level 2 Apply.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-bold text-amber-800">
                    Recommended: Subtopic 1.2 Level 2
                  </div>
                </div>

                <div className="bg-[#fcf7ec] p-3.5 rounded-xl border border-[#9d7445] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-cinzel font-bold text-amber-800">
                      Drill 2
                    </span>
                    <h4 className="font-cinzel font-bold text-sm text-[#3b200d] mt-0.5">
                      The Colon & Indent Check
                    </h4>
                    <p className="text-xs text-[#5c3716] mt-1">
                      Observe column zero alignment in Subtopic 1.4 to cement block boundary awareness.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-bold text-amber-800">
                    Recommended: Subtopic 1.4 Level 1
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PERFORMANCE SUMMARY */}
          {activeTab === 'summary' && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#ebd9b5] p-4 rounded-xl border border-[#9d7445] flex flex-col gap-3">
                <h3 className="font-cinzel font-bold text-sm text-[#3b200d]">
                  Adventurer Diagnostic Log
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#fbf4e4] p-3 rounded-lg border border-[#baa07c] text-center">
                    <span className="text-[10px] uppercase font-cinzel text-[#694017] block">Accuracy</span>
                    <span className="font-cinzel text-lg font-bold text-emerald-800">
                      {progress.totalChallengesAttempted > 0
                        ? Math.round((progress.totalChallengesCorrect / progress.totalChallengesAttempted) * 100)
                        : 100}%
                    </span>
                  </div>

                  <div className="bg-[#fbf4e4] p-3 rounded-lg border border-[#baa07c] text-center">
                    <span className="text-[10px] uppercase font-cinzel text-[#694017] block">Solved</span>
                    <span className="font-cinzel text-lg font-bold text-[#3d2212]">
                      {progress.totalChallengesCorrect}
                    </span>
                  </div>

                  <div className="bg-[#fbf4e4] p-3 rounded-lg border border-[#baa07c] text-center">
                    <span className="text-[10px] uppercase font-cinzel text-[#694017] block">Streak</span>
                    <span className="font-cinzel text-lg font-bold text-amber-800">
                      {progress.flawlessStreak} Flawless
                    </span>
                  </div>

                  <div className="bg-[#fbf4e4] p-3 rounded-lg border border-[#baa07c] text-center">
                    <span className="text-[10px] uppercase font-cinzel text-[#694017] block">XP Level</span>
                    <span className="font-cinzel text-lg font-bold text-blue-800">
                      Lvl {Math.floor(progress.xp / 100) + 1}
                    </span>
                  </div>
                </div>

                <div className="bg-[#f8f0de] p-3.5 rounded-lg border border-[#8e6538] text-xs leading-relaxed text-[#452712]">
                  <strong>Pytha's Appraisal: </strong>
                  "You possess high intuition for sequential logic. Maintain vigilance when tracking variables through distraction assignments, and never underestimate the power of the humble hashtag!"
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="wood-panel px-6 py-3 border-t-3 border-[#5e381f] flex justify-end">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="btn-fantasy-gold px-6 py-2 rounded-lg text-xs font-cinzel cursor-pointer"
          >
            Acknowledge & Continue Quest
          </button>
        </div>
      </div>
    </div>
  );
};
