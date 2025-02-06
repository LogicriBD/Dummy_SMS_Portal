import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/ApiClient'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { IEmailVerification } from '../context/verify.slice'

export type EmailVerificationResponse = {
  verifyEmailToken: {
    token: string
    expires: string
  }
}

export const useEmailVerification = () => {
  const router = useRouter()
  return useMutation({
    mutationKey: ['auth-email-verification'],
    async mutationFn(payload: IEmailVerification) {
      try {
        const data = await apiClient.post<IEmailVerification, EmailVerificationResponse>(
          '/auth/email-verification',
          payload
        )
        console.log(data)
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
