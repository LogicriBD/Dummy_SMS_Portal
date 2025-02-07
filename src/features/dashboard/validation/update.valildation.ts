import { elevenDigitPhoneNumberSchema, validateRequestPayload } from '@/lib/Validation'
import { z } from 'zod'

export const updateUserSchema = z.object({
  username: z.string().min(3, 'Username must be specified'),
  phone: z.array(elevenDigitPhoneNumberSchema),
})

export type UpdateUserRequestBody = z.infer<typeof updateUserSchema>
export const updateUserValidator = validateRequestPayload(updateUserSchema)
