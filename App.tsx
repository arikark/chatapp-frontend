import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import i18n from 'i18n-js'
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
import { Text, LogBox } from 'react-native'
import { ENV } from '@env'

import { ThemeProvider } from './src/styles/ThemeProvider'
import Navigation from './src/navigation'
import { store } from './src/store'
import { en } from './src/translations'
LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications
i18n.translations = {
  en
}
i18n.locale = 'en'

console.log(`Runnning in ${ENV}`)

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
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          {!fontsLoaded ? <Text>Loading</Text> : <Navigation />}
          <StatusBar />
        </ThemeProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  )
}
