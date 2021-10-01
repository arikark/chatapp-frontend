/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { decode } from 'jwt-decode'

import type { RootState } from '../../store'

type ThemeState = {
  isDarkTheme: boolean
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { isDarkTheme: true } as ThemeState,
  reducers: {
    toggleTheme: (state) => ({ ...state, isDarkTheme: !state.isDarkTheme })
  }
})

export default themeSlice.reducer

export const { toggleTheme } = themeSlice.actions

export const selectTheme = (state: RootState) => state.theme.isDarkTheme
