export interface Subscription {
  _id?: string;
  productId: string;
  name: string; // e.g., "Netflix Premium 3 Months"
  duration: number; // in months
  durationType: 'days' | 'months' | 'years';
  price: number;
  originalPrice?: number;
  features: string[];
  description: string;
  popular: boolean;
  promotion: boolean;
  badge?: string;
  active: boolean;
  maxUsers?: number;
  quality?: string; // e.g., "4K", "HD", "SD"
  devices?: number; // number of simultaneous devices
  downloadable?: boolean;
  adsSupported?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductWithSubscriptions {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  color: string;
  popular: boolean;
  promotion: boolean;
  badge: string;
  active: boolean;
  subscriptions: Subscription[];
  createdAt: string;
  updatedAt: string;
}