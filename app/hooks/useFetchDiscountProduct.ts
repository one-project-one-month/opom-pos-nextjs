import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'

const url = 'https://79403962ac78.ngrok-free.app/api/v1/manager_products'
const token = 'Bearer 271|RKONjOzAdPtZI7Yiw6iisFl1T021oafbvlOsoIeL471b6932'

const getDiscountProducts = async (page: string | number | null) => {
  const res = await Axios.get(
    `${url}?page=${page}`,
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
    // console.log(res)
    // 'https://backoffice.opompos.site/api/v1/products'
  )
  console.log(res)
  return res.data.products.data
}

const getDiscountProductsByCategories = async (category: string | null) => {
  const res = await Axios.get(url, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    params: { category_name: category },
  })

  return res.data.products.data
}

export const useFetchDiscountProducts = <T>(
  category: string | null,
  page: string | number | null
) => {
  return useQuery<T>({
    queryKey: ['products', category ?? 'all', page ?? 1],
    queryFn: () =>
      category === null && page !== null
        ? getDiscountProducts(page)
        : getDiscountProductsByCategories(category),
  })
}
