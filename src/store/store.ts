import { changePasswordReducer } from '@/features/dashboard/context/change-password.slice'
import { loginReducer } from '@/features/login/context/login.slice'
import { messageReducer } from '@/features/messages/context/message.slice'
import { registrationReducer } from '@/features/registration/context/registration.slice'
import { resetReducer } from '@/features/reset/context/reset.slice'
import { verificationReducer } from '@/features/verify/context/verify.slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const appReducer = combineReducers({
  // add reducers here as key-value pairs
  // e.g. key: reducer,
  login: loginReducer,
  registration: registrationReducer,
  verifyEmail: verificationReducer,
  reset: resetReducer,
  changePassword: changePasswordReducer,
  message: messageReducer
})

export const appStore = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  },
})

export type AppStore = ReturnType<typeof appReducer>
export type AppDispatch = typeof appStore.dispatch
