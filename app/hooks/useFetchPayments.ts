import { useQuery } from '@tanstack/react-query';
import Axios from '../api-config';
import { API } from '../constants/api';

export interface PaymentMethod {
  id: number;
  method: string;
}

const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    const res = await Axios.get(API.paymentMethods);
    return Array.isArray(res?.data) ? res.data : [];
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

export const useFetchPaymentMethods = () => {
  return useQuery<PaymentMethod[], Error>({
    queryKey: ['payment-methods'],
    queryFn: fetchPaymentMethods,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
