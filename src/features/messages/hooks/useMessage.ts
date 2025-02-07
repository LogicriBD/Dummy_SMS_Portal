import { useJWTAuthContext } from '@/config/auth/auth'
import { useAppSelector } from '@/store/hooks'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import qs from 'qs'
import { PaginatedList } from '@/types/api'

export type RemoteFileReference = {
  sizeInBytes?: number
  originalName: string
  downloadUrl: string
  mimeType: string
}

export interface Message {
  email: string
  masking?: string
  receiver: string
  type: 'TEXT' | 'MULTIMEDIA'
  message?: string
  media?: RemoteFileReference[]
  masked?: boolean
  read: boolean
  createdAt: string
  updatedAt: string
}

export const useMessage = () => {
  const { apiClient } = useJWTAuthContext()
  const messagePayload = useAppSelector(state => state.message)
  return useQuery({
    queryKey: ['message'],
    queryFn: async () => {
      try {
        const queryString = qs.stringify(messagePayload)
        const { data } = await apiClient().get<PaginatedList<Message>>(
          `/sms/fetch${queryString.length ? `?${queryString}` : ''}`
        )
          console.log(data);
        return data
      } catch (error: any) {
        toast.error(error.message)
      }
      },
    refetchInterval: 10000,
  })
}
