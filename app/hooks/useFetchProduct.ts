import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'

const getProducts = async () => {
  const res = await Axios.get(
    'https://backoffice.opompos.site/api/v1/products',
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  console.log('it works')
  console.log(res.data)

  return res.data
}

const getProductsById = async (id: string | number) => {
  console.log(id)
  const res = await Axios.get(
    `https://backoffice.opompos.site/api/v1/products/${id}`
  )
  console.log('full response', res.data)
  return res.data
}

const getProductsByCategories = async (category: string | null) => {
  const res = await Axios.get(
    `https://backoffice.opompos.site/api/v1/products`,
    {
      params: { category: category },
    }
  )

  return res.data.product.data
}

export const useFetchProducts = <T>(category: string | null) => {
  return useQuery<T>({
    queryKey: ['products', category ?? 'all'],
    queryFn: () =>
      category === null ? getProducts() : getProductsByCategories(category),
  })
}

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
