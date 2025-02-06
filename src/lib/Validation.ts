import { ZodSchema } from 'zod'

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
