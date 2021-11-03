/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Location from 'expo-location'

import type { RootState } from '../../../store'

const channelSlice = createSlice({
  name: 'channelid',
  initialState: { channelid: null } as any,
  reducers: {
    setChannelId: (state, { payload: channelId }: PayloadAction<any>) => {
      state.channelId = channelId
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

const usersLocationSlice = createSlice({
  name: 'userslocation',
  initialState: {
    userslocation: []
  } as any,
  reducers: {
    setUsersLocation: (state, { payload: users }: PayloadAction<any>) => {
      state.userslocation = users
    }
  }
})

const listOrCarouselSlice = createSlice({
  name: 'listorcarousel',
  initialState: {
    isList: true
  } as any,
  reducers: {
    setListOrCarousel: (state) => {
      state.isList = !state.isList
    }
  }
})

export const channelReducer = channelSlice.reducer
export const threadReducer = threadSlice.reducer
export const userslocationReducer = usersLocationSlice.reducer
export const listOrCarouselReducer = listOrCarouselSlice.reducer

export const { setChannelId } = channelSlice.actions
export const { setThread } = threadSlice.actions
export const { setUsersLocation } = usersLocationSlice.actions
export const { setListOrCarousel } = listOrCarouselSlice.actions

export const getCurrentChannelId = (state: RootState) => state.chatChannelId
export const getCurrentThread = (state: RootState) => state.chatThread
export const getUsersLocation = (state: RootState) => state.usersLocation
export const getListOrCarousel = (state: RootState) => state.listOrCarousel

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    return [0, 0]
  }
  const location = await Location.getCurrentPositionAsync({})
  const coordinate = [location.coords.latitude, location.coords.longitude]

  return coordinate
}
