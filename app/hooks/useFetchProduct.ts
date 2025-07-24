import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'
import { API } from '../constants/api'

const getProducts = async () => {
  const res = await Axios.get(API.products)
  return res.data.product.data
}

const getProductsById = async (id: string | number) => {
  const res = await Axios.get(`${API.products}/${id}`)
  return res.data.product.data
}

const getProductsByCategories = async (category: string | null) => {
  const res = await Axios.get(
    API.products,
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

const createProducts = async (data: FormData, id?: number) => {
  const url = id ?  `${API.products}/${id}` : API.products;
  const res = await Axios.post(url, data);
  return res
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['create-product'],
    mutationFn: ({ formData, id }: { formData: FormData; id?: number }) => createProducts(formData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products','manager-products'] })
    }
  })
}

const deleteProduct = async (id: number) => {
  const url = `${API.products}/${id}`;
  const res = await Axios.delete(url);
  return res
}

export const useDeletProduct = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['delete-product'],
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'manager-products'] });

      if(onSuccessCallback){
        onSuccessCallback();
      }
    }
  })
}

interface ManagerProductParams {
  page?: number;
  pageSize?: number;
  status?: string;
  category_name?: string;
}

const getManagerProducts = async (params?: ManagerProductParams) => {
  
  const res = await Axios.get(API.manager_products, { params });
  return res.data
}

export const useFetchManagerProducts = <T>(params?: ManagerProductParams) => {
  return useQuery<T>({
    queryKey: ['manager-products', params],
    queryFn: () => getManagerProducts(params)
  })
}