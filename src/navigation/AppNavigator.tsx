import * as React from 'react'

import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Pressable } from 'react-native'
import { useTheme } from 'react-native-paper'
import { OverlayProvider } from 'stream-chat-expo'

import ModalScreen from '../features/shared/screens/ModalScreen'
import NotFoundScreen from '../features/shared/screens/NotFoundScreen'
import TabOneScreen from '../features/shared/screens/TabOneScreen'
import TabTwoScreen from '../features/shared/screens/TabTwoScreen'
import ChannelScreen from '../features/chat/screens/ChannelScreen'
import ThreadScreen from '../features/chat/screens/ThreadScreen'
import ChannelListScreen from '../features/chat/screens/ChannelListScreen'

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps
} from './types'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AppNavigator() {
  return (
    <OverlayProvider translucentStatusBar>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: 'Oooops!' }}
        />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            component={ChannelScreen}
            name="Channel"
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
      </Stack.Navigator>
    </OverlayProvider>
  )
}

const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const { colors, sizingMajor } = useTheme()
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: colors.primary
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1
              })}
            >
              <FontAwesome
                name="info-circle"
                size={sizingMajor.x3}
                color="red"
                style={{ marginRight: sizingMajor.x5 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />
        }}
      />

      <BottomTab.Screen
        name="ChatRoot"
        component={ChannelListScreen}
        options={{
          title: 'Channel List',
          tabBarIcon: ({ color }) => <TabBarIcon name="comment" color={color} />
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  const { sizingMinor, sizingMajor } = useTheme()
  return (
    <FontAwesome
      size={sizingMajor.x4}
      style={{ marginBottom: -1 * sizingMinor.x1 }}
      {...props}
    />
  )
}
