import { useState, useEffect } from 'react';
import { useProducts } from './useProducts';

export interface Category {
  slug: string;
  name: string;
  count: number;
}

export const useCategories = () => {
  const { products } = useProducts();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      // Group products by category and count them
      const categoryMap = new Map<string, { name: string; count: number }>();
      
      products.forEach(product => {
        const slug = product.category.toLowerCase().replace(/\s+/g, '-');
        const existing = categoryMap.get(slug);
        
        if (existing) {
          existing.count += 1;
        } else {
          categoryMap.set(slug, {
            name: product.category,
            count: 1
          });
        }
      });

      // Convert to array and sort alphabetically
      const categoriesArray = Array.from(categoryMap.entries()).map(([slug, data]) => ({
        slug,
        name: data.name,
        count: data.count
      })).sort((a, b) => a.name.localeCompare(b.name));

      setCategories(categoriesArray);
    } else {
      setCategories([]);
    }
  }, [products]);

  return { categories };
};