import Axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { ZodSchema } from 'zod'

class APIClient {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = Axios.create()
    this.axiosInstance.interceptors.request.use(
      function AuthTokenInject(requestConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        const token = localStorage.getItem('access')
        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`
        }
        requestConfig.baseURL = process.env.API_BASE_URL
        return requestConfig
      },
      error => {
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      error => {
        if (error.response?.status === 401) {
          console.log('Unauthorized')
        }
        return Promise.reject(error)
      }
    )
  }

  public async get<T extends object, R extends object>(url: string, data?: T, config?: AxiosRequestConfig) {
    const queryString = data ? `?${qs.stringify(data)}` : ''
    const response = await this.axiosInstance.get<R>(`${url}${queryString}`, config)
    return response.data
  }

  public async post<T extends object, R extends object>(url: string, data?: T, config?: AxiosRequestConfig) {
    const response = await this.axiosInstance.post<R>(url, data, config)
    return response.data
  }
}

export const apiClient = new APIClient()
