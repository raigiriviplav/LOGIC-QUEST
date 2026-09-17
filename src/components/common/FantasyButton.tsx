import React from 'react';
import { sounds } from '../../utils/audio';

interface FantasyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'wood' | 'gold' | 'stone' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'icon';
  children?: React.ReactNode;
  icon?: React.ReactNode;
  locked?: boolean;
  starBadge?: string | number;
}

export const FantasyButton: React.FC<FantasyButtonProps> = ({
  variant = 'wood',
  size = 'md',
  children,
  icon,
  locked = false,
  starBadge,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (disabled || locked) {
      sounds.playWrong();
      return;
    }
    sounds.playClick();
    if (onClick) onClick(e);
  };

  // Base styling for chunky fantasy buttons
  const isIconOnly = size === 'icon';

  const variantStyles = {
    wood: `
      bg-gradient-to-b from-[#854d0e] via-[#653609] to-[#452204]
      text-[#fef08a] border-[#a16207]
      shadow-[0_6px_0_#2b1402,0_10px_16px_rgba(0,0,0,0.6)]
      active:shadow-[0_2px_0_#2b1402,0_4px_8px_rgba(0,0,0,0.4)]
      hover:from-[#92400e] hover:via-[#78350f] hover:to-[#542805]
    `,
    gold: `
      bg-gradient-to-b from-[#fde047] via-[#eab308] to-[#ca8a04]
      text-[#451a03] border-[#fef08a]
      shadow-[0_6px_0_#78350f,0_12px_20px_rgba(0,0,0,0.6)]
      active:shadow-[0_2px_0_#78350f,0_4px_8px_rgba(0,0,0,0.4)]
      hover:from-[#fef08a] hover:via-[#facc15] hover:to-[#d97706]
    `,
    stone: `
      bg-gradient-to-b from-[#64748b] via-[#475569] to-[#334155]
      text-[#f8fafc] border-[#94a3b8]
      shadow-[0_6px_0_#1e293b,0_10px_16px_rgba(0,0,0,0.6)]
      active:shadow-[0_2px_0_#1e293b,0_4px_8px_rgba(0,0,0,0.4)]
      hover:from-[#94a3b8] hover:via-[#64748b] hover:to-[#475569]
    `,
    danger: `
      bg-gradient-to-b from-[#ef4444] via-[#dc2626] to-[#991b1b]
      text-[#ffffff] border-[#f87171]
      shadow-[0_6px_0_#450a0a,0_10px_16px_rgba(0,0,0,0.6)]
      active:shadow-[0_2px_0_#450a0a,0_4px_8px_rgba(0,0,0,0.4)]
      hover:from-[#f87171] hover:via-[#ef4444] hover:to-[#b91c1c]
    `,
  }[variant];

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-xs font-adventure rounded-xl border-t-2 border-b-0 border-x-2',
    md: 'px-5 py-3 text-sm md:text-base font-adventure rounded-2xl border-t-2 border-b-0 border-x-2',
    lg: 'px-7 py-3.5 text-base md:text-lg font-adventure rounded-2xl border-t-4 border-b-0 border-x-2',
    hero: 'px-9 py-4.5 text-lg md:text-xl font-adventure rounded-3xl border-t-4 border-b-0 border-x-3 tracking-wide',
    icon: 'w-12 h-12 p-0 flex items-center justify-center rounded-2xl border-t-2 border-b-0 border-x-2',
  }[size];

  return (
    <button
      type={props.type || 'button'}
      disabled={disabled}
      onClick={handleClick}
      className={`
        group relative inline-flex items-center justify-center gap-2.5 
        font-adventure uppercase cursor-pointer select-none transition-all duration-100
        active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles}
        ${sizeStyles}
        ${className}
      `}
      {...props}
    >
      {/* Wood Grain / Carved Planks Top Inset Highlight */}
      <span className="absolute inset-x-2 top-1 h-[2px] bg-white/30 rounded-full pointer-events-none" />

      {/* Decorative Corner Nails / Rivets */}
      {!isIconOnly && size !== 'sm' && (
        <>
          <span className="absolute left-2 top-1.5 w-1.5 h-1.5 rounded-full bg-[#2a1303]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none" />
          <span className="absolute right-2 top-1.5 w-1.5 h-1.5 rounded-full bg-[#2a1303]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] pointer-events-none" />
          <span className="absolute left-2 bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#2a1303]/60 pointer-events-none" />
          <span className="absolute right-2 bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#2a1303]/60 pointer-events-none" />
        </>
      )}

      {/* Star / Rating Badge */}
      {starBadge !== undefined && (
        <div className="absolute -top-2.5 -right-2.5 bg-gradient-to-br from-amber-300 to-amber-600 text-amber-950 px-2 py-0.5 rounded-full border border-amber-200 text-[10px] font-adventure shadow-md flex items-center gap-0.5 z-20">
          <span>★</span>
          <span>{starBadge}</span>
        </div>
      )}

      {/* Lock Icon Badge */}
      {locked && (
        <span className="shrink-0 text-amber-200">
          🔒
        </span>
      )}

      {/* Primary Icon */}
      {icon && !locked && (
        <span className="shrink-0 transition-transform group-hover:scale-110">
          {icon}
        </span>
      )}

      {/* Text Label */}
      {children && (
        <span
          className={`tracking-wider ${
            variant === 'gold' ? 'text-[#451a03] drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]' : 'text-[#fef08a] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]'
          }`}
        >
          {children}
        </span>
      )}
    </button>
  );
};
