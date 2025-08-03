import { useQuery } from "@tanstack/react-query";
import Axios from "../api-config";
import { API } from "../constants/api";

const getRecentSale = async ({page=1, pageSize=5}) => {
    const res = await Axios.get(API.recentSale,{
        params: {
            page,
            pageSize
        }
    });
    return res.data
}

export const useFetchRecentSale = <T>(page:number = 1, pageSize:number = 5) => {
    return useQuery<T>({
        queryKey: ['recentSale', page, pageSize],
        queryFn: () => getRecentSale ({ page, pageSize }),
    })
}