// Application constants and configuration
export const APP_CONFIG = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://backend-cwarett.onrender.com/api',
  
  // Contact Information
  CONTACT: {
    PHONE: import.meta.env.VITE_CONTACT_PHONE || '+216 XX XXX XXX',
    EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'contact@cwarett.tn',
    WHATSAPP: import.meta.env.VITE_WHATSAPP_NUMBER || '+216 XX XXX XXX',
  },
  
  // Social Media
  SOCIAL: {
    FACEBOOK: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61576451488040',
    INSTAGRAM: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/cwarett_',
  },
  
  // Site Configuration
  SITE: {
    URL: import.meta.env.VITE_SITE_URL || 'https://cwarett1.netlify.app',
    NAME: import.meta.env.VITE_SITE_NAME || 'CWARETT.TN',
    DESCRIPTION: 'Comptes Premium Netflix, ChatGPT & Plus | Tunisie',
  },
  
  // Business Information
  BUSINESS: {
    NAME: 'CWARETT.TN',
    LOCATION: 'Centre-ville, Tunis, Tunisie',
    HOURS: 'Disponible 24h/24, 7j/7',
  }
} as const;

// SEO Meta Tags
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'CWARETT.TN - Comptes Premium Netflix, ChatGPT & Plus | Tunisie',
  DEFAULT_DESCRIPTION: 'Achetez vos comptes premium Netflix, ChatGPT, Spotify et Disney+ aux meilleurs prix en Tunisie. Livraison rapide, support 24/7 et garantie incluse.',
  KEYWORDS: 'Netflix premium, ChatGPT plus, Spotify premium, Disney+, comptes premium tunisie, services numériques',
  AUTHOR: 'CWARETT.TN',
  TWITTER_HANDLE: '@CWARETT.TN_tn',
} as const;