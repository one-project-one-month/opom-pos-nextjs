import { useQuery } from '@tanstack/react-query';
import Axios from '../api-config';
import { API } from '../constants/api';

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const res = await Axios.get(API.customers);
    return res.data['Customer'];
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const useFetchCustomers = () => {
  return useQuery<Customer[], Error>({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
