import React from 'react';

interface EnvironmentLayerProps {
  layer: 'background' | 'midground' | 'foreground';
  children?: React.ReactNode;
  className?: string;
}

export const EnvironmentLayer: React.FC<EnvironmentLayerProps> = ({
  layer,
  children,
  className = '',
}) => {
  const zIndex = {
    background: 'z-0',
    midground: 'z-10',
    foreground: 'z-30 pointer-events-none',
  }[layer];

  return (
    <div className={`absolute inset-0 overflow-hidden ${zIndex} ${className}`}>
      {children}
    </div>
  );
};
