import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'
import { API } from '../constants/api'

const getCategories = async () => {
  try {
    const res = await Axios.get(API.categories)
    return res.data.category
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

const getCategoriesById = async (id: number) => {
  try {
    const res = await Axios.get(`${API.categories}/${id}`)
    return res.data.category.name
  } catch (error) {
    console.error('Error fetching category by ID:', error)
    throw error
  }
}

export const useFetchCategories = <T>() => {
  return useQuery<T>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })
}

export const useFetchCategoriesById = <T>(id: number) => {
  return useQuery<T>({
    queryKey: ['categories', id],
    queryFn: () => getCategoriesById(id),
  })
}
