import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { registrationValidator } from '../validation/registration.validation'

export interface IRegistration {
  email: string
  username: string
  password: string
  confirmPassword: string
}

const initialRegistrationState: IRegistration = {
  email: '',
  password: '',
  username: '',
  confirmPassword: '',
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: initialRegistrationState,
  reducers: {
    setInputValue: (state, action: PayloadAction<Partial<IRegistration>>) => {
      return {
        ...state,
        ...action.payload,
        error: undefined,
      }
    },
  },
})

export const registrationActions = registrationSlice.actions
export const registrationReducer = registrationSlice.reducer
