import { validateRequestPayload } from '@/lib/Validation'
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginRequestBody = z.infer<typeof loginSchema>
export const loginValidator = validateRequestPayload(loginSchema)
