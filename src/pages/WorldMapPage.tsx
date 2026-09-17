import React from 'react';
import { WorldMapScene } from '../components/environment/WorldMapScene';
import { World, PlayerProgress } from '../types/game';
import { worldsData } from '../data/worlds';
import { DecorativeVines } from '../components/common/DecorativeVines';

interface WorldMapPageProps {
  progress?: PlayerProgress;
  onSelectWorld: (world: World) => void;
  onBackToMenu: () => void;
}

export const WorldMapPage: React.FC<WorldMapPageProps> = ({
  progress,
  onSelectWorld,
  onBackToMenu,
}) => {
  return (
    <div
      id="world-map-page"
      className="w-full min-h-screen bg-[#140b05] flex items-center justify-center p-1 sm:p-3 md:p-4 select-none"
    >
      {/* Heavy Carved Timber Frame for the Realm Map */}
      <div className="relative w-full max-w-7xl h-[94vh] rounded-3xl overflow-hidden border-6 sm:border-8 border-[#542d13] shadow-[0_20px_60px_rgba(0,0,0,0.95),inset_0_4px_8px_rgba(255,220,160,0.25)] flex flex-col">
        {/* Decorative corner vines and moss bindings */}
        <DecorativeVines position="top-left" />
        <DecorativeVines position="top-right" />
        <DecorativeVines position="bottom-left" />
        <DecorativeVines position="bottom-right" />

        <WorldMapScene
          worlds={worldsData}
          progress={progress}
          onSelectWorld={onSelectWorld}
          onBackToMenu={onBackToMenu}
        />
      </div>
    </div>
  );
};
