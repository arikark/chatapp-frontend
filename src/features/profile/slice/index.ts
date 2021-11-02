import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  reducers: {
    clearProfile: () => initialState,
    setProfile: (state, { payload }: PayloadAction<any>) => {
      ;(state.username = payload.username),
        (state.email = payload.email),
        (state.bio = payload.bio),
        (state.photo = payload.avatar)
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userServices.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.data.profile.email
      }
    )
    builder.addMatcher(
      userServices.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.email = payload.data.profile.email
      }
    )
    builder.addMatcher(
      userServices.endpoints.uploadPhoto.matchFulfilled,
      (state, { payload }) => {
        try {
          state.photo = payload.data.profile.avatar
        } catch {
          console.log('fail')
        }
      }
    )
    builder.addMatcher(
      userServices.endpoints.updateProfile.matchFulfilled,
      (state, { payload }) => {
        try {
          state.username = payload.data.username
          state.bio = payload.data.bio
        } catch {
          console.log('fail')
        }
      }
    )
  }
})

export default profileSlice.reducer

export const { setProfile, clearProfile } = profileSlice.actions

export const selectProfile = (state: RootState) => state.profile
