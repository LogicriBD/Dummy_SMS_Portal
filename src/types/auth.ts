import { AuthUser } from 'next-jwt-auth'

export interface UserInfo {
  _id: string
  email: string
  username: string
  phone: string[]
  createdAt: string
  updatedAt: string
  status: string
}

export interface LoggedInUser extends AuthUser {
  user: UserInfo
  refresh: {
    token: string
    expires: string
  }
}
