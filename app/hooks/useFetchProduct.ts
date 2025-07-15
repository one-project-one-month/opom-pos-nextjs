import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../api-config";

const getProducts = async (params? : {name?: string}) => {
    try {
        // Build query string if name is present
        const query = params?.name ? `?name=${encodeURIComponent(params.name)}` : '';
        const res = await Axios.get(`https://backoffice.opompos.site/api/v1/products${query}`);
        return res.data.product.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const useFetchProducts = <T>(params: {name?: string}) => {
    return useQuery<T>({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
    })
}

//call in page

// const {data, error, isSuccess} = useFetchProducts<Products[]>();

//create order mutation
const createOrder = async ({}) => {
    const res = await Axios.post('',{})
    return res
}

export const useCreateOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['create-order'],
        mutationFn: async ({}) => createOrder({}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']})
        }
    })
}