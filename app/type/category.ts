import { Product } from "./product";

export type Category = {
    id: number;
    name: string;
    photo: string;
    product: Product[];
}