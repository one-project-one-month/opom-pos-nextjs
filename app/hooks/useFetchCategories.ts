import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'

const getCategories = async () => {
  const res = await Axios.get(
    'https://backoffice.opompos.site/api/v1/categories'
  )

  return res.data.category
}

export const useFetchCategories = <T>() => {
  return useQuery<T>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
