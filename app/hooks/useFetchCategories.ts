import { useQuery } from "@tanstack/react-query";
import Axios from "../api-config";
import { API } from "../constants/api";

const getCategories = async () => {
    const res = await Axios.get(API.categories);
    return res.data.category
}

export const useFetchCategories = <T>() => {
    return useQuery<T>({
        queryKey: ['categories'],
        queryFn: getCategories
    })
}