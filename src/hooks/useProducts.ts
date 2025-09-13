import { useState, useEffect } from 'react';
import axios from 'axios';
import { APP_CONFIG } from '@/config/constants';

const API_BASE_URL = APP_CONFIG.API_BASE_URL;

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  features: string[];
  subscriptions: {
    name: string;
    price: number;
    promotion: boolean;
  }[];
  color: string;
  popular: boolean;
  promotion: boolean;
  badge: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      // Only show active products
      const activeProducts = response.data.filter((product: Product) => product.active);
      setProducts(activeProducts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};