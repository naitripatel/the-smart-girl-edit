import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { SmartGirlVerdict } from '../types';

interface SmartGirlVerdictCardProps {
  verdict: SmartGirlVerdict;
  className?: string;
}

export const SmartGirlVerdictCard: React.FC<SmartGirlVerdictCardProps> = ({
  verdict,
  className = '',
}) => {
  return (
    <section
      aria-labelledby="verdict-heading"
      className={`my-14 p-7 sm:p-10 bg-[#FAF7F2] border-2 border-[#2A211D] relative shadow-sm rounded-none ${className}`}
    >
      {/* Top Kicker */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9] mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#BA7D70]" />
          <span
            id="verdict-heading"
            className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#BA7D70] font-semibold"
          >
            THE SMART GIRL VERDICT
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase text-[#8C7A70] tracking-wider">
          Editorial Conclusion
        </span>
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2A211D] tracking-tight">
        {verdict.title}
      </h3>

      <p className="font-serif italic text-base sm:text-lg text-[#66564D] mt-2 pb-5 border-b border-[#EAE3D9] leading-relaxed">
        {verdict.summary}
      </p>

      {/* "So, what should I actually take away from this?" */}
      <div className="my-6 p-5 bg-[#F7F2EA] border border-[#DDCFC5]">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#BA7D70] font-semibold block mb-1">
          So, what should I actually take away from this?
        </span>
        <p className="font-sans text-sm sm:text-base text-[#2A211D] leading-relaxed">
          {verdict.takeaway}
        </p>
      </div>

      {/* DO TRY vs DO SKIP Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
        <div className="p-4 sm:p-5 bg-[#F2EDE5] border border-[#DDCFC5]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#7D8E78] font-bold mb-1.5">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>DO TRY</span>
          </div>
          <p className="text-xs sm:text-sm text-[#2A211D] font-sans leading-relaxed">
            {verdict.doTry}
          </p>
        </div>

        <div className="p-4 sm:p-5 bg-[#F9ECE8] border border-[#E4B7AD]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#BA7D70] font-bold mb-1.5">
            <X className="w-3.5 h-3.5 stroke-[3]" />
            <span>DO SKIP</span>
          </div>
          <p className="text-xs sm:text-sm text-[#2A211D] font-sans leading-relaxed">
            {verdict.doSkip}
          </p>
        </div>
      </div>

      {/* The Bottom Line Rule */}
      <div className="pt-4 border-t border-[#EAE3D9] flex flex-col sm:flex-row sm:items-baseline gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[#8C7A70] shrink-0 font-semibold">
          THE BOTTOM LINE:
        </span>
        <p className="text-xs sm:text-sm text-[#2A211D] font-medium font-sans leading-relaxed">
          {verdict.smartRule}
        </p>
      </div>
    </section>
  );
};
