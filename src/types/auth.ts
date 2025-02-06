import { AuthUser } from 'next-jwt-auth'

export interface LoggedInUser extends AuthUser {
  user: {
    _id: string
    email: string
    username: string
    phone: string[]
    createdAt: string
    updatedAt: string
    status: string
  }
  refresh: {
    token: string
    expires: string
  }
}
