import { useJWTAuthContext } from '@/config/auth/auth'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useFetchUser = () => {
  const { apiClient } = useJWTAuthContext()
  return useQuery({
    queryKey: ['user'],
    async queryFn() {
      try {
        const response = await apiClient().get('/users/fetch')
        return response.data
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
}
