import { JWTAuthConfig, createJWTAuthProvider } from 'next-jwt-auth'
import { useContext } from 'react'
import { LoggedInUser } from '@/types/auth'
import { toast } from 'react-toastify'

export const authConfig: JWTAuthConfig = {
  apiBaseUrl: process.env.API_BASE_URL!,
  user: {
    /**
     * This is the property name in the response
     * where your user object is located
     */
    property: 'user',
  },
  accessToken: {
    /**
     * This is the property name in the response
     * where your access token string is located
     */
    property: 'access.token',
    /**
     * Access token Expiry time is optional.
     * If no expiry time found, then access token
     * will automatically expire when there is an
     * Unathorized response (http status code 401) found
     * from your API service
     */
    expireTimeProperty: 'access.expires', // optional
  },
  refreshToken: {
    /**
     * This is the property name in the response
     * where your access token string is located
     */
    property: 'refresh.token',
    /**
     * Refresh token Expiry time is optional.
     * If no expiry time found, then refresh token
     * will automatically expire when the library
     * can't get a new access token using the refresh token anymore
     */
    expireTimeProperty: 'refresh.expires', // optional
  },
  /**
   * Here are the API endpoints that your custom Auth service exposes
   */
  endpoints: {
    login: { url: '/auth/login', method: 'post' },
    logout: { url: '/auth/logout', method: 'post' },
    refresh: { url: '/auth/refresh-token', method: 'post' },
    user: { url: '/users/fetch', method: 'get' },
  },
  /**
   * This is the NextJS route for your login page.
   * This library will automatically redirect
   * user to this page when user session is expired.
   *
   * i.e refresh token is also expired and user needs to login again
   */
  pages: {
    login: { url: '/login' },
  },
}

/**
 * Next, we create the React Context and Context Provider
 * using our own User type.
 *
 * The reason why you need to create the context is because,
 * you need to tell the User type to the library.
 *
 * Otherwise the library cannot infer the User type
 * (will explain later below)
 */
export const { JWTAuthContext, JWTAuthProvider } = createJWTAuthProvider<LoggedInUser>()

/**
 * (Optional)
 * This is just a custom hook to easily access the JWTAuthContext.
 * You can skip this and use useContext(JWTAuthContext)
 * in your component, but this approach is more clean.
 */
export const useJWTAuthContext = () => {
  const context = useContext(JWTAuthContext)
  if (!context) {
    throw new Error('JWTAuthContext not found, please check the provider')
  }

  return context
}
