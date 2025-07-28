export interface ProductFormValues {
    id?: number;
    sku: number;
    name: string;
    categoryId: number;
    brandId: number;
    stock: number;
    status: string;
    price: number;
    constPrice: number;
    photo?: File | null | undefined;
    expiredDate: string | null;
}