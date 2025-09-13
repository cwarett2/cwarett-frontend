import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, generateStructuredData, injectStructuredData } from '@/utils/seo';
import { APP_CONFIG } from '@/config/constants';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export const SEOHead = ({ title, description, keywords, image }: SEOHeadProps) => {
  const location = useLocation();

  useEffect(() => {
    const url = `${APP_CONFIG.SITE.URL}${location.pathname}`;
    
    updateSEO({
      title,
      description,
      keywords,
      image,
      url,
    });

    // Add organization structured data
    const orgData = generateStructuredData('Organization', {});
    injectStructuredData(orgData);
  }, [title, description, keywords, image, location.pathname]);

  return null;
};