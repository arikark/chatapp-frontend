import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../../store'
import { userServices } from '../../../store/api/userServices'
import type { IProfile } from '../../../store/api/interfaces'

// see https://redux-toolkit.js.org/rtk-query/usage/examples

const initialState = {
  email: undefined,
  username: undefined,
  bio: undefined,
  photo: undefined
} as IProfile

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userServices.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.data.profile.email
        state.username = payload.data.profile.username
        state.bio = payload.data.profile.bio
        state.photo = payload.data.profile.photo
      }
    )
    builder.addMatcher(
      userServices.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.data.profile.email
        state.username = payload.data.profile.username
        state.bio = payload.data.profile.bio
        state.photo = payload.data.profile.photo
      }
    )
    builder.addMatcher(
      userServices.endpoints.uploadPhoto.matchFulfilled,
      (state, { payload }) => {
        try {
          state.photo = payload.data.url
        } catch {
          console.log('fail')
        }
      }
    )
  }
})

export default profileSlice.reducer

export const selectProfile = (state: RootState) => state.profile
