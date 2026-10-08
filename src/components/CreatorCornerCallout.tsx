import React from 'react';
import { Eye, ShieldAlert } from 'lucide-react';

interface CreatorCornerCalloutProps {
  quote?: string;
  creatorContext?: string;
  realityCheck: string;
  className?: string;
}

export const CreatorCornerCallout: React.FC<CreatorCornerCalloutProps> = ({
  quote,
  creatorContext,
  realityCheck,
  className = '',
}) => {
  return (
    <div
      className={`my-8 p-6 sm:p-7 bg-[#F7F2EA] border border-[#DDCFC5] rounded-none ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9] mb-4">
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-[#BA7D70]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#BA7D70] font-semibold">
            CREATOR CORNER · INFLUENCE CHECK
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase text-[#8C7A70] tracking-wider">
          Editorial Lens
        </span>
      </div>

      {quote && (
        <blockquote className="font-serif italic text-base sm:text-lg text-[#2A211D] mb-3 leading-snug">
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}

      {creatorContext && (
        <p className="text-xs text-[#8C7A70] font-sans mb-3">
          <span className="font-medium text-[#2A211D]">The Hook:</span> {creatorContext}
        </p>
      )}

      <div className="p-3.5 bg-[#FAF7F2] border-l-2 border-[#BA7D70] text-xs sm:text-sm text-[#4A3D36] font-sans leading-relaxed">
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#BA7D70] font-semibold mb-1">
          <ShieldAlert className="w-3 h-3" />
          The Reality
        </div>
        {realityCheck}
      </div>
    </div>
  );
};
