import { useMutation } from '@tanstack/react-query'
import { IRegistration } from '../context/registration.slice'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { registrationValidator } from '../validation/registration.validation'
import { useJWTAuthContext } from '@/config/auth/auth'

export type RegistrationResponse = {
  verifyEmailToken: {
    token: string
    expires: string
  }
}

export const useRegistration = () => {
  const router = useRouter()
  const { apiClient } = useJWTAuthContext()

  return useMutation({
    mutationKey: ['auth-registration'],
    async mutationFn(payload: IRegistration) {
      try {
        const validPayload = registrationValidator(payload)
        if (payload.password !== payload.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        const { data } = await apiClient().post<RegistrationResponse>('/auth/register', payload)
        console.log(data)
        toast.success('Registration Successful')
        localStorage.setItem('emailVerificationToken', data.verifyEmailToken.token)
        router.push('/verify')
        return data
      } catch (error: any) {
        toast.error(error.message)
      }
    },
  })
}
