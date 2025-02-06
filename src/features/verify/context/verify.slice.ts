import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { verifyEmailValidator } from '../validation/verify.validation'

export interface IEmailVerification {
  otp: string
  token: string
}

const initialEmailVerficationState: IEmailVerification = {
  otp: '',
  token: '',
}

export const verifyEmailSlice = createSlice({
  name: 'verify-email',
  initialState: initialEmailVerficationState,
  reducers: {
    setInputValue: (state, action: PayloadAction<Partial<IEmailVerification>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const verificationActions = verifyEmailSlice.actions
export const verificationReducer = verifyEmailSlice.reducer
