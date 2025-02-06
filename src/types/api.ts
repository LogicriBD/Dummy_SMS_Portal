export interface SuccessfulAPIResponse {
  message: string
}

export type PaginatedList<T> = {
  items: T[]
  total: number
  page: number
  limit: number
}
