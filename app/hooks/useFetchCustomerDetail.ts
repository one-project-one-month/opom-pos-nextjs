import { useQuery } from '@tanstack/react-query';
import Axios from '../api-config';
import { API } from '../constants/api';
import { Customer } from './useFetchCustomer';

interface Order {
  id: number;
  customer_id: number;
  change_amount: number;
  order_number: string;
  payment_id: number;
  paid_amount: number;
  created_at: Date;
  update_at: Date;
  total: number;
}

export interface CustomerDetail {
  customer_detail: Customer;
  customer_orders: Order[];
}

export const useFetchCustomerDetail = (customerId: string | number) => {
  return useQuery<CustomerDetail, Error>({
    queryKey: ['customer', customerId],
    queryFn: async () => {
      try {
        const response = await Axios.get(`${API.customerDetail}/${customerId}`);
        return response.data; // Adjust based on your API response structure
      } catch (error) {
        console.error('Error fetching customer details:', error);
        throw error;
      }
    },
    enabled: !!customerId, // Only run the query if customerId is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
