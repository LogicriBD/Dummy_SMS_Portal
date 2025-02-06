import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface ILogin {
  email: string
  password: string
}

const initialLoginState: ILogin = {
  email: '',
  password: '',
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialLoginState,
  reducers: {
    setInputValue: (state, action: PayloadAction<Partial<ILogin>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const loginActions = loginSlice.actions
export const loginReducer = loginSlice.reducer
