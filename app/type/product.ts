export type Product = {
  id: number;
  name: string;
  sku: number;
  price: number;
  const_price: number;
  stock: number;
  brand_id: number;
  category_id: number;
  photo: File | null;
  expired_at: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ProductsResponse {
  status: boolean;
  message: string;
  products: {
    current_page: number;
    last_page: number;
    data: Product[];
    total: number
  };
  ["count of total products"]: number;
  ["count of out of stock"]: number;
  ["count of low of stock"]: number;
}

export interface CategoriesResponse{
      id: number,
      name: string,
      product: Product[]
}