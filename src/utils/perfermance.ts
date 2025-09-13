// Performance optimization utilities

// Lazy load images
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src;
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
        observer.unobserve(img);
      }
    });
  });

  observer.observe(img);
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload hero images
  const heroImages = [
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
  ];

  heroImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimize bundle loading
export const loadChunkOnDemand = async (chunkName: string) => {
  try {
    switch (chunkName) {
      case 'admin':
        return await import('@/pages/Admin');
      case 'checkout':
        return await import('@/pages/Checkout');
      default:
        return null;
    }
  } catch (error) {
    console.error(`Failed to load chunk: ${chunkName}`, error);
    return null;
  }
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};