import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../../store'
import { userApi } from '../../../store/api/userApi'
import type { IProfile } from '../../../store/api/interfaces'

// see https://redux-toolkit.js.org/rtk-query/usage/examples

const initialState = {
  email: null,
  username: null,
  bio: null,
  photo: null
} as IProfile

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.data.profile.email
        state.username = payload.data.profile.username
        state.bio = payload.data.profile.bio
        state.photo = payload.data.profile.photo
      }
    )
    builder.addMatcher(
      userApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.data.profile.email
        state.username = payload.data.profile.username
        state.bio = payload.data.profile.bio
        state.photo = payload.data.profile.photo
      }
    )
  }
})

export default profileSlice.reducer

export const selectProfile = (state: RootState) => state.profile
