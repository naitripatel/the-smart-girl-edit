import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Bookmark,
  Share2,
  ExternalLink,
  BookOpen,
  Play,
} from 'lucide-react';
import { Article, Category } from '../types';
import { SmartImage } from '../components/SmartImage';
import { SmartGirlCheckCard } from '../components/SmartGirlCheckCard';
import { SmartGirlTip } from '../components/SmartGirlTip';
import { WorthKnowing } from '../components/WorthKnowing';
import { CreatorCornerCallout } from '../components/CreatorCornerCallout';
import { SmartGirlVerdictCard } from '../components/SmartGirlVerdictCard';
import { ArticleCard } from '../components/ArticleCard';

interface ArticlePageProps {
  article: Article;
  allArticles: Article[];
  onSelectArticle: (slugOrId: string) => void;
  onNavigateCategory: (category: Category) => void;
  onNavigateHome: () => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  allArticles,
  onSelectArticle,
  onNavigateCategory,
  onNavigateHome,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    article.sections[0]?.id || ''
  );
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll to top and set page title on article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (article.sections[0]) {
      setActiveSectionId(article.sections[0].id);
    }
    if (article.seo?.metaTitle) {
      document.title = `${article.title} — The Smart Girl Edit`;
    }
  }, [article.id, article.title, article.seo?.metaTitle]);

  // Handle active scroll spy on table of contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (const section of article.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSectionId(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.sections]);

  // Contextually related articles (via relatedArticleIds)
  const relatedArticles = article.relatedArticleIds
    .map((refId) =>
      allArticles.find((a) => a.id === refId || a.slug === refId)
    )
    .filter((a): a is Article => Boolean(a))
    .slice(0, 3);

  // Fallback to fill up to 3 related articles if needed
  const finalRelated =
    relatedArticles.length === 3
      ? relatedArticles
      : [
          ...relatedArticles,
          ...allArticles
            .filter(
              (a) =>
                a.id !== article.id &&
                !relatedArticles.some((r) => r.id === a.id)
            )
            .slice(0, 3 - relatedArticles.length),
        ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Helper to parse internal markdown links like [anchor text](#/article/slug) or [anchor text](/article/slug)
  const renderParagraphWithLinks = (text: string) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const elements: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        elements.push(text.substring(lastIdx, match.index));
      }
      const label = match[1];
      const rawTarget = match[2];
      const targetSlug = rawTarget
        .replace(/^#\/?/, '')
        .replace(/^\/+/, '')
        .replace(/^(beauty|style|money|digital|life|article)\//i, '');

      elements.push(
        <a
          key={match.index}
          href={`#/article/${targetSlug}`}
          onClick={(e) => {
            e.preventDefault();
            onSelectArticle(targetSlug);
          }}
          className="text-[#BA7D70] font-medium underline underline-offset-3 hover:text-[#2A211D] transition-colors cursor-pointer inline text-left"
        >
          {label}
        </a>
      );
      lastIdx = linkRegex.lastIndex;
    }
    if (lastIdx < text.length) {
      elements.push(text.substring(lastIdx));
    }
    return elements.length > 0 ? elements : text;
  };

  return (
    <article className="bg-[#FAF7F2] min-h-screen pb-24">
      {/* 1. TOP BREADCRUMB & METADATA BAR */}
      <div className="pt-8 pb-4 border-b border-[#EAE3D9] bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between text-xs text-[#8C7A70]">
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateHome}
                className="hover:text-[#2A211D] cursor-pointer"
              >
                The Edit
              </button>
              <span>/</span>
              <button
                onClick={() => onNavigateCategory(article.category)}
                className="font-medium text-[#BA7D70] hover:underline cursor-pointer uppercase tracking-wider font-mono"
              >
                {article.category}
              </button>
              {article.subcategory && (
                <>
                  <span>/</span>
                  <span className="hidden sm:inline font-sans text-[#66564D]">
                    {article.subcategory}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSaved(!saved)}
                className={`p-1.5 rounded hover:bg-[#F2ECE5] transition-colors cursor-pointer flex items-center gap-1 ${
                  saved ? 'text-[#BA7D70]' : 'text-[#8C7A70]'
                }`}
                aria-label="Save story"
              >
                <Bookmark className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                  {saved ? 'Saved' : 'Save'}
                </span>
              </button>
              <button
                onClick={handleShare}
                className="p-1.5 rounded hover:bg-[#F2ECE5] transition-colors cursor-pointer flex items-center gap-1 text-[#8C7A70]"
                aria-label="Share story"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
                  {copied ? 'Link Copied' : 'Share'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER & HERO */}
      <header className="pt-10 pb-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#BA7D70] font-semibold">
            <span>{article.category}</span>
            {article.subcategory && (
              <>
                <span>·</span>
                <span>{article.subcategory}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2A211D] leading-[1.1] text-balance">
            {article.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#66564D] leading-relaxed max-w-2xl mx-auto">
            {article.dek}
          </p>

          {/* Clean Unboxed Metadata Line */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-[#8C7A70] font-sans">
            <span className="flex items-center gap-1.5 text-[#2A211D] font-medium">
              <User className="w-3.5 h-3.5 text-[#BA7D70]" />
              {article.author.name} ({article.author.role})
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#8C7A70]" />
              {article.publicationDate}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#8C7A70]" />
              {article.readingTime}
            </span>
          </div>
        </div>

        {/* Large Hero Image */}
        <div className="mt-10 aspect-[16/10] overflow-hidden border border-[#DDCFC5] shadow-sm bg-[#F4EFEA] rounded-none">
          <SmartImage
            src={article.heroImage}
            alt={article.heroImageAlt || article.title}
            fallbackTitle={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-[11px] font-serif italic text-[#8C7A70] text-center mt-2.5">
          {article.heroImageAlt || 'Photography for The Smart Girl Edit · Unretouched editorial composition'}
        </p>
      </header>

      {/* 3. MAIN ARTICLE LAYOUT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* TABLE OF CONTENTS: "IN THIS ARTICLE" */}
        {article.sections.length > 1 && (
          <nav
            aria-label="In this article"
            className="mb-12 p-6 sm:p-8 bg-[#F5EFEB] border border-[#EAE3D9] rounded-none"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA7D70]" />
              <h2 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#BA7D70] font-semibold">
                IN THIS ARTICLE
              </h2>
            </div>
            <ul className="space-y-2.5">
              {article.sections.map((sec, idx) => (
                <li key={sec.id}>
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-left text-sm sm:text-base font-serif transition-colors cursor-pointer flex items-center gap-2 ${
                      activeSectionId === sec.id
                        ? 'text-[#BA7D70] font-medium'
                        : 'text-[#2A211D] hover:text-[#BA7D70]'
                    }`}
                  >
                    <span className="text-xs font-mono text-[#8C7A70]">0{idx + 1}.</span>
                    <span>{sec.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Creator Corner Contextual Callout if applicable */}
        {article.isCreatorCorner && article.creatorCornerSnippet && (
          <CreatorCornerCallout
            quote={article.creatorCornerSnippet.quote}
            creatorContext={article.creatorCornerSnippet.creatorContext}
            realityCheck={article.creatorCornerSnippet.realityCheck}
          />
        )}

        {/* INTRODUCTION */}
        {article.introduction && article.introduction.length > 0 && (
          <div className="mb-10 space-y-4 text-base sm:text-[18px] text-[#2A211D] leading-[1.8] font-sans pb-6 border-b border-[#EAE3D9]">
            {article.introduction.map((introP, iIdx) => (
              <p
                key={iIdx}
                className={
                  iIdx === 0
                    ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:text-[#BA7D70] first-letter:leading-none'
                    : ''
                }
              >
                {renderParagraphWithLinks(introP)}
              </p>
            ))}
          </div>
        )}

        {/* SECTIONS BODY */}
        <div className="space-y-12">
          {article.sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 pt-6 border-t border-[#EAE3D9] first:border-t-0 first:pt-0"
            >
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xs font-mono text-[#BA7D70]">0{idx + 1}</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2A211D] tracking-tight">
                  {section.title}
                </h2>
              </div>

              {section.subtitle && (
                <p className="font-serif italic text-base text-[#66564D] mb-3">
                  {section.subtitle}
                </p>
              )}

              {/* Prose Paragraphs */}
              <div className="space-y-4 text-base sm:text-[17px] text-[#4A3D36] leading-[1.75] font-sans">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{renderParagraphWithLinks(paragraph)}</p>
                ))}
              </div>

              {/* Pull quote if available */}
              {section.pullQuote && (
                <div className="my-8 py-6 border-y border-[#DDCFC5] text-center px-4 sm:px-8">
                  <blockquote className="font-serif italic text-xl sm:text-2xl text-[#2A211D] max-w-xl mx-auto leading-snug">
                    &ldquo;{section.pullQuote}&rdquo;
                  </blockquote>
                </div>
              )}

              {/* Smart Tip if available */}
              {section.smartTip && (
                <SmartGirlTip title={section.smartTip.title}>
                  {section.smartTip.text}
                </SmartGirlTip>
              )}

              {/* Worth Knowing if available */}
              {section.worthKnowing && (
                <WorthKnowing title={section.worthKnowing.title}>
                  {section.worthKnowing.text}
                </WorthKnowing>
              )}

              {/* Bullet points if available */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <div className="my-6 p-5 bg-[#F7F2EA] border border-[#DDCFC5]">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#3E322C] font-sans">
                    {section.bulletPoints.map((item, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BA7D70] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Practical Examples if available */}
              {section.practicalExamples && section.practicalExamples.length > 0 && (
                <div className="my-6 space-y-3">
                  {section.practicalExamples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-4 bg-[#FAF7F2] border border-[#EAE3D9] text-xs sm:text-sm font-sans"
                    >
                      <strong className="text-[#2A211D] block mb-1">
                        When faced with: {ex.situation}
                      </strong>
                      <span className="text-[#66564D]">{ex.solution}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Comparison Table if present */}
              {section.comparisonTable && (
                <div className="my-8 overflow-x-auto border border-[#DDCFC5] bg-[#FAF7F2]">
                  <table className="w-full text-left text-xs sm:text-sm font-sans">
                    <thead className="bg-[#F2EDE5] border-b border-[#DDCFC5] text-[#2A211D]">
                      <tr>
                        {section.comparisonTable.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3 font-semibold font-serif">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE3D9]">
                      {section.comparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#F9F5EF] transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-[#4A3D36]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Section supporting image if available */}
              {section.image && (
                <div className="my-8">
                  <div className="aspect-[16/9] overflow-hidden border border-[#DDCFC5] bg-[#F2ECE5]">
                    <SmartImage
                      src={section.image.src}
                      alt={section.image.alt}
                      fallbackTitle={section.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {section.image.caption && (
                    <p className="text-xs font-serif italic text-[#8C7A70] text-center mt-2">
                      {section.image.caption}
                    </p>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Video Block (Placed after relevant sections with clear watch context) */}
        {article.videoStatus === 'verified' && article.videoUrl ? (
          <aside className="my-12 p-6 sm:p-7 bg-[#241B18] text-[#FAF7F2] rounded-none">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E4B7AD] mb-2">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>WATCH / SEE IT IN ACTION</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#FAF7F2]">
              {article.videoTitle || 'Visual Deep Dive'}
            </h3>
            <p className="text-xs text-[#EAE3D9]/80 mt-1 max-w-xl font-sans leading-relaxed">
              A qualified, verified educational breakdown examining formulation, technique, or consumer psychology.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={article.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#FAF7F2] text-[#2A211D] hover:bg-[#E4B7AD] transition-colors text-xs uppercase font-semibold tracking-wider cursor-pointer"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-[#EAE3D9]/60 font-sans">
                Opens in a new tab · No auto-play
              </span>
            </div>
          </aside>
        ) : (
          <div className="my-10 p-5 bg-[#F4EFEA] border border-[#EAE3D9] flex items-center justify-between text-xs text-[#8C7A70]">
            <div className="flex items-center gap-2">
              <Play className="w-3.5 h-3.5 text-[#BA7D70]" />
              <span className="font-mono uppercase tracking-wider text-[#BA7D70] font-semibold">
                VIDEO COMING SOON
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Curated qualified expert masterclass in production</span>
            </div>
            <span className="font-mono text-[10px] uppercase text-[#8C7A70] tracking-wider">
              Editorial Verified
            </span>
          </div>
        )}

        {/* Supporting Image Gallery (if provided) */}
        {article.supportingImages && article.supportingImages.length > 0 && (
          <div className="my-12 space-y-4">
            {article.supportingImages.map((img, sIdx) => (
              <div key={sIdx}>
                <div className="aspect-[16/9] overflow-hidden border border-[#DDCFC5] bg-[#F2ECE5]">
                  <SmartImage
                    src={img.src}
                    alt={img.alt}
                    fallbackTitle="Editorial Visual Note"
                    className="w-full h-full object-cover"
                  />
                </div>
                {img.caption && (
                  <p className="text-xs font-serif italic text-[#8C7A70] text-center mt-2">
                    {img.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 4. THE SMART GIRL CHECK */}
        {article.smartGirlCheck && (
          <div className="my-14">
            <SmartGirlCheckCard check={article.smartGirlCheck} />
          </div>
        )}

        {/* 5. THE SMART GIRL VERDICT: Distinctive conclusion card */}
        {article.smartGirlVerdict && (
          <SmartGirlVerdictCard verdict={article.smartGirlVerdict} />
        )}

        {/* 6. SOURCES / FURTHER READING PLACEHOLDER SECTION */}
        {article.sources && article.sources.length > 0 && (
          <section className="my-12 pt-6 border-t border-[#EAE3D9]">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#8C7A70]" />
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C7A70] font-semibold">
                SOURCES & FURTHER READING
              </h3>
            </div>
            <ul className="space-y-2 text-xs text-[#66564D] font-sans">
              {article.sources.map((src, sIdx) => (
                <li key={sIdx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-medium text-[#2A211D]">
                    {src.title}
                  </span>
                  {src.publication && (
                    <span className="italic text-[#8C7A70]">
                      — {src.publication}
                    </span>
                  )}
                  {src.note && (
                    <span className="text-[#8C7A70]">
                      ({src.note})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 7. KEEP READING: 3 Genuinely Related Articles */}
        <section className="pt-12 border-t border-[#EAE3D9]">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EAE3D9]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#BA7D70]">
                Curated Next
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2A211D] font-medium mt-0.5">
                KEEP READING
              </h3>
            </div>
            <button
              onClick={() => onNavigateCategory(article.category)}
              className="text-xs font-sans uppercase tracking-wider text-[#66564D] hover:text-[#2A211D] flex items-center gap-1 cursor-pointer font-medium"
            >
              More in {article.category}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalRelated.map((rel) => (
              <ArticleCard
                key={rel.id}
                article={rel}
                variant="compact"
                onSelect={(slug) => onSelectArticle(slug)}
              />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};
