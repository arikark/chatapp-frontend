import { LocationObject } from 'expo-location'

import { api } from '.'

export interface CreateChannelRequest {
  channelName: string
  channelDesc: string
  chatAvatar: FormData
  currentLocation: LocationObject
}
interface ChannelCreationResponse {
  data: {
    name: string
    ownerId: string
    id: string
    coordinate: number[]
    image: string
  }
}
interface ChannelFetchData {
  name: string
  ownerId: string
  image: string
  coordinate: number[]
  id: string
  description: string
}
interface ChannelFetchResponse {
  data: ChannelFetchData[]
}
interface ChannelFetchRequest {
  range: number
  location: number[]
}
export const chatServices = api.injectEndpoints({
  endpoints: (builder) => ({
    createChannel: builder.mutation<ChannelCreationResponse, FormData>({
      query: (channelDetails) => ({
        url: 'channel/create',
        method: 'POST',
        body: channelDetails
      })
    }),
    fetchNearby: builder.mutation<ChannelCreationResponse, ChannelFetchRequest>(
      {
        query: (queryDetails) => ({
          url: 'channel/fetchnearby',
          method: 'POST',
          body: queryDetails
        })
      }
    )
  }),
  overrideExisting: true
})

export const { useCreateChannelMutation, useFetchNearbyMutation } = chatServices
