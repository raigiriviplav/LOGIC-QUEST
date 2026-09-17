import React from 'react';

interface QuestScrollProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const QuestScroll: React.FC<QuestScrollProps> = ({
  children,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Top Wooden Scroll Dowel with Carved Finials */}
      <div className="w-full max-w-lg flex items-center justify-between z-20">
        {/* Left Finial */}
        <div className="w-5 h-6 rounded-l-full bg-gradient-to-r from-[#5a341a] to-[#784725] border-y-2 border-l-2 border-[#381e0e] shadow" />
        {/* Main Dowel */}
        <div className="flex-1 h-4 bg-gradient-to-b from-[#8f562f] via-[#653a1d] to-[#432310] border-y-2 border-[#2b160a] shadow-md" />
        {/* Right Finial */}
        <div className="w-5 h-6 rounded-r-full bg-gradient-to-l from-[#5a341a] to-[#784725] border-y-2 border-r-2 border-[#381e0e] shadow" />
      </div>

      {/* Main Unrolled Parchment Sheet */}
      <div className="relative -mt-1 -mb-1 w-[96%] max-w-[calc(100%-16px)] bg-radial from-[#fdf8e9] via-[#eddab2] to-[#ceb17e] border-x-3 border-[#8b5a2b] py-4 px-6 text-[#291507] shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(139,90,43,0.3)] z-10">
        {title && (
          <div className="text-center mb-3 pb-2 border-b-2 border-[#946938]/40">
            <h4 className="font-adventure text-base md:text-lg text-[#5a2e0e] uppercase tracking-wider">
              {title}
            </h4>
            {subtitle && (
              <span className="font-medieval text-xs text-[#7e4f25] italic block">
                {subtitle}
              </span>
            )}
          </div>
        )}

        {children}
      </div>

      {/* Bottom Wooden Scroll Dowel with Carved Finials */}
      <div className="w-full max-w-lg flex items-center justify-between z-20">
        {/* Left Finial */}
        <div className="w-5 h-6 rounded-l-full bg-gradient-to-r from-[#5a341a] to-[#784725] border-y-2 border-l-2 border-[#381e0e] shadow" />
        {/* Main Dowel */}
        <div className="flex-1 h-4 bg-gradient-to-b from-[#8f562f] via-[#653a1d] to-[#432310] border-y-2 border-[#2b160a] shadow-md" />
        {/* Right Finial */}
        <div className="w-5 h-6 rounded-r-full bg-gradient-to-l from-[#5a341a] to-[#784725] border-y-2 border-r-2 border-[#381e0e] shadow" />
      </div>
    </div>
  );
};
