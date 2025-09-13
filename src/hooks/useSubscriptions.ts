import { useState, useEffect } from 'react';
import axios from 'axios';
import { Subscription } from '@/types/subscription';
import { APP_CONFIG } from '@/config/constants';

const API_BASE_URL = APP_CONFIG.API_BASE_URL;

export const useSubscriptions = (productId?: string) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const url = productId 
        ? `${API_BASE_URL}/subscriptions/product/${productId}`
        : `${API_BASE_URL}/subscriptions`;
      const response = await axios.get(url);
      setSubscriptions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch subscriptions');
      console.error('Error fetching subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const createSubscription = async (subscriptionData: Omit<Subscription, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/subscriptions`, subscriptionData);
      await fetchSubscriptions();
      return response.data;
    } catch (err) {
      console.error('Error creating subscription:', err);
      throw err;
    }
  };

  const updateSubscription = async (id: string, subscriptionData: Partial<Subscription>) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/subscriptions/${id}`, subscriptionData);
      await fetchSubscriptions();
      return response.data;
    } catch (err) {
      console.error('Error updating subscription:', err);
      throw err;
    }
  };

  const deleteSubscription = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/subscriptions/${id}`);
      await fetchSubscriptions();
    } catch (err) {
      console.error('Error deleting subscription:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [productId]);

  return { 
    subscriptions, 
    loading, 
    error, 
    refetch: fetchSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription
  };
};