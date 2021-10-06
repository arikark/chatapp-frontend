import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { Api } from '../features/shared/api'
import authReducer from '../features/authentication/slice'
import themeReducer from '../features/shared/slices'

export const store = configureStore({
  reducer: {
    // [Api.reducerPath]: Api.reducer,
    auth: authReducer,
    theme: themeReducer
  }
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(Api.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
