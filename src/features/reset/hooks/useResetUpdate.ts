import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/ApiClient'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { ResetPasswordRequestBody } from '../validation/reset.validation'

export const useResetUpdate = () => {
  const router = useRouter()
  return useMutation({
    mutationKey: ['auth-reset-verification'],
    async mutationFn(payload: ResetPasswordRequestBody) {
      try {
        if (payload.confirmPassword !== payload.password) {
          throw new Error('Password and Confirm Password must be the same')
        }
        const data = await apiClient.post<ResetPasswordRequestBody, any>('/auth/reset-password', payload)
        toast.success('Password Reset Successfully')
        router.push('/login')
        return data
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
}
