import React, { useState, useEffect } from 'react';
import { Category } from './types';
import { ARTICLES } from './data/articles';
import { CATEGORIES } from './data/categories';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AboutModal } from './components/AboutModal';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { CreatorCornerSection } from './components/CreatorCornerSection';
import { NewsletterSection } from './components/NewsletterSection';
import { ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';
import { SmartImage } from './components/SmartImage';
import {
  updateSEO,
  getHomeStructuredData,
  getArticleStructuredData,
  getCategoryStructuredData,
} from './utils/seo';

type ViewMode = 'home' | 'category' | 'article' | 'creator-corner';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  // Helper to resolve an article by slug, id, canonicalSlug, or aliasSlugs
  const resolveArticle = (input: string) => {
    const raw = input.trim().replace(/^#\/?/, '').replace(/^\/+/, '');
    const clean = raw.replace(/^(beauty|style|money|digital|life|article)\//i, '');
    return ARTICLES.find(
      (a) =>
        a.slug === clean ||
        a.id === clean ||
        a.slug === raw ||
        a.id === raw ||
        a.seo?.canonicalSlug === clean ||
        a.seo?.canonicalSlug === raw ||
        a.aliasSlugs?.includes(clean) ||
        a.aliasSlugs?.includes(raw)
    );
  };

  // Sync hash routing and update SEO metadata
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim();

      if (!rawHash || rawHash === '') {
        setViewMode('home');
        setSelectedCategory(null);
        setSelectedArticleId(null);
        updateSEO({
          title: 'The Smart Girl Edit — Be Smarter About the Things You Love',
          description:
            'A modern editorial lifestyle publication for women in their 20s covering beauty, personal style, money management, digital life, and smarter everyday choices.',
          canonicalPath: '/',
          ogType: 'website',
          structuredData: getHomeStructuredData(),
        });
      } else if (rawHash.startsWith('category/')) {
        const cat = rawHash.split('/')[1] as Category;
        if (['Beauty', 'Style', 'Money', 'Digital', 'Life'].includes(cat)) {
          setViewMode('category');
          setSelectedCategory(cat);
          setSelectedArticleId(null);
          const meta = CATEGORIES[cat];
          const title = meta?.seo?.metaTitle || `${cat} — The Smart Girl Edit`;
          const description =
            meta?.seo?.metaDescription ||
            `Explore ${cat} guides, thoughtful curation, and practical advice on The Smart Girl Edit.`;
          updateSEO({
            title,
            description,
            canonicalPath: `/category/${cat}`,
            ogType: 'website',
            image: meta?.coverImage,
            structuredData: getCategoryStructuredData({
              categoryName: cat,
              categoryDescription: description,
              url: `https://thesmartgirledit.com/category/${cat}`,
            }),
          });
        }
      } else if (rawHash === 'creator-corner') {
        setViewMode('creator-corner');
        setSelectedCategory(null);
        setSelectedArticleId(null);
        const title = 'Creator Corner: Influencer Culture | The Smart Girl Edit';
        const description =
          'Deconstructing viral influencer recommendations, affiliate links, and the psychology behind modern online commerce. Smart analysis for conscious consumers.';
        updateSEO({
          title,
          description,
          canonicalPath: '/creator-corner',
          ogType: 'website',
          structuredData: getCategoryStructuredData({
            categoryName: 'Creator Corner',
            categoryDescription: description,
            url: 'https://thesmartgirledit.com/creator-corner',
          }),
        });
      } else {
        // Check if it's an article (e.g. article/slug or beauty/slug or directly slug)
        const matched = resolveArticle(rawHash);
        if (matched) {
          setViewMode('article');
          setSelectedArticleId(matched.id);
          setSelectedCategory(matched.category);
          const title = matched.seo?.metaTitle || `${matched.title} — The Smart Girl Edit`;
          const description = matched.seo?.metaDescription || matched.dek;
          const canonicalPath = `/article/${matched.slug}`;
          updateSEO({
            title,
            description,
            canonicalPath,
            ogType: 'article',
            image: matched.heroImage,
            imageAlt: matched.heroImageAlt,
            publishedTime: matched.publicationDate,
            authorName: matched.author?.name,
            structuredData: getArticleStructuredData({
              title: matched.title,
              description,
              url: `https://thesmartgirledit.com${canonicalPath}`,
              image: `https://thesmartgirledit.com${matched.heroImage}`,
              datePublished: matched.publicationDate,
              authorName: matched.author?.name,
              authorRole: matched.author?.role,
              category: matched.category,
            }),
          });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateHome = () => {
    window.location.hash = '';
    setViewMode('home');
    setSelectedCategory(null);
    setSelectedArticleId(null);
    updateSEO({
      title: 'The Smart Girl Edit — Be Smarter About the Things You Love',
      description:
        'A modern editorial lifestyle publication for women in their 20s covering beauty, personal style, money management, digital life, and smarter everyday choices.',
      canonicalPath: '/',
      ogType: 'website',
      structuredData: getHomeStructuredData(),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateCategory = (category: Category) => {
    window.location.hash = `category/${category}`;
    setViewMode('category');
    setSelectedCategory(category);
    setSelectedArticleId(null);
    const meta = CATEGORIES[category];
    const title = meta?.seo?.metaTitle || `${category} — The Smart Girl Edit`;
    const description =
      meta?.seo?.metaDescription ||
      `Explore ${category} guides, thoughtful curation, and practical advice on The Smart Girl Edit.`;
    updateSEO({
      title,
      description,
      canonicalPath: `/category/${category}`,
      ogType: 'website',
      image: meta?.coverImage,
      structuredData: getCategoryStructuredData({
        categoryName: category,
        categoryDescription: description,
        url: `https://thesmartgirledit.com/category/${category}`,
      }),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateArticle = (slugOrId: string) => {
    const art = resolveArticle(slugOrId);
    const targetSlug = art ? art.slug : slugOrId;
    window.location.hash = `article/${targetSlug}`;
    setViewMode('article');
    setSelectedArticleId(art ? art.id : slugOrId);
    if (art) {
      setSelectedCategory(art.category);
      const title = art.seo?.metaTitle || `${art.title} — The Smart Girl Edit`;
      const description = art.seo?.metaDescription || art.dek;
      const canonicalPath = `/article/${art.slug}`;
      updateSEO({
        title,
        description,
        canonicalPath,
        ogType: 'article',
        image: art.heroImage,
        imageAlt: art.heroImageAlt,
        publishedTime: art.publicationDate,
        authorName: art.author?.name,
        structuredData: getArticleStructuredData({
          title: art.title,
          description,
          url: `https://thesmartgirledit.com${canonicalPath}`,
          image: `https://thesmartgirledit.com${art.heroImage}`,
          datePublished: art.publicationDate,
          authorName: art.author?.name,
          authorRole: art.author?.role,
          category: art.category,
        }),
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateCreatorCorner = () => {
    window.location.hash = 'creator-corner';
    setViewMode('creator-corner');
    setSelectedCategory(null);
    setSelectedArticleId(null);
    const title = 'Creator Corner: Influencer Culture | The Smart Girl Edit';
    const description =
      'Deconstructing viral influencer recommendations, affiliate links, and the psychology behind modern online commerce. Smart analysis for conscious consumers.';
    updateSEO({
      title,
      description,
      canonicalPath: '/creator-corner',
      ogType: 'website',
      structuredData: getCategoryStructuredData({
        categoryName: 'Creator Corner',
        categoryDescription: description,
        url: 'https://thesmartgirledit.com/creator-corner',
      }),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentArticle = ARTICLES.find((a) => a.id === selectedArticleId);
  const creatorArticles = ARTICLES.filter((a) => a.isCreatorCorner);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2A211D]">
      {/* Top Navigation */}
      <Header
        currentCategory={selectedCategory}
        onNavigateHome={navigateHome}
        onNavigateCategory={navigateCategory}
        onNavigateCreatorCorner={navigateCreatorCorner}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main View Switching */}
      <main className="flex-1">
        {viewMode === 'home' && (
          <HomePage
            articles={ARTICLES}
            onSelectArticle={navigateArticle}
            onNavigateCategory={navigateCategory}
            onNavigateCreatorCorner={navigateCreatorCorner}
          />
        )}

        {viewMode === 'category' && selectedCategory && (
          <CategoryPage
            category={selectedCategory}
            articles={ARTICLES}
            onSelectArticle={navigateArticle}
            onNavigateHome={navigateHome}
            onNavigateCategory={navigateCategory}
          />
        )}

        {viewMode === 'article' && currentArticle && (
          <ArticlePage
            article={currentArticle}
            allArticles={ARTICLES}
            onSelectArticle={navigateArticle}
            onNavigateCategory={navigateCategory}
            onNavigateHome={navigateHome}
          />
        )}

        {viewMode === 'creator-corner' && (
          <div className="bg-[#FAF7F2] min-h-screen">
            {/* Header */}
            <section className="pt-10 pb-16 border-b border-[#EAE3D9] bg-[#F4EFEA]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                  onClick={navigateHome}
                  className="text-xs uppercase tracking-wider text-[#8C7A70] hover:text-[#2A211D] flex items-center gap-1 cursor-pointer font-sans mb-4"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </button>
                <div className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-[#BA7D70] font-semibold mb-2">
                  Special Column
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#2A211D] tracking-tight">
                  CREATOR CORNER
                </h1>
                <p className="font-serif italic text-xl sm:text-2xl text-[#66564D] mt-2 max-w-3xl">
                  Deconstructing influencer recommendations, viral haul culture, and the economics of online taste.
                </p>
                <p className="font-sans text-sm sm:text-base text-[#66564D] max-w-2xl mt-4 leading-relaxed">
                  Every week, creators tell millions of young women what to wear, apply to their faces,
                  and buy on impulse. Creator Corner investigates the algorithms, affiliate payouts,
                  and psychology behind modern consumer influence.
                </p>
              </div>
            </section>

            {/* Articles in Creator Corner */}
            <section className="py-16 sm:py-20 border-b border-[#EAE3D9]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {creatorArticles.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => navigateArticle(article.slug || article.id)}
                      className="group bg-[#FAF7F2] border border-[#EAE3D9] p-6 flex flex-col justify-between hover:border-[#BA7D70] hover:shadow-sm transition-all cursor-pointer"
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
                        <div className="flex items-center gap-2 text-[11px] text-[#8C7A70] uppercase tracking-wider mb-2">
                          <span className="font-semibold text-[#BA7D70]">{article.category}</span>
                          <span>·</span>
                          <span>{article.readingTime}</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#2A211D] group-hover:text-[#BA7D70] transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#66564D] mt-2 line-clamp-3 leading-relaxed font-sans">
                          {article.dek}
                        </p>
                        {article.creatorCornerSnippet && (
                          <div className="mt-4 p-3 bg-[#F2EDE5] border-l-2 border-[#BA7D70] text-xs font-serif italic text-[#4A3D36]">
                            &ldquo;{article.creatorCornerSnippet.quote}&rdquo;
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#EAE3D9] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#2A211D] group-hover:text-[#BA7D70] transition-colors">
                        <span>Read Investigation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <NewsletterSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={navigateHome}
        onNavigateCategory={navigateCategory}
        onOpenAbout={() => setAboutOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={navigateArticle}
      />

      {/* About & Standards Modal */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
