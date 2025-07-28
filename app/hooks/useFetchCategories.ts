import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'

const getCategories = async () => {
  const res = await Axios.get(
    `https://79403962ac78.ngrok-free.app/api/v1/categories`,
    {
      headers: {
        Authorization: `Bearer 283|jgqQaNh2DfzKn3WPjldpFAyH7hbhQDJN63mOC5fa81144c8c`,
        'Content-Type': 'application/json',
      },
    }
  )

  return res.data.category
}

export const useFetchCategories = <T>() => {
  return useQuery<T>({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
