import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import decode from 'jwt-decode'

import type { RootState } from '../../../store'
import { userServices } from '../../../store/api/userServices'
import type { IAuth } from '../../../store/api/interfaces'
// see https://redux-toolkit.js.org/rtk-query/usage/examples

const initialState = {
  token: undefined,
  streamIOToken: undefined,
  id: undefined
} as IAuth

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setStreamToken: (state, { payload }: PayloadAction<any>) => {
      state.streamIOToken = payload
    },
    setToken: (state, { payload }: PayloadAction<any>) => {
      state.token = payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userServices.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data.auth.token
        state.id = payload.data.profile.id
      }
    )
    builder.addMatcher(
      userServices.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data.auth.token
        state.id = payload.data.profile.id
      }
    )
  }
})

export default authSlice.reducer

export const { logout, setStreamToken, setToken } = authSlice.actions

export const selectStreamIOToken = (state: RootState) =>
  state.auth.streamIOToken
export const selectToken = (state: RootState) => state.auth.token
export const selectUserId = (state: RootState) => state.auth.id
