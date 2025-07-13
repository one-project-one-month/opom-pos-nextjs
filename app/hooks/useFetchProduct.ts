import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "../api-config";

const getProducts = async () => {
    const res = await Axios.get('https://backoffice.opompos.site/api/v1/products');
    console.log('Fetched products:', res.data.product.data);
    return res.data.product.data
}

export const useFetchProducts = <T>() => {
    return useQuery<T>({
        queryKey: ['products'],
        queryFn: getProducts
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