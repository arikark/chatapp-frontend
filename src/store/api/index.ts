import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { StreamChat } from 'stream-chat'
import { API_URL } from '@env'

import { RootState } from '..'
console.log(`Backend base URL: ${API_URL}`)
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authentication', token)
      }
      return headers
    }
  }),
  tagTypes: ['User'],
  endpoints: () => ({})
})

export const chatClient = StreamChat.getInstance('wnwcdjuc9keq')
