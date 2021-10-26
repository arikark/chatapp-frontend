/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Location from 'expo-location'

import type { RootState } from '../../../store'

const channelSlice = createSlice({
  name: 'channel',
  initialState: { channel: null } as any,
  reducers: {
    setChannel: (state, { payload: channel }: PayloadAction<any>) => {
      state.channel = channel
    }
  }
})

const threadSlice = createSlice({
  name: 'thread',
  initialState: { thread: null } as any,
  reducers: {
    setThread: (state, { payload: { thread } }: PayloadAction<any>) => {
      state.thread = thread
    }
  }
})

export const channelReducer = channelSlice.reducer
export const threadReducer = threadSlice.reducer

export const { setChannel } = channelSlice.actions
export const { setThread } = threadSlice.actions

export const getCurrentChannel = (state: RootState) => state.chatChannel
export const getCurrentThread = (state: RootState) => state.chatThread

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    return [0, 0]
  }
  const location = await Location.getCurrentPositionAsync({})
  const coordinate = [location.coords.latitude, location.coords.longitude]

  return coordinate
}
