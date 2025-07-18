import { useQuery } from "@tanstack/react-query";
import Axios from "../api-config";
import { API } from "../constants/api";

const getProducts = async () => {
    const res = await Axios.get(API.PRODUCTS);
    return res.data.product.data
}

export const useFetchProducts = <T>() => {
    return useQuery<T>({
        queryKey: ['products'],
        queryFn: getProducts
    })
}