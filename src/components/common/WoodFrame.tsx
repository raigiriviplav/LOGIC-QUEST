import React from 'react';

interface WoodFrameProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
  id?: string;
}

export const WoodFrame: React.FC<WoodFrameProps> = ({
  children,
  className = '',
  light = false,
  id,
}) => {
  return (
    <div
      id={id}
      className={`rounded-xl p-5 ${light ? 'wood-panel-light' : 'wood-panel'} ${className}`}
    >
      {/* Corner rivets */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#caa359] border border-[#78531f] shadow" />
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#caa359] border border-[#78531f] shadow" />
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#caa359] border border-[#78531f] shadow" />
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#caa359] border border-[#78531f] shadow" />
      {children}
    </div>
  );
};
