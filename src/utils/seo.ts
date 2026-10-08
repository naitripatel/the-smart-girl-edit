export interface SEOOptions {
  title: string;
  description: string;
  canonicalPath: string; // e.g. '/' or '/article/skincare-routine-for-your-20s'
  ogType?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  authorName?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = 'The Smart Girl Edit';
const SITE_URL = 'https://thesmartgirledit.com';

export function updateSEO({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  image,
  imageAlt,
  publishedTime,
  authorName,
  noindex = false,
  structuredData,
}: SEOOptions) {
  // 1. Update <title>
  document.title = title;

  // 2. Helper to set or create meta tag
  const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Standard SEO tags
  setMeta('name', 'description', description);
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

  // 4. OpenGraph tags
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:type', ogType);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);

  // Compute canonical URL
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : SITE_URL;
  const canonicalUrl = `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  setMeta('property', 'og:url', canonicalUrl);

  // Canonical Link element
  let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // Image OpenGraph tags
  const defaultImage = `${origin}/src/assets/images/smart_girl_hero_cover_1791477860935.jpg`;
  const resolvedImage = image ? (image.startsWith('http') ? image : `${origin}${image}`) : defaultImage;
  setMeta('property', 'og:image', resolvedImage);
  if (imageAlt) {
    setMeta('property', 'og:image:alt', imageAlt);
  }

  // Article metadata
  if (ogType === 'article') {
    if (publishedTime) {
      setMeta('property', 'article:published_time', publishedTime);
    }
    if (authorName) {
      setMeta('property', 'article:author', authorName);
    }
  }

  // 5. Twitter Card tags
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', resolvedImage);
  if (imageAlt) {
    setMeta('name', 'twitter:image:alt', imageAlt);
  }

  // 6. JSON-LD Structured Data
  let ldJsonScript = document.getElementById('seo-structured-data') as HTMLScriptElement | null;
  if (structuredData) {
    if (!ldJsonScript) {
      ldJsonScript = document.createElement('script');
      ldJsonScript.id = 'seo-structured-data';
      ldJsonScript.type = 'application/ld+json';
      document.head.appendChild(ldJsonScript);
    }
    ldJsonScript.textContent = JSON.stringify(structuredData);
  } else if (ldJsonScript) {
    ldJsonScript.remove();
  }
}

// Structured data builders
export function getHomeStructuredData(siteUrl: string = SITE_URL) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'The Smart Girl Edit',
      url: siteUrl,
      description: 'A modern editorial lifestyle publication for women in their 20s covering beauty, personal style, money management, digital life, and smarter everyday choices.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/#search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'The Smart Girl Edit',
      url: siteUrl,
      logo: `${siteUrl}/src/assets/images/smart_girl_hero_cover_1791477860935.jpg`,
      description: 'Independent lifestyle publication empowering women aged 18–30 to make smarter choices about beauty, style, money, and digital life.',
    },
  ];
}

export function getArticleStructuredData({
  title,
  description,
  url,
  image,
  datePublished,
  authorName,
  authorRole,
  category,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  authorName: string;
  authorRole?: string;
  category: string;
}) {
  let safePublishedDate = '2026-10-08';
  if (datePublished) {
    try {
      const parsed = new Date(datePublished);
      if (!isNaN(parsed.getTime())) {
        safePublishedDate = parsed.toISOString().split('T')[0];
      }
    } catch {
      safePublishedDate = '2026-10-08';
    }
  }

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image: [image],
      datePublished: safePublishedDate,
      dateModified: safePublishedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      author: {
        '@type': 'Person',
        name: authorName,
        jobTitle: authorRole || 'Editorial Contributor',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Smart Girl Edit',
        url: 'https://thesmartgirledit.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://thesmartgirledit.com/src/assets/images/smart_girl_hero_cover_1791477860935.jpg',
        },
      },
      articleSection: category,
      inLanguage: 'en-US',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://thesmartgirledit.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: category,
          item: `https://thesmartgirledit.com/category/${category}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
  ];
}

export function getCategoryStructuredData({
  categoryName,
  categoryDescription,
  url,
}: {
  categoryName: string;
  categoryDescription: string;
  url: string;
}) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${categoryName} — The Smart Girl Edit`,
      description: categoryDescription,
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://thesmartgirledit.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryName,
          item: url,
        },
      ],
    },
  ];
}
