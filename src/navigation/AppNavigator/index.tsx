import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OverlayProvider } from 'stream-chat-expo'

import { useTheme } from 'react-native-paper'
import ChannelScreen from '../../features/chat/screens/ChannelScreen'
import ThreadScreen from '../../features/chat/screens/ThreadScreen'
import ModalScreen from '../../features/shared/screens/ModalScreen'
import NotFoundScreen from '../../features/shared/screens/NotFoundScreen'
import { BottomTabNavigator } from '../AppNavigator/BottomTabNavigator'
import { AppStackParamList } from '../types'
import ChannelCreationScreen from '../../features/chat/screens/ChannelCreationScreen'
import { ChannelHeaderBackBtn, ChannelHeaderMap } from './CustomHeaders'
import { useStreamChatTheme } from '../../styles/themes/useStreamChatTheme'
import MapScreen from '../../features/chat/screens/MapScreen'

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<AppStackParamList>()
  const theme = useStreamChatTheme()
  return (
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
              headerTitle: 'Users Location'
            })}
          />
        </Stack.Group>

        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </OverlayProvider>
  )
}
