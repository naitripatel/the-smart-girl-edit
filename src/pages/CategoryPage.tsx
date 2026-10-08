import React from 'react';
import { ArrowRight, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { Category, Article } from '../types';
import { CATEGORIES } from '../data/categories';
import { SmartImage } from '../components/SmartImage';
import { SmartGirlCheckCard } from '../components/SmartGirlCheckCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface CategoryPageProps {
  category: Category;
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (category: Category) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  articles,
  onSelectArticle,
  onNavigateHome,
  onNavigateCategory,
}) => {
  const meta = CATEGORIES[category] || CATEGORIES.Beauty;

  // Filter articles in this category
  const categoryArticles = articles.filter((a) => a.category === category);

  // Featured article for this category
  const featured =
    categoryArticles.find((a) => a.id === meta.featuredArticleId) ||
    categoryArticles[0] ||
    articles[0];

  // Remaining articles
  const otherStories = categoryArticles.filter((a) => a.id !== featured?.id);

  // Optional Creator Corner story relevant to this category or crossover
  const creatorCornerStory = categoryArticles.find((a) => a.isCreatorCorner) || articles.find((a) => a.isCreatorCorner);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Category Header */}
      <section className="pt-8 pb-14 border-b border-[#EAE3D9] bg-[#F7F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={onNavigateHome}
              className="text-xs uppercase tracking-wider text-[#8C7A70] hover:text-[#2A211D] flex items-center gap-1 cursor-pointer font-sans"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
            <span className="text-[#8C7A70]">/</span>
            <span className="text-xs uppercase tracking-wider text-[#BA7D70] font-semibold font-mono">
              Editorial Pillar
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#2A211D] tracking-tight">
                {meta.title.toUpperCase()}
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl text-[#66564D] mt-2">
                {meta.tagline}
              </p>
              <p className="font-sans text-sm sm:text-base text-[#66564D] max-w-2xl mt-4 leading-relaxed">
                {meta.description}
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <div className="p-4 bg-[#FAF7F2] border border-[#DDCFC5] text-xs text-[#66564D] max-w-xs">
                <div className="flex items-center gap-1.5 text-[#BA7D70] font-semibold uppercase tracking-wider mb-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Editorial Vow
                </div>
                Zero undisclosed sponsored content. Tested with real student and young professional lifestyles in mind.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story in this Category */}
      {featured && (
        <section className="py-14 sm:py-18 border-b border-[#EAE3D9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#BA7D70]" />
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#8C7A70]">
                Featured In {category}
              </span>
            </div>

            <div
              onClick={() => onSelectArticle(featured.slug || featured.id)}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FAF7F2] border border-[#DDCFC5] p-6 sm:p-10 hover:border-[#BA7D70] transition-all"
            >
              <div className="lg:col-span-7 aspect-[16/10] overflow-hidden border border-[#EAE3D9] bg-[#F4EFEA]">
                <SmartImage
                  src={featured.heroImage}
                  alt={featured.title}
                  fallbackTitle={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider mb-2">
                    <span className="font-semibold text-[#BA7D70]">{featured.category}</span>
                    <span>·</span>
                    <span>{featured.readingTime}</span>
                    <span>·</span>
                    <span>{featured.publicationDate}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="font-serif italic text-base sm:text-lg text-[#66564D] mt-3">
                    {featured.dek}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-[#66564D] mt-3 line-clamp-3 leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                  <span>Read full piece</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Stories in this Category */}
      <section className="py-14 sm:py-20 border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EAE3D9]">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#2A211D] font-medium">
              LATEST IN {category.toUpperCase()}
            </h2>
            <span className="text-xs text-[#8C7A70] font-mono uppercase tracking-wider">
              {categoryArticles.length} Stories Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.slug || article.id)}
                className="group bg-[#FAF7F2] border border-[#EAE3D9] p-5 flex flex-col justify-between hover:border-[#BA7D70] transition-all cursor-pointer"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden mb-4 border border-[#EAE3D9] bg-[#F4EFEA]">
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
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#66564D] mt-2 line-clamp-3 leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EAE3D9] flex items-center justify-between">
                  <span className="text-[11px] text-[#8C7A70] font-sans">
                    {article.author.name}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors flex items-center gap-1">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Check for this Category */}
      {featured && featured.smartGirlCheck && (
        <section className="py-14 sm:py-20 bg-[#F7F2EA] border-b border-[#EAE3D9]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[11px] font-sans font-semibold tracking-[0.25em] uppercase text-[#BA7D70]">
                Interactive Tool
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2A211D] font-medium mt-1">
                The {category} Discernment Check
              </h2>
            </div>
            <SmartGirlCheckCard check={featured.smartGirlCheck} />
          </div>
        </section>
      )}

      {/* Creator Corner Item where relevant */}
      {creatorCornerStory && (
        <section className="py-14 sm:py-18 bg-[#FAF7F2] border-b border-[#EAE3D9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-6 sm:p-10 bg-[#F2EDE5] border border-[#DDCFC5] flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="max-w-2xl">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#BA7D70]">
                  Creator Corner Angle
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2A211D] mt-1">
                  When Social Media Influences Your {category} Decisions
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#66564D] mt-2 leading-relaxed">
                  How algorithms, sponsored haul posts, and aesthetic curation warp our sense of normal in {category.toLowerCase()}.
                </p>
              </div>
              <button
                onClick={() => onSelectArticle(creatorCornerStory.slug || creatorCornerStory.id)}
                className="px-6 py-3.5 bg-[#2A211D] text-[#FAF7F2] text-xs font-semibold tracking-widest uppercase hover:bg-[#BA7D70] transition-colors cursor-pointer whitespace-nowrap"
              >
                Read Creator Analysis
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
};
