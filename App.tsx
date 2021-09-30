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
import { StreamChat } from 'stream-chat'
import { Chat, OverlayProvider } from 'stream-chat-expo'
import { ThemeProvider } from './src/styles/ThemeProvider'
import { AppNavigator, LandingNavigator } from './src/navigators'
import { iAppContext } from './src/features/chat/screens/types'
import { useStreamChatTheme } from './src/styles/themes/useStreamChatTheme'

export const chatClient = StreamChat.getInstance('wnwcdjuc9keq')
export const AppContext = React.createContext<iAppContext | null>(null)

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
  const isLoggedIn = true

  const [channel, setChannel] = React.useState<any>()
  const [thread, setThread] = React.useState()

  const theme = useStreamChatTheme()

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        {fontsLoaded ? (
          isLoggedIn ? (
            <AppContext.Provider
              value={{ channel, setChannel, thread, setThread }}
            >
              <OverlayProvider translucentStatusBar value={{ style: theme }}>
                <Chat client={chatClient}>
                  <AppNavigator />
                </Chat>
              </OverlayProvider>
            </AppContext.Provider>
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
