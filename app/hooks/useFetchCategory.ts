import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../api-config";

const getCategories = async () => {
    try {
        const res = await Axios.get(`https://backoffice.opompos.site/api/v1/categories`);
        console.log(res.data.category);
        return res.data.category;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const useFetchCategories = <T>() => {
    return useQuery<T>({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    })
}