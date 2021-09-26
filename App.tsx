import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native'
import merge from 'deepmerge'

import { AppNavigator, LandingNavigator } from './src/navigators'
import { CustomDefaultTheme, CustomDarkTheme } from './src/themes'

const CombinedDefaultTheme = merge(CustomDefaultTheme, NavigationDefaultTheme)
const CombinedDarkTheme = merge(CustomDarkTheme, NavigationDarkTheme)

export default function App() {
  const isLoggedIn = false
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer theme={CombinedDefaultTheme}>
          {isLoggedIn ? <AppNavigator /> : <LandingNavigator />}
        </NavigationContainer>
        <StatusBar />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
