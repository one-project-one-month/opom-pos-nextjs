export type RecentSale = {
  id: number;
  order_number: string;
  user_id: number;
  customer_id: number | null;
  payment_id: number | null;
  total: number;
  paid_amount: number;
  change_amount: number;
  created_at: string;
  updated_at: string;

  items: {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    total: number;
    created_at: string;
    updated_at: string;
  }[];

  user: {
    id: number;
    name: string;
    suspended: number;
    email: string;
    photo: string | null;
    comfirmed_at: string;
    created_at: string;
    updated_at: string;
  };

  customer: {
    id: number;
    name: string;
    phone: string;
    email: string;
    created_at: string;
    updated_at: string;
  } | null;

  payment: {
    id: number;
    order_id: number | null;
    method: string;
    paid_at: string;
    amount: number | null;
    created_at: string;
    updated_at: string;
    photo: string;
  } | null;
};
export type RecentSaleApiResponse = {
  recent_sales: RecentSale[];
  user_names: string[];
  customer_names: string[];
  current_page: number;
  last_page: number;
  total: number;
  ["count of total products"]: number;
  
};
