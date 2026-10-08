import React from 'react';
import { ArrowRight, Sparkles, ShieldAlert } from 'lucide-react';
import { Article } from '../types';
import { SmartImage } from './SmartImage';

interface CreatorCornerSectionProps {
  onSelectArticle: (articleId: string) => void;
  creatorArticles: Article[];
}

export const CreatorCornerSection: React.FC<CreatorCornerSectionProps> = ({
  onSelectArticle,
  creatorArticles,
}) => {
  const featured = creatorArticles[0] || null;

  return (
    <section className="py-16 sm:py-24 bg-[#F2EDE5] border-y border-[#EAE3D9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section kicker */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#BA7D70]" />
          <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#BA7D70]">
            Recurring Editorial Column
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Context & Editorial angle */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2A211D] tracking-tight leading-[1.15]">
              CREATOR CORNER
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-[#66564D] mt-3">
              When your favourite creator says &ldquo;you NEED this&rdquo; — should you?
            </p>
            <p className="font-sans text-sm sm:text-[15px] text-[#66564D] mt-4 leading-relaxed">
              We deconstruct viral creator culture, brand sponsorships, affiliate marketing loops,
              and algorithmically fueled hype. Because an aesthetically lit morning routine video is
              often a commercial in disguise, and discernment is your greatest financial shield.
            </p>

            <div className="mt-6 p-4 bg-[#FAF7F2] border-l-2 border-[#BA7D70] rounded-r-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#BA7D70] uppercase tracking-wider mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                The Transparency Standard
              </div>
              <p className="text-xs text-[#66564D] leading-relaxed">
                Creators earn up to 25% on affiliate links and $5,000–$50,000 per brand placement.
                Always ask: would they recommend this if the payout was zero?
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  if (featured) onSelectArticle(featured.slug || featured.id);
                }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold px-6 py-3.5 bg-[#2A211D] text-[#FAF7F2] hover:bg-[#BA7D70] transition-colors cursor-pointer"
              >
                <span>EXPLORE CREATOR CORNER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual editorial feature card */}
          <div className="lg:col-span-7">
            {featured && (
              <div
                onClick={() => onSelectArticle(featured.slug || featured.id)}
                className="group relative bg-[#FAF7F2] border border-[#DDCFC5] p-6 sm:p-8 cursor-pointer transition-all hover:shadow-lg hover:border-[#BA7D70]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-6 aspect-[4/3] overflow-hidden border border-[#EAE3D9]">
                    <SmartImage
                      src={featured.heroImage}
                      alt={featured.title}
                      fallbackTitle="Creator Corner Feature"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="sm:col-span-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider mb-2">
                        <span className="font-semibold text-[#BA7D70]">{featured.category}</span>
                        <span>·</span>
                        <span>Creator Breakdown</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-snug">
                        {featured.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#66564D] mt-2 line-clamp-3 leading-relaxed">
                        {featured.dek}
                      </p>
                    </div>

                    {featured.creatorCornerSnippet && (
                      <div className="mt-4 pt-4 border-t border-[#EAE3D9]">
                        <p className="font-serif italic text-xs text-[#8C7A70] line-clamp-2">
                          &ldquo;{featured.creatorCornerSnippet.quote}&rdquo;
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                      <span>Read Feature Investigation</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
