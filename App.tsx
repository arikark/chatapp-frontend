import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'
import { Text } from 'react-native'
import { ThemeProvider } from './src/styles/ThemeProvider'
import { AppNavigator, LandingNavigator } from './src/navigators'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic
  })
  const isLoggedIn = false
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {fontsLoaded ? (
          isLoggedIn ? (
            <AppNavigator />
          ) : (
            <LandingNavigator />
          )
        ) : (
          <Text>Loading</Text>
        )}
        <StatusBar />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
