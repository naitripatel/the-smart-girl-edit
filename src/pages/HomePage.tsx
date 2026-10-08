import React from 'react';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import { Article, Category } from '../types';
import { SmartImage } from '../components/SmartImage';
import { MoodFilterSection } from '../components/MoodFilterSection';
import { CreatorCornerSection } from '../components/CreatorCornerSection';
import { SmartGirlCheckCard } from '../components/SmartGirlCheckCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface HomePageProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  onNavigateCategory: (category: Category) => void;
  onNavigateCreatorCorner: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  onSelectArticle,
  onNavigateCategory,
  onNavigateCreatorCorner,
}) => {
  // Articles for The Latest Edit (Immediately below hero: 1 large featured + 2 smaller supporting)
  const leadLatestArticle =
    articles.find((a) => a.slug === 'how-social-media-is-changing-shopping' || a.id === 'how-social-media-is-changing-shopping') || articles[0];
  const supportingLatestArticles = [
    articles.find((a) => a.slug === 'smart-girls-guide-skincare-routine' || a.id === 'smart-girls-guide-skincare-routine') || articles[1],
    articles.find((a) => a.slug === 'build-a-wardrobe-you-actually-wear' || a.id === 'build-a-wardrobe-you-actually-wear') || articles[2],
  ].filter(Boolean);

  // Trending articles for "What Everyone's Talking About"
  const trendingArticles = articles.filter(
    (a) =>
      a.slug === 'ai-tools-for-college-students' ||
      a.slug === 'before-you-buy-viral-beauty-product' ||
      a.slug === 'stop-impulse-buying' ||
      a.slug === 'is-online-product-worth-buying' ||
      a.id === 'ai-tools-for-college-students' ||
      a.id === 'before-you-buy-viral-beauty-product' ||
      a.id === 'stop-impulse-buying' ||
      a.id === 'is-online-product-worth-buying'
  );

  // Creator corner articles
  const creatorArticles = articles.filter((a) => a.isCreatorCorner);

  // Signature check example for homepage
  const signatureCheckData = {
    title: 'BEFORE YOU BUY IT',
    subtitle: 'The 30-Second Impulse Filter',
    type: 'buy' as const,
    items: [
      { text: 'Do I actually need it?' },
      { text: "Do I know what I'm paying for?" },
      { text: 'Have I compared my options?' },
      { text: 'Am I buying it because I need it or because everyone online has it?' },
      { text: 'Will I still want it next week?' },
    ],
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO: Strong Editorial Magazine Cover Composition */}
      <section className="relative pt-6 pb-14 sm:pt-10 sm:pb-20 border-b border-[#EAE3D9] bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* LEFT COLUMN: Issue Info + Headline + Description + CTA (approx 52%) */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
              {/* Preserved editorial issue branding */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#8C7A70] pb-2 border-b border-[#EAE3D9]/70">
                <span className="font-semibold text-[#BA7D70]">ISSUE NO. 04</span>
                <span>·</span>
                <span>AUTUMN / WINTER 2026</span>
                <span>·</span>
                <span>VOLUME 01</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline text-[#2A211D]">THE DIGITAL COVER</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] text-[#2A211D] leading-[1.08] text-balance">
                BE SMARTER ABOUT THE THINGS YOU LOVE.
              </h1>

              {/* Supporting Description */}
              <p className="font-sans text-sm sm:text-base lg:text-[17px] text-[#66564D] max-w-xl leading-relaxed">
                Beauty, style, money, digital life and everything in between — thoughtfully explained for the modern girl.
              </p>

              {/* Editorial Theme Marker */}
              <div className="flex items-center gap-2 text-xs font-serif italic text-[#8C7A70]">
                <span>Feature Focus:</span>
                <span className="not-italic font-mono text-[11px] uppercase tracking-wider text-[#2A211D]">
                  THE ART OF SLOW LIVING
                </span>
                <span>·</span>
                <span>Discernment over consumption</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => scrollToSection('latest-edit')}
                  className="px-7 py-3.5 sm:px-8 sm:py-4 bg-[#2A211D] text-[#FAF7F2] text-xs font-semibold tracking-widest uppercase hover:bg-[#BA7D70] transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <span>EXPLORE THE EDIT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('start-here')}
                  className="text-xs font-sans uppercase tracking-wider text-[#66564D] hover:text-[#2A211D] flex items-center gap-1.5 py-3 cursor-pointer"
                >
                  <span>New Reader Guide</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#BA7D70]" />
                </button>
              </div>

              {/* Quiet unboxed metadata indicators */}
              <div className="pt-4 flex items-center gap-4 text-xs text-[#8C7A70] border-t border-[#EAE3D9]/60">
                <span>Independent Editorial</span>
                <span>·</span>
                <span>Evidence-Led Beauty</span>
                <span>·</span>
                <span>Realistic Money</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Large Editorial Lifestyle Photograph (approx 48%) */}
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="relative group">
                <div className="aspect-[4/3] sm:aspect-[4/3] overflow-hidden rounded-xs border border-[#DDCFC5] shadow-md bg-[#F2ECE5]">
                  <SmartImage
                    src="/src/assets/images/smart_girl_hero_cover_1791477860935.jpg"
                    alt="The Smart Girl Edit cover photograph of a chic young woman journaling in a warm Paris cafe"
                    fallbackTitle="The Smart Girl Edit Digital Cover"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>

                {/* Quiet, clean editorial framing bar beneath image (no large text covering image) */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#8C7A70]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BA7D70]" />
                    <span className="font-serif italic">Digital Cover: Morning Reflections & Intentional Living</span>
                  </div>
                  <span className="font-mono uppercase tracking-wider text-[10px] text-[#2A211D]">
                    Vol. 01 / Nº 04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMMEDIATELY BELOW THE HERO: THE LATEST EDIT (1 Large Featured + 2 Supporting Articles) */}
      <section id="latest-edit" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#EAE3D9]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#BA7D70]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#BA7D70] font-semibold">
                  Curated Dispatch
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-4xl text-[#2A211D] font-medium tracking-tight">
                THE LATEST EDIT
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8C7A70] font-sans mt-2 sm:mt-0">
              Fresh long-form guides, deconstructions, and wardrobe strategies
            </p>
          </div>

          {/* Grid Layout: 1 Large Featured Article + 2 Smaller Supporting Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* ONE LARGE FEATURED ARTICLE (7 Columns) */}
            <div
              onClick={() => onSelectArticle(leadLatestArticle.slug || leadLatestArticle.id)}
              className="lg:col-span-7 group cursor-pointer bg-[#FAF7F2] border border-[#DDCFC5] p-5 sm:p-7 flex flex-col justify-between hover:border-[#BA7D70] hover:shadow-sm transition-all"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden mb-5 border border-[#EAE3D9] bg-[#F2ECE5]">
                  <SmartImage
                    src={leadLatestArticle.heroImage}
                    alt={leadLatestArticle.title}
                    fallbackTitle={leadLatestArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8C7A70] uppercase tracking-wider mb-2">
                  <span className="font-semibold text-[#BA7D70]">{leadLatestArticle.category}</span>
                  <span>·</span>
                  <span>{leadLatestArticle.readingTime}</span>
                  <span>·</span>
                  <span>{leadLatestArticle.publicationDate}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-tight">
                  {leadLatestArticle.title}
                </h3>
                <p className="font-serif italic text-base sm:text-lg text-[#66564D] mt-2">
                  {leadLatestArticle.dek}
                </p>
                <p className="text-xs sm:text-sm text-[#66564D] mt-3 line-clamp-3 leading-relaxed font-sans">
                  {leadLatestArticle.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
                <span className="text-[11px] text-[#8C7A70] font-sans">
                  By {leadLatestArticle.author.name}
                </span>
                <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            {/* TWO SMALLER SUPPORTING ARTICLES (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:space-y-0">
              {supportingLatestArticles.map((story) => (
                <div
                  key={story.id}
                  onClick={() => onSelectArticle(story.slug || story.id)}
                  className="group cursor-pointer bg-[#FAF7F2] border border-[#EAE3D9] p-5 flex flex-col justify-between hover:border-[#BA7D70] hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                    <div className="w-full sm:w-36 aspect-[4/3] sm:aspect-square shrink-0 overflow-hidden border border-[#EAE3D9] bg-[#F2ECE5]">
                      <SmartImage
                        src={story.heroImage}
                        alt={story.title}
                        fallbackTitle={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider mb-1">
                        <span className="font-semibold text-[#BA7D70]">{story.category}</span>
                        <span>·</span>
                        <span>{story.readingTime}</span>
                      </div>
                      <h4 className="font-serif text-lg sm:text-xl text-[#2A211D] group-hover:text-[#BA7D70] transition-colors font-medium leading-snug">
                        {story.title}
                      </h4>
                      <p className="text-xs text-[#66564D] mt-1.5 line-clamp-2 leading-relaxed font-sans">
                        {story.dek}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE3D9]/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                    <span className="text-[11px] text-[#8C7A70] font-normal font-sans">
                      By {story.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. START HERE: 5 Curated Editorial Pillars */}
      <section id="start-here" className="py-16 sm:py-20 bg-[#F7F2EA] border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#8C7A70]">
              The Core Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2A211D] font-medium mt-1">
              NEW HERE? START HERE.
            </h2>
            <p className="text-xs sm:text-sm text-[#66564D] mt-1.5 font-sans">
              Five editorial pillars to recalibrate your everyday choices with discernment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {/* Pillar 1: BEAUTY */}
            <div
              onClick={() => onNavigateCategory('Beauty')}
              className="group bg-[#FAF7F2] p-6 border border-[#DDCFC5] hover:border-[#BA7D70] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#BA7D70] flex items-center gap-1">
                  <span>✦</span>
                  <span>Pillar 01</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] mt-2 group-hover:text-[#BA7D70] transition-colors flex items-center gap-2">
                  <span>✦</span>
                  <span>BEAUTY</span>
                </h3>
                <p className="font-serif italic text-sm text-[#66564D] mt-1.5">
                  What should you know before buying?
                </p>
                <p className="font-sans text-xs text-[#8C7A70] mt-2.5 leading-relaxed">
                  Skin barrier basics, ingredient decks, and bypassing TikTok hyperbole.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#EAE3D9] flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 2: STYLE */}
            <div
              onClick={() => onNavigateCategory('Style')}
              className="group bg-[#FAF7F2] p-6 border border-[#DDCFC5] hover:border-[#BA7D70] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#7D8E78] flex items-center gap-1">
                  <span>◈</span>
                  <span>Pillar 02</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] mt-2 group-hover:text-[#BA7D70] transition-colors flex items-center gap-2">
                  <span>◈</span>
                  <span>STYLE</span>
                </h3>
                <p className="font-serif italic text-sm text-[#66564D] mt-1.5">
                  Taste that outlasts the algorithm.
                </p>
                <p className="font-sans text-xs text-[#8C7A70] mt-2.5 leading-relaxed">
                  High-mileage wardrobe formulas and signature aesthetic confidence.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#EAE3D9] flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 3: MONEY */}
            <div
              onClick={() => onNavigateCategory('Money')}
              className="group bg-[#FAF7F2] p-6 border border-[#DDCFC5] hover:border-[#BA7D70] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#66564D] flex items-center gap-1">
                  <span>⟡</span>
                  <span>Pillar 03</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] mt-2 group-hover:text-[#BA7D70] transition-colors flex items-center gap-2">
                  <span>⟡</span>
                  <span>MONEY</span>
                </h3>
                <p className="font-serif italic text-sm text-[#66564D] mt-1.5">
                  Build wealth without guilt.
                </p>
                <p className="font-sans text-xs text-[#8C7A70] mt-2.5 leading-relaxed">
                  Calm automation, breaking impulse loops, and peace-of-mind saving.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#EAE3D9] flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 4: DIGITAL */}
            <div
              onClick={() => onNavigateCategory('Digital')}
              className="group bg-[#FAF7F2] p-6 border border-[#DDCFC5] hover:border-[#BA7D70] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#2A211D] flex items-center gap-1">
                  <span>⌘</span>
                  <span>Pillar 04</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] mt-2 group-hover:text-[#BA7D70] transition-colors flex items-center gap-2">
                  <span>⌘</span>
                  <span>DIGITAL</span>
                </h3>
                <p className="font-serif italic text-sm text-[#66564D] mt-1.5">
                  Navigate tech and AI smarter.
                </p>
                <p className="font-sans text-xs text-[#8C7A70] mt-2.5 leading-relaxed">
                  Vetted student AI prompts, digital boundaries, and de-influencing.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#EAE3D9] flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>

            {/* Pillar 5: LIFE */}
            <div
              onClick={() => onNavigateCategory('Life')}
              className="group bg-[#FAF7F2] p-6 border border-[#DDCFC5] hover:border-[#BA7D70] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C7A70] flex items-center gap-1">
                  <span>❋</span>
                  <span>Pillar 05</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] mt-2 group-hover:text-[#BA7D70] transition-colors flex items-center gap-2">
                  <span>❋</span>
                  <span>LIFE</span>
                </h3>
                <p className="font-serif italic text-sm text-[#66564D] mt-1.5">
                  Routines that actually fit your calendar.
                </p>
                <p className="font-sans text-xs text-[#8C7A70] mt-2.5 leading-relaxed">
                  Consumer-free resets, sleep anchors, and unglamorous recovery.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#EAE3D9] flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT EVERYONE'S TALKING ABOUT (Trending Now) */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#EAE3D9]">
            <div>
              <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#BA7D70]">
                Trending Conversations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2A211D] font-medium mt-1">
                WHAT EVERYONE&apos;S TALKING ABOUT
              </h2>
            </div>
            <p className="text-xs text-[#8C7A70] font-sans mt-2 sm:mt-0">
              Viral products, algorithm trends, and cultural shifts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingArticles.map((story) => (
              <div
                key={story.id}
                onClick={() => onSelectArticle(story.slug || story.id)}
                className="group cursor-pointer bg-[#FAF7F2] border border-[#EAE3D9] p-5 flex flex-col justify-between hover:border-[#BA7D70] transition-all"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden border border-[#EAE3D9] bg-[#F2ECE5] mb-4">
                    <SmartImage
                      src={story.heroImage}
                      alt={story.title}
                      fallbackTitle={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider mb-1.5">
                    <span className="font-semibold text-[#BA7D70]">{story.category}</span>
                    <span>·</span>
                    <span>{story.readingTime}</span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-snug line-clamp-2">
                    {story.title}
                  </h4>
                  <p className="text-xs text-[#66564D] mt-2 line-clamp-2 leading-relaxed font-sans">
                    {story.dek}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAE3D9] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                  <span>Read Story</span>
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT DO YOU NEED TODAY? Interactive Mood Navigator */}
      <MoodFilterSection
        articles={articles}
        onSelectArticle={onSelectArticle}
        onNavigateCategory={onNavigateCategory}
      />

      {/* 6. CREATOR CORNER: Signature Editorial Section */}
      <CreatorCornerSection
        creatorArticles={creatorArticles}
        onSelectArticle={onSelectArticle}
      />

      {/* 7. THE SMART GIRL CHECK: Signature Reusable Feature Spotlight */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#BA7D70]">
                Signature Tool
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2A211D] tracking-tight mt-1">
                THE SMART GIRL CHECK
              </h2>
              <p className="font-serif italic text-lg sm:text-xl text-[#66564D] mt-3">
                Pause before you swipe. Discernment in five simple questions.
              </p>
              <p className="font-sans text-sm sm:text-[15px] text-[#66564D] mt-4 leading-relaxed">
                Appearing across our articles, The Smart Girl Check is our proprietary mini-diagnostic
                designed to break automatic consumer hypnosis. From checkout counters to cosmetic aisles,
                give yourself thirty seconds to choose with clarity.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-[#8C7A70]">
                <span className="px-2.5 py-1 bg-[#FAF0ED] text-[#BA7D70] border border-[#EAD5CD] flex items-center gap-1.5">
                  <span>🛍️</span>
                  <span>Before You Buy</span>
                </span>
                <span className="px-2.5 py-1 bg-[#F2EFF8] text-[#63557A] border border-[#DCD5E7] flex items-center gap-1.5">
                  <span>⌘</span>
                  <span>Before You Click</span>
                </span>
                <span className="px-2.5 py-1 bg-[#EFF5EE] text-[#4A6B45] border border-[#D4E4D0] flex items-center gap-1.5">
                  <span>⟡</span>
                  <span>Before You Spend</span>
                </span>
                <span className="px-2.5 py-1 bg-[#FDF3E8] text-[#9A6B3D] border border-[#EBD6C3] flex items-center gap-1.5">
                  <span>⏳</span>
                  <span>Before You Add to Cart</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <SmartGirlCheckCard check={signatureCheckData} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SUBSCRIBE */}
      <NewsletterSection />
    </div>
  );
};
