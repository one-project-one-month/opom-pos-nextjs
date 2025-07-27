import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'

const url = 'https://79403962ac78.ngrok-free.app/api/v1/categories'
const token = 'Bearer 271|RKONjOzAdPtZI7Yiw6iisFl1T021oafbvlOsoIeL471b6932'

const getCategories = async () => {
  const res = await Axios.get(url, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  })

  return res.data.category
}

export const useFetchCategories = <T>() => {
  return useQuery<T>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
