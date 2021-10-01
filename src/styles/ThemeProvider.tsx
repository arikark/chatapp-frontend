import React from 'react'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import merge from 'deepmerge'

import { CustomDefaultTheme, CustomDarkTheme } from './themes'
import { useAppSelector } from '../features/shared/hooks/redux'
import { selectTheme } from '../features/shared/slices'

const CombinedDefaultTheme = merge(CustomDefaultTheme, NavigationDefaultTheme)
const CombinedDarkTheme = merge(CustomDarkTheme, NavigationDarkTheme)

export type ThemeProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const isDarkTheme = useAppSelector(selectTheme)
  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <SCThemeProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          {children}
        </NavigationContainer>
      </SCThemeProvider>
    </PaperProvider>
  )
}
