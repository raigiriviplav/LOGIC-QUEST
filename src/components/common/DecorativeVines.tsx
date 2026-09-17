import React from 'react';

interface DecorativeVinesProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-bar' | 'hanging';
  className?: string;
}

export const DecorativeVines: React.FC<DecorativeVinesProps> = ({
  position = 'top-left',
  className = '',
}) => {
  if (position === 'top-bar') {
    return (
      <svg
        className={`w-full h-8 pointer-events-none ${className}`}
        viewBox="0 0 600 32"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Main vine stem */}
        <path
          d="M0 14 Q75 6 150 16 T300 12 T450 18 T600 14"
          stroke="#416326"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M0 14 Q75 6 150 16 T300 12 T450 18 T600 14"
          stroke="#5b8632"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Leaves along vine */}
        {[30, 80, 140, 210, 270, 340, 400, 470, 530, 580].map((x, i) => {
          const isUp = i % 2 === 0;
          const leafY = isUp ? 6 : 22;
          const cpY = isUp ? 2 : 28;
          return (
            <g key={i}>
              <path
                d={`M${x} 14 Q${x + (isUp ? 8 : -8)} ${cpY} ${x + (isUp ? 16 : -16)} ${leafY} Q${x + (isUp ? 8 : -8)} 16 ${x} 14`}
                fill={i % 3 === 0 ? '#6ea43a' : '#527c29'}
                stroke="#2a4515"
                strokeWidth="1.2"
              />
              {/* Leaf spine */}
              <line
                x1={x}
                y1="14"
                x2={x + (isUp ? 14 : -14)}
                y2={leafY}
                stroke="#87c449"
                strokeWidth="0.8"
              />
            </g>
          );
        })}

        {/* Small red berries */}
        {[110, 240, 370, 490].map((x, i) => (
          <g key={`berry-${i}`}>
            <circle cx={x} cy="18" r="3.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1" />
            <circle cx={x + 5} cy="21" r="3" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
            <circle cx={x - 1} cy="17" r="1" fill="#fecaca" />
          </g>
        ))}
      </svg>
    );
  }

  if (position === 'hanging') {
    return (
      <svg
        className={`w-14 h-32 pointer-events-none ${className}`}
        viewBox="0 0 56 128"
        fill="none"
      >
        {/* Hanging vine stem */}
        <path
          d="M28 0 Q16 35 34 70 Q42 95 24 128"
          stroke="#416326"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M28 0 Q16 35 34 70 Q42 95 24 128"
          stroke="#5b8632"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Leaves */}
        <path d="M22 25 Q6 20 12 36 Q20 32 22 25" fill="#5b8632" stroke="#2a4515" strokeWidth="1" />
        <path d="M28 50 Q46 45 42 62 Q32 58 28 50" fill="#6ea43a" stroke="#2a4515" strokeWidth="1" />
        <path d="M33 80 Q18 78 22 95 Q30 90 33 80" fill="#4d7426" stroke="#2a4515" strokeWidth="1" />
        <path d="M25 110 Q40 108 36 122 Q27 118 25 110" fill="#6ea43a" stroke="#2a4515" strokeWidth="1" />

        {/* Berry cluster */}
        <circle cx="28" cy="65" r="3.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1" />
        <circle cx="34" cy="68" r="3" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
        <circle cx="27" cy="64" r="1" fill="#fee2e2" />
      </svg>
    );
  }

  const isLeft = position.includes('left');
  const isTop = position.includes('top');

  return (
    <div
      className={`absolute pointer-events-none z-10 ${
        isTop ? '-top-3' : '-bottom-3'
      } ${isLeft ? '-left-3' : '-right-3'} ${className}`}
      style={{
        transform: `${isLeft ? '' : 'scaleX(-1)'} ${isTop ? '' : 'scaleY(-1)'}`,
      }}
    >
      <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
        {/* Curving corner stem */}
        <path
          d="M4 35 Q18 18 35 4 Q48 12 60 4"
          stroke="#416326"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M4 35 Q18 18 35 4 Q48 12 60 4"
          stroke="#5b8632"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Curling Tendril */}
        <path
          d="M18 18 Q12 6 22 8 Q26 10 22 14"
          stroke="#6ea43a"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Corner Leaves */}
        <path
          d="M12 28 Q4 16 18 14 Q18 24 12 28"
          fill="#5b8632"
          stroke="#2a4515"
          strokeWidth="1"
        />
        <path
          d="M26 12 Q30 -2 42 4 Q36 12 26 12"
          fill="#6ea43a"
          stroke="#2a4515"
          strokeWidth="1"
        />
        <path
          d="M45 7 Q56 -2 62 10 Q50 14 45 7"
          fill="#4d7426"
          stroke="#2a4515"
          strokeWidth="1"
        />

        {/* Red Berries */}
        <circle cx="28" cy="22" r="3.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1" />
        <circle cx="34" cy="25" r="3" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
        <circle cx="27" cy="21" r="1" fill="#ffffff" />
      </svg>
    </div>
  );
};
