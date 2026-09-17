import React from 'react';
import { DecorativeVines } from './DecorativeVines';

interface FantasySignProps {
  title: string;
  subtitle?: string;
  hasRopes?: boolean;
  hasVines?: boolean;
  className?: string;
}

export const FantasySign: React.FC<FantasySignProps> = ({
  title,
  subtitle = 'Learn to think through code.',
  hasRopes = true,
  hasVines = true,
  className = '',
}) => {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Two Hanging Ropes / Iron Chains from overhead canopy */}
      {hasRopes && (
        <div className="w-full max-w-[260px] flex justify-between px-6 -mb-2 z-20 pointer-events-none">
          {/* Left Iron Ring & Rope */}
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-7 bg-gradient-to-b from-[#8a5d2b] via-[#c69a5a] to-[#6d4117] rounded-xs shadow-md border-x border-[#3b200b]" />
            <div className="w-4 h-4 rounded-full border-2 border-[#1c1917] bg-[#4b5563] -mt-1 shadow" />
          </div>

          {/* Right Iron Ring & Rope */}
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-7 bg-gradient-to-b from-[#8a5d2b] via-[#c69a5a] to-[#6d4117] rounded-xs shadow-md border-x border-[#3b200b]" />
            <div className="w-4 h-4 rounded-full border-2 border-[#1c1917] bg-[#4b5563] -mt-1 shadow" />
          </div>
        </div>
      )}

      {/* Main Carved Wooden Hanging Plank - Compact & In-World */}
      <div className="relative bg-gradient-to-b from-[#783e15] via-[#54280b] to-[#341604] border-3 border-[#945826] rounded-2xl px-5 sm:px-8 py-2 sm:py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,230,170,0.3)] flex flex-col items-center text-center max-w-sm sm:max-w-md">
        {/* Moss Tufts on Top Edge of Sign */}
        <div className="absolute -top-2 left-6 w-8 h-2.5 bg-[#65a30d] rounded-t-full border-t border-[#365314] shadow pointer-events-none" />
        <div className="absolute -top-1.5 right-8 w-6 h-2 bg-[#4d7c0f] rounded-t-full border-t border-[#365314] shadow pointer-events-none" />

        {/* Small Decorative Vines wrapping sign corners */}
        {hasVines && (
          <>
            <DecorativeVines position="top-left" />
            <DecorativeVines position="top-right" />
          </>
        )}

        {/* Corner Iron Rivets */}
        <span className="absolute top-2 left-2.5 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#78350f] shadow pointer-events-none" />
        <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#78350f] shadow pointer-events-none" />
        <span className="absolute bottom-2 left-2.5 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#78350f] shadow pointer-events-none" />
        <span className="absolute bottom-2 right-2.5 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#78350f] shadow pointer-events-none" />

        {/* Main Title - Chunky 3D Carved Adventure Typography */}
        <h1 className="font-adventure text-2xl sm:text-3xl md:text-4xl text-carved-title tracking-wider leading-none">
          {title}
        </h1>

        {/* Subtitle Plaque Inscription */}
        {subtitle && (
          <div className="mt-1.5 pt-1 border-t border-[#7b4618]/50 w-full flex items-center justify-center">
            <span className="font-medieval text-xs sm:text-sm text-[#fef08a] italic tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              "{subtitle}"
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
