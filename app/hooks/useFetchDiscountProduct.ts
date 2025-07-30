import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Axios from '../api-config'
import { API, base } from '../constants/api'

interface CancelDiscountInput {
  product: any
}

interface Params {
  page?: number
  pageSize?: number
  status?: string
  category_name?: string
}

const getDiscountProducts = async (params: Params) => {
  const res = await Axios.get(API.manager_products, { params })

  return res.data.products
}

export const useFetchDiscountProducts = <T>(params: Params) => {
  console.log('Fetching discount products with params:', params)
  return useQuery<T>({
    queryKey: ['products', params],
    queryFn: () => getDiscountProducts(params),
  })
}

export const useDiscountAddMutation = ({
  onSuccessCallback,
  onErrorCallback,
  params,
}: // params,
{
  onSuccessCallback: () => void
  onErrorCallback?: (error: any) => void
  params: any
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

      const res = await Axios.post(`${API.products}/${product.id}`, updatedData)

      return res.data
    },
    onMutate: async ({ product, discountPercent }) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })

      const previousProducts = queryClient.getQueryData<any>([
        'products',
        params,
      ])

      // Optimistically update
      queryClient.setQueryData(['products', params], (old: any) => {
        if (!old || !old.data) return old

        return {
          ...old,
          data: old.data.map((p: any) =>
            p.id === product.id ? { ...p, dis_percent: discountPercent } : p
          ),
        }
      })

      return { previousProducts }
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
  params,
}: {
  onSuccessCallback: () => void
  onErrorCallback?: (error: any) => void
  params: any
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

      const res = await Axios.post(`${API.products}/${product.id}`, updatedData)

      return res.data
    },

    onMutate: async ({ product }) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })

      const previousProducts = queryClient.getQueryData<any>([
        'products',
        params,
      ])

      // ✅ Correct shape: update inside `data` field
      queryClient.setQueryData<any>(['products', params], (old: any) => {
        if (!old || !old.data) return old

        return {
          ...old,
          data: old.data.map((p: any) =>
            p.id === product.id ? { ...p, dis_percent: 0 } : p
          ),
        }
      })

      return { previousProducts }
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
