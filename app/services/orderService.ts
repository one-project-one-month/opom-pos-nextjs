import { API } from '@/app/constants/api';
import Axios from '@/app/api-config';

export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  paid_amount: number;
  payment_method: string;
}

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    try {
      const response = await Axios.post(API.ORDER, payload);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
};
