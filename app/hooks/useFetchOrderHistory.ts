import { useQuery } from "@tanstack/react-query";
import Axios from "../api-config";
import { API } from "../constants/api";
import page from "../(root)/(staff)/order-history/page";

const getOrderHistory = async ({page = 1, pageSize = 5}) => {
    const res = await Axios.get(API.orderHistory,{
        params: {
            page,
            pageSize
        }
    });
    console.log(res.data)
    return res.data
}

export const useFetchOrderHistory = <T>(page: number = 1, pageSize: number = 5) => {
    return useQuery<T>({
        queryKey: ['orderHistory', page, pageSize],
        queryFn: () => getOrderHistory({ page, pageSize }),
        
    })
}