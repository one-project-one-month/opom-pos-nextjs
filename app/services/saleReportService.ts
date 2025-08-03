import { number } from 'zod';
import Axios from '../api-config';
import { API } from '../constants/api';

export interface SaleReport {
  id: string;
  order_number: string;
  user_id: number;
  total: number;
  payment_id: string | null;
  customer_id: string | null;
  paid_amount: number;
  change_amount: number;
  created_at: string;
  updated_at: string;
  items: [
    {
      id: number;
      order_id: number;
      product_id: number;
      quantity: number;
      price: number;
      total: number;
      created_at: string;
      updated_at: string;
    }
  ],
  user: {
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
  customer: any;
}

export interface SaleReportResponse {
  current_page: number;
  data: SaleReport[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  user_names?: string[];
  customer_names?: (string | null)[];
}
export interface SaleReportResponseNew {
  orders: SaleReportResponse
}

export interface WeeklyGain {
  total_cost: number;
  total_price: number;
  gain: number;
}

export interface TotalAmount {
  total_amount: number;
}

export interface TotalGainByMonthly {
  total_gain: number
}

export interface TopSaleItem {
  product_id: number;
  total_quantity: string;
  price: number;
  total: string;
  product: {
    id: number;
    name: string;
    sku: number;
    price: number;
    const_price: number;
    stock: number;
    brand_id: number;
    category_id: number;
    dis_percent: number;
    photo: string | null;
    expired_at: string | null;
    created_at: string;
    updated_at: string;
  } | null;
}

export interface TopSaleResponse {
  current_page: number;
  data: TopSaleItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

class SaleReportService {
  // Get all orders with pagination
  async getOrders(page: number = 1): Promise<SaleReportResponseNew> {
    try {
      const response = await Axios.get(`/orders?page=${page}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      // Log more details about the error
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      }
      // Return empty response on error
      return {
        current_page: 1,
        data: [],
        first_page_url: '',
        from: 0,
        last_page: 1,
        last_page_url: '',
        links: [],
        next_page_url: null,
        path: '',
        per_page: 5,
        prev_page_url: null,
        to: 0,
        total: 0
      };
    }
  }

  // Get monthly orders
  async getMonthlyOrders(page: number = 1): Promise<SaleReportResponseNew> {
    try {
      const response = await Axios.get(`/orders_week?page=${page}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching monthly orders:', error);
      // Log more details about the error
      if (error.response) {
        console.error('Error status:', error.response.status);
        console.error('Error data:', error.response.data);
      }
      // Return empty response on error
      return {
        current_page: 1,
        data: [],
        first_page_url: '',
        from: 0,
        last_page: 1,
        last_page_url: '',
        links: [],
        next_page_url: null,
        path: '',
        per_page: 5,
        prev_page_url: null,
        to: 0,
        total: 0
      };
    }
  }

  // Get total amount
  async getTotalAmount(): Promise<TotalAmount> {
    try {
      const response = await Axios.get('/total_amount');
      return response.data;
    } catch (error) {
      console.error('Error fetching total amount:', error);
      return { total_amount: 0 };
    }
  }
  // Get total gain Monthly
  async getGainByMonthly(): Promise<TotalGainByMonthly> {
    try {
      const response = await Axios.get(API.totalGain);
      return response.data;
    } catch (error) {
      console.error('Error fetching total amount:', error);
      return { total_gain: 0 };
    }
  }

  // Get weekly revenue/gain
  async getWeeklyGain(): Promise<WeeklyGain> {
    try {
      const response = await Axios.get('/week_gain');
      return response.data;
    } catch (error) {
      console.error('Error fetching weekly gain:', error);
      return { total_cost: 0, total_price: 0, gain: 0 };
    }
  }

  // Get weekly top selling items
  async getWeeklyTopSale(page: number = 1): Promise<TopSaleResponse> {
    try {
      const response = await Axios.get(`/get_weekly_top_sale_items?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching weekly top sale items:', error);
      return {
        current_page: 1,
        data: [],
        first_page_url: '',
        from: 0,
        last_page: 1,
        last_page_url: '',
        links: [],
        next_page_url: null,
        path: '',
        per_page: 5,
        prev_page_url: null,
        to: 0,
        total: 0
      };
    }
  }

  // Get monthly top selling items
  async getMonthlyTopSale(page: number = 1): Promise<TopSaleResponse> {
    try {
      const response = await Axios.get(`/get_monthly_top_sale_items?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly top sale items:', error);
      return {
        current_page: 1,
        data: [],
        first_page_url: '',
        from: 0,
        last_page: 1,
        last_page_url: '',
        links: [],
        next_page_url: null,
        path: '',
        per_page: 5,
        prev_page_url: null,
        to: 0,
        total: 0
      };
    }
  }

  // Download PDF report
  async downloadSaleReportsPDF(): Promise<Blob> {
    try {
      const response = await Axios.get('/download/top_lower_sale_reports', {
        responseType: 'blob', // Important: Set response type to blob for file downloads
        headers: {
          'Accept': 'application/pdf'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error downloading PDF report:', error);
      throw new Error('Failed to download PDF report');
    }
  }
}



export const saleReportService = new SaleReportService();
