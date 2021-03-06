import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OverlayProvider } from 'stream-chat-expo'

import ChannelScreen from '../../features/chat/screens/ChannelScreen'
import ThreadScreen from '../../features/chat/screens/ThreadScreen'
import { BottomTabNavigator } from '../AppNavigator/BottomTabNavigator'
import { AppStackParamList, iAppContext } from '../types'
import ChannelCreationScreen from '../../features/chat/screens/ChannelCreationScreen'
import { ChannelHeaderBackBtn, ChannelHeaderMap } from './CustomHeaders'
import { useStreamChatTheme } from '../../styles/themes/useStreamChatTheme'
import MapScreen from '../../features/chat/screens/MapScreen'

export const AppContext = React.createContext<iAppContext | null>(null)

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<AppStackParamList>()
  const theme = useStreamChatTheme()
  const [channels, setChannels] = React.useState<any>()
  const [threads, setThreads] = React.useState()

  return (
    //@ts-ignore
    <AppContext.Provider value={{ channels, setChannels, threads, setThreads }}>
      <OverlayProvider value={{ style: theme }} translucentStatusBar>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />

          {/* Below is for the chat functionality */}
          <Stack.Group>
            <Stack.Screen
              name="Channel"
              component={ChannelScreen}
              options={({ route }: { route: any }) => ({
                headerLeft: () => <ChannelHeaderBackBtn />,
                headerRight: () => <ChannelHeaderMap />,
                headerTitle: route.params?.name
              })}
            />
            <Stack.Screen
              component={ThreadScreen}
              name="Thread"
              options={() => ({ headerLeft: () => <></> })}
            />
            <Stack.Screen
              component={ChannelCreationScreen}
              name="ChannelCreation"
              options={() => ({
                headerTitle: 'Create a channel'
              })}
            />
            <Stack.Screen
              component={MapScreen}
              name="Map"
              options={() => ({
                headerTitle: 'Members Location'
              })}
            />
          </Stack.Group>
        </Stack.Navigator>
      </OverlayProvider>
    </AppContext.Provider>
  )
}
