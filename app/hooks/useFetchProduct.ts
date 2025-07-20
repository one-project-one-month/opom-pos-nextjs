import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'

const getProducts = async (params? : {name?: string, category?: string}) => {
    try {
        const queryParams = new URLSearchParams();
        if (params?.name) queryParams.append('name', params.name);
        if (params?.category) queryParams.append('category', params.category);

        const queryString = queryParams.toString();
        const url = `https://backoffice.opompos.site/api/v1/products${queryString ? `?${queryString}` : ''}`;

        const res = await Axios.get(url);
        console.log('Fetched products:', res.data.product.data);
        
        return res.data.product.data;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const useFetchProducts = <T>(params: {name?: string, category?: string}) => {
    return useQuery<T>({
        queryKey: ['products', params],
        queryFn: () => getProducts(params),
    })
}

// const getProducts = async () => {
//   const res = await Axios.get('https://backoffice.opompos.site/api/v1/products')

//   return res.data.product.data
// }

const getProductsById = async (id: string | number) => {
  const res = await Axios.get('https://backoffice.opompos.site/api/v1/products')

  return res.data.product.data
}

const getProductsByCategories = async (category: string | null) => {
  console.log(category)
  const res = await Axios.get(
    `https://backoffice.opompos.site/api/v1/products`,
    {
      params: { category: category },
    }
  )

  return res.data.product.data
}

// export const useFetchProducts = <T>(category: string | null) => {
//   return useQuery<T>({
//     queryKey: ['products', category ?? 'all'],
//     queryFn: () =>
//       category === null ? getProducts() : getProductsByCategories(category),
//   })
// }

export const useFetchProductsById = <T>(id: string | number) => {
  return useQuery<T>({
    queryKey: ['products', id],
    queryFn: () => getProductsById(id),
  })
}

//call in page

// const {data, error, isSuccess} = useFetchProducts<Products[]>();

//create order mutation
const createOrder = async ({}) => {
  const res = await Axios.post('', {})
  return res
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: async ({}) => createOrder({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
