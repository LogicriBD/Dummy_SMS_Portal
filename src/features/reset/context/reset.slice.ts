import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IReset {
  password: string
  confirmPassword: string
}

const initialResetState: IReset = {
  confirmPassword: '',
  password: '',
}

export const resetSlice = createSlice({
  name: 'reset',
  initialState: initialResetState,
  reducers: {
    setInputValue: (state, action: PayloadAction<Partial<IReset>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const resetActions = resetSlice.actions
export const resetReducer = resetSlice.reducer
