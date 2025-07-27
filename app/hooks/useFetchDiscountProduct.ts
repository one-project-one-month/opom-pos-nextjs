import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'

const getDiscountProducts = async () => {
  const res = await Axios.get(
    'https://e0c8dfd98f99.ngrok-free.app/api/v1/products',
    {
      headers: {
        Accept: 'application/json',
        // add any other headers you need
      },
    }
  )
  console.log('it works')
  console.log(res.data)
  return res.data.products
}

const getDiscountProductsById = async (id: string | number) => {
  const res = await Axios.get(
    `https://944879313bd5.ngrok-free.app/api/v1/manager_products`,
    {
      params: { id: id },
    }
  )

  return res.data.product.data
}

const getDiscountProductsByCategories = async (category: string | null) => {
  const res = await Axios.get(
    `https://94398ae51084.ngrok-free.app/api/v1/dis_products`,
    {
      params: { category: category },
    }
  )

  console.log(res)

  return res
}

export const useFetchDiscountProducts = <T>(category: string | null) => {
  return useQuery<T>({
    queryKey: ['discount_products', category ?? 'all'],
    queryFn: () =>
      category === null
        ? getDiscountProducts()
        : getDiscountProductsByCategories(category),
  })
}

export const useFetchDiscountProductsById = <T>(id: string | number) => {
  return useQuery<T>({
    queryKey: ['discount_products', id],
    queryFn: () => getDiscountProductsById(id),
  })
}

//call in page

// const {data, error, isSuccess} = useFetchProducts<Products[]>();

//create order mutation
const createDiscount = async ({}) => {
  const res = await Axios.post('', {})
  return res
}

export const useCreateDiscount = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-discount'],
    mutationFn: async ({}) => createDiscount({}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discount_products'] })
    },
  })
}
