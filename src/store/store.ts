import { loginReducer } from '@/features/login/context/login.slice'
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
  reset: resetReducer
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
