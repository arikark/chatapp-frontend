import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { OverlayProvider } from 'stream-chat-expo'

import ChannelScreen from '../../features/chat/screens/ChannelScreen'
import ThreadScreen from '../../features/chat/screens/ThreadScreen'
import ModalScreen from '../../features/shared/screens/ModalScreen'
import NotFoundScreen from '../../features/shared/screens/NotFoundScreen'
import { BottomTabNavigator } from './BottomTabNavigator'
import { RootStackParamList } from '../types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  return (
    <OverlayProvider translucentStatusBar>
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
              headerBackTitle: 'Back',
              headerRight: () => <></>,
              headerTitle: route.params?.name
            })}
          />
          <Stack.Screen
            component={ThreadScreen}
            name="Thread"
            options={() => ({ headerLeft: () => <></> })}
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
