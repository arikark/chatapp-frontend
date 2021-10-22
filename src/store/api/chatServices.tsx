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

export const chatServices = api.injectEndpoints({
  endpoints: (builder) => ({
    createChannel: builder.mutation<ChannelCreationResponse, FormData>({
      query: (channelDetails) => ({
        url: 'channel/create',
        method: 'POST',
        body: channelDetails
      })
    })
  }),
  overrideExisting: true
})

export const { useCreateChannelMutation } = chatServices
