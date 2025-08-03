// export const imgBase = 'https://backoffice.opompos.site/storage/'
export const imgBase = 'https://opom-pos-laravel.up.railway.app/storage/';
// export const base = 'https://backoffice.opompos.site/api/v1/'
export const base = 'https://ed38c55d1fdd.ngrok-free.app/api/v1/'
// export const base = "https://opom-pos-laravel.up.railway.app/api/v1/";

export const API = {
  products: base + 'products',
  categories: base + 'categories',
  brands: base + 'brands',
  manager_products: base + 'manager_products',
  order: base + 'orders/checkout',
  staffs: base + 'all_staff',
  customers: base + 'customers',
  paymentMethods: base + 'payments',
  orderHistory: base + 'orders',

  // Sale Report APIs
  orders: base + 'orders',
  orders_month: base + 'orders_month',
  total_amount: base + 'total_amount',
  week_gain: base + 'week_gain',
  weekly_top_sale: base + 'get_weekly_top_sale_items',
  monthly_top_sale: base + 'get_monthly_top_sale_items',
  recentSale: base + 'orders_day',
  totalDay: base + 'total_day',
  totalGain: base + 'total_gain',

  // PDF Download APIs
  download_sale_reports: base + 'download/top_lower_sale_reports',
  customerDetail: base + 'customers',
};
