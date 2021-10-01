/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { decode } from 'jwt-decode'

import type { RootState } from '../../../store'

type AuthState = {
  email: string | null
  loginId: number | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { email: null, loginId: 123456 } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { email, loginId } }: PayloadAction<AuthState>
    ) => {
      state.email = email
      state.loginId = loginId
      // state.loginId = decode(token).loginId
    }
  }
})

export default authSlice.reducer

export const { setCredentials } = authSlice.actions

export const selectCurrentUserEmail = (state: RootState) => state.auth.email
export const selectCurrentUserLoginId = (state: RootState) => state.auth.loginId
