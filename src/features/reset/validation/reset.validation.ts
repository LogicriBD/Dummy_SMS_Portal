import { validateRequestPayload } from '@/lib/Validation'
import { z } from 'zod'

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  token: z.string().min(1, 'Cannot Reset Password Please Try Again'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
})

export type ResetPasswordRequestBody = z.infer<typeof resetPasswordSchema>
export const resetPasswordValidator = validateRequestPayload(resetPasswordSchema)
