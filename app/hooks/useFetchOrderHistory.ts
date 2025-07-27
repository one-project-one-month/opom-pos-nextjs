import { useQuery } from "@tanstack/react-query";
import Axios from "../api-config";
import { API } from "../constants/api";

const getOrderHistory = async () => {
    const res = await Axios.get(API.orderHistory);
    console.log(res.data)
    return res.data
}

export const useFetchOrderHistory = <T>() => {
    return useQuery<T>({
        queryKey: ['orderHistory'],
        queryFn: getOrderHistory
    })
}