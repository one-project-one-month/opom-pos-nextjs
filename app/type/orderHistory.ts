import { Customer } from "./type";

export type User = {
  id: number;
  name: string;
  role_id: number;
  email: string;
  suspended: number;
  photo: string | null;
  comfirmed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderHistory = {
  id: number;
  order_number: string;
  user_id: number;
  total: number;
  payment_id: number | null;
  customer_id: number | null;
  paid_amount: number;
  change_amount: number;
  created_at: string;
  updated_at: string;
  user: User;
  customer: Customer;
  // replace `any` if customer structure is known
};

export type PaginatedOrderHistoryResponse = {
  current_page: number;
  last_page: number;
  total: number;
  data: OrderHistory[];
  // add total, per_page, etc., if your API includes them
};

export type OrderHistoryApiResponse = {
  orders: PaginatedOrderHistoryResponse;
  user_names: string[];
  customer_names: string[];
};
