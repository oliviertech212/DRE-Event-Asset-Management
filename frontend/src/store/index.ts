import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './api/authApi'
import { eventsApi } from './api/eventsApi'
import { assetsApi } from './api/assetsApi'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [assetsApi.reducerPath]: assetsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, eventsApi.middleware, assetsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
