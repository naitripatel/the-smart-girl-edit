export type Category = 'Beauty' | 'Style' | 'Money' | 'Digital' | 'Life';

export interface SmartGirlCheckItem {
  text: string;
  detail?: string;
  symbol?: string;
}

export interface SmartGirlCheck {
  title: string;
  subtitle?: string;
  type?: 'buy' | 'click' | 'trend' | 'spend' | 'cart' | 'habit' | 'skincare' | 'wardrobe' | 'verify';
  typeSymbol?: string;
  items: SmartGirlCheckItem[];
}

export interface SmartGirlVerdict {
  title: string;
  summary: string;
  takeaway: string;
  doTry: string;
  doSkip: string;
  smartRule: string;
}

export interface SupportingImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ArticleSource {
  title: string;
  publication?: string;
  url?: string;
  note?: string;
}

export interface SectionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface SectionVideo {
  title: string;
  url: string;
  thumbnail?: string;
  description?: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string[]; // short paragraphs
  pullQuote?: string;
  smartTip?: {
    title?: string;
    text: string;
  };
  worthKnowing?: {
    title?: string;
    text: string;
  };
  creatorCornerNote?: {
    quote: string;
    analysis: string;
  };
  bulletPoints?: string[];
  practicalExamples?: {
    situation: string;
    solution: string;
  }[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
  image?: SectionImage;
  videoBlock?: SectionVideo;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface ArticleSEO {
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  canonicalSlug: string;
  searchIntent?: 'Informational' | 'Informational / commercial investigation' | 'Informational / problem-solving';
  faq?: {
    question: string;
    answer: string;
  }[];
}

export interface Article {
  id: string;
  slug: string;
  aliasSlugs?: string[];
  title: string;
  category: Category;
  subcategory: string;
  excerpt: string;
  dek: string;
  introduction?: string[];
  author: ArticleAuthor;
  publicationDate: string;
  readingTime: string;
  heroImage: string;
  heroImageAlt: string;
  supportingImages: SupportingImage[];
  videoUrl?: string;
  videoTitle?: string;
  videoThumbnail?: string;
  videoStatus?: 'verified' | 'coming-soon';
  sections: ArticleSection[];
  smartGirlCheck: SmartGirlCheck;
  smartGirlVerdict: SmartGirlVerdict;
  relatedArticleIds: string[];
  tags: string[];
  sources?: ArticleSource[];
  seo: ArticleSEO;
  moodTag?: 'glow-up' | 'money-smart' | 'find-style' | 'digital-ease' | 'life-together';
  isTrending?: boolean;
  isFeatured?: boolean;
  isCreatorCorner?: boolean;
  creatorCornerSnippet?: {
    quote: string;
    creatorContext: string;
    realityCheck: string;
  };
}

export interface CategoryMeta {
  id: Category;
  title: string;
  symbol: string;
  tagline: string;
  description: string;
  coverImage: string;
  accentColor: string;
  featuredArticleId: string;
  smartCheckTitle: string;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    primaryKeyword: string;
  };
}
