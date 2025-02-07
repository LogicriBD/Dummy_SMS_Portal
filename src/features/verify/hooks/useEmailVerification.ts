import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { IEmailVerification } from '../context/verify.slice'
import { useJWTAuthContext } from '@/config/auth/auth'

export type EmailVerificationResponse = {
  verifyEmailToken: {
    token: string
    expires: string
  }
}

export const useEmailVerification = () => {
  const router = useRouter()
  const { apiClient } = useJWTAuthContext()
  return useMutation({
    mutationKey: ['auth-email-verification'],
    async mutationFn(payload: IEmailVerification) {
      try {
        const { data } = await apiClient().post<EmailVerificationResponse>('/auth/email-verification', payload)
        toast.success('Email Verification Successful')
        localStorage.removeItem('emailVerificationToken')
        router.push('/login')
        return data
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
}
