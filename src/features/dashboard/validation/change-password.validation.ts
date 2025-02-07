import { validateRequestPayload } from '@/lib/Validation'
import { z } from 'zod'

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, 'Old password must be at least 6 characters long'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
})

export type ChangePasswordRequestBody = z.infer<typeof changePasswordSchema>
export const changePasswordValidator = validateRequestPayload(changePasswordSchema)
