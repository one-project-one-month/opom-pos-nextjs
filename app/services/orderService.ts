import { API } from '@/app/constants/api';
import Axios from '@/app/api-config';

export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  paid_amount: number;
  payment_id: number;
  customer_id: string | null;
}

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    try {
      const response = await Axios.post(API.order, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
};
