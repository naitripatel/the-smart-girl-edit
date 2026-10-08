import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SmartGirlTipProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const SmartGirlTip: React.FC<SmartGirlTipProps> = ({
  title = 'THE SMART GIRL TIP',
  children,
  className = '',
}) => {
  return (
    <aside
      className={`my-6 p-5 sm:p-6 bg-[#F8ECE8] border-l-3 border-[#BA7D70] border-y border-r border-[#EAE3D9] rounded-none ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-3.5 h-3.5 text-[#BA7D70]" />
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#BA7D70] font-semibold">
          {title}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-[#3E322C] font-sans leading-relaxed">
        {children}
      </div>
    </aside>
  );
};
