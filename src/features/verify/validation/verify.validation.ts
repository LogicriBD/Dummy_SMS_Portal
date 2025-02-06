import { validateRequestPayload } from '@/lib/Validation'
import { z } from 'zod'

export const verifyEmailSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 characters').max(6, 'OTP must be 6 characters'),
  token: z.string().min(1, 'Cannot Verify Email Please Login Again'),
})

export type VerifyEmailRequestBody = z.infer<typeof verifyEmailSchema>
export const verifyEmailValidator = validateRequestPayload(verifyEmailSchema)
