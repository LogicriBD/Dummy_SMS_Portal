import { z, ZodSchema } from 'zod'

export const phoneNumberSchema = z
  .string()
  .regex(/^(\+)?(88)?(0)?1[3456789][0-9]{8}$/, 'Phone number is not valid, please recheck')

export const toResizedPhoneNumber = (phone: string | number, targetLength = 11) => {
  try {
    const meaningfulPart = `${phone}`.slice(-10)
    const fullForm = '+880' + meaningfulPart
    return fullForm.slice(-targetLength)
  } catch (err) {
    console.log(`error in phone number resize: ${phone}`)
    return ''
  }
}

export const elevenDigitPhoneNumberSchema = phoneNumberSchema.transform(phone => toResizedPhoneNumber(phone))

export const validateRequestPayload = (schema: ZodSchema) => {
  return (input: any) => {
    const result = schema.safeParse(input)
    if (result.success) {
      return result.data
    }
    const messages: string[] = []
    for (const issue of result.error.issues) {
      const path = issue.path.join('.')
      const description = `${path} - ${issue.message} (${issue.code})`
      messages.push(description)
    }
    const message = messages.length ? messages.join('. ') : 'Validation Error'
    throw new Error(message)
  }
}
