import React from 'react';
import { DecorativeVines } from './DecorativeVines';

interface WoodenPanelProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  hasVines?: boolean;
  className?: string;
  contentClassName?: string;
}

export const WoodenPanel: React.FC<WoodenPanelProps> = ({
  children,
  title,
  subtitle,
  hasVines = true,
  className = '',
  contentClassName = '',
}) => {
  return (
    <div
      className={`relative bg-gradient-to-b from-[#3a2012] via-[#2a160b] to-[#1d0e06] border-4 border-[#5d351b] rounded-3xl p-4 md:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,230,180,0.2)] ${className}`}
    >
      {/* Heavy Timber Corner Ropes / Bindings */}
      {/* Top Left Binding */}
      <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-2 border-[#caa359] bg-[#452712] rounded-md rotate-45 shadow flex items-center justify-center pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#caa359]" />
      </div>
      {/* Top Right Binding */}
      <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-2 border-[#caa359] bg-[#452712] rounded-md rotate-45 shadow flex items-center justify-center pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#caa359]" />
      </div>
      {/* Bottom Left Binding */}
      <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-2 border-[#caa359] bg-[#452712] rounded-md rotate-45 shadow flex items-center justify-center pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#caa359]" />
      </div>
      {/* Bottom Right Binding */}
      <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-2 border-[#caa359] bg-[#452712] rounded-md rotate-45 shadow flex items-center justify-center pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#caa359]" />
      </div>

      {/* Decorative Corner Vines */}
      {hasVines && (
        <>
          <DecorativeVines position="top-left" />
          <DecorativeVines position="top-right" />
        </>
      )}

      {/* Carved Wooden Title Header Plaque (if title provided) */}
      {title && (
        <div className="relative -top-7 mx-auto mb-[-12px] max-w-sm flex flex-col items-center">
          <div className="bg-gradient-to-b from-[#783e15] to-[#432009] px-6 py-2 rounded-2xl border-2 border-[#a15e26] shadow-[0_4px_12px_rgba(0,0,0,0.6)] text-center">
            <h3 className="font-adventure text-base md:text-lg text-[#fef08a] uppercase tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {title}
            </h3>
            {subtitle && (
              <span className="font-medieval text-xs text-[#fed7aa] italic block">
                {subtitle}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Panel Inner Content */}
      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
