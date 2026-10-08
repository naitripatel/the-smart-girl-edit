import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Article } from '../types';
import { SmartImage } from './SmartImage';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'horizontal' | 'compact' | 'standard';
  onSelect: (slug: string) => void;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  onSelect,
  className = '',
}) => {
  const handleClick = () => {
    onSelect(article.slug || article.id);
  };

  if (variant === 'featured') {
    return (
      <article
        onClick={handleClick}
        className={`group cursor-pointer bg-[#FAF7F2] border border-[#DDCFC5] p-5 sm:p-7 flex flex-col justify-between hover:border-[#BA7D70] hover:shadow-sm transition-all rounded-none ${className}`}
      >
        <div>
          <div className="aspect-[16/10] overflow-hidden mb-5 border border-[#EAE3D9] bg-[#F2ECE5]">
            <SmartImage
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              fallbackTitle={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8C7A70] uppercase tracking-wider mb-2">
            <span className="font-semibold text-[#BA7D70]">{article.category}</span>
            {article.subcategory && (
              <>
                <span>/</span>
                <span>{article.subcategory}</span>
              </>
            )}
            <span>·</span>
            <span>{article.readingTime}</span>
            <span>·</span>
            <span>{article.publicationDate}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-tight">
            {article.title}
          </h3>
          <p className="font-serif italic text-base sm:text-lg text-[#66564D] mt-2">
            {article.dek}
          </p>
          <p className="text-xs sm:text-sm text-[#66564D] mt-3 line-clamp-3 leading-relaxed font-sans">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
          <span className="text-[11px] text-[#8C7A70] font-sans">
            By {article.author.name}
          </span>
          <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
            <span>READ ARTICLE</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleClick}
        className={`group cursor-pointer bg-[#FAF7F2] border border-[#EAE3D9] p-4 sm:p-5 flex flex-col justify-between hover:border-[#BA7D70] hover:shadow-sm transition-all rounded-none ${className}`}
      >
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
          <div className="w-full sm:w-36 aspect-[4/3] sm:aspect-square shrink-0 overflow-hidden border border-[#EAE3D9] bg-[#F2ECE5]">
            <SmartImage
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              fallbackTitle={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider mb-1">
              <span className="font-semibold text-[#BA7D70]">{article.category}</span>
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-[#2A211D] group-hover:text-[#BA7D70] transition-colors font-medium leading-snug">
              {article.title}
            </h4>
            <p className="text-xs text-[#66564D] mt-1.5 line-clamp-2 leading-relaxed font-sans">
              {article.excerpt || article.dek}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#EAE3D9]/60 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
          <span className="text-[11px] text-[#8C7A70] font-normal font-sans">
            By {article.author.name}
          </span>
          <span className="flex items-center gap-1">
            <span>READ ARTICLE</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </span>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article
        onClick={handleClick}
        className={`group cursor-pointer bg-[#FAF7F2] border border-[#EAE3D9] p-4 flex flex-col justify-between hover:border-[#BA7D70] transition-all rounded-none ${className}`}
      >
        <div>
          <div className="aspect-[16/10] overflow-hidden mb-3 border border-[#EAE3D9] bg-[#F4EFEA]">
            <SmartImage
              src={article.heroImage}
              alt={article.heroImageAlt || article.title}
              fallbackTitle={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#8C7A70] uppercase tracking-wider mb-1">
            <span className="font-semibold text-[#BA7D70]">{article.category}</span>
            <span>·</span>
            <span>{article.readingTime}</span>
          </div>
          <h4 className="font-serif text-base font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h4>
          <p className="text-xs text-[#66564D] mt-1.5 line-clamp-2 leading-relaxed font-sans">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-4 pt-2.5 border-t border-[#EAE3D9] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
          <span>READ ARTICLE</span>
          <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    );
  }

  // Standard card
  return (
    <article
      onClick={handleClick}
      className={`group bg-[#FAF7F2] border border-[#EAE3D9] p-5 sm:p-6 flex flex-col justify-between hover:border-[#BA7D70] hover:shadow-sm transition-all cursor-pointer rounded-none ${className}`}
    >
      <div>
        <div className="aspect-[16/10] overflow-hidden mb-4 border border-[#EAE3D9] bg-[#F4EFEA]">
          <SmartImage
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fallbackTitle={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider mb-2">
          <span className="font-semibold text-[#BA7D70]">{article.category}</span>
          <span>·</span>
          <span>{article.readingTime}</span>
          <span>·</span>
          <span>{article.publicationDate}</span>
        </div>
        <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#66564D] mt-2 line-clamp-3 leading-relaxed font-sans">
          {article.excerpt}
        </p>
      </div>

      <div className="mt-5 pt-3.5 border-t border-[#EAE3D9] flex items-center justify-between">
        <span className="text-[11px] text-[#8C7A70] font-sans">
          By {article.author.name}
        </span>
        <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
          <span>READ ARTICLE</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
};
