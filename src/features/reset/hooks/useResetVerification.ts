import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useJWTAuthContext } from '@/config/auth/auth'

export type ResetVerificationResponse = {
  resetPasswordToken: {
    token: string
    expires: string
  }
}

export type ResetVerificationRequest = {
  otp: string
  token: string
}

export const useResetVerification = () => {
  const router = useRouter()
  const { apiClient } = useJWTAuthContext()

  return useMutation({
    mutationKey: ['auth-reset-verification'],
    async mutationFn(payload: ResetVerificationRequest) {
      try {
        if (payload.otp.length !== 6) {
          throw new Error('Invalid OTP, must be 6 digits')
        }
        const { data } = await apiClient().post('/auth/reset-password-verification', payload)
        toast.success('Reset Password Successfully Verified')
        localStorage.setItem('resetPasswordToken', data.resetPasswordToken.token)
        router.push('/reset/update')
        return data
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
}
