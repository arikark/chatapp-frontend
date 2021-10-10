/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChannelContextValue, MessageType } from 'stream-chat-react-native-core'
import type { Channel } from 'stream-chat'
// import { decode } from 'jwt-decode'

import type { RootState } from '../../../store'

type ChannelState = {
  channel: Channel<ChannelContextValue> | null
}
type ThreadState = {
  thread: MessageType | null
}

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
