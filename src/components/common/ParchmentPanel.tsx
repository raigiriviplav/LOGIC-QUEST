import React from 'react';

interface ParchmentPanelProps {
  children: React.ReactNode;
  className?: string;
  hasSeal?: boolean;
  hasPins?: boolean;
  sealColor?: 'red' | 'blue' | 'gold';
}

export const ParchmentPanel: React.FC<ParchmentPanelProps> = ({
  children,
  className = '',
  hasSeal = false,
  hasPins = true,
  sealColor = 'red',
}) => {
  return (
    <div
      className={`relative bg-radial from-[#faf2df] via-[#ebd9b4] to-[#cbb082] text-[#2c1708] border-3 border-[#8b5a2b] rounded-2xl p-4 md:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_0_40px_rgba(139,90,43,0.3)] ${className}`}
    >
      {/* Pinned Nails / Tacks in Corners */}
      {hasPins && (
        <>
          <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#d4af37] to-[#594311] border border-[#2b1f07] shadow pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-[#d4af37] to-[#594311] border border-[#2b1f07] shadow pointer-events-none" />
        </>
      )}

      {/* Wax Seal Stamp (Optional bottom right or top right) */}
      {hasSeal && (
        <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center pointer-events-none shadow-lg z-20">
          <div
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-cinzel font-black text-xs ${
              sealColor === 'red'
                ? 'bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] border-[#991b1b] text-[#fef2f2]'
                : sealColor === 'gold'
                ? 'bg-gradient-to-br from-[#eab308] to-[#854d0e] border-[#ca8a04] text-[#451a03]'
                : 'bg-gradient-to-br from-[#2563eb] to-[#1e3a8a] border-[#1d4ed8] text-[#eff6ff]'
            }`}
          >
            🐍
          </div>
        </div>
      )}

      {/* Parchment Fiber Texture Overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
