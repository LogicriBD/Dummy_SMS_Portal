import { validateRequestPayload } from '@/lib/Validation'
import { z } from 'zod'

export const registrationSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be specified'),
})

export type RegistrationRequestBody = z.infer<typeof registrationSchema>
export const registrationValidator = validateRequestPayload(registrationSchema)
