import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// import { Api } from '../features/shared/api'
import authReducer from '../features/authentication/slice'
import { channelReducer, threadReducer } from '../features/chat/slice'
import themeReducer from '../features/shared/slices'

export const store = configureStore({
  reducer: {
    // [Api.reducerPath]: Api.reducer,
    auth: authReducer,
    theme: themeReducer,
    chatChannel: channelReducer,
    chatThread: threadReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
