import { useQuery } from "@tanstack/react-query";
import Axios from "../api-config";
import { API } from "../constants/api";

const getBrands = async () => {
    const res = await Axios.get(API.brands);
    return res.data
}

export const useFetchBrands = <T>() => {
    return useQuery<T>({
        queryKey: ['brands'],
        queryFn: getBrands
    })
}