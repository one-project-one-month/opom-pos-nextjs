// const base = "https://backoffice.opompos.site/api/v1/"
const base = "https://d8f12f513738.ngrok-free.app/api/v1/"
export const API = {
    products: base + 'products',
    categories: base + 'categories',
    brands: base + 'brands',
    manager_products: base + 'manager_products',
    // manager_products: base + 'products',
    order: base + 'orders/checkout',
    
    // Sale Report APIs
    orders: base + 'orders',
    orders_month: base + 'orders_month',
    total_amount: base + 'total_amount',
    week_gain: base + 'week_gain',
    weekly_top_sale: base + 'get_weekly_top_sale_items',
    monthly_top_sale: base + 'get_monthly_top_sale_items',
    
    // PDF Download APIs
    download_sale_reports: base + 'download/top_lower_sale_reports',
}
