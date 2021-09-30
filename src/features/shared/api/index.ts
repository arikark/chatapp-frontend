import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StreamChat } from 'stream-chat'

export const Api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API_URL,
    prepareHeaders: (headers) => {
      headers.set('x-api-key', process.env.REACT_APP_DEV_API_KEY as string)
      return headers
    }
  }),
  // tagTypes: ['Portfolio', 'Accounts'],
  endpoints: () => ({})
})

export const chatClient = StreamChat.getInstance('wnwcdjuc9keq')
