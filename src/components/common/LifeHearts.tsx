import React from 'react';

interface LifeHeartsProps {
  lives: number;
  maxLives?: number;
}

export const LifeHearts: React.FC<LifeHeartsProps> = ({ lives, maxLives = 3 }) => {
  return (
    <div id="life-hearts-display" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#201208]/90 border-2 border-[#5c371d] rounded-lg shadow-inner">
      <span className="text-xs uppercase tracking-wider text-[#caa359] font-cinzel mr-1">Lives</span>
      {Array.from({ length: maxLives }).map((_, index) => {
        const isAlive = index < lives;
        return (
          <div
            key={index}
            className={`relative transition-all duration-300 transform ${
              isAlive ? 'scale-100' : 'scale-90 opacity-40 grayscale'
            }`}
          >
            {/* Heart SVG with gem facets */}
            <svg
              className="w-6 h-6 drop-shadow-md"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer wooden/bronze bevel */}
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={isAlive ? '#801515' : '#33231d'}
                stroke={isAlive ? '#fca5a5' : '#5c3e34'}
                strokeWidth="1.5"
              />
              {/* Inner ruby radiance */}
              {isAlive && (
                <>
                  <path
                    d="M12 18.5l-1-0.9C6.5 13.8 4 11.2 4 8.2 4 5.8 5.8 4 8.2 4c1.4 0 2.8 0.7 3.8 1.8 1-1.1 2.4-1.8 3.8-1.8 2.4 0 4.2 1.8 4.2 4.2 0 3-2.5 5.6-7 9.4l-1 0.9z"
                    fill="#dc2626"
                  />
                  {/* Highlight facet */}
                  <ellipse cx="8.5" cy="7" rx="2" ry="1" fill="#fecaca" opacity="0.75" />
                </>
              )}
            </svg>
          </div>
        );
      })}
    </div>
  );
};
