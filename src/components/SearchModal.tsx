import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Article, Category } from '../types';
import { SmartImage } from './SmartImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
}

const CATEGORY_FILTERS: ('All' | Category)[] = [
  'All',
  'Beauty',
  'Style',
  'Money',
  'Digital',
  'Life',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesTitle = article.title.toLowerCase().includes(q);
    const matchesDek = article.dek.toLowerCase().includes(q);
    const matchesExcerpt = article.excerpt.toLowerCase().includes(q);
    const matchesCategoryName = article.category.toLowerCase().includes(q);
    const matchesTags = article.tags?.some((t) => t.toLowerCase().includes(q));

    return (
      matchesCategory &&
      (matchesTitle || matchesDek || matchesExcerpt || matchesCategoryName || matchesTags)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-[#1E1714]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[#FAF7F2] rounded-none shadow-2xl border border-[#DDCFC5] overflow-hidden flex flex-col max-h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header & input */}
        <div className="p-4 sm:p-6 border-b border-[#EAE3D9] flex items-center gap-3 bg-[#FDFBF7]">
          <Search className="w-5 h-5 text-[#8C7A70] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search beauty, capsule style, money, digital hacks..."
            className="flex-1 bg-transparent font-serif text-lg sm:text-xl text-[#2A211D] placeholder:text-[#A09287] placeholder:font-sans focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase tracking-wider text-[#8C7A70] hover:text-[#2A211D] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#66564D] hover:text-[#2A211D] hover:bg-[#F2ECE5] rounded-full transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories tabs (button controls) */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#F6EFEB] border-b border-[#EAE3D9] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C7A70] mr-1 shrink-0">
            Pillar:
          </span>
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1 rounded-sm whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2A211D] text-[#FAF7F2] font-medium'
                  : 'text-[#66564D] hover:text-[#2A211D] hover:bg-[#EAE3D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search results list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[#EAE3D9]">
          {filteredArticles.length > 0 ? (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article.slug || article.id);
                    onClose();
                  }}
                  className="group flex gap-4 sm:gap-6 p-2 rounded-sm hover:bg-[#F4EFEA] transition-all cursor-pointer items-start"
                >
                  <div className="w-20 h-20 sm:w-28 sm:h-24 shrink-0 overflow-hidden rounded-xs border border-[#EAE3D9]">
                    <SmartImage
                      src={article.heroImage}
                      alt={article.title}
                      fallbackTitle={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider">
                      <span className="font-semibold text-[#BA7D70]">{article.category}</span>
                      <span>·</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <h4 className="font-serif text-base sm:text-lg text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-snug mt-1">
                      {article.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#66564D] line-clamp-2 mt-1 leading-relaxed">
                      {article.dek}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center text-[#8C7A70] group-hover:text-[#2A211D] self-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Sparkles className="w-8 h-8 mx-auto text-[#BA7D70] mb-3 opacity-70" />
              <p className="font-serif text-lg text-[#2A211D]">
                No articles matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-[#8C7A70] max-w-sm mx-auto mt-1">
                Try searching for “skincare”, “wardrobe”, “budgeting”, or “creator corner”.
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#F6EFEB] border-t border-[#EAE3D9] text-[11px] text-[#8C7A70] flex items-center justify-between">
          <span>Showing {filteredArticles.length} of {articles.length} stories</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
