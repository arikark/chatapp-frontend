import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'
import authReducer from '../features/authentication/slice'
import profileReducer from '../features/profile/slice'
import {
  channelReducer,
  listOrCarouselReducer,
  threadReducer,
  userslocationReducer
} from '../features/chat/slice'
import themeReducer from '../features/shared/slices'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    profile: profileReducer,
    theme: themeReducer,
    chatChannel: channelReducer,
    chatThread: threadReducer,
    usersLocation: userslocationReducer,
    listOrCarousel: listOrCarouselReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
