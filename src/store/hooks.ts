import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, AppStore } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppStore>()
