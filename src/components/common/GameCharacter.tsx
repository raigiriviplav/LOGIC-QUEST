import React from 'react';

export type CharacterMood = 'idle' | 'thinking' | 'victorious' | 'shocked' | 'defeat' | 'adventuring';

interface GameCharacterProps {
  mood?: CharacterMood;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showShadow?: boolean;
}

export const GameCharacter: React.FC<GameCharacterProps> = ({
  mood = 'idle',
  size = 'md',
  className = '',
  showShadow = true,
}) => {
  const sizeDims = {
    sm: { w: 72, h: 92 },
    md: { w: 110, h: 140 },
    lg: { w: 160, h: 200 },
    hero: { w: 210, h: 260 },
  }[size];

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none pointer-events-none ${className}`}
      style={{ width: sizeDims.w, height: sizeDims.h }}
    >
      {/* Hand-drawn SVG Character */}
      <svg
        viewBox="0 0 160 200"
        className={`w-full h-full drop-shadow-md ${
          mood === 'victorious' ? 'animate-bounce' : 'animate-[float_4s_ease-in-out_infinite]'
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for natural hand-painted warmth */}
          <linearGradient id="charSkinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffdfba" />
            <stop offset="100%" stopColor="#f5be94" />
          </linearGradient>
          <linearGradient id="charHairGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="charTunicGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="charVestGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>
          <linearGradient id="charBackpackGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#5b2806" />
          </linearGradient>
          <linearGradient id="charBootsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5c3821" />
            <stop offset="100%" stopColor="#2b180d" />
          </linearGradient>
          <radialGradient id="torchGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. BACKPACK (Behind character body) */}
        <g id="backpack">
          {/* Backpack bulk on left shoulder */}
          <rect
            x="36"
            y="94"
            width="32"
            height="44"
            rx="8"
            fill="url(#charBackpackGrad)"
            stroke="#381a04"
            strokeWidth="3"
          />
          {/* Rolled Bedroll / Code Scroll lashed to top */}
          <rect
            x="30"
            y="82"
            width="42"
            height="15"
            rx="7"
            fill="#e2ce9c"
            stroke="#45250c"
            strokeWidth="2.5"
          />
          {/* Scroll Tie Strings */}
          <line x1="39" y1="82" x2="39" y2="97" stroke="#854d0e" strokeWidth="2.5" />
          <line x1="63" y1="82" x2="63" y2="97" stroke="#854d0e" strokeWidth="2.5" />
          {/* Small Pouch with Brass Button */}
          <rect x="38" y="112" width="16" height="18" rx="4" fill="#a16207" stroke="#45250c" strokeWidth="2" />
          <circle cx="46" cy="118" r="2" fill="#fef08a" />
        </g>

        {/* 2. LEGS & STURDY BOOTS */}
        <g id="legs-and-boots">
          {/* Left Leg (Dark Khaki Shorts/Pants) */}
          <path d="M60 142 L58 166 L72 166 L73 142 Z" fill="#3f2e1e" stroke="#26170d" strokeWidth="2.5" />
          {/* Right Leg */}
          <path d="M84 142 L85 166 L99 166 L97 142 Z" fill="#3f2e1e" stroke="#26170d" strokeWidth="2.5" />

          {/* Left Boot */}
          <path
            d="M50 178 Q50 164 62 164 L74 164 Q74 178 74 182 L48 182 Q46 182 50 178 Z"
            fill="url(#charBootsGrad)"
            stroke="#201108"
            strokeWidth="2.5"
          />
          {/* Boot folded cuff */}
          <rect x="52" y="163" width="22" height="6" rx="2" fill="#784b28" stroke="#201108" strokeWidth="1.5" />
          {/* Left Boot Sole */}
          <rect x="46" y="180" width="30" height="4" rx="2" fill="#170c06" />

          {/* Right Boot */}
          <path
            d="M84 164 L96 164 Q108 164 108 178 Q112 182 110 182 L84 182 Z"
            fill="url(#charBootsGrad)"
            stroke="#201108"
            strokeWidth="2.5"
          />
          {/* Boot folded cuff */}
          <rect x="83" y="163" width="22" height="6" rx="2" fill="#784b28" stroke="#201108" strokeWidth="1.5" />
          {/* Right Boot Sole */}
          <rect x="82" y="180" width="30" height="4" rx="2" fill="#170c06" />
        </g>

        {/* 3. TORSO & ADVENTURER CLOTHING */}
        <g id="torso">
          {/* Linen Undershirt (Cream) */}
          <path
            d="M58 98 Q78 94 98 98 L104 142 L52 142 Z"
            fill="#fef3c7"
            stroke="#382110"
            strokeWidth="3"
          />

          {/* Forest Green Explorer Vest */}
          {/* Left Vest Flap */}
          <path
            d="M56 98 L72 100 L68 138 L52 136 Z"
            fill="url(#charVestGrad)"
            stroke="#274609"
            strokeWidth="2.5"
          />
          {/* Right Vest Flap */}
          <path
            d="M100 98 L84 100 L88 138 L104 136 Z"
            fill="url(#charVestGrad)"
            stroke="#274609"
            strokeWidth="2.5"
          />

          {/* Leather Belt & Golden Buckle */}
          <rect x="52" y="134" width="52" height="9" rx="2" fill="#451a03" stroke="#200b01" strokeWidth="2" />
          <rect x="71" y="132" width="14" height="13" rx="3" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          <rect x="74" y="135" width="8" height="7" rx="1" fill="#451a03" />

          {/* Small Glowing Potion Bottle hooked on belt */}
          <circle cx="98" cy="144" r="5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="96" y="138" width="4" height="3" fill="#92400e" />
          <circle cx="97" cy="143" r="1.5" fill="#ffffff" opacity="0.8" />
        </g>

        {/* 4. ADVENTURER'S WALKING STAFF / LOGIC QUIL (In Right Hand) */}
        <g id="staff">
          {/* Carved wooden staff shaft */}
          <line
            x1={mood === 'victorious' ? 122 : 116}
            y1={mood === 'victorious' ? 30 : 68}
            x2={mood === 'victorious' ? 104 : 116}
            y2={184}
            stroke="#543016"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <line
            x1={mood === 'victorious' ? 122 : 116}
            y1={mood === 'victorious' ? 30 : 68}
            x2={mood === 'victorious' ? 104 : 116}
            y2={184}
            stroke="#874e25"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Staff Headpiece: Glowing Crystal Rune */}
          <circle
            cx={mood === 'victorious' ? 124 : 116}
            cy={mood === 'victorious' ? 26 : 64}
            r="12"
            fill="url(#torchGlow)"
          />
          <polygon
            points={
              mood === 'victorious'
                ? '124,18 132,26 124,34 116,26'
                : '116,56 124,64 116,72 108,64'
            }
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="1.5"
          />
        </g>

        {/* 5. ARMS */}
        <g id="arms">
          {/* Left Arm (holding backpack strap or on hip) */}
          {mood === 'thinking' ? (
            /* Arm reaching up to chin */
            <path
              d="M54 104 Q46 86 64 78"
              stroke="#f5be94"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            /* Arm resting naturally or gripping strap */
            <path
              d="M54 104 Q44 116 48 130"
              stroke="#f5be94"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Right Arm (gripping the staff) */}
          {mood === 'victorious' ? (
            <path
              d="M102 104 Q114 65 118 42"
              stroke="#f5be94"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M102 104 Q114 112 114 124"
              stroke="#f5be94"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          )}
        </g>

        {/* 6. HEAD & EXPRESSIVE FACE */}
        <g id="head">
          {/* Ears with cute blush */}
          <circle cx="50" cy="62" r="7" fill="#f5be94" stroke="#45250c" strokeWidth="2" />
          <circle cx="106" cy="62" r="7" fill="#f5be94" stroke="#45250c" strokeWidth="2" />

          {/* Face Base */}
          <circle
            cx="78"
            cy="60"
            r="28"
            fill="url(#charSkinGrad)"
            stroke="#45250c"
            strokeWidth="3.5"
          />

          {/* Cute Rosy Cheek Blush */}
          <circle cx="62" cy="68" r="6" fill="#f87171" opacity="0.38" />
          <circle cx="94" cy="68" r="6" fill="#f87171" opacity="0.38" />

          {/* Expressive Adventurer Eyes based on mood */}
          {mood === 'defeat' ? (
            <>
              <path d="M62 58 Q68 52 72 58" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M84 58 Q88 52 94 58" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Downward mouth */}
              <path d="M72 74 Q78 69 84 74" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          ) : mood === 'shocked' ? (
            <>
              {/* Wide round startled eyes */}
              <circle cx="67" cy="58" r="7" fill="#ffffff" stroke="#1c1917" strokeWidth="2" />
              <circle cx="67" cy="58" r="3" fill="#1c1917" />
              <circle cx="89" cy="58" r="7" fill="#ffffff" stroke="#1c1917" strokeWidth="2" />
              <circle cx="89" cy="58" r="3" fill="#1c1917" />
              {/* Open round O mouth */}
              <circle cx="78" cy="73" r="4.5" fill="#78350f" />
              {/* Sweat drop on forehead */}
              <path d="M98 42 Q103 48 98 52 Q93 48 98 42" fill="#38bdf8" />
            </>
          ) : (
            <>
              {/* Bright Adventurous Eyes (Large cartoon style with eye-shine reflections) */}
              <ellipse cx="67" cy="59" rx="5.5" ry="7" fill="#1e293b" />
              <ellipse cx="89" cy="59" rx="5.5" ry="7" fill="#1e293b" />
              {/* Eye Catchlights */}
              <circle cx="65" cy="56" r="2.5" fill="#ffffff" />
              <circle cx="69" cy="61" r="1.2" fill="#ffffff" />
              <circle cx="87" cy="56" r="2.5" fill="#ffffff" />
              <circle cx="91" cy="61" r="1.2" fill="#ffffff" />

              {/* Eyebrows */}
              <path
                d={
                  mood === 'thinking'
                    ? 'M62 48 Q67 47 72 50'
                    : 'M62 48 Q67 44 72 48'
                }
                stroke="#543016"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={
                  mood === 'thinking'
                    ? 'M84 50 Q89 45 94 46'
                    : 'M84 48 Q89 44 94 48'
                }
                stroke="#543016"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Small Adventurous Smile */}
              <path
                d="M72 70 Q78 77 84 70"
                stroke="#78350f"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}

          {/* Cute Button Nose */}
          <circle cx="78" cy="64" r="2.2" fill="#d97706" />

          {/* Tousled Brown Hair */}
          <path
            d="M50 56 Q52 32 78 30 Q104 32 106 56 Q100 40 86 42 Q78 36 68 42 Q58 38 50 56 Z"
            fill="url(#charHairGrad)"
            stroke="#271104"
            strokeWidth="3"
          />
          {/* Hair fringe tufts */}
          <path d="M72 38 Q78 48 82 38" fill="url(#charHairGrad)" />
          <path d="M60 42 Q66 52 70 42" fill="url(#charHairGrad)" />

          {/* 7. ADVENTURER'S HEADBAND / LEATHER CAP WITH FEATHER */}
          <path
            d="M52 42 Q78 34 104 42"
            stroke="#b45309"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Brass Medallion on Band */}
          <circle cx="78" cy="38" r="4.5" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          <circle cx="78" cy="38" r="1.5" fill="#ffffff" />

          {/* Emerald Scout Feather pinned to the headband */}
          <path
            d="M52 42 Q40 24 38 10 Q48 18 52 38"
            fill="#10b981"
            stroke="#065f46"
            strokeWidth="1.8"
          />
          <line x1="48" y1="36" x2="40" y2="14" stroke="#6ee7b7" strokeWidth="1" />
        </g>
      </svg>

      {/* Real Ground Contact Shadow - Multi-Layer Ambient Occlusion */}
      {showShadow && (
        <div className="absolute -bottom-2 w-full flex flex-col items-center pointer-events-none">
          {/* Broad soft diffuse shadow */}
          <div
            className="w-[85%] h-5 rounded-full bg-[#1b0d05]/45 blur-[5px]"
            style={{ transform: 'scaleY(0.45)' }}
          />
          {/* Dense contact occlusion shadow right beneath boots */}
          <div
            className="w-[60%] h-3 rounded-full bg-[#0d0502]/85 blur-[1.5px] -mt-3.5"
            style={{ transform: 'scaleY(0.4)' }}
          />
        </div>
      )}
    </div>
  );
};
