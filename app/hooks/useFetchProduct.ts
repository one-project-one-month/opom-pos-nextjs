import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'
import { API } from '../constants/api'

const getProducts = async (params?: { name?: string; category?: string }) => {
  try {
    const queryParams = new URLSearchParams()
    if (params?.name) queryParams.append('name', params.name)
    if (params?.category) queryParams.append('category_name', params.category)

    const queryString = queryParams.toString()
    const url = `${API.products}${queryString ? `?${queryString}` : ''}`

    const res = await Axios.get(url)

    return res.data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const useFetchProducts = <T>(params: {
  name?: string
  category?: string
}) => {
  return useQuery<T>({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  })
}

const getProductsById = async (id: string | number) => {
  const res = await Axios.get(`${API.products}/${id}`)
  return res.data.product.data
}

export const useFetchProductsById = <T>(id: string | number) => {
  return useQuery<T>({
    queryKey: ['products', id],
    queryFn: () => getProductsById(id),
  })
}

const createProducts = async (data: FormData, id?: number) => {
  const url = id ? `${API.products}/${id}` : API.products
  const res = await Axios.post(url, data)
  return res
}

export const useCreateProduct = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: ({ formData, id }: { formData: FormData; id?: number }) =>
      createProducts(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['manager-products', 'products'],
      })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    },
  })
}

const deleteProduct = async (id: number) => {
  const url = `${API.products}/${id}`
  const res = await Axios.delete(url)
  return res
}

export const useDeletProduct = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-product'],
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['manager-products', 'products'],
      })

      if (onSuccessCallback) {
        onSuccessCallback()
      }
    },
  })
}

interface ManagerProductParams {
  page?: number
  pageSize?: number
  status?: string
  category_name?: string
}

const getManagerProducts = async (params?: ManagerProductParams) => {
  const res = await Axios.get(API.manager_products, { params })
  return res.data
}

export const useFetchManagerProducts = <T>(params?: ManagerProductParams) => {
  return useQuery<T>({
    queryKey: ['manager-products', params],
    queryFn: () => getManagerProducts(params),
  })
}
