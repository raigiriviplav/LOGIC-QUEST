import React from 'react';

interface ParchmentCardProps {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  ornate?: boolean;
  id?: string;
}

export const ParchmentCard: React.FC<ParchmentCardProps> = ({
  children,
  className = '',
  dark = false,
  ornate = true,
  id,
}) => {
  return (
    <div
      id={id}
      className={`relative rounded-xl p-5 ${dark ? 'dark-parchment' : 'parchment-panel'} ${className}`}
    >
      {ornate && (
        <>
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />
        </>
      )}
      {children}
    </div>
  );
};
