import { SEO_CONFIG } from '@/config/constants';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const updateSEO = (data: SEOData = {}) => {
  // Update title
  const title = data.title 
    ? `${data.title} | ${SEO_CONFIG.DEFAULT_TITLE}`
    : SEO_CONFIG.DEFAULT_TITLE;
  document.title = title;

  // Update meta description
  const description = data.description || SEO_CONFIG.DEFAULT_DESCRIPTION;
  updateMetaTag('description', description);

  // Update keywords
  const keywords = data.keywords || SEO_CONFIG.KEYWORDS;
  updateMetaTag('keywords', keywords);

  // Update Open Graph tags
  updateMetaTag('og:title', title, 'property');
  updateMetaTag('og:description', description, 'property');
  updateMetaTag('og:url', data.url || window.location.href, 'property');
  
  if (data.image) {
    updateMetaTag('og:image', data.image, 'property');
  }

  // Update Twitter tags
  updateMetaTag('twitter:title', title, 'name');
  updateMetaTag('twitter:description', description, 'name');
  
  if (data.image) {
    updateMetaTag('twitter:image', data.image, 'name');
  }

  // Update canonical URL
  updateCanonicalUrl(data.url || window.location.href);
};

const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.content = content;
};

const updateCanonicalUrl = (url: string) => {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  
  element.href = url;
};

// Structured data for better SEO
export const generateStructuredData = (type: 'Organization' | 'Product' | 'Service', data: any) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseData,
        name: SEO_CONFIG.DEFAULT_TITLE,
        description: SEO_CONFIG.DEFAULT_DESCRIPTION,
        url: window.location.origin,
        logo: `${window.location.origin}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+216-XX-XXX-XXX',
          contactType: 'customer service',
          availableLanguage: ['French', 'Arabic'],
        },
        sameAs: [
          'https://www.facebook.com/profile.php?id=61576451488040',
          'https://www.instagram.com/cwarett_',
        ],
      };
    
    case 'Product':
    case 'Service':
      return {
        ...baseData,
        name: data.name,
        description: data.description,
        image: data.image,
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'TND',
          availability: 'https://schema.org/InStock',
        },
      };
    
    default:
      return baseData;
  }
};

export const injectStructuredData = (data: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }
  
  document.head.appendChild(script);
};