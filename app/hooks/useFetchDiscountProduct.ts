import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Axios from '../api-config'
import { API, base } from '../constants/api'

interface CancelDiscountInput {
  product: any
}

const getDiscountProducts = async (page: string | number | null) => {
  const res = await Axios.get(`${API.manager_products}?page=${page}`)
  console.log(res)
  return res.data.products.data
}

const getDiscountProductsByCategories = async (category: string | null) => {
  const res = await Axios.get(API.manager_products, {
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

export const useDiscountAddMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: () => void
  onErrorCallback?: (error: any) => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create_discount'],
    mutationFn: async ({
      product,
      discountPercent,
    }: {
      product: any
      discountPercent: number
    }) => {
      const { sku, ...withoutSku } = product

      const updatedData = {
        ...withoutSku,
        dis_percent: discountPercent,
      }

      console.log('Updated Data:', updatedData)

      const res = await Axios.post(
        `${API.manager_products}/${product.id}`,
        updatedData
      )

      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      onSuccessCallback()
    },
    onError: (error: any) => {
      if (onErrorCallback) {
        onErrorCallback(error)
      } else {
        alert(`Error: ${error?.message || 'Something went wrong'}`)
      }
    },
  })
}

export const useDiscountCancelMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: () => void
  onErrorCallback?: (error: any) => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['cancel_discount'],
    mutationFn: async ({ product }: CancelDiscountInput) => {
      const { sku, ...withoutSku } = product

      const updatedData = {
        ...withoutSku,
        dis_percent: 0,
      }

      console.log('Updated Data for Cancel:', updatedData)
      console.log(`${API.manager_products}/${product.id}`)

      const res = await Axios.post(
        `${API.manager_products}/${product.id}`,
        updatedData
      )

      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      onSuccessCallback()
    },
    onError: (error: any) => {
      if (onErrorCallback) {
        onErrorCallback(error)
      } else {
        alert(`Error: ${error?.message || 'Something went wrong'}`)
      }
    },
  })
}
