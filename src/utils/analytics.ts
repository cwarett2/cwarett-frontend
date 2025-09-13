// Analytics and tracking utilities

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Google Analytics 4 tracking
export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track page views
export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title,
    });
  }
};

// E-commerce tracking
export const trackPurchase = (transactionId: string, items: any[], value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'TND',
      items: items.map(item => ({
        item_id: item._id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }
};

// Track cart events
export const trackAddToCart = (item: any) => {
  trackEvent({
    action: 'add_to_cart',
    category: 'ecommerce',
    label: item.name,
    value: item.price,
  });
};

export const trackRemoveFromCart = (item: any) => {
  trackEvent({
    action: 'remove_from_cart',
    category: 'ecommerce',
    label: item.name,
    value: item.price,
  });
};

// Track user interactions
export const trackContactForm = (service: string) => {
  trackEvent({
    action: 'contact_form_submit',
    category: 'engagement',
    label: service,
  });
};

export const trackServiceView = (serviceName: string, category: string) => {
  trackEvent({
    action: 'service_view',
    category: 'engagement',
    label: serviceName,
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}