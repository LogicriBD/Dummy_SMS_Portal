import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useJWTAuthContext } from '@/config/auth/auth'
import { UpdateUserRequestBody, updateUserValidator } from '../validation/update.valildation'
import { UserInfo } from '@/types/auth'

export const useUpdateUser = () => {
  const router = useRouter()
  const { apiClient } = useJWTAuthContext()

  return useMutation({
    mutationKey: ['update-user'],
    async mutationFn(payload: UpdateUserRequestBody) {
      try {
        updateUserValidator(payload)
        const { data } = await apiClient().post<UserInfo>('/users/update', payload)
        toast.success('User Information Successfully Updated')
        router.refresh()
        router.push('/dashboard')
        return data
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
}
