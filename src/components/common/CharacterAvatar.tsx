import React from 'react';

interface CharacterAvatarProps {
  mood?: 'idle' | 'happy' | 'thinking' | 'shocked' | 'victorious' | 'defeat';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  mood = 'idle',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-20',
    md: 'w-28 h-36',
    lg: 'w-44 h-56',
  }[size];

  return (
    <div id="character-avatar-container" className={`relative flex items-center justify-center select-none ${sizeMap} ${className}`}>
      {/* Magic halo aura */}
      <div className="absolute inset-0 rounded-full bg-amber-500/15 blur-xl pointer-events-none animate-pulse" />

      {/* Illustrated 2D Fantasy Character (Pip the Code Apprentice) */}
      <svg
        className="w-full h-full drop-shadow-2xl overflow-visible transition-transform duration-300"
        viewBox="0 0 120 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="cloakTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="50%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <radialGradient id="crystalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
        </defs>

        {/* Character Shadow */}
        <ellipse cx="60" cy="142" rx="34" ry="7" fill="#000000" opacity="0.45" />

        {/* Apprentice Cloak / Robe Body */}
        <g className="animate-[bounce_4s_infinite_ease-in-out]">
          {/* Robe */}
          <path
            d="M38 75 C30 110, 24 135, 20 138 C40 142, 80 142, 100 138 C96 135, 90 110, 82 75 Z"
            fill="url(#robeGrad)"
            stroke="#172554"
            strokeWidth="2"
          />

          {/* Robe Golden Trim Hem */}
          <path
            d="M20 138 C40 142, 80 142, 100 138"
            stroke="url(#cloakTrim)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Leather Adventurer Satchel */}
          <path
            d="M32 94 L88 122"
            stroke="#78350f"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <rect x="74" y="112" width="16" height="18" rx="3" fill="#92400e" stroke="#451a03" strokeWidth="2" />
          <circle cx="82" cy="120" r="2.5" fill="#fef08a" />

          {/* Boots */}
          <ellipse cx="44" cy="140" rx="8" ry="4" fill="#3e2723" />
          <ellipse cx="76" cy="140" rx="8" ry="4" fill="#3e2723" />

          {/* Character Head / Face */}
          <g>
            {/* Ears */}
            <path d="M36 50 C32 50, 31 56, 36 58 Z" fill="#fed7aa" />
            <path d="M84 50 C88 50, 89 56, 84 58 Z" fill="#fed7aa" />

            {/* Face oval */}
            <ellipse cx="60" cy="54" rx="22" ry="20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />

            {/* Rosy Cheeks */}
            <circle cx="46" cy="58" r="4" fill="#f87171" opacity="0.4" />
            <circle cx="74" cy="58" r="4" fill="#f87171" opacity="0.4" />

            {/* Eyes based on mood */}
            {mood === 'defeat' ? (
              <>
                {/* Sad Closed Eyes */}
                <path d="M47 52 Q51 47 55 52" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M65 52 Q69 47 73 52" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Frown */}
                <path d="M54 65 Q60 60 66 65" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            ) : mood === 'shocked' ? (
              <>
                <circle cx="51" cy="50" r="5" fill="#ffffff" stroke="#1c1917" strokeWidth="1.5" />
                <circle cx="51" cy="50" r="2" fill="#1c1917" />
                <circle cx="69" cy="50" r="5" fill="#ffffff" stroke="#1c1917" strokeWidth="1.5" />
                <circle cx="69" cy="50" r="2" fill="#1c1917" />
                {/* O mouth */}
                <ellipse cx="60" cy="62" rx="4" ry="5" fill="#7f1d1d" />
              </>
            ) : mood === 'thinking' ? (
              <>
                <path d="M47 48 Q51 46 55 48" stroke="#1c1917" strokeWidth="2" fill="none" />
                <circle cx="71" cy="48" r="3" fill="#1c1917" />
                <path d="M56 63 Q60 61 64 63" stroke="#1c1917" strokeWidth="2" fill="none" />
              </>
            ) : (
              <>
                {/* Alert Curious Eyes */}
                <circle cx="51" cy="50" r="3.5" fill="#1c1917" />
                <circle cx="50" cy="49" r="1.2" fill="#ffffff" />
                <circle cx="69" cy="50" r="3.5" fill="#1c1917" />
                <circle cx="68" cy="49" r="1.2" fill="#ffffff" />
                {/* Cheerful Smile */}
                <path d="M54 62 Q60 68 66 62" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* Hair bangs */}
            <path
              d="M39 42 C45 38, 52 48, 58 42 C64 48, 72 38, 81 42 C79 32, 60 28, 39 42 Z"
              fill="#78350f"
            />

            {/* Apprentice Wizard Hat */}
            <path
              d="M30 38 C40 32, 80 32, 90 38 C94 40, 88 44, 60 43 C32 44, 26 40, 30 38 Z"
              fill="#d97706"
              stroke="#78350f"
              strokeWidth="2"
            />
            {/* Hat Cone */}
            <path
              d="M38 36 Q60 12 70 4 Q75 16 82 36 Z"
              fill="#1e3a8a"
              stroke="#1e293b"
              strokeWidth="2"
            />
            {/* Hat Feather */}
            <path
              d="M72 16 Q88 8 96 14 Q88 20 74 22"
              fill="#ef4444"
              stroke="#991b1b"
              strokeWidth="1.5"
            />
          </g>

          {/* Magic Staff held on the side */}
          <g className="rune-pulse">
            {/* Wooden Staff Pole */}
            <line x1="22" y1="50" x2="16" y2="140" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            <line x1="22" y1="50" x2="16" y2="140" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Carved Arcane Headpiece */}
            <path
              d="M16 52 C12 40, 28 35, 24 24 C14 30, 10 44, 16 52 Z"
              fill="#ca8a04"
              stroke="#854d0e"
              strokeWidth="1.5"
            />
            
            {/* Floating Python Logic Core Crystal */}
            <circle cx="21" cy="30" r="7" fill="url(#crystalGlow)" />
            <circle cx="19" cy="28" r="2.5" fill="#ffffff" opacity="0.8" />
            {/* Python Serpent Swirl Glyph */}
            <path
              d="M19 27 C23 27, 24 30, 20 32 C17 34, 23 35, 22 33"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
