import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IMessage {
  page: number
  limit: number
  search: string
}

const initialMessageState: IMessage = {
  page: 1,
    limit: 3,
    search: '',
}

export const messageSlice = createSlice({
  name: 'message',
  initialState: initialMessageState,
  reducers: {
    setInputValue: (state, action: PayloadAction<Partial<IMessage>>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const messageActions = messageSlice.actions
export const messageReducer = messageSlice.reducer
