import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Article } from '../types';
import { SmartImage } from './SmartImage';

interface MoodOption {
  id: string;
  moodTag: 'glow-up' | 'money-smart' | 'find-style' | 'digital-ease' | 'life-together';
  icon: string;
  symbol: string;
  pillarSymbol: string;
  pillarLabel: string;
  label: string;
  tagline: string;
  category: string;
}

const MOODS: MoodOption[] = [
  {
    id: 'glow-up',
    moodTag: 'glow-up',
    icon: '✨',
    symbol: '✦',
    pillarSymbol: '✦',
    pillarLabel: 'Beauty',
    label: 'Glow up',
    tagline: 'Streamlined skincare & honest beauty discernment',
    category: 'Beauty',
  },
  {
    id: 'money-smart',
    moodTag: 'money-smart',
    icon: '💸',
    symbol: '⟡',
    pillarSymbol: '⟡',
    pillarLabel: 'Money',
    label: 'Get smarter with money',
    tagline: 'Automated savings & breaking impulse habits',
    category: 'Money',
  },
  {
    id: 'find-style',
    moodTag: 'find-style',
    icon: '👗',
    symbol: '◈',
    pillarSymbol: '◈',
    pillarLabel: 'Style',
    label: 'Find my style',
    tagline: 'Building a realistic, chic capsule wardrobe',
    category: 'Style',
  },
  {
    id: 'digital-ease',
    moodTag: 'digital-ease',
    icon: '⚡',
    symbol: '⌘',
    pillarSymbol: '⌘',
    pillarLabel: 'Digital',
    label: 'Make digital life easier',
    tagline: 'Practical AI tools & dodging viral shopping traps',
    category: 'Digital',
  },
  {
    id: 'life-together',
    moodTag: 'life-together',
    icon: '🌿',
    symbol: '❋',
    pillarSymbol: '❋',
    pillarLabel: 'Life',
    label: 'Get my life together',
    tagline: 'Grounded routines & realistic self-care resets',
    category: 'Life',
  },
];

interface MoodFilterSectionProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  onNavigateCategory: (categoryName: any) => void;
}

export const MoodFilterSection: React.FC<MoodFilterSectionProps> = ({
  articles,
  onSelectArticle,
  onNavigateCategory,
}) => {
  const [selectedMoodId, setSelectedMoodId] = useState<string>('glow-up');

  const activeMood = MOODS.find((m) => m.id === selectedMoodId) || MOODS[0];

  const matchedArticles = articles.filter(
    (a) => a.moodTag === activeMood.moodTag || a.category === activeMood.category
  );

  return (
    <section className="py-16 sm:py-20 border-y border-[#EAE3D9] bg-[#F9F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#BA7D70]" />
            <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#8C7A70]">
              Interactive Editorial Navigator
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A211D] font-medium tracking-tight">
            WHAT DO YOU NEED TODAY?
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#66564D] mt-2">
            Pick a mood. We&apos;ll point you in the right direction.
          </p>
        </div>

        {/* 5 Mood Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-10">
          {MOODS.map((m) => {
            const isSelected = m.id === selectedMoodId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMoodId(m.id)}
                className={`flex flex-col items-center justify-between p-4 rounded-sm border transition-all text-center cursor-pointer relative min-h-[140px] ${
                  isSelected
                    ? 'bg-[#FAF7F2] border-[#2A211D] shadow-sm translate-y-[-2px] ring-1 ring-[#2A211D]'
                    : 'bg-[#FAF7F2]/60 border-[#EAE3D9] hover:bg-[#FAF7F2] hover:border-[#DDCFC5]'
                }`}
              >
                {/* Pillar Tag with Symbol */}
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#BA7D70] bg-[#F2EDE5] border border-[#EAE3D9] rounded-xs mb-2">
                  <span className="font-serif font-bold">{m.pillarSymbol}</span>
                  <span>Pillar: {m.pillarLabel}</span>
                </span>

                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-2xl select-none" role="img" aria-label={m.label}>
                    {m.icon}
                  </span>
                  <span className="text-base font-serif font-bold text-[#BA7D70]">
                    {m.symbol}
                  </span>
                </div>

                <span className="font-serif text-sm sm:text-base font-medium text-[#2A211D] leading-tight mt-auto">
                  {m.label}
                </span>
                
                <span className="text-[10px] uppercase tracking-wider text-[#8C7A70] mt-1 font-sans flex items-center gap-1">
                  <span>Explore {m.category}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Matched Content Panel */}
        <div className="bg-[#FAF7F2] border border-[#EAE3D9] p-6 sm:p-8 rounded-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EAE3D9] gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-[#BA7D70] bg-[#FAF0ED] border border-[#EAD5CD] rounded-xs inline-flex items-center gap-1 font-semibold">
                  <span>{activeMood.pillarSymbol}</span>
                  <span>Pillar: {activeMood.category}</span>
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#8C7A70]">
                  Curated Recommendation
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2A211D] font-medium mt-0.5">
                {activeMood.tagline}
              </h3>
            </div>
            <button
              onClick={() => onNavigateCategory(activeMood.category)}
              className="text-xs uppercase tracking-wider text-[#66564D] hover:text-[#2A211D] flex items-center gap-1 cursor-pointer font-medium"
            >
              <span>Explore all {activeMood.category} stories</span>
              <span className="text-sm font-serif font-bold text-[#BA7D70]">{activeMood.pillarSymbol}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          {/* Grid of matched articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedArticles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.slug || article.id)}
                className="group flex flex-col cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden mb-3.5 border border-[#EAE3D9] bg-[#F2ECE5]">
                  <SmartImage
                    src={article.heroImage}
                    alt={article.title}
                    fallbackTitle={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider mb-1.5">
                  <span className="font-semibold text-[#BA7D70]">{article.category}</span>
                  <span>·</span>
                  <span>{article.readingTime}</span>
                </div>
                <h4 className="font-serif text-lg font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-snug">
                  {article.title}
                </h4>
                <p className="text-xs text-[#66564D] line-clamp-2 mt-1.5 leading-relaxed">
                  {article.dek}
                </p>
                <div className="mt-3 flex items-center text-xs font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
