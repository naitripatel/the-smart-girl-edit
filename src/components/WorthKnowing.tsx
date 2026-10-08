import React from 'react';
import { Info } from 'lucide-react';

interface WorthKnowingProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const WorthKnowing: React.FC<WorthKnowingProps> = ({
  title = 'WORTH KNOWING',
  children,
  className = '',
}) => {
  return (
    <aside
      className={`my-6 p-5 sm:p-6 bg-[#F4F6F2] border-l-3 border-[#7D8E78] border-y border-r border-[#EAE3D9] rounded-none ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-3.5 h-3.5 text-[#7D8E78]" />
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#7D8E78] font-semibold">
          {title}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-[#3E322C] font-sans leading-relaxed">
        {children}
      </div>
    </aside>
  );
};
