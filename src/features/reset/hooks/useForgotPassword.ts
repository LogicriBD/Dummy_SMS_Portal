import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/ApiClient'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export type ForgotPasswordResponse = {
  resetPasswordToken: {
    token: string
    expires: string
  }
}

export type ForgotPasswordRequest = {
  email: string
}

export const useForgotPassword = () => {
  const router = useRouter()
  return useMutation({
    mutationKey: ['auth-forgot-password'],
    async mutationFn(payload: ForgotPasswordRequest) {
      try {
        const data = await apiClient.post<ForgotPasswordRequest, ForgotPasswordResponse>(
          '/auth/forgot-password',
          payload
        )
        toast.success('Forgot Password Request Made Successfully')
        localStorage.setItem('resetPasswordToken', data.resetPasswordToken.token)
        router.push('/reset/verify')
        return data
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
}
