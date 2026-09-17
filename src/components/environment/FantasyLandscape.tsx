import React from 'react';
import { GameCharacter, CharacterMood } from '../common/GameCharacter';
import paintedLandscapeUrl from '../../assets/images/painted_fantasy_landscape_1789666822357.jpg';

interface FantasyLandscapeProps {
  characterMood?: CharacterMood;
  showCharacter?: boolean;
  className?: string;
}

export const FantasyLandscape: React.FC<FantasyLandscapeProps> = ({
  characterMood = 'idle',
  showCharacter = true,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {/* =========================================================================
          1. MASTER HAND-PAINTED 2D ADVENTURE BACKGROUND
          Rich painterly environment with painted sky, atmospheric clouds, distant mountains,
          hazy spires, gnarled ancient trees, cozy timber cottage, and winding trail.
          ========================================================================= */}
      <img
        src={paintedLandscapeUrl}
        alt="Hand-painted 2D fantasy adventure landscape"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-bottom sm:object-center transform scale-[1.01] filter brightness-[0.98] contrast-[1.03]"
      />

      {/* Atmospheric Sunlight Shafts & Canopy God Rays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-amber-400/10 to-transparent pointer-events-none mix-blend-screen" />
      <div
        className="absolute -top-24 left-1/4 w-[600px] h-[700px] pointer-events-none opacity-40 mix-blend-color-dodge"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 30% 0%, rgba(254, 240, 138, 0.45) 0%, rgba(253, 224, 71, 0.15) 50%, transparent 80%)',
          transform: 'rotate(-12deg)',
        }}
      />

      {/* Gentle Floating Atmospheric Motes / Sunlit Spores */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '35%', left: '25%', delay: '0s', dur: '4s', size: 'w-2 h-2', color: 'bg-amber-200' },
          { top: '45%', left: '60%', delay: '1.2s', dur: '5s', size: 'w-1.5 h-1.5', color: 'bg-yellow-100' },
          { top: '55%', left: '38%', delay: '2.5s', dur: '4.5s', size: 'w-2 h-2', color: 'bg-amber-300' },
          { top: '40%', left: '80%', delay: '0.8s', dur: '6s', size: 'w-1.5 h-1.5', color: 'bg-emerald-200' },
          { top: '65%', left: '72%', delay: '1.9s', dur: '5.2s', size: 'w-2 h-2', color: 'bg-amber-200' },
          { top: '50%', left: '15%', delay: '3.1s', dur: '4.8s', size: 'w-1.5 h-1.5', color: 'bg-yellow-200' },
        ].map((mote, idx) => (
          <div
            key={`mote-${idx}`}
            className={`absolute rounded-full ${mote.size} ${mote.color} blur-[0.8px] opacity-75 animate-pulse`}
            style={{
              top: mote.top,
              left: mote.left,
              animationDelay: mote.delay,
              animationDuration: mote.dur,
            }}
          />
        ))}
      </div>

      {/* =========================================================================
          2. THE ADVENTURER: Integrated firmly into the winding path
          ========================================================================= */}
      {showCharacter && (
        <div className="absolute bottom-[10%] sm:bottom-[12%] md:bottom-[13%] left-[42%] sm:left-[45%] md:left-[47%] z-20 transition-transform duration-300">
          {/* Main Character with rich shading and dynamic pose */}
          <GameCharacter mood={characterMood} size="hero" showShadow={true} />

          {/* Environmental overlap directly in front of boots (Z-25) */}
          {/* Grass blades, tiny wild daisy, and trail pebbles sitting in front of the boots */}
          <div className="absolute -bottom-1 -left-4 w-32 h-8 z-30 pointer-events-none">
            <svg viewBox="0 0 140 40" className="w-full h-full" fill="none">
              {/* Pebbles on soil */}
              <ellipse cx="25" cy="32" rx="4" ry="2" fill="#57534e" stroke="#292524" strokeWidth="0.8" />
              <ellipse cx="95" cy="33" rx="3.5" ry="1.8" fill="#78716c" stroke="#292524" strokeWidth="0.8" />
              {/* Grass blades sprouting in front of the character's boots */}
              <path d="M12 36 Q18 20 22 14 Q20 24 16 36 Z" fill="#65a30d" stroke="#1c2d06" strokeWidth="0.8" />
              <path d="M18 36 Q25 16 32 10 Q28 22 24 36 Z" fill="#4d7c0f" stroke="#1c2d06" strokeWidth="0.8" />
              <path d="M26 36 Q30 22 36 18 Q33 26 30 36 Z" fill="#84cc16" stroke="#1c2d06" strokeWidth="0.8" />

              <path d="M85 36 Q90 18 96 12 Q93 24 89 36 Z" fill="#4d7c0f" stroke="#1c2d06" strokeWidth="0.8" />
              <path d="M92 36 Q98 22 105 16 Q101 26 97 36 Z" fill="#65a30d" stroke="#1c2d06" strokeWidth="0.8" />
              <path d="M102 36 Q108 24 114 20 Q110 28 106 36 Z" fill="#84cc16" stroke="#1c2d06" strokeWidth="0.8" />

              {/* Little yellow trail buttercup */}
              <circle cx="28" cy="18" r="3" fill="#facc15" stroke="#a16207" strokeWidth="0.8" />
              <circle cx="28" cy="18" r="1.2" fill="#ca8a04" />
            </svg>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. FOREGROUND VIGNETTE & NATURAL CANOPY FRAMING (Camera Plane)
          Rich painted branches, dangling vines, ferns, moss, and mushrooms
          framing the edges of the screen to give deep 3D adventure depth.
          ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Wood and foliage organic multi-stop gradients */}
          <linearGradient id="canopyBranchGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c1508" />
            <stop offset="40%" stopColor="#4a250e" />
            <stop offset="80%" stopColor="#321708" />
            <stop offset="100%" stopColor="#190b04" />
          </linearGradient>

          <linearGradient id="leafDarkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3f6212" />
            <stop offset="100%" stopColor="#1a2e05" />
          </linearGradient>

          <linearGradient id="leafBrightGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="60%" stopColor="#4d7c0f" />
            <stop offset="100%" stopColor="#1e3a07" />
          </linearGradient>

          <linearGradient id="toadstoolCapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
        </defs>

        {/* --- TOP-LEFT OVERHANGING CANOPY BRANCH --- */}
        <g id="top-left-canopy">
          {/* Main Gnarled Branch */}
          <path
            d="M-30 -30 Q80 30 220 25 Q320 60 420 50 Q360 85 240 65 Q110 70 -30 20 Z"
            fill="url(#canopyBranchGrad)"
            stroke="#160803"
            strokeWidth="3"
          />
          {/* Secondary small twigs */}
          <path d="M160 30 Q210 70 250 90" stroke="#321708" strokeWidth="6" strokeLinecap="round" />
          <path d="M280 40 Q330 80 360 100" stroke="#321708" strokeWidth="5" strokeLinecap="round" />

          {/* Layered Leaf Clusters with Painterly Volumetric Volumes */}
          {[
            { cx: 60, cy: 30, rx: 45, ry: 25, rot: -10, grad: 'url(#leafDarkGrad)' },
            { cx: 120, cy: 45, rx: 50, ry: 28, rot: 5, grad: 'url(#leafBrightGrad)' },
            { cx: 190, cy: 40, rx: 46, ry: 26, rot: -5, grad: 'url(#leafDarkGrad)' },
            { cx: 255, cy: 65, rx: 42, ry: 24, rot: 15, grad: 'url(#leafBrightGrad)' },
            { cx: 330, cy: 70, rx: 38, ry: 22, rot: -12, grad: 'url(#leafDarkGrad)' },
            { cx: 400, cy: 60, rx: 32, ry: 20, rot: 8, grad: 'url(#leafBrightGrad)' },
          ].map((l, i) => (
            <ellipse
              key={`tl-leaf-${i}`}
              cx={l.cx}
              cy={l.cy}
              rx={l.rx}
              ry={l.ry}
              transform={`rotate(${l.rot}, ${l.cx}, ${l.cy})`}
              fill={l.grad}
              stroke="#132404"
              strokeWidth="2"
            />
          ))}

          {/* Hanging Jungle Vine with Red Berries */}
          <path
            d="M200 45 Q180 120 210 190 Q225 230 205 260"
            stroke="#2e4e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Berries */}
          <circle cx="206" cy="165" r="4.5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
          <circle cx="214" cy="172" r="4" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1" />
          <circle cx="208" cy="225" r="4" fill="#f87171" stroke="#7f1d1d" strokeWidth="1" />
          <circle cx="203" cy="255" r="3.5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
        </g>

        {/* --- TOP-RIGHT OVERHANGING CANOPY BRANCH --- */}
        <g id="top-right-canopy">
          <path
            d="M1470 -30 Q1360 40 1220 20 Q1120 50 1020 40 Q1080 75 1200 55 Q1330 60 1470 20 Z"
            fill="url(#canopyBranchGrad)"
            stroke="#160803"
            strokeWidth="3"
          />
          <path d="M1250 30 Q1200 70 1160 90" stroke="#321708" strokeWidth="6" strokeLinecap="round" />

          {[
            { cx: 1390, cy: 30, rx: 48, ry: 26, rot: 10, grad: 'url(#leafDarkGrad)' },
            { cx: 1320, cy: 45, rx: 46, ry: 25, rot: -6, grad: 'url(#leafBrightGrad)' },
            { cx: 1240, cy: 35, rx: 42, ry: 24, rot: 8, grad: 'url(#leafDarkGrad)' },
            { cx: 1160, cy: 55, rx: 38, ry: 22, rot: -14, grad: 'url(#leafBrightGrad)' },
            { cx: 1080, cy: 50, rx: 32, ry: 18, rot: 6, grad: 'url(#leafDarkGrad)' },
          ].map((l, i) => (
            <ellipse
              key={`tr-leaf-${i}`}
              cx={l.cx}
              cy={l.cy}
              rx={l.rx}
              ry={l.ry}
              transform={`rotate(${l.rot}, ${l.cx}, ${l.cy})`}
              fill={l.grad}
              stroke="#132404"
              strokeWidth="2"
            />
          ))}

          {/* Hanging Vine Right */}
          <path
            d="M1220 40 Q1240 110 1215 180 Q1200 215 1225 245"
            stroke="#2e4e0b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="1225" cy="140" r="4" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
          <circle cx="1212" cy="190" r="3.5" fill="#f87171" stroke="#7f1d1d" strokeWidth="1" />
        </g>

        {/* --- BOTTOM-LEFT FOREGROUND: Ferns, Mossy Rocks & Red Spotted Toadstools --- */}
        <g id="bottom-left-plants" transform="translate(10, 780)">
          {/* Mossy Boulder */}
          <path
            d="M0 120 Q20 30 80 20 Q140 25 160 80 Q140 120 0 120 Z"
            fill="#4b4742"
            stroke="#1c1917"
            strokeWidth="2.5"
          />
          {/* Moss Cap on Rock */}
          <path
            d="M20 50 Q60 18 125 28 Q140 50 110 60 Q70 48 35 60 Z"
            fill="#65a30d"
            opacity="0.95"
          />

          {/* Large Red Toadstool (Mushroom) with White Spots */}
          <g transform="translate(130, 45)">
            {/* Stem */}
            <path d="M16 25 Q14 45 12 70 L26 70 Q24 45 22 25 Z" fill="#fdfaf3" stroke="#78350f" strokeWidth="1.5" />
            {/* Red Mushroom Cap */}
            <path
              d="M-5 35 Q20 0 45 35 Q20 38 -5 35 Z"
              fill="url(#toadstoolCapGrad)"
              stroke="#450a0a"
              strokeWidth="2"
            />
            {/* White Dots */}
            <circle cx="10" cy="22" r="3" fill="#ffffff" opacity="0.9" />
            <circle cx="22" cy="14" r="3.5" fill="#ffffff" opacity="0.9" />
            <circle cx="34" cy="24" r="2.5" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Small Cyan Arcane Mushroom */}
          <g transform="translate(85, 75)">
            <path d="M8 15 L7 40 L15 40 L14 15 Z" fill="#fdfaf3" stroke="#0e7490" strokeWidth="1" />
            <path d="M0 20 Q11 2 22 20 Z" fill="#06b6d4" stroke="#083344" strokeWidth="1.5" />
            <circle cx="11" cy="12" r="2" fill="#a5f3fc" />
          </g>

          {/* Elegant Arching Fern Fronds */}
          <path d="M-10 120 Q40 40 110 10 Q50 60 -10 120 Z" fill="#3f6212" stroke="#132404" strokeWidth="1.5" />
          <path d="M10 120 Q80 50 170 40 Q90 80 10 120 Z" fill="#65a30d" stroke="#132404" strokeWidth="1.5" />
          <path d="M-20 120 Q-60 60 -120 40 Q-60 85 -20 120 Z" fill="#2d480e" stroke="#132404" strokeWidth="1.5" />
        </g>

        {/* --- BOTTOM-RIGHT FOREGROUND: Rustic Wooden Fence Fragment, Ivy, Bluebell Flowers --- */}
        <g id="bottom-right-plants" transform="translate(1330, 780)">
          {/* Rustic Wood Fence Post */}
          <path
            d="M-30 120 L-25 30 L-5 20 L15 30 L20 120 Z"
            fill="#5c381c"
            stroke="#271206"
            strokeWidth="2.5"
          />
          {/* Horizontal broken fence rail */}
          <path
            d="M-80 55 L-25 50 L-25 68 L-80 72 Z"
            fill="#4d2c14"
            stroke="#271206"
            strokeWidth="2"
          />

          {/* Wild Ivy wrapping fence post */}
          <path
            d="M-28 100 Q-10 80 -25 60 Q-5 40 -18 25"
            stroke="#4d7c0f"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="-14" cy="75" r="4.5" fill="#84cc16" stroke="#1e3a07" strokeWidth="1" />
          <circle cx="-18" cy="45" r="4" fill="#65a30d" stroke="#1e3a07" strokeWidth="1" />

          {/* Wild Bluebell Flowers on Grass Edge */}
          <g transform="translate(-70, 70)">
            <path d="M0 50 Q-10 20 -20 0" stroke="#15803d" strokeWidth="1.8" fill="none" />
            <circle cx="-20" cy="0" r="4.5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1" />
            <circle cx="-14" cy="12" r="4" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1" />
            <circle cx="-8" cy="25" r="3.5" fill="#818cf8" stroke="#3730a3" strokeWidth="1" />
          </g>

          {/* Broad Forest Leaves */}
          <path d="M20 120 Q-30 40 -90 30 Q-40 70 20 120 Z" fill="#3f6212" stroke="#132404" strokeWidth="1.5" />
          <path d="M-10 120 Q-60 50 -130 55 Q-70 85 -10 120 Z" fill="#65a30d" stroke="#132404" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};
