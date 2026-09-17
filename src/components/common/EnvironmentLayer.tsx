import React from 'react';

interface EnvironmentLayerProps {
  layer: 'background' | 'midground' | 'foreground' | 'atmosphere';
  children?: React.ReactNode;
  className?: string;
  showGodRays?: boolean;
  showMotes?: boolean;
  showCanopyFraming?: boolean;
}

export const EnvironmentLayer: React.FC<EnvironmentLayerProps> = ({
  layer,
  children,
  className = '',
  showGodRays = false,
  showMotes = false,
  showCanopyFraming = false,
}) => {
  if (layer === 'atmosphere') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-30 ${className}`}>
        {/* Soft Sunlight Shafts & Ambient Warmth */}
        {showGodRays && (
          <div
            className="absolute -top-32 left-1/4 w-[700px] h-[800px] opacity-35 mix-blend-color-dodge pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 85% at 30% 0%, rgba(254, 240, 138, 0.45) 0%, rgba(253, 224, 71, 0.12) 50%, transparent 80%)',
              transform: 'rotate(-10deg)',
            }}
          />
        )}

        {/* Floating Sunlit Spores / Golden Motes */}
        {showMotes && (
          <div className="absolute inset-0 pointer-events-none">
            {[
              { top: '25%', left: '20%', delay: '0s', dur: '4.5s', size: 'w-2 h-2', color: 'bg-amber-200' },
              { top: '38%', left: '65%', delay: '1s', dur: '5.2s', size: 'w-1.5 h-1.5', color: 'bg-yellow-100' },
              { top: '58%', left: '35%', delay: '2.4s', dur: '4s', size: 'w-2 h-2', color: 'bg-amber-300' },
              { top: '48%', left: '80%', delay: '1.8s', dur: '6s', size: 'w-1.5 h-1.5', color: 'bg-emerald-200' },
              { top: '70%', left: '70%', delay: '0.6s', dur: '5s', size: 'w-2 h-2', color: 'bg-amber-100' },
              { top: '62%', left: '15%', delay: '3.2s', dur: '4.8s', size: 'w-1.5 h-1.5', color: 'bg-yellow-200' },
            ].map((mote, idx) => (
              <div
                key={`layer-mote-${idx}`}
                className={`absolute rounded-full ${mote.size} ${mote.color} blur-[0.6px] opacity-70 animate-pulse`}
                style={{
                  top: mote.top,
                  left: mote.left,
                  animationDelay: mote.delay,
                  animationDuration: mote.dur,
                }}
              />
            ))}
          </div>
        )}

        {children}
      </div>
    );
  }

  const zIndexMap = {
    background: 'z-0',
    midground: 'z-10',
    foreground: 'z-25',
  };

  return (
    <div className={`absolute inset-0 pointer-events-none select-none ${zIndexMap[layer]} ${className}`}>
      {children}
    </div>
  );
};
