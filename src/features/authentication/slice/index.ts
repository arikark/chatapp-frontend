import { createSlice } from '@reduxjs/toolkit'
import decode from 'jwt-decode'

import type { RootState } from '../../../store'
import { userApi } from '../../../store/api/userApi'
import type { IAuth } from '../../../store/api/interfaces'

// see https://redux-toolkit.js.org/rtk-query/usage/examples

const initialState = {
  token: null,
  streamIOToken: null
} as IAuth

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data.auth.token
        state.streamIOToken = payload.data.auth.streamIOToken
      }
    )
    builder.addMatcher(
      userApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data.auth.token
        state.streamIOToken = payload.data.auth.streamIOToken
      }
    )
  }
})

export default authSlice.reducer

export const { logout } = authSlice.actions

export const selectStreamIOToken = (state: RootState) =>
  state.auth.streamIOToken
export const selectToken = (state: RootState) => state.auth.token
