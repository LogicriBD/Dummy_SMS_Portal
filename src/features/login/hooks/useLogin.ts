import { useJWTAuthContext } from '@/config/auth/auth'
import { useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { loginValidator } from '../validation/login.validation'

export const useLogin = () => {
  const { loginWithCredentials } = useJWTAuthContext()
  const [isLoading, setIsLoading] = useState(false)
  const login = useAppSelector(state => state.login)
  const router = useRouter()

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault()
      setIsLoading(true) // show loading animation to user
      const validatedPayload = loginValidator(login)
      const isSuccess = await loginWithCredentials({
        username: validatedPayload.email,
        password: validatedPayload.password,
      })
      toast.success('Logged In Successfully')
      if (isSuccess) {
        router.push('/')
      }
    } catch (error: any) {
      if (error?.response.request.status === 401) {
        toast.error('Please Verify Your Email First')
        localStorage.setItem('emailVerificationToken', error.response.data.verifyEmailToken.token)
        router.push('/verify')
        return
      }
      if (error?.response.request.status === 400) {
        toast.error(error.response.data.message)
        return
      }
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    onSubmit,
  }
}
