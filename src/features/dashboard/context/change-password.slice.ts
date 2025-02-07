import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ChangePasswordRequestBody } from '../validation/change-password.validation'

const initialChangePassword: ChangePasswordRequestBody = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export const changePasswordSlice = createSlice({
  name: 'change-password',
  initialState: initialChangePassword,
  reducers: {
    setInputValue: (state, action: PayloadAction<Partial<ChangePasswordRequestBody>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const changePasswordActions = changePasswordSlice.actions
export const changePasswordReducer = changePasswordSlice.reducer
