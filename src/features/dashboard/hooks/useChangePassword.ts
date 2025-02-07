import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useJWTAuthContext } from '@/config/auth/auth'
import { ChangePasswordRequestBody, changePasswordValidator } from '../validation/change-password.validation'
import { UserInfo } from '@/types/auth'

export const useChangePassword = () => {
  const router = useRouter()
  const { apiClient } = useJWTAuthContext()

  return useMutation({
    mutationKey: ['update-password'],
    async mutationFn(payload: ChangePasswordRequestBody) {
      try {
        const validatedPayload = changePasswordValidator(payload)
        if (validatedPayload.newPassword !== validatedPayload.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        const { data } = await apiClient().post<UserInfo>('/users/update', validatedPayload)
        toast.success('User Password Successfully Updated')
        router.refresh()
        router.push('/dashboard')
        return data
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
}
