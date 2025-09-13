import { useState, useEffect } from 'react';
import axios from 'axios';
import { APP_CONFIG } from '@/config/constants';

const API_BASE_URL = APP_CONFIG.API_BASE_URL;

export interface Order {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  service: string;
  message: string;
  status: 'en_attente' | 'en_cours' | 'terminee' | 'annulee';
  priority: 'basse' | 'normale' | 'haute' | 'urgente';
  createdAt: string;
  updatedAt: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders`);
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      await fetchOrders(); // Refresh the list
      return response.data;
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const updateOrder = async (id: string, orderData: Partial<Order>) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${id}`, orderData);
      await fetchOrders(); // Refresh the list
      return response.data;
    } catch (err) {
      console.error('Error updating order:', err);
      throw err;
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
      await fetchOrders(); // Refresh the list
    } catch (err) {
      console.error('Error deleting order:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { 
    orders, 
    loading, 
    error, 
    refetch: fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder
  };
};